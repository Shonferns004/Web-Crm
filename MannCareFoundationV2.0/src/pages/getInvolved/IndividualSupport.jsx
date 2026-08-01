import { useState } from "react";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import DonateSection from "../../components/DonateSection";
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

export default function IndividualSupport() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);
  return (
    <>
      <PageHero desktop={img("/get-involved/hero1.jpeg")} mobile={img("/get-involved/mobile-slide1.jpeg")} alt="Individual Support" className="h-[70vh] md:h-[85vh]" />

      <section className="py-16 px-5 text-center">
        <div className="max-w-[850px] mx-auto">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-brand bg-pink-light rounded-full px-4 py-1.5 mb-5">
            Together we can, we will...
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Individual Support</h1>
          <p className="text-lg text-ink-soft">
            Support one life, change one future. Direct impact, real change, real people.
          </p>
        </div>
      </section>

      <section className="py-8 px-5">
        <div className="max-w-[850px] mx-auto">
          <Reveal>
            <div className="bg-white rounded-[28px] border border-border-pink p-8 md:p-12 shadow-pink-lg">
              <h2 className="font-display text-3xl font-bold mb-4 text-center">What is Individual Support?</h2>
              <p className="text-ink-soft group flex items-start gap-3">
                <i className="fas fa-arrow-right mt-1.5 shrink-0 text-pink-brand opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"></i>
                <span>Individual Support is a transparent way of helping a specific child, woman, family, or animal directly. Your contribution goes toward real people in need through structured programs like education, food, healthcare, empowerment, and emergency support.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 px-5 bg-pink-pale/60">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-brand bg-pink-light rounded-full px-4 py-1.5 mb-4">
              Choose Impact Area
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold">What You Can Support</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((a, i) => (
              <Reveal key={a.title} delay={i * 60}>
                <div className="bg-white rounded-[24px] border border-border-pink p-7 text-center shadow-pink-sm hover:-translate-y-2 hover:shadow-pink-lg transition-all h-full">
                  <span className="text-4xl block mb-4">{a.icon}</span>
                  <h3 className="font-display font-bold mb-2">{a.title}</h3>
                  <p className="text-sm text-ink-soft">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-5">
        <div className="max-w-[850px] mx-auto">
          <Reveal>
            <div className="bg-white rounded-[28px] border border-border-pink p-8 md:p-12 shadow-pink-lg">
              <h2 className="font-display text-3xl font-bold mb-6">How It Works</h2>
              <div className="space-y-3">
                {steps.map((s, i) => (
                  <div key={s.title} className="border border-border-pink rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-ink-mid bg-pink-pale hover:bg-pink-light transition"
                    >
                      <span>{s.title}</span>
                      <i className={`fas fa-chevron-down text-pink-brand transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}></i>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-40 py-4 px-5" : "max-h-0"}`}
                    >
                      <p className="text-sm text-ink-soft">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <DonateSection />

      <section className="py-5 px-5 min-h-[15vh] bg-gradient-to-br from-pink-brand to-pink-mid text-white">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Be Someone's Hope Today</h2>
            <p className="text-white/90">Join us in creating real change, one life at a time.</p>
          </div>
          <a href="#donate" className="inline-flex items-center gap-2 bg-white text-pink-brand px-8 py-3.5 rounded-full font-bold shadow-lg hover:-translate-y-0.5 transition shrink-0">
            Support Now
          </a>
        </div>
      </section>
    </>
  );
}
