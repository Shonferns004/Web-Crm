import { useParams, Link, Navigate } from "react-router-dom";
import { projects } from "../../data/projects";
import PageHero from "../../components/PageHero";
import SectionHead from "../../components/SectionHead";
import Reveal from "../../components/Reveal";
import Icon from "../../components/Icon";

export default function ProjectDetail() {
  const { slug } = useParams();
  const p = projects.find((x) => x.slug === slug?.toLowerCase());

  if (!p) return <Navigate to="/" replace />;

  return (
    <>
      <PageHero desktop={p.heroImg} mobile={p.heroImgMobile} alt={p.name} title={p.name} />

      {/* HERO */}
      <section className="py-14 md:py-14 px-6 lg:px-8 bg-surface">
        <div className="max-w-[900px] mx-auto text-center space-y-8">
          <span className="inline-block px-3 py-1 bg-primary text-white font-label-bold text-xs uppercase tracking-[0.2em]">
            {p.badge}
          </span>
          <h1 className="font-display-lg text-5xl md:text-8xl text-primary leading-[0.9] tracking-tighter uppercase">
            {p.name}
          </h1>
          <p className="text-2xl md:text-3xl text-primary leading-snug">{p.subtitle}</p>

          <Reveal>
            <div className="brutal-border-heavy bg-white brutal-shadow p-6 md:p-8 text-left">
              <h2 className="font-display-lg text-3xl md:text-4xl uppercase text-primary tracking-tight mb-6">
                {p.card.title}
              </h2>
              <p className="flex items-start gap-4 text-lg md:text-xl text-primary leading-relaxed">
                <Icon name="arrow_right_alt" className="text-primary mt-1 shrink-0" />
                {p.card.text}
              </p>
              <a
                href="#pp-impact"
                className="inline-flex items-center gap-3 mt-10 bg-primary text-white font-label-bold text-sm uppercase tracking-[0.15em] px-8 py-4 brutal-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                Explore Impact
                <Icon name="arrow_forward" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-14 md:py-14 px-6 lg:px-8 bg-surface-container-low">
        <div className="max-w-[1000px] mx-auto">
          <SectionHead tag="About The Initiative" title={p.aboutHeading} />
          <div className="grid md:grid-cols-2 gap-10">
            <Reveal>
              <div className="brutal-border-heavy p-6 bg-white brutal-shadow-sm hover:-translate-y-2 transition-all h-full">
                <Icon name="track_changes" className="text-6xl text-primary block mb-5" />
                <h3 className="font-display-lg text-3xl uppercase text-primary tracking-tight mb-4">
                  Our Mission
                </h3>
                <p className="text-lg text-primary opacity-90 leading-relaxed">{p.mission}</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="brutal-border-heavy p-6 bg-white brutal-shadow-sm hover:-translate-y-2 transition-all h-full">
                <Icon name="lightbulb" className="text-6xl text-primary block mb-5" />
                <h3 className="font-display-lg text-3xl uppercase text-primary tracking-tight mb-4">
                  Why It Matters
                </h3>
                <p className="text-lg text-primary opacity-90 leading-relaxed">{p.whyItMatters}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-14 md:py-14 px-6 lg:px-8 bg-surface">
        <div className="max-w-[1100px] mx-auto">
          <SectionHead tag={p.servicesTag} title={p.servicesHeading} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {p.services.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="brutal-border-heavy p-8 bg-white brutal-shadow-sm hover:-translate-y-2 transition-all h-full text-center">
                  <span className="text-5xl block mb-5">{s.icon}</span>
                  <h3 className="font-display-lg text-2xl uppercase text-primary tracking-tight mb-3">
                    {s.title}
                  </h3>
                  <p className="text-base text-primary opacity-80">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFICIARIES */}
      <section className="py-14 md:py-14 px-6 lg:px-8 bg-surface-container-low">
        <div className="max-w-[1000px] mx-auto">
          <SectionHead tag={p.beneficiariesTag} title={p.beneficiariesHeading} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {p.beneficiaries.map((b) => (
              <div
                key={b}
                className="brutal-border p-6 bg-white font-label-bold text-base uppercase tracking-[0.1em] text-primary brutal-shadow-sm text-center"
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="py-14 md:py-14 px-6 lg:px-8 bg-surface" id="pp-impact">
        <div className="max-w-[1100px] mx-auto">
          <SectionHead tag="Impact Vision" title={p.impactHeading} />
          <div className="grid md:grid-cols-3 gap-8">
            {p.impact.map((im, i) => (
              <Reveal key={im.title} delay={i * 80}>
                <div className="brutal-border-heavy p-6 bg-white brutal-shadow-sm h-full">
                  <Icon name="trending_up" className="text-6xl text-primary block mb-5" />
                  <h3 className="font-display-lg text-2xl uppercase text-primary tracking-tight mb-3">
                    {im.title}
                  </h3>
                  <p className="text-base text-primary opacity-80 leading-relaxed">{im.desc}</p>
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
            <h2 className="font-display-lg text-5xl md:text-6xl uppercase tracking-tight mb-4">
              {p.cta.title}
            </h2>
            <p className="text-xl text-white/90 max-w-[600px]">{p.cta.text}</p>
          </div>
          <Link
            to="/get-involved/donate-online"
            className="inline-flex items-center gap-3 bg-white text-primary font-label-bold text-base uppercase tracking-[0.15em] px-8 py-4 brutal-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shrink-0"
          >
            <Icon name="favorite" />
            {p.cta.btn}
          </Link>
        </div>
      </section>
    </>
  );
}
