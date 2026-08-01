import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { img } from "../utils/images";

// ============ DONATE SECTION + RAZORPAY ============
// Original razorpay.js se convert kiya gaya.
const RAZORPAY_KEY = "rzp_live_T6FcPfo1mS01du";

const AMOUNTS = ["500", "1000", "2500", "5000"];
const PROJECT_OPTIONS = [
  "Project Poshan",
  "Project Gyaan",
  "Project Sakhi",
  "Project Swasth",
  "Project Pashu",
  "Project Paryavaran",
];

function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (typeof window.Razorpay !== "undefined") return resolve();
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = resolve;
    script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
    document.head.appendChild(script);
  });
}

const inputCls =
  "w-full rounded-xl border border-border-pink bg-pink-pale/50 px-4 py-3 text-ink placeholder:text-ink-soft focus:outline-none focus:border-pink-brand focus:ring-2 focus:ring-pink-light transition";

export default function DonateSection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("1000");
  const [custom, setCustom] = useState("");
  const [project, setProject] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDonate = async () => {
    setError("");
    const amount = Math.round(Number(custom || selected));
    if (!amount || Number(amount) <= 0) {
      setError("Please select or enter a valid amount.");
      return;
    }
    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter your first and last name.");
      return;
    }
    if (!/^\d{10}$/.test(contact)) {
      setError("Please enter a valid 10-digit contact number.");
      return;
    }

    try {
      setLoading(true);
      await loadRazorpayScript();

      const options = {
        key: RAZORPAY_KEY,
        amount: amount * 100,
        currency: "INR",
        name: "MANN CARE FOUNDATION",
        description: `Donation${project ? " for " + project : ""}`,
        image: img("/logo.png"),
        handler: (response) => {
          const params = new URLSearchParams({
            amount: String(amount),
            project: project || "General",
            payment_id: response.razorpay_payment_id,
          });
          navigate(`/payment-success?${params.toString()}`);
        },
        prefill: {
          name: `${firstName} ${lastName}`.trim(),
          contact,
        },
        notes: { project: project || "General" },
        theme: { color: "#e91e8c" },
        modal: { ondismiss: () => setLoading(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {
        setError("Payment failed: " + (response.error?.description || "Please try again."));
        setLoading(false);
      });
      rzp.open();
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="relative py-20 px-5" id="donate">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid lg:grid-cols-2 rounded-[32px] overflow-hidden shadow-pink-lg">
          {/* Left */}
          <div className="bg-gradient-to-br from-pink-brand to-pink-mid text-white p-10 lg:p-14">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-white/20 rounded-full px-4 py-1.5 mb-5">
              Make a Difference
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold leading-snug mb-4">
              Join Hands With
              <br />
              MANN CARE FOUNDATION
            </h2>
            <p className="text-white/90 mb-8">
              Become a reason someone lives with dignity, health, and hope. Every donation — big or
              small — creates a ripple of change that transforms lives.
            </p>
            <div className="space-y-3 text-sm font-medium">
              <p><i className="fas fa-shield-heart mr-3"></i>100% Transparent</p>
              <p><i className="fas fa-receipt mr-3"></i>Tax Benefits Available</p>
              <p><i className="fas fa-globe mr-3"></i>Nationwide Impact</p>
            </div>
          </div>

          {/* Right */}
          <div className="bg-white p-10 lg:p-14">
            <h3 className="font-display text-2xl font-bold mb-6">Choose Your Contribution</h3>

            <div className="grid grid-cols-4 gap-3 mb-4">
              {AMOUNTS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => { setSelected(a); setCustom(""); }}
                  className={`rounded-xl py-3 font-semibold border transition ${
                    selected === a && !custom
                      ? "bg-pink-brand text-white border-pink-brand shadow-pink-md"
                      : "border-border-pink text-ink-mid hover:border-pink-brand"
                  }`}
                >
                  ₹{Number(a).toLocaleString("en-IN")}
                </button>
              ))}
            </div>

           <input
 type="number"
 min="1"
 step="1"
 placeholder="Enter custom amount (₹)"
 value={custom}
 onChange={(e) => {
   setCustom(e.target.value);
   setSelected("");
 }}
 className={`${inputCls} mb-4`}
/>

            <label className="block text-sm font-semibold text-ink-mid mb-1.5">
              Choose Project (optional)
            </label>
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className={`${inputCls} mb-4`}
            >
              <option value="">-- All Projects --</option>
              {PROJECT_OPTIONS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="First Name *"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputCls}
                required
              />
              <input
                type="text"
                placeholder="Last Name *"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputCls}
                required
              />
            </div>
            <input
              type="tel"
              placeholder="Contact Number *"
              maxLength={10}
              value={contact}
              onChange={(e) => setContact(e.target.value.replace(/\D/g, ""))}
              className={`${inputCls} mb-4`}
              required
            />

            {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

            <button
              type="button"
              onClick={handleDonate}
              disabled={loading}
              className="w-full bg-pink-brand text-white rounded-full py-4 font-bold text-lg shadow-pink-md hover:bg-pink-mid hover:-translate-y-0.5 transition disabled:opacity-60"
            >
              {loading ? (
                <><i className="fas fa-spinner fa-spin mr-2"></i>Please wait...</>
              ) : (
                <><i className="fas fa-heart mr-2"></i>Donate Now</>
              )}
            </button>
            <p className="text-center text-xs text-ink-soft mt-3">
              Secured payment. Your trust is our priority.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
