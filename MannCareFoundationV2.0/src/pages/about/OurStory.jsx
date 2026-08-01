import { Link } from "react-router-dom";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import { img } from "../../utils/images";

const values = [
  { icon: "🍲", title: "Nutrition", desc: "Ensuring no woman or child is deprived of nutritious food." },
  { icon: "📚", title: "Education", desc: "Creating equal learning opportunities for every child." },
  { icon: "🩺", title: "Health & Hygiene", desc: "Promoting preventive healthcare and healthy living practices." },
  { icon: "👩", title: "Women Empowerment", desc: "Building confidence, skills, independence, and leadership." },
];

export default function OurStory() {
  return (
    <>
      <PageHero desktop={img("/about/hero1.jpeg")} mobile={img("/about/mobile-slide1.jpeg")} alt="Our Story" className="h-[70vh] md:h-[85vh]" />

      <section className="py-16 px-5 text-center">
        <div className="max-w-[850px] mx-auto">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-brand bg-pink-light rounded-full px-4 py-1.5 mb-5">
            Our Story
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-5">
            Empowering Women &amp; Children,
            <br />
            Transforming Communities
          </h1>
          <p className="text-lg text-ink-soft">
            Building a future where every woman lives with dignity and every child has the
            opportunity to learn, grow, and thrive.
          </p>
        </div>
      </section>

      <section className="py-12 px-5">
        <div className="max-w-[850px] mx-auto">
          <Reveal>
            <div className="bg-white rounded-[28px] border border-border-pink p-8 md:p-12 shadow-pink-lg space-y-4">
              <h2 className="font-display text-3xl font-bold mb-2 text-center">How It All Began</h2>
              <p className="text-ink-soft group flex items-start gap-3">
                <i className="fas fa-arrow-right mt-1 shrink-0 text-pink-brand opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"></i>
                <span>MANN Care Foundation believes that true social progress begins with the well-being of women and children. A healthy woman nurtures a strong family, and an educated child shapes a brighter future.</span>
              </p>
              <p className="text-ink-soft group flex items-start gap-3">
                <i className="fas fa-arrow-right mt-1 shrink-0 text-pink-brand opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"></i>
                <span>Guided by this belief, the Foundation was established to address essential yet often overlooked needs such as nutrition, education, menstrual hygiene, healthcare awareness, and women empowerment.</span>
              </p>
              <p className="text-ink-soft group flex items-start gap-3">
                <i className="fas fa-arrow-right mt-1 shrink-0 text-pink-brand opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"></i>
                <span>Through compassionate action and community-driven solutions, MANN Care Foundation works to create meaningful and lasting change in the lives of underserved individuals and families.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 px-5 bg-pink-pale/60">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-brand bg-pink-light rounded-full px-4 py-1.5 mb-4">
              Guiding Principles
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Vision &amp; Mission</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-7">
            <Reveal>
              <div className="bg-white rounded-[24px] border border-border-pink p-8 shadow-pink-sm text-center h-full">
                <span className="text-4xl block mb-4">🌍</span>
                <h3 className="font-display text-xl font-bold mb-3">Our Vision</h3>
                <p className="text-ink-soft">
                  To build an inclusive society where every woman and child has access to
                  opportunities, resources, health, education, and dignity.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="bg-white rounded-[24px] border border-border-pink p-8 shadow-pink-sm text-center h-full">
                <span className="text-4xl block mb-4">💖</span>
                <h3 className="font-display text-xl font-bold mb-3">Our Mission</h3>
                <p className="text-ink-soft">
                  To empower women and children through sustainable programs focused on nutrition,
                  education, health, hygiene, and self-reliance.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 px-5">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-brand bg-pink-light rounded-full px-4 py-1.5 mb-4">
              What Drives Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Our Core Focus Areas</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="bg-white rounded-[24px] border border-border-pink p-7 text-center shadow-pink-sm hover:-translate-y-2 hover:shadow-pink-lg transition-all h-full">
                  <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-pale text-3xl">{v.icon}</span>
                  <h3 className="font-display font-bold mb-2">{v.title}</h3>
                  <p className="text-sm text-ink-soft">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-5 bg-gradient-to-br from-pink-brand to-pink-mid text-white">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Be A Part Of The Change</h2>
            <p className="text-white/90 max-w-[600px]">
              Together, we can build healthier families, stronger communities, and brighter futures
              for women and children.
            </p>
          </div>
          <Link
            to="/get-involved/donate-online"
            className="inline-flex items-center gap-2 bg-white text-pink-brand px-8 py-4 rounded-full font-bold shadow-lg hover:-translate-y-0.5 transition shrink-0"
          >
            Support Our Mission
          </Link>
        </div>
      </section>
    </>
  );
}
