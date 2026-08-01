const RAZORPAY_KEY_ID = 'rzp_live_StUN8QoR2STezo';

function donateWithRazorpay({ amount, name, email, phone, description, mission }) {
  if (!amount || parseFloat(amount) <= 0) { alert('Please enter a valid amount.'); return; }
  if (!name || !name.trim()) { alert('Please enter your name.'); return; }
  if (!email || !email.trim()) { alert('Please enter your email.'); return; }
  if (!phone || !phone.trim()) { alert('Please enter your phone number.'); return; }

  const amt = Math.round(parseFloat(amount) * 100);

  const options = {
    key: RAZORPAY_KEY_ID,
    amount: amt,
    currency: 'INR',
    name: 'Being Sevak Charitable Trust',
    description: description || 'Donation',
    image: '../logo11.png',
    handler: function (response) {
      const base = window.location.pathname.includes('/donations/') ? '../payment/success.html' : 'payment/success.html';
      window.location.href = base + '?payment_id=' + response.razorpay_payment_id + '&amount=' + amount + '&name=' + encodeURIComponent(name);
    },
    prefill: {
      name: name,
      email: email,
      contact: phone
    },
    notes: {
      mission: mission || 'General'
    },
    theme: {
      color: '#315371'
    }
  };

  const rzp = new Razorpay(options);
  rzp.on('payment.failed', function (response) {
    const base = window.location.pathname.includes('/donations/') ? '../payment/failure.html' : 'payment/failure.html';
    window.location.href = base + '?error=' + encodeURIComponent(response.error.description);
  });
  rzp.open();
}
