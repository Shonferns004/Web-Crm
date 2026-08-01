# 10 — Payments

## Approach: Client-Only Capture

This build implements the **client-captured donation** flow. The server does not create orders, host the payment page, or handle webhooks. The payment page runs on the client (Razorpay Checkout), and the resulting payment identifiers are reported to the backend for record-keeping and verification.

### Flow

```
Client (website)                     Backend (this repo)
─────────────────                    ──────────────────
1. Reads Razorpay key from org
   settings (via site endpoint)
2. Opens Razorpay Checkout with
   amount, name, description,
   currency
3. Payment succeeds →
   { razorpay_payment_id,
     razorpay_order_id?,
     razorpay_signature? }
4. POST /api/v1/donations  ───────▶  validate (Zod)
                                     optional signature verify (Razorpay)
                                     create Donation (+ Donor if identified)
                                     create Notification to org admins
                                     respond { success, donation }
```

## Why

- No server-side order creation/webhooks keeps Phase 1 small and avoids storing full payment credentials server-side.
- Signature verification (when the client supplies an order id + signature) still detects tampering for the common Razorpay Checkout flow.
- Future phases can add `POST /orders`, webhook verification, and refund handling (see docs/12-roadmap.md).

## Org Payment Settings (`OrganizationSetting`)

| Key | Meaning |
|-----|---------|
| `payment.razorpayKeyId` | Public key (safe to expose to clients). |
| `payment.razorpayKeySecret` | Secret used only for optional signature verification. Never exposed. |
| `payment.name` | Display name on the checkout (defaults to org name). |
| `payment.description` | Checkout description. |
| `payment.currency` | Default `INR`. |
| `payment.receiptPrefix` | Prefix for generated receipt refs (e.g. `ASR`). |

The public `site` endpoint returns `payment.razorpayKeyId` and display fields only — **never** the secret.

## Signature Verification

When `razorpay_order_id` and `razorpay_signature` are present, verify:

```
hmac = HmacSHA256(order_id + "|" + payment_id, keySecret)
signature matches ? accept : reject (400)
```

If the client does not send an order/signature (some flows), the donation is recorded as `status = PENDING_VERIFICATION` and marked `VERIFIED` later.

## Donation Record

`Donation` stores: organization, amount, currency, payment provider, payment/order ids, signature, status (`PENDING`, `PENDING_VERIFICATION`, `VERIFIED`, `FAILED`, `REFUNDED`), donor id (optional), notes, metadata JSON (extra Razorpay response fields), receipt number.

## Security Notes

- `razorpayKeySecret` is only usable in HMAC comparisons; never logged or returned.
- Donation amounts validated (positive, decimal max 2 places, bounded by config `DONATION_MAX_AMOUNT`).
- Rate-limited donation endpoint to deter spam.
