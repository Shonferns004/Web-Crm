import { Link, useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const amount = params.get("amount");
  const project = params.get("project") || "General";
  const paymentId = params.get("payment_id") || "—";

  return (
    <section className="py-24 px-5 min-h-[70vh] flex items-center">
      <div className="max-w-[550px] mx-auto w-full bg-white rounded-[28px] border border-border-pink shadow-pink-lg p-10 text-center">
        <span className="h-20 w-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-brand to-pink-mid text-white text-3xl flex items-center justify-center shadow-pink-md">
          <i className="fas fa-check"></i>
        </span>
        <h1 className="font-display text-3xl font-bold mb-2">Thank You!</h1>
        <p className="text-ink-soft mb-8">Your donation has been received successfully.</p>

        <div className="bg-pink-pale rounded-2xl p-6 text-left space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-sm text-ink-soft">Donation Amount</span>
            <span className="font-display text-xl font-bold text-pink-brand">
              ₹{amount ? Number(amount).toLocaleString("en-IN") : 0}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-ink-soft">Project</span>
            <span className="font-semibold">{project}</span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-sm text-ink-soft">Payment ID</span>
            <span className="font-medium text-sm break-all">{paymentId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-ink-soft">Status</span>
            <span className="font-semibold text-green-600">
              <i className="fas fa-check-circle mr-1"></i>Completed
            </span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-pink-brand text-white px-6 py-3 rounded-full font-semibold shadow-pink-md hover:bg-pink-mid transition"
          >
            <i className="fas fa-home"></i> Go Home
          </Link>
          <Link
            to="/get-involved/donate-online"
            className="inline-flex items-center gap-2 border-2 border-pink-brand text-pink-brand px-6 py-3 rounded-full font-semibold hover:bg-pink-pale transition"
          >
            <i className="fas fa-heart"></i> Donate Again
          </Link>
        </div>
      </div>
    </section>
  );
}
