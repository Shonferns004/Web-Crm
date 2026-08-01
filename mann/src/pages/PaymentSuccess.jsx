import { Link, useSearchParams } from "react-router-dom";
import Icon from "../components/Icon";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const amount = params.get("amount");
  const project = params.get("project") || "General";
  const paymentId = params.get("payment_id") || "—";

  return (
    <section className="py-14 px-6 lg:px-8 min-h-[70vh] flex items-center bg-surface">
      <div className="max-w-[550px] mx-auto w-full brutal-border-heavy bg-white brutal-shadow p-6 text-center">
        <Icon name="check" className="text-8xl text-primary mb-4 inline-flex brutal-border bg-primary-fixed rounded-full p-4" />
        <h1 className="font-display-lg text-5xl uppercase text-primary tracking-tight mb-2">
          Thank You!
        </h1>
        <p className="text-xl text-primary opacity-80 mb-5">Your donation has been received successfully.</p>

        <div className="brutal-border bg-surface-container-high p-6 text-left space-y-4 mb-5">
          <div className="flex justify-between items-center">
            <span className="text-base text-primary opacity-70">Donation Amount</span>
            <span className="font-display-lg text-2xl font-bold text-primary">
              ₹{amount ? Number(amount).toLocaleString("en-IN") : 0}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-base text-primary opacity-70">Project</span>
            <span className="font-bold text-primary">{project}</span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-base text-primary opacity-70">Payment ID</span>
            <span className="font-medium text-sm text-primary break-all">{paymentId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-base text-primary opacity-70">Status</span>
            <span className="font-bold text-green-700">
              <Icon name="check_circle" className="align-middle text-xl mr-1" />
              Completed
            </span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 font-label-bold text-sm uppercase tracking-[0.15em] brutal-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition"
          >
            <Icon name="home" className="text-xl" /> Go Home
          </Link>
          <Link
            to="/get-involved/donate-online"
            className="inline-flex items-center gap-2 brutal-border border-primary text-primary px-8 py-4 font-label-bold text-sm uppercase tracking-[0.15em] bg-white hover:bg-primary-fixed transition"
          >
            <Icon name="favorite" className="text-xl" /> Donate Again
          </Link>
        </div>
      </div>
    </section>
  );
}
