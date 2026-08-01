import PageHero from "../../components/PageHero";
import SectionHead from "../../components/SectionHead";
import Reveal from "../../components/Reveal";
import { team } from "../../data/projects";
import { img } from "../../utils/images";

export default function OurTeam() {
  return (
    <>
      <PageHero
        desktop={img("/about/hero2.jpeg")}
        mobile={img("/about/mobile-slide2.jpeg")}
        alt="Our Team"
        title="Our Team"
      />

      <section className="py-14 md:py-14 px-6 lg:px-8 bg-surface" id="team">
        <div className="max-w-[1150px] mx-auto">
          <SectionHead
            tag="The People Behind The Mission"
            title="Our Team"
            sub="Compassionate leaders working relentlessly to empower women, children, and communities."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 80} className="w-full max-w-sm">
                <div className="brutal-border-heavy bg-white overflow-hidden brutal-shadow-sm hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#b50061] transition-all">
                  <img src={m.img} alt={m.name} className="w-full h-80 object-cover" />
                  <div className="p-7 text-center">
                    <h3 className="font-display-lg text-2xl uppercase text-primary tracking-tight">
                      {m.name}
                    </h3>
                    <p className="font-label-bold text-xs tracking-[0.2em] text-primary mt-2 bg-primary-fixed/50 inline-block px-3 py-1 brutal-border">
                      {m.role}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
