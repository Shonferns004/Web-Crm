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

const cardCls =
  "bg-white rounded-2xl border border-primary/5 shadow-[0_10px_30px_-5px_rgba(138,0,72,0.08)]";

export default function GetInTouch() {
  return (
    <>
      <PageHero desktop={img("/contact/hero1.jpeg")} mobile={img("/contact/mobile-slide1.jpeg")} alt="Get In Touch" title="Get In Touch" />

      {/* Contact cards */}
      <section className="py-section-padding-mobile md:py-section-padding-desktop px-6 lg:px-8 bg-surface">
        <div className="max-w-[1100px] mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className={`${cardCls} p-8 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(138,0,72,0.14)] transition-all h-full text-center`}>
                <Icon name={c.icon} className="text-6xl text-primary block mb-4 mx-auto" />
                <h3 className="font-display-lg font-bold text-2xl uppercase text-on-surface tracking-tight mb-3">
                  {c.title}
                </h3>
                {c.lines.map((l) => (
                  <p key={l} className="text-base text-on-surface-variant">{l}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="py-10 md:py-16 px-6 lg:px-8 bg-surface-container-low">
        <div className="max-w-[850px] mx-auto text-center">
          <SectionHead tag="Our Promise" title="About Us" align="center" />
          <p className="text-xl text-on-surface-variant leading-relaxed mb-4">
            Mann Care Foundation is committed to empowering underprivileged and marginalized
            individuals through education, healthcare, livelihood support, skill development, and
            community welfare initiatives.
          </p>
          <p className="text-xl text-on-surface-variant leading-relaxed">
            Our mission is to create opportunities, restore dignity, and build a more inclusive and
            compassionate society.
          </p>
        </div>
      </section>

      {/* Map */}
      <section className="py-section-padding-mobile md:py-section-padding-desktop px-6 lg:px-8 bg-surface">
        <div className="max-w-[1000px] mx-auto">
          <SectionHead tag="Find Us" title="Our Location" align="center" />
          <div className="rounded-2xl border border-primary/5 shadow-[0_10px_30px_-5px_rgba(138,0,72,0.08)] overflow-hidden bg-white p-2">
            <iframe
              title="Mann Care Foundation Location"
              src="https://www.google.com/maps?q=Malad%20West%20Mumbai&output=embed"
              className="w-full h-[380px] border-0 rounded-xl"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-10 md:py-16 px-6 lg:px-8 bg-surface-container-low" id="contact">
        <div className="max-w-[1200px] mx-auto">
          <SectionHead tag="Get In Touch" title="Contact Us" align="center" />

          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <Reveal className="space-y-6">
              <div className={`${cardCls} p-6 flex gap-5`}>
                <Icon name="location_on" className="text-4xl text-primary shrink-0" />
                <div>
                  <strong className="block mb-1 text-lg text-on-surface">Address</strong>
                  <p className="text-base text-on-surface-variant">
                    Office No. 1708, One World, S.V.Road, Near N. M. High School, Malad (West),
                    Mumbai – 400064
                  </p>
                </div>
              </div>
              <div className={`${cardCls} p-6 flex gap-5`}>
                <Icon name="call" className="text-4xl text-primary shrink-0" />
                <div>
                  <strong className="block mb-1 text-lg text-on-surface">Phone</strong>
                  <p className="text-base text-on-surface-variant">
                    <a href="tel:+917039006300" className="text-primary hover:underline underline-offset-4">+91 70390 06300</a>
                    <br />
                    <a href="tel:+917039006400" className="text-primary hover:underline underline-offset-4">+91 70390 06400</a>
                  </p>
                </div>
              </div>
              <div className={`${cardCls} p-6 flex gap-5`}>
                <Icon name="mail" className="text-4xl text-primary shrink-0" />
                <div>
                  <strong className="block mb-1 text-lg text-on-surface">Email</strong>
                  <p className="text-base text-on-surface-variant">
                    <a href="mailto:manncarefoundation@gmail.com" className="text-primary hover:underline underline-offset-4">
                      manncarefoundation@gmail.com
                    </a>
                    <br />
                    <a href="mailto:info.manncarefoundation@gmail.com" className="text-primary hover:underline underline-offset-4">
                      info.manncarefoundation@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className={`${cardCls} p-8 md:p-12`}>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
