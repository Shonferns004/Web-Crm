import { useState } from "react";
import PageHero from "../../components/PageHero";
import { img } from "../../utils/images";

const points = [
  { icon: "🌸", title: "Purpose Driven Work", desc: "Make a real difference through projects that transform lives." },
  { icon: "📚", title: "Growth & Learning", desc: "Gain valuable experience while working on impactful initiatives." },
  { icon: "🤝", title: "Collaborative Culture", desc: "Work alongside passionate people who care about social change." },
  { icon: "❤️", title: "Meaningful Impact", desc: "Your work directly contributes to stronger communities." },
];

export default function Career() {
  const [submitted, setSubmitted] = useState(false);
  const inputCls =
    "w-full rounded-xl border border-border-pink bg-pink-pale/50 px-4 py-3 text-ink placeholder:text-ink-soft focus:outline-none focus:border-pink-brand focus:ring-2 focus:ring-pink-light transition";

  return (
    <>
      <PageHero desktop={img("/get-involved/hero4.jpeg")} mobile={img("/get-involved/mobile-slide4.jpeg")} alt="Careers" className="h-[70vh] md:h-[85vh]" />

      <section className="py-16 px-5 text-center">
        <div className="max-w-[850px] mx-auto">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-brand bg-pink-light rounded-full px-4 py-1.5 mb-5">
            JOIN OUR TEAM
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Turn Your Passion Into Impact
          </h1>
          <p className="text-lg text-ink-soft">
            Join MANN CARE FOUNDATION and become part of a mission dedicated to empowering women,
            educating children, promoting health, and creating lasting change in communities across
            India.
          </p>
        </div>
      </section>

      <section className="py-12 px-5 bg-pink-pale/60">
        <div className="max-w-[1150px] mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-pink-brand">
              CAREERS AT MANN CARE FOUNDATION
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-5">
              Build a Career That <span className="gradient-text">Creates Impact</span>
            </h2>
            <p className="text-ink-soft mb-8">
              At MANN CARE FOUNDATION, every role contributes to creating meaningful change in the
              lives of women, children, and communities in need. Join a team that works with
              compassion, purpose, and dedication to build a better tomorrow.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {points.map((pt) => (
                <div key={pt.title} className="bg-white rounded-2xl border border-border-pink p-5 shadow-pink-sm">
                  <h3 className="font-bold mb-1.5">{pt.icon} {pt.title}</h3>
                  <p className="text-sm text-ink-soft">{pt.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[28px] border border-border-pink p-8 md:p-10 shadow-pink-lg">
            {submitted ? (
              <div className="text-center py-10">
                <i className="fas fa-check-circle text-5xl text-pink-brand mb-4"></i>
                <h2 className="font-display text-2xl font-bold mb-2">Application Sent!</h2>
                <p className="text-ink-soft">Thank you for applying. We will contact you soon.</p>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl font-bold mb-1">Apply Now</h2>
                <p className="text-sm text-ink-soft mb-6">
                  Take the first step towards a meaningful career.
                </p>
                <div className="space-y-4">
                  <input type="text" placeholder="Your Full Name" className={inputCls} required />
                  <input type="email" placeholder="Email Address" className={inputCls} required />
                  <input type="tel" placeholder="Phone Number" className={inputCls} required />
                  <textarea rows={5} placeholder="Tell us about yourself" className={inputCls}></textarea>
                  <button
                    type="button"
                    onClick={() => setSubmitted(true)}
                    className="w-full bg-pink-brand text-white rounded-full py-3.5 font-bold shadow-pink-md hover:bg-pink-mid transition"
                  >
                    Send Application
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
