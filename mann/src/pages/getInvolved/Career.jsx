import { useState } from "react";
import PageHero from "../../components/PageHero";
import SectionHead from "../../components/SectionHead";
import Icon from "../../components/Icon";
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
    "w-full brutal-border p-5 text-lg bg-white focus:bg-primary-fixed outline-none transition-colors border-primary placeholder:text-primary/40";

  return (
    <>
      <PageHero desktop={img("/get-involved/hero4.jpeg")} mobile={img("/get-involved/mobile-slide4.jpeg")} alt="Careers" />

      <section className="py-14 md:py-14 px-6 lg:px-8 bg-surface">
        <div className="max-w-[900px] mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-primary text-white font-label-bold text-xs uppercase tracking-[0.2em] mb-6">
            Join Our Team
          </span>
          <h1 className="font-display-lg text-6xl md:text-8xl text-primary leading-[0.9] tracking-tighter uppercase mb-6">
            Turn Your Passion Into Impact
          </h1>
          <p className="text-2xl md:text-3xl text-primary">
            Join MANN CARE FOUNDATION and become part of a mission dedicated to empowering women,
            educating children, promoting health, and creating lasting change in communities across
            India.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-14 px-6 lg:px-8 bg-surface-container-low">
        <div className="max-w-[1150px] mx-auto grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <SectionHead tag="Careers at MANN CARE FOUNDATION" title="Build a Career That Creates Impact" align="left" />
            <p className="text-xl text-primary mb-6">
              At MANN CARE FOUNDATION, every role contributes to creating meaningful change in the
              lives of women, children, and communities in need. Join a team that works with
              compassion, purpose, and dedication to build a better tomorrow.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {points.map((pt) => (
                <div key={pt.title} className="brutal-border-heavy bg-white p-6 brutal-shadow-sm hover:-translate-y-2 transition-all">
                  <span className="text-3xl block mb-3">{pt.icon}</span>
                  <h3 className="font-label-bold text-base uppercase tracking-[0.08em] text-primary mb-2">
                    {pt.title}
                  </h3>
                  <p className="text-sm text-primary opacity-80">{pt.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="brutal-border-heavy bg-white brutal-shadow p-8 md:p-12">
            {submitted ? (
              <div className="text-center py-10">
                <Icon name="check_circle" className="text-7xl text-primary mb-4" />
                <h2 className="font-display-lg text-4xl uppercase text-primary tracking-tight mb-2">
                  Application Sent!
                </h2>
                <p className="text-lg text-primary opacity-80">
                  Thank you for applying. We will contact you soon.
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-display-lg text-4xl uppercase text-primary tracking-tight mb-2">
                  Apply Now
                </h2>
                <p className="text-lg text-primary opacity-80 mb-5">
                  Take the first step towards a meaningful career.
                </p>
                <div className="space-y-5">
                  <input type="text" placeholder="Your Full Name" className={inputCls} required />
                  <input type="email" placeholder="Email Address" className={inputCls} required />
                  <input type="tel" placeholder="Phone Number" className={inputCls} required />
                  <textarea rows={5} placeholder="Tell us about yourself" className={inputCls}></textarea>
                  <button
                    type="button"
                    onClick={() => setSubmitted(true)}
                    className="w-full bg-primary text-white py-5 font-label-bold text-lg uppercase tracking-widest brutal-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition"
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
