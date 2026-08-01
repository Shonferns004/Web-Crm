import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import SectionHead from "../../components/SectionHead";
import Icon from "../../components/Icon";
import { ContactForm } from "../Home";
import { img } from "../../utils/images";

const cards = [
  {
    icon: "business",
    title: "Registered Office",
    lines: ["1708, One World, S.V. Road", "Near N.M. High School", "Malad West, Mumbai – 400064"],
  },
  {
    icon: "call",
    title: "Contact",
    lines: ["Phone: +91 7039006300", "Email: manncarefoundation@gmail.com"],
  },
  {
    icon: "share",
    title: "Social Media",
    lines: ["Instagram: @Mann.Care.Foundation", "Facebook: Mann Care Foundation", "LinkedIn: Mann Care Foundation"],
  },
];

export default function GetInTouch() {
  return (
    <>
      <PageHero desktop={img("/contact/hero1.jpeg")} mobile={img("/contact/mobile-slide1.jpeg")} alt="Get In Touch" />

      {/* Contact cards */}
      <section className="py-14 md:py-14 px-6 lg:px-8 bg-surface">
        <div className="max-w-[1100px] mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className="brutal-border-heavy bg-white p-8 brutal-shadow-sm hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#b50061] transition-all h-full text-center">
                <Icon name={c.icon} className="text-6xl text-primary block mb-4" />
                <h3 className="font-display-lg text-2xl uppercase text-primary tracking-tight mb-3">
                  {c.title}
                </h3>
                {c.lines.map((l) => (
                  <p key={l} className="text-base text-primary opacity-80">{l}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="py-14 px-6 lg:px-8 bg-surface-container-low">
        <div className="max-w-[850px] mx-auto text-center">
          <SectionHead tag="Our Promise" title="About Us" align="center" />
          <p className="text-xl text-primary leading-relaxed mb-4">
            Mann Care Foundation is committed to empowering underprivileged and marginalized
            individuals through education, healthcare, livelihood support, skill development, and
            community welfare initiatives.
          </p>
          <p className="text-xl text-primary leading-relaxed">
            Our mission is to create opportunities, restore dignity, and build a more inclusive and
            compassionate society.
          </p>
        </div>
      </section>

      {/* Map */}
      <section className="py-14 px-6 lg:px-8 bg-surface">
        <div className="max-w-[1000px] mx-auto">
          <SectionHead tag="Find Us" title="Our Location" align="center" />
          <div className="brutal-border-heavy brutal-shadow overflow-hidden bg-white p-2">
            <iframe
              title="Mann Care Foundation Location"
              src="https://www.google.com/maps?q=Malad%20West%20Mumbai&output=embed"
              className="w-full h-[380px] border-0"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-14 md:py-14 px-6 lg:px-8 bg-surface-container-low" id="contact">
        <div className="max-w-[1200px] mx-auto">
          <SectionHead tag="Get In Touch" title="Contact Us" align="center" />

          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <Reveal className="space-y-6">
              <div className="brutal-border bg-white p-6 flex gap-5 brutal-shadow-sm">
                <Icon name="location_on" className="text-4xl text-primary shrink-0" />
                <div>
                  <strong className="block mb-1 text-lg text-primary">Address</strong>
                  <p className="text-base text-primary opacity-80">
                    Office No. 1708, One World, S.V.Road, Near N. M. High School, Malad (West),
                    Mumbai – 400064
                  </p>
                </div>
              </div>
              <div className="brutal-border bg-white p-6 flex gap-5 brutal-shadow-sm">
                <Icon name="call" className="text-4xl text-primary shrink-0" />
                <div>
                  <strong className="block mb-1 text-lg text-primary">Phone</strong>
                  <p className="text-base text-primary opacity-80">
                    <a href="tel:+917039006300" className="hover:text-primary underline underline-offset-4">+91 70390 06300</a>
                    <br />
                    <a href="tel:+917039006400" className="hover:text-primary underline underline-offset-4">+91 70390 06400</a>
                  </p>
                </div>
              </div>
              <div className="brutal-border bg-white p-6 flex gap-5 brutal-shadow-sm">
                <Icon name="mail" className="text-4xl text-primary shrink-0" />
                <div>
                  <strong className="block mb-1 text-lg text-primary">Email</strong>
                  <p className="text-base text-primary opacity-80">
                    <a href="mailto:manncarefoundation@gmail.com" className="hover:text-primary underline underline-offset-4">
                      manncarefoundation@gmail.com
                    </a>
                    <br />
                    <a href="mailto:info.manncarefoundation@gmail.com" className="hover:text-primary underline underline-offset-4">
                      info.manncarefoundation@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="brutal-border-heavy bg-white brutal-shadow p-8 md:p-12">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
