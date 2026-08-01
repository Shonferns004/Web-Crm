import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import { team } from "../../data/projects";
import { img } from "../../utils/images";

export default function OurTeam() {
  return (
    <>
      <PageHero desktop={img("/about/hero2.jpeg")} mobile={img("/about/mobile-slide2.jpeg")} alt="Our Team" className="h-[70vh] md:h-[85vh]" />

      <section className="py-16 px-5" id="team">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-brand bg-pink-light rounded-full px-4 py-1.5 mb-4">
              The People Behind The Mission
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Our <span className="gradient-text">Team</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 80} className="w-full max-w-xs">
                <div className="bg-white rounded-[24px] border border-border-pink overflow-hidden shadow-pink-sm hover:shadow-pink-lg hover:-translate-y-2 transition-all">
                  <img src={m.img} alt={m.name} className="w-full h-72 object-cover" />
                  <div className="p-6 text-center">
                    <h3 className="font-display text-lg font-bold">{m.name}</h3>
                    <p className="text-xs font-semibold tracking-widest text-pink-brand mt-1">
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
