import { useState } from "react";
import "./Donate.css";

const RAZORPAY_TEST_KEY = "rzp_live_T1vEMMkRqw3jrw";

const causeIcons = {
  education: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  women: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      <path d="M9 22v-4l-3-3 1-4" />
      <path d="M15 22v-4l3-3-1-4" />
      <path d="M12 11v5" />
    </svg>
  ),
  food: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <path d="M6 1v3M10 1v3M14 1v3" />
    </svg>
  ),
  medical: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  oldage: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  ashra: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
};

const causes = [
  {
    id: "education",
    label: "Education",
    icon: causeIcons.education,
    color: "#4a6fa5",
    title: "Support Education for Every Child",
    description:
      "Your donation helps provide quality education, school supplies, and learning opportunities to underprivileged children. Every child deserves access to knowledge and the chance to build a brighter future.",
    impact: [
      { emoji: "📚", text: "School supplies for 10 children" },
      { emoji: "🎒", text: "Backpacks & learning materials" },
      { emoji: "🏫", text: "Support after-school programs" },
    ],
    stats: { label: "Children Educated", value: "500+" },
  },
  {
    id: "women",
    label: "Women Empowerment",
    icon: causeIcons.women,
    color: "#e8485b",
    title: "Empower Women, Transform Lives",
    description:
      "Help us empower women with skills training, livelihood opportunities, and confidence to lead independent and dignified lives. Your support creates ripples of change that transform entire communities.",
    impact: [
      { emoji: "💼", text: "Vocational skills training" },
      { emoji: "💪", text: "Financial independence workshops" },
      { emoji: "🌟", text: "Leadership & confidence building" },
    ],
    stats: { label: "Women Empowered", value: "300+" },
  },
  {
    id: "food",
    label: "Food Kit",
    icon: causeIcons.food,
    color: "#f59e0b",
    title: "Fight Hunger, Provide Nourishment",
    description:
      "Your contribution provides nutritious food kits to families struggling with hunger and food insecurity. No one should sleep hungry — together we can ensure every family has a meal.",
    impact: [
      { emoji: "🍚", text: "Rice, dal & staple food supplies" },
      { emoji: "🥛", text: "Milk & nutrition for children" },
      { emoji: "📦", text: "Monthly food kit distribution" },
    ],
    stats: { label: "Families Fed", value: "1000+" },
  },
  {
    id: "medical",
    label: "Medical",
    icon: causeIcons.medical,
    color: "#10b981",
    title: "Save Lives with Critical Medical Care",
    description:
      "Support life-saving surgeries, medical treatments, and healthcare access for children and individuals who cannot afford care. Every heartbeat counts — your donation can save a life.",
    impact: [
      { emoji: "🏥", text: "Life-saving surgeries" },
      { emoji: "💊", text: "Essential medicines & treatments" },
      { emoji: "❤️", text: "Critical care for children" },
    ],
    stats: { label: "Lives Saved", value: "200+" },
  },
  {
    id: "oldage",
    label: "Old Age Home (Sahara)",
    icon: causeIcons.oldage,
    color: "#8b5cf6",
    title: "Give Dignity to Our Elders",
    description:
      "Your donation helps provide care, companionship, food, and medical support to elderly individuals in old-age homes. Help us ensure our seniors live their golden years with dignity and respect.",
    impact: [
      { emoji: "🏠", text: "Shelter & safe accommodation" },
      { emoji: "🍲", text: "Nutritious meals daily" },
      { emoji: "🎂", text: "Celebrations & companionship" },
    ],
    stats: { label: "Elders Cared For", value: "150+" },
  },
  {
    id: "ashra",
    label: "Project Ashra",
    icon: causeIcons.ashra,
    color: "#06b6d4",
    title: "Empower a Child Through Education",
    description:
      "Your donation supports Project Ashra — a haven of free education for underprivileged children. We provide shelter, school supplies, and a nurturing environment where every child gets the chance to learn, grow, and dream of a brighter future.",
    impact: [
      { emoji: "📖", text: "Free education for orphaned children" },
      { emoji: "🎒", text: "School bags & stationery supplies" },
      { emoji: "🏡", text: "Safe shelter & nurturing care" },
    ],
    stats: { label: "Children Supported", value: "200+" },
  },
];

const amounts = [
  { value: 500, label: "₹500", desc: "Provides meals for a week" },
  { value: 1000, label: "₹1,000", desc: "School supplies for a child" },
  { value: 2000, label: "₹2,000", desc: "Medical checkup for 5 kids" },
  { value: 5000, label: "₹5,000", desc: "Food kit for 10 families" },
];

