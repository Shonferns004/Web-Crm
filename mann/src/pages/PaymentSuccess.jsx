import { Link, useSearchParams } from "react-router-dom";
import Icon from "../components/Icon";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const amount = params.get("amount");
  const project = params.get("project") || "General";
  const paymentId = params.get("payment_id") || "—";

  return (
    <section className="py-section-padding-mobile md:py-section-padding-desktop px-6 lg:px-8 min-h-[70vh] flex items-center bg-surface">
      <div className="max-w-[550px] mx-auto w-full bg-white rounded-[2rem] border border-primary/5 shadow-[0_10px_30px_-5px_rgba(138,0,72,0.08)] p-6 text-center">
        <Icon name="check" className="text-7xl text-primary mb-4 inline-flex bg-secondary-fixed rounded-full p-5" />
        <h1 className="font-display-lg font-extrabold text-5xl uppercase text-on-surface tracking-tight mb-2">
          Thank You!
        </h1>
        <p className="text-xl text-on-surface-variant mb-5">Your donation has been received successfully.</p>

        <div className="rounded-2xl bg-surface-container-low p-6 text-left space-y-4 mb-5">
          <div className="flex justify-between items-center">
            <span className="text-base text-on-surface-variant">Donation Amount</span>
            <span className="font-display-lg text-2xl font-bold text-primary">
              ₹{amount ? Number(amount).toLocaleString("en-IN") : 0}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-base text-on-surface-variant">Project</span>
            <span className="font-bold text-on-surface">{project}</span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-base text-on-surface-variant">Payment ID</span>
            <span className="font-medium text-sm text-on-surface-variant break-all">{paymentId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-base text-on-surface-variant">Status</span>
            <span className="font-bold text-green-700">
              <Icon name="check_circle" className="align-middle text-xl mr-1" />
              Completed
            </span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 font-label-bold text-sm uppercase tracking-[0.15em] rounded-2xl shadow-[0_10px_30px_-5px_rgba(138,0,72,0.4)] hover:bg-primary-container hover:scale-[1.02] transition"
          >
            <Icon name="home" className="text-xl" /> Go Home
          </Link>
          <Link
            to="/get-involved/donate-online"
            className="inline-flex items-center gap-2 border border-primary/20 text-primary px-8 py-4 font-label-bold text-sm uppercase tracking-[0.15em] bg-white rounded-2xl hover:bg-secondary-fixed transition"
          >
            <Icon name="favorite" className="text-xl" /> Donate Again
          </Link>
        </div>
      </div>
    </section>
  );
}
