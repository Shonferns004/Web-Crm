import { Link } from "react-router-dom";
import PageHero from "../../components/PageHero";
import SectionHead from "../../components/SectionHead";
import Reveal from "../../components/Reveal";
import Icon from "../../components/Icon";
import { img } from "../../utils/images";

const values = [
  { icon: "restaurant", title: "Nutrition", desc: "Ensuring no woman or child is deprived of nutritious food." },
  { icon: "school", title: "Education", desc: "Creating equal learning opportunities for every child." },
  { icon: "medical_services", title: "Health & Hygiene", desc: "Promoting preventive healthcare and healthy living practices." },
  { icon: "female", title: "Women Empowerment", desc: "Building confidence, skills, independence, and leadership." },
];

export default function OurStory() {
  return (
    <>
      <PageHero
        desktop={img("/about/hero1.jpeg")}
        mobile={img("/about/mobile-slide1.jpeg")}
        alt="Our Story"
        title="Our Story"
      />

      <section className="py-14 md:py-14 px-6 lg:px-8 bg-surface">
        <div className="max-w-[900px] mx-auto text-center space-y-6">
          <SectionHead
            tag="Empowering Women & Children"
            title="Transforming Communities"
            align="center"
          />
          <p className="text-2xl md:text-3xl text-primary leading-snug">
            Building a future where every woman lives with dignity and every child has the
            opportunity to learn, grow, and thrive.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16 px-6 lg:px-8 bg-surface-container-low">
        <div className="max-w-[900px] mx-auto">
          <Reveal>
            <div className="brutal-border-heavy p-6 md:p-8 bg-white brutal-shadow">
              <h2 className="font-display-lg text-4xl md:text-5xl uppercase text-primary tracking-tight mb-6 text-center">
                How It All Began
              </h2>
              <div className="space-y-8">
                <p className="flex items-start gap-5 text-xl text-primary leading-relaxed">
                  <Icon name="arrow_right_alt" className="text-primary mt-1 shrink-0" />
                  MANN Care Foundation believes that true social progress begins with the well-being of women and children. A healthy woman nurtures a strong family, and an educated child shapes a brighter future.
                </p>
                <p className="flex items-start gap-5 text-xl text-primary leading-relaxed">
                  <Icon name="arrow_right_alt" className="text-primary mt-1 shrink-0" />
                  Guided by this belief, the Foundation was established to address essential yet often overlooked needs such as nutrition, education, menstrual hygiene, healthcare awareness, and women empowerment.
                </p>
                <p className="flex items-start gap-5 text-xl text-primary leading-relaxed">
                  <Icon name="arrow_right_alt" className="text-primary mt-1 shrink-0" />
                  Through compassionate action and community-driven solutions, MANN Care Foundation works to create meaningful and lasting change in the lives of underserved individuals and families.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-14 px-6 lg:px-8 bg-surface-container-high">
        <div className="max-w-[1000px] mx-auto">
          <SectionHead tag="Guiding Principles" title="Vision & Mission" />
          <div className="grid md:grid-cols-2 gap-10">
            <Reveal>
              <div className="brutal-border-heavy p-6 bg-white brutal-shadow-sm text-center h-full">
                <Icon name="public" className="text-7xl text-primary block mb-6" />
                <h3 className="font-display-lg text-3xl uppercase text-primary tracking-tight mb-4">Our Vision</h3>
                <p className="text-lg text-primary opacity-90 leading-relaxed">
                  To build an inclusive society where every woman and child has access to
                  opportunities, resources, health, education, and dignity.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="brutal-border-heavy p-6 bg-white brutal-shadow-sm text-center h-full">
                <Icon name="favorite" className="text-7xl text-primary block mb-6" />
                <h3 className="font-display-lg text-3xl uppercase text-primary tracking-tight mb-4">Our Mission</h3>
                <p className="text-lg text-primary opacity-90 leading-relaxed">
                  To empower women and children through sustainable programs focused on nutrition,
                  education, health, hygiene, and self-reliance.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-14 px-6 lg:px-8 bg-surface">
        <div className="max-w-[1100px] mx-auto">
          <SectionHead tag="What Drives Us" title="Our Core Focus Areas" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="brutal-border-heavy p-8 bg-white brutal-shadow-sm hover:-translate-y-2 transition-all h-full text-center">
                  <Icon name={v.icon} className="text-6xl text-primary block mb-5 mx-auto" />
                  <h3 className="font-display-lg text-2xl uppercase text-primary tracking-tight mb-3">
                    {v.title}
                  </h3>
                  <p className="text-base text-primary opacity-80">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16 px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display-lg text-5xl md:text-6xl uppercase tracking-tight mb-4">
              Be A Part Of The Change
            </h2>
            <p className="text-xl text-white/90 max-w-[600px]">
              Together, we can build healthier families, stronger communities, and brighter futures
              for women and children.
            </p>
          </div>
          <Link
            to="/get-involved/donate-online"
            className="bg-white text-primary font-label-bold text-base uppercase tracking-[0.15em] px-8 py-4 brutal-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shrink-0"
          >
            Support Our Mission
          </Link>
        </div>
      </section>
    </>
  );
}