export default function Donate() {
  const [activeTab, setActiveTab] = useState(causes[0].id);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [hoveredCause, setHoveredCause] = useState(null);

  const cause = causes.find((c) => c.id === activeTab);

  const handleAmountClick = (amt) => {
    setSelectedAmount(amt);
    setCustomAmount("");
  };

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getAmount = () => {
    if (customAmount) return parseInt(customAmount, 10);
    if (selectedAmount) return selectedAmount;
    return 0;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const amount = getAmount();
    if (!amount || amount < 1) return;

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Failed to load payment gateway. Please try again.");
      return;
    }

    const options = {
      key: RAZORPAY_TEST_KEY,
      amount: amount * 100,
      currency: "INR",
      name: "Ashray for Life Foundation",
      description: `Donation for ${cause.label}`,
      image: "/images/Ashray Foundation logo.png",
      prefill: {
        name: form.name || "Donor",
        email: form.email || "donor@example.com",
        contact: form.phone || "9999999999",
      },
      notes: {
        cause: cause.label,
        message: form.message || "",
      },
      theme: { color: "#4a6fa5" },
      handler: function () {
        setSubmitted(true);
      },
      modal: {
        ondismiss: function () {},
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (submitted) {
    return (
      <div className="donate-page">
      {/* <section className="bsct-home-hero-section">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/banner-mobile7.png" />
          <img src="/images/banner.jpg" alt="Donate" />
        </picture>
      </section> */}
      <section className="donate-hero">
        <div className="container">
          <h1>Donate</h1>
          <p>Your generosity makes our work possible. Thank you!</p>
        </div>
      </section>
        <section className="container">
          <div className="donate-success">
            <div className="donate-success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#4a6fa5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2>Thank You for Your Donation!</h2>
            <p>Your support helps us continue our mission. A confirmation email will be sent to you shortly.</p>
            <button className="donate-btn" onClick={() => { setSubmitted(false); setSelectedAmount(null); setCustomAmount(""); setForm({ name: "", email: "", phone: "", message: "" }); }}>
              Make Another Donation
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="donate-page">
      {/* <section className="bsct-home-hero-section">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/banner-mobile7.png" />
          <img src="/images/banner.jpg" alt="Donate" />
        </picture>
      </section> */}
      <section className="donate-hero">
        <div className="container">
          <h1>Donate</h1>
          <p>Your generosity helps us create lasting change in the lives of those who need it most.</p>
        </div>
      </section>

      <section className="donate-main">
        <div className="container">
          <div className="donate-tabs">
            {causes.map((c) => (
              <button
                key={c.id}
                className={`donate-tab ${activeTab === c.id ? "active" : ""}`}
                onClick={() => setActiveTab(c.id)}
                onMouseEnter={() => setHoveredCause(c.id)}
                onMouseLeave={() => setHoveredCause(null)}
              >
                <span className="donate-tab-icon">{c.icon}</span>
                <span className="donate-tab-label">{c.label}</span>
              </button>
            ))}
          </div>

          <div className="donate-content">
            <div className="donate-info">
              <div className="donate-info-header" style={{ borderBottomColor: cause.color }}>
                <div className="donate-info-icon" style={{ background: cause.color }}>
                  {cause.icon}
                </div>
                <div>
                  <span className="donate-info-badge" style={{ background: cause.color }}>Support This Cause</span>
                  <h2>{cause.title}</h2>
                </div>
              </div>

              <p className="donate-info-desc">{cause.description}</p>

              <div className="donate-impact-list">
                <h4>Your donation will help:</h4>
                <ul>
                  {cause.impact.map((item, i) => (
                    <li key={i}>
                      <span className="impact-emoji">{item.emoji}</span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="donate-stats-card">
                <span className="donate-stats-value">{cause.stats.value}</span>
                <span className="donate-stats-label">{cause.stats.label}</span>
              </div>
            </div>

            <form className="donate-form" onSubmit={handlePayment}>
              <h3>Choose Your Amount</h3>
              <div className="donate-amounts">
                {amounts.map((amt) => (
                  <button
                    key={amt.value}
                    type="button"
                    className={`donate-amount-btn ${selectedAmount === amt.value ? "active" : ""}`}
                    onClick={() => handleAmountClick(amt.value)}
                  >
                    <span className="donate-amount-value">{amt.label}</span>
                    <span className="donate-amount-desc">{amt.desc}</span>
                  </button>
                ))}
                <div className="donate-custom-amount">
                  <span className="donate-amount-value">Custom</span>
                  <div className="donate-custom-input-wrap">
                    <span className="donate-currency">₹</span>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={handleCustomChange}
                    />
                  </div>
                </div>
              </div>

              <h3>Your Details</h3>
              <div className="donate-form-row">
                <div className="donate-form-group">
                  <label htmlFor="name">Full Name</label>
                  <input id="name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleFormChange} required />
                </div>
                <div className="donate-form-group">
                  <label htmlFor="email">Email Address</label>
                  <input id="email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleFormChange} required />
                </div>
              </div>
              <div className="donate-form-group">
                <label htmlFor="phone">Phone Number</label>
                <input id="phone" name="phone" type="tel" placeholder="+91 99999 99999" value={form.phone} onChange={handleFormChange} />
              </div>
              <div className="donate-form-group">
                <label htmlFor="message">Message (Optional)</label>
                <textarea id="message" name="message" rows="3" placeholder="Write a message..." value={form.message} onChange={handleFormChange}></textarea>
              </div>

              <button type="submit" className="donate-submit" disabled={!getAmount() || getAmount() < 1}>
                {getAmount() ? <>Donate ₹{getAmount().toLocaleString()}</> : "Select an Amount"}
              </button>

              <p className="donate-secure">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Secure payment via Razorpay
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
