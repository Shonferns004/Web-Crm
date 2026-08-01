import { useParams, Link, Navigate } from "react-router-dom";
import { projects } from "../../data/projects";
import PageHero from "../../components/PageHero";
import SectionHead from "../../components/SectionHead";
import Reveal from "../../components/Reveal";
import Icon from "../../components/Icon";

const cardCls =
  "bg-white rounded-2xl border border-primary/5 shadow-[0_10px_30px_-5px_rgba(138,0,72,0.08)]";

export default function ProjectDetail() {
  const { slug } = useParams();
  const p = projects.find((x) => x.slug === slug?.toLowerCase());

  if (!p) return <Navigate to="/" replace />;

  return (
    <>
      <PageHero desktop={p.heroImg} mobile={p.heroImgMobile} alt={p.name} title={p.name} />

      {/* HERO */}
      <section className="py-section-padding-mobile md:py-section-padding-desktop px-6 lg:px-8 bg-surface">
        <div className="max-w-[900px] mx-auto text-center space-y-8">
          <span className="inline-block px-4 py-1.5 bg-secondary-fixed text-primary font-label-bold text-xs uppercase tracking-widest rounded-full">
            {p.badge}
          </span>
          <h1 className="font-display-lg font-extrabold text-5xl md:text-8xl text-on-surface leading-[0.9] tracking-tighter uppercase">
            {p.name}
          </h1>
          <p className="text-2xl md:text-3xl text-on-surface-variant leading-snug">{p.subtitle}</p>

          <Reveal>
            <div className={`${cardCls} p-6 md:p-8 text-left`}>
              <h2 className="font-display-lg font-extrabold text-3xl md:text-4xl uppercase text-on-surface tracking-tight mb-6">
                {p.card.title}
              </h2>
              <p className="flex items-start gap-4 text-lg md:text-xl text-on-surface-variant leading-relaxed">
                <Icon name="arrow_right_alt" className="text-primary mt-1 shrink-0" />
                {p.card.text}
              </p>
              <a
                href="#pp-impact"
                className="inline-flex items-center gap-3 mt-10 bg-primary text-white font-label-bold text-sm uppercase tracking-[0.15em] px-8 py-4 rounded-2xl shadow-[0_10px_30px_-5px_rgba(138,0,72,0.4)] hover:bg-primary-container hover:scale-[1.02] transition-all"
              >
                Explore Impact
                <Icon name="arrow_forward" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-10 md:py-16 px-6 lg:px-8 bg-surface-container-low">
        <div className="max-w-[1000px] mx-auto">
          <SectionHead tag="About The Initiative" title={p.aboutHeading} />
          <div className="grid md:grid-cols-2 gap-10">
            <Reveal>
              <div className={`${cardCls} p-8 hover:-translate-y-2 transition-all h-full`}>
                <Icon name="track_changes" className="text-6xl text-primary block mb-5" />
                <h3 className="font-display-lg font-extrabold text-3xl uppercase text-on-surface tracking-tight mb-4">
                  Our Mission
                </h3>
                <p className="text-lg text-on-surface-variant leading-relaxed">{p.mission}</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className={`${cardCls} p-8 hover:-translate-y-2 transition-all h-full`}>
                <Icon name="lightbulb" className="text-6xl text-primary block mb-5" />
                <h3 className="font-display-lg font-extrabold text-3xl uppercase text-on-surface tracking-tight mb-4">
                  Why It Matters
                </h3>
                <p className="text-lg text-on-surface-variant leading-relaxed">{p.whyItMatters}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-section-padding-mobile md:py-section-padding-desktop px-6 lg:px-8 bg-surface">
        <div className="max-w-[1100px] mx-auto">
          <SectionHead tag={p.servicesTag} title={p.servicesHeading} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {p.services.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className={`${cardCls} p-8 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(138,0,72,0.14)] transition-all h-full text-center`}>
                  <span className="text-5xl block mb-5">{s.icon}</span>
                  <h3 className="font-display-lg font-bold text-2xl uppercase text-on-surface tracking-tight mb-3">
                    {s.title}
                  </h3>
                  <p className="text-base text-on-surface-variant">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFICIARIES */}
      <section className="py-10 md:py-16 px-6 lg:px-8 bg-surface-container-low">
        <div className="max-w-[1000px] mx-auto">
          <SectionHead tag={p.beneficiariesTag} title={p.beneficiariesHeading} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {p.beneficiaries.map((b) => (
              <div
                key={b}
                className="bg-white rounded-2xl border border-primary/5 p-6 font-label-bold text-base uppercase tracking-[0.1em] text-on-surface shadow-[0_10px_30px_-5px_rgba(138,0,72,0.08)] text-center"
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="py-section-padding-mobile md:py-section-padding-desktop px-6 lg:px-8 bg-surface" id="pp-impact">
        <div className="max-w-[1100px] mx-auto">
          <SectionHead tag="Impact Vision" title={p.impactHeading} />
          <div className="grid md:grid-cols-3 gap-8">
            {p.impact.map((im, i) => (
              <Reveal key={im.title} delay={i * 80}>
                <div className={`${cardCls} p-8 h-full`}>
                  <Icon name="trending_up" className="text-6xl text-primary block mb-5" />
                  <h3 className="font-display-lg font-bold text-2xl uppercase text-on-surface tracking-tight mb-3">
                    {im.title}
                  </h3>
                  <p className="text-base text-on-surface-variant leading-relaxed">{im.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 md:py-16 px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display-lg font-extrabold text-5xl md:text-6xl uppercase tracking-tight mb-4">
              {p.cta.title}
            </h2>
            <p className="text-xl text-white/90 max-w-[600px]">{p.cta.text}</p>
          </div>
          <Link
            to="/get-involved/donate-online"
            className="inline-flex items-center gap-3 bg-white text-primary font-label-bold text-base uppercase tracking-[0.15em] px-8 py-4 rounded-2xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] hover:scale-105 transition-all shrink-0"
          >
            <Icon name="favorite" />
            {p.cta.btn}
          </Link>
        </div>
      </section>
    </>
  );
}
