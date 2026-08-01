import { useParams, Link, Navigate } from "react-router-dom";
import { projects } from "../../data/projects";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";

// ============ EK COMPONENT, SAB 6 PROJECT PAGES ============
// URL: /projects/poshan, /projects/gyaan, etc.
// Naya project add karna ho to sirf data/projects.js me add karo.

function Head({ tag, title }) {
  return (
    <div className="text-center mb-12">
      <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-brand bg-pink-light rounded-full px-4 py-1.5 mb-4">
        {tag}
      </span>
      <h2 className="font-display text-3xl md:text-4xl font-bold">{title}</h2>
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const p = projects.find((x) => x.slug === slug?.toLowerCase());

  if (!p) return <Navigate to="/" replace />;

  return (
    <>
      <PageHero desktop={p.heroImg} mobile={p.heroImgMobile} alt={p.name} className="h-[70vh] md:h-[85vh]" />

      {/* HERO */}
      <section className="py-16 px-5 text-center">
        <div className="max-w-[900px] mx-auto">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-brand bg-pink-light rounded-full px-4 py-1.5 mb-5">
            {p.badge}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">{p.name}</h1>
          <p className="text-lg text-ink-soft mb-10">{p.subtitle}</p>

          <Reveal>
            <div className="bg-white rounded-[28px] border border-border-pink shadow-pink-lg p-8 md:p-12 text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">{p.card.title}</h2>
              <p className="text-ink-soft mb-6 group flex items-start gap-3 text-left">
                <i className="fas fa-arrow-right mt-1.5 shrink-0 text-pink-brand opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"></i>
                <span>{p.card.text}</span>
              </p>
              <a
                href="#pp-impact"
                className="inline-flex items-center gap-2 bg-pink-brand text-white px-7 py-3 rounded-full font-semibold shadow-pink-md hover:bg-pink-mid transition"
              >
                Explore Impact
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-16 px-5 bg-pink-pale/60">
        <div className="max-w-[1000px] mx-auto">
          <Head tag="About The Initiative" title={p.aboutHeading} />
          <div className="grid md:grid-cols-2 gap-7">
            <Reveal>
              <div className="bg-white rounded-[24px] border border-border-pink p-8 shadow-pink-sm h-full hover:scale-[1.02] hover:shadow-pink-lg transition-all duration-500 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-pink-pale/0 to-pink-pale/0 group-hover:from-pink-pale/40 transition-all duration-500"></div>
                <div className="relative z-10">
                  <span className="inline-block text-3xl mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">🎯</span>
                  <h3 className="font-display text-xl font-bold mb-3 text-pink-brand">Our Mission</h3>
                  <p className="text-ink-soft">{p.mission}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="bg-white rounded-[24px] border border-border-pink p-8 shadow-pink-sm h-full hover:scale-[1.02] hover:shadow-pink-lg transition-all duration-500 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-pink-pale/0 to-pink-pale/0 group-hover:from-pink-pale/40 transition-all duration-500"></div>
                <div className="relative z-10">
                  <span className="inline-block text-3xl mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">💡</span>
                  <h3 className="font-display text-xl font-bold mb-3 text-pink-brand">Why It Matters</h3>
                  <p className="text-ink-soft">{p.whyItMatters}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 px-5">
        <div className="max-w-[1100px] mx-auto">
          <Head tag={p.servicesTag} title={p.servicesHeading} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {p.services.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="bg-white rounded-[24px] border border-border-pink p-7 text-center shadow-pink-sm hover:shadow-pink-lg hover:-translate-y-2 transition-all h-full">
                  <span className="text-4xl block mb-4">{s.icon}</span>
                  <h3 className="font-display font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-ink-soft">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFICIARIES */}
      <section className="py-16 px-5 bg-pink-pale/60">
        <div className="max-w-[1000px] mx-auto">
          <Head tag={p.beneficiariesTag} title={p.beneficiariesHeading} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {p.beneficiaries.map((b) => (
              <div
                key={b}
                className="bg-white rounded-2xl border border-border-pink px-6 py-5 font-medium shadow-pink-sm text-center"
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="py-16 px-5" id="pp-impact">
        <div className="max-w-[1100px] mx-auto">
          <Head tag="Impact Vision" title={p.impactHeading} />
          <div className="grid md:grid-cols-3 gap-6">
            {p.impact.map((im, i) => (
              <Reveal key={im.title} delay={i * 80}>
                <div className="bg-white rounded-[24px] border border-border-pink p-8 shadow-pink-sm h-full">
                  <h3 className="font-display text-lg font-bold mb-3 text-pink-brand">{im.title}</h3>
                  <p className="text-sm text-ink-soft">{im.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 px-5 bg-gradient-to-br from-pink-brand to-pink-mid text-white">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">{p.cta.title}</h2>
            <p className="text-white/90 max-w-[600px]">{p.cta.text}</p>
          </div>
          <Link
            to="/get-involved/donate-online"
            className="inline-flex items-center gap-2 bg-white text-pink-brand px-8 py-4 rounded-full font-bold shadow-lg hover:-translate-y-0.5 transition shrink-0"
          >
            <i className="fas fa-heart"></i> {p.cta.btn}
          </Link>
        </div>
      </section>
    </>
  );
}
