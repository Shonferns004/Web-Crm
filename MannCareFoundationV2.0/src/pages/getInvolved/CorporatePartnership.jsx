import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import DonateSection from "../../components/DonateSection";
import { img } from "../../utils/images";

const areas = [
  { icon: "📚", title: "Education CSR", desc: "School kits, digital learning, scholarships, and skill development." },
  { icon: "🍲", title: "Nutrition Programs", desc: "Food distribution, hunger relief, and malnutrition support." },
  { icon: "🩺", title: "Health Initiatives", desc: "Medical camps, hygiene awareness, and healthcare support." },
  { icon: "👩", title: "Women Empowerment", desc: "Skill training, livelihood programs, and self-reliance support." },
  { icon: "🌳", title: "Environment CSR", desc: "Tree plantation, waste management, and sustainability drives." },
  { icon: "🐾", title: "Animal Welfare", desc: "Feeding, rescue, and medical support for animals in need." },
];

const benefits = [
  { title: "CSR compliance & reporting support", desc: "We provide complete documentation and reporting to meet your CSR compliance requirements with transparency." },
  { title: "Transparent impact documentation", desc: "Get detailed impact reports with data, photos, and stories showing the real difference your partnership makes." },
  { title: "Brand visibility in social initiatives", desc: "Your brand gets recognized across our campaigns, events, and communication channels as a socially responsible partner." },
  { title: "Community engagement opportunities", desc: "Engage your employees in meaningful volunteering activities and on-ground visits to witness impact firsthand." },
  { title: "Long-term partnership model", desc: "Build a sustainable, long-term collaboration that evolves with your CSR goals and creates lasting community impact." },
];

export default function CorporatePartnership() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);
  return (
    <>
      <PageHero desktop={img("/get-involved/hero2.jpeg")} mobile={img("/get-involved/mobile-slide2.jpeg")} alt="Corporate Partnership" className="h-[70vh] md:h-[85vh]" />

      <section className="py-16 px-5 text-center">
        <div className="max-w-[850px] mx-auto">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-brand bg-pink-light rounded-full px-4 py-1.5 mb-5">
            CSR &amp; Collaboration
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Corporate Partnership</h1>
          <p className="text-lg text-ink-soft">
            Partner with us to create sustainable social impact through CSR initiatives, community
            programs, and long-term development projects.
          </p>
        </div>
      </section>

      <section className="py-8 px-5">
        <div className="max-w-[850px] mx-auto">
          <Reveal>
            <div className="bg-white rounded-[28px] border border-border-pink p-8 md:p-12 shadow-pink-lg">
              <h2 className="font-display text-3xl font-bold mb-4 text-center">Why Partner With Us?</h2>
              <p className="text-ink-soft group flex items-start gap-3">
                <i className="fas fa-arrow-right mt-1.5 shrink-0 text-pink-brand opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"></i>
                <span>MANN Care Foundation works at the grassroots level focusing on women, children, education, health, hygiene, animal welfare, and environment. Through corporate partnerships, we aim to scale impact and create measurable social change aligned with CSR goals.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 px-5 bg-pink-pale/60">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-brand bg-pink-light rounded-full px-4 py-1.5 mb-4">
              CSR Focus Areas
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Where You Can Contribute</h2>
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
              <h2 className="font-display text-3xl font-bold mb-6">Benefits For Your Organization</h2>
              <div className="space-y-3">
                {benefits.map((b, i) => (
                  <div key={b.title} className="border border-border-pink rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-ink-mid bg-pink-pale hover:bg-pink-light transition"
                    >
                      <span>{b.title}</span>
                      <i className={`fas fa-chevron-down text-pink-brand transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}></i>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-40 py-4 px-5" : "max-h-0"}`}
                    >
                      <p className="text-sm text-ink-soft">{b.desc}</p>
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
            <h2 className="font-display text-3xl md:text-4xl font-bold">Let's Create Impact Together</h2>
            <p className="text-white/90">Partner with MANN Care Foundation for meaningful CSR collaboration.</p>
          </div>
          <Link
            to="/contact/get-in-touch"
            className="inline-flex items-center gap-2 bg-white text-pink-brand px-8 py-3.5 rounded-full font-bold shadow-lg hover:-translate-y-0.5 transition shrink-0"
          >
            Become a Partner
          </Link>
        </div>
      </section>
    </>
  );
}
