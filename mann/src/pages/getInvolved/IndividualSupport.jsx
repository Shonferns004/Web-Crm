import { useState } from "react";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import SectionHead from "../../components/SectionHead";
import DonateSection from "../../components/DonateSection";
import Icon from "../../components/Icon";
import { img } from "../../utils/images";

const areas = [
  { icon: "👶", title: "Child Education", desc: "Support school fees, kits, books & learning resources." },
  { icon: "🍲", title: "Nutrition Support", desc: "Provide meals and essential food support to needy families." },
  { icon: "🧕", title: "Women Support", desc: "Empower women with skills, hygiene and livelihood support." },
  { icon: "🏥", title: "Medical Help", desc: "Assist in treatment, medicines and healthcare needs." },
  { icon: "🐾", title: "Animal Care", desc: "Support rescue, feeding and treatment of animals." },
  { icon: "🏠", title: "Emergency Help", desc: "Help families in crisis situations and urgent needs." },
];

const steps = [
  { title: "1. Choose support category", desc: "Select the area you want to support — education, nutrition, healthcare, or any cause close to your heart." },
  { title: "2. Make contribution", desc: "Complete your secure donation online via UPI, card, or net banking. Every contribution counts." },
  { title: "3. We assign real beneficiary", desc: "We identify and assign a verified beneficiary who needs support in your chosen category." },
  { title: "4. Support is delivered on ground", desc: "Your contribution is delivered directly to the beneficiary through our field programs." },
  { title: "5. You receive updates/report", desc: "We share updates, photos, and impact reports so you can see the change you made." },
];

const cardCls =
  "bg-white rounded-2xl border border-primary/5 shadow-[0_10px_30px_-5px_rgba(138,0,72,0.08)]";

export default function IndividualSupport() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <PageHero desktop={img("/get-involved/hero1.jpeg")} mobile={img("/get-involved/mobile-slide1.jpeg")} alt="Individual Support" />

      <section className="py-section-padding-mobile md:py-section-padding-desktop px-6 lg:px-8 bg-surface">
        <div className="max-w-[900px] mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-secondary-fixed text-primary font-label-bold text-xs uppercase tracking-widest rounded-full mb-6">
            Together we can, we will...
          </span>
          <h1 className="font-display-lg font-extrabold text-6xl md:text-8xl text-on-surface leading-[0.9] tracking-tighter uppercase mb-6">
            Individual Support
          </h1>
          <p className="text-2xl md:text-3xl text-on-surface-variant">
            Support one life, change one future. Direct impact, real change, real people.
          </p>
        </div>
      </section>

      <section className="pb-24 px-6 lg:px-8 bg-surface">
        <div className="max-w-[850px] mx-auto">
          <Reveal>
            <div className={`${cardCls} p-6 md:p-12`}>
              <h2 className="font-display-lg font-extrabold text-4xl md:text-5xl uppercase text-on-surface tracking-tight mb-6">
                What is Individual Support?
              </h2>
              <p className="flex items-start gap-4 text-lg md:text-xl text-on-surface-variant leading-relaxed">
                <Icon name="arrow_right_alt" className="text-primary mt-1 shrink-0" />
                Individual Support is a transparent way of helping a specific child, woman, family, or
                animal directly. Your contribution goes toward real people in need through structured
                programs like education, food, healthcare, empowerment, and emergency support.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-10 md:py-16 px-6 lg:px-8 bg-surface-container-low">
        <div className="max-w-[1100px] mx-auto">
          <SectionHead tag="Choose Impact Area" title="What You Can Support" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {areas.map((a, i) => (
              <Reveal key={a.title} delay={i * 60}>
                <div className={`${cardCls} p-8 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(138,0,72,0.14)] transition-all h-full text-center`}>
                  <span className="text-5xl block mb-5">{a.icon}</span>
                  <h3 className="font-display-lg font-bold text-2xl uppercase text-on-surface tracking-tight mb-3">
                    {a.title}
                  </h3>
                  <p className="text-base text-on-surface-variant">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-section-padding-mobile md:py-section-padding-desktop px-6 lg:px-8 bg-surface">
        <div className="max-w-[850px] mx-auto">
          <Reveal>
            <div className={`${cardCls} p-6 md:p-12`}>
              <h2 className="font-display-lg font-extrabold text-4xl md:text-5xl uppercase text-on-surface tracking-tight mb-5">
                How It Works
              </h2>
              <div className="space-y-4">
                {steps.map((s, i) => (
                  <div key={s.title} className="rounded-2xl border border-primary/5 overflow-hidden bg-white">
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left font-label-bold text-base uppercase tracking-[0.08em] text-on-surface bg-surface-container-high hover:bg-secondary-fixed transition"
                    >
                      <span>{s.title}</span>
                      <Icon name="expand_more" className={`text-primary transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-40 py-5 px-6" : "max-h-0"}`}>
                      <p className="text-base text-on-surface-variant leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <DonateSection />

      <section className="py-10 md:py-16 px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display-lg font-extrabold text-5xl md:text-6xl uppercase tracking-tight mb-4">
              Be Someone's Hope Today
            </h2>
            <p className="text-xl text-white/90">Join us in creating real change, one life at a time.</p>
          </div>
          <a
            href="#donate"
            className="inline-flex items-center gap-3 bg-white text-primary font-label-bold text-base uppercase tracking-[0.15em] px-8 py-4 rounded-2xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] hover:scale-105 transition shrink-0"
          >
            <Icon name="favorite" />
            Support Now
          </a>
        </div>
      </section>
    </>
  );
}
