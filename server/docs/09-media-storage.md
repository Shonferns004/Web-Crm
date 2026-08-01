# 09 — Media Storage

Storage provider: **Supabase Storage** (S3-compatible), accessed via `@supabase/supabase-js`.

## Buckets

| Bucket | Access | Contents |
|--------|--------|----------|
| `media` | private (public URLs generated on read) | All org assets |
| `public-media` | public (read) | Assets meant for public website URLs |

Decision: use a single `media` bucket with private storage; public-facing URLs are served through a public read path via signed/public URL strategy configured in Supabase. If org sites need static direct URLs, a `public-media` bucket with org-prefixed folders is used instead. The choice is a deployment setting (`STORAGE_BUCKET`).

## Object Key Convention

```
<orgSlug>/<entityType>/<yyyy>/<mm>/<uuid>.<ext>
```

Example: `ashray/gallery/2026/08/6f9a...-be48-a1c3.png`

This keeps objects discoverable and prevents collisions.

## Upload Pipeline

1. Client sends file via `POST /api/v1/media/upload` (multipart) with `X-Organization-Id`.
2. Middleware validates size (default ≤ 10 MB) and mime type (images: jpeg/png/webp/gif; docs: pdf/doc/xls/ppt).
3. Service uploads object to Supabase Storage at the key above.
4. A `Media` row is created: `{ id, organizationId, fileName, mimeType, size, bucket, key, url, thumbnailUrl, entityType?, entityId? }`.
5. Response returns the `Media` record + URL. URLs are never stored as absolute public URLs only; they are resolved by the client via a public-read path.

## URL Policy

- `STORAGE_PUBLIC_URL` base is used to compose final URLs from object keys.
- Thumbnails: for images, a resized variant is generated when a transformation service is configured; otherwise `thumbnailUrl` equals `url`.

## Cleanup

- Deleting a `Media` row must also remove the Storage object (`storage.from(bucket).remove([key])`).
- Deleting an entity (gallery, project, document) cascades media rows; object removal is performed by the media service.
- Orphan detection: periodic sweep of `Media` rows older than N days whose `entityId` is null and not attached to any section content.

## Section References

Media ids can be referenced inside section JSON content (e.g. hero image, gallery items). The `site` endpoint resolves media ids to URLs so website templates never need to call media endpoints directly.

## Env Placeholders

Supabase URL/anon/service keys are placeholders in `.env.example` (see docs/11-deployment.md). Until real credentials are present, uploads return `503` with a clear message rather than failing silently.
