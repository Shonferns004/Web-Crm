import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import SectionHead from "../../components/SectionHead";
import DonateSection from "../../components/DonateSection";
import Icon from "../../components/Icon";
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

const cardCls =
  "bg-white rounded-2xl border border-primary/5 shadow-[0_10px_30px_-5px_rgba(138,0,72,0.08)]";

export default function CorporatePartnership() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <PageHero desktop={img("/get-involved/hero2.jpeg")} mobile={img("/get-involved/mobile-slide2.jpeg")} alt="Corporate Partnership" />

      <section className="py-section-padding-mobile md:py-section-padding-desktop px-6 lg:px-8 bg-surface">
        <div className="max-w-[900px] mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-secondary-fixed text-primary font-label-bold text-xs uppercase tracking-widest rounded-full mb-6">
            CSR &amp; Collaboration
          </span>
          <h1 className="font-display-lg font-extrabold text-6xl md:text-8xl text-on-surface leading-[0.9] tracking-tighter uppercase mb-6">
            Corporate Partnership
          </h1>
          <p className="text-2xl md:text-3xl text-on-surface-variant">
            Partner with us to create sustainable social impact through CSR initiatives, community
            programs, and long-term development projects.
          </p>
        </div>
      </section>

      <section className="pb-24 px-6 lg:px-8 bg-surface">
        <div className="max-w-[850px] mx-auto">
          <Reveal>
            <div className={`${cardCls} p-6 md:p-12`}>
              <h2 className="font-display-lg font-extrabold text-4xl md:text-5xl uppercase text-on-surface tracking-tight mb-6">
                Why Partner With Us?
              </h2>
              <p className="flex items-start gap-4 text-lg md:text-xl text-on-surface-variant leading-relaxed">
                <Icon name="arrow_right_alt" className="text-primary mt-1 shrink-0" />
                MANN Care Foundation works at the grassroots level focusing on women, children,
                education, health, hygiene, animal welfare, and environment. Through corporate
                partnerships, we aim to scale impact and create measurable social change aligned with
                CSR goals.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-10 md:py-16 px-6 lg:px-8 bg-surface-container-low">
        <div className="max-w-[1100px] mx-auto">
          <SectionHead tag="CSR Focus Areas" title="Where You Can Contribute" />
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
                Benefits For Your Organization
              </h2>
              <div className="space-y-4">
                {benefits.map((b, i) => (
                  <div key={b.title} className="rounded-2xl border border-primary/5 overflow-hidden bg-white">
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left font-label-bold text-base uppercase tracking-[0.08em] text-on-surface bg-surface-container-high hover:bg-secondary-fixed transition"
                    >
                      <span>{b.title}</span>
                      <Icon name="expand_more" className={`text-primary transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-40 py-5 px-6" : "max-h-0"}`}>
                      <p className="text-base text-on-surface-variant leading-relaxed">{b.desc}</p>
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
              Let's Create Impact Together
            </h2>
            <p className="text-xl text-white/90">
              Partner with MANN Care Foundation for meaningful CSR collaboration.
            </p>
          </div>
          <Link
            to="/contact/get-in-touch"
            className="inline-flex items-center gap-3 bg-white text-primary font-label-bold text-base uppercase tracking-[0.15em] px-8 py-4 rounded-2xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] hover:scale-105 transition shrink-0"
          >
            <Icon name="handshake" />
            Become a Partner
          </Link>
        </div>
      </section>
    </>
  );
}
