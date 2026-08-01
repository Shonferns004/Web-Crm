import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import { ContactForm } from "../Home";
import { img } from "../../utils/images";

const cards = [
  {
    icon: "fa-building",
    title: "Registered Office",
    lines: ["1708, One World, S.V. Road", "Near N.M. High School", "Malad West, Mumbai – 400064"],
  },
  {
    icon: "fa-phone",
    title: "Contact",
    lines: ["Phone: +91 7039006300", "Email: manncarefoundation@gmail.com"],
  },
  {
    icon: "fa-share-nodes",
    title: "Social Media",
    lines: ["Instagram: @Mann.Care.Foundation", "Facebook: Mann Care Foundation", "LinkedIn: Mann Care Foundation"],
  },
];

export default function GetInTouch() {
  return (
    <>
      <PageHero desktop={img("/contact/hero1.jpeg")} mobile={img("/contact/mobile-slide1.jpeg")} alt="Get In Touch" className="h-[70vh] md:h-[85vh]" />

      {/* Contact cards */}
      <section className="py-16 px-5">
        <div className="max-w-[1100px] mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className="bg-white rounded-[24px] border border-border-pink p-8 text-center shadow-pink-sm hover:-translate-y-2 hover:shadow-pink-lg transition-all h-full">
                <span className="h-14 w-14 mx-auto mb-4 rounded-full bg-pink-light text-pink-brand flex items-center justify-center text-xl">
                  <i className={`fa-solid ${c.icon}`}></i>
                </span>
                <h3 className="font-display text-lg font-bold mb-3">{c.title}</h3>
                {c.lines.map((l) => (
                  <p key={l} className="text-sm text-ink-soft">{l}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="py-12 px-5 bg-pink-pale/60">
        <div className="max-w-[850px] mx-auto text-center">
          <h2 className="font-display text-3xl font-bold mb-4">About Us</h2>
          <p className="text-ink-soft mb-3">
            Mann Care Foundation is committed to empowering underprivileged and marginalized
            individuals through education, healthcare, livelihood support, skill development, and
            community welfare initiatives.
          </p>
          <p className="text-ink-soft">
            Our mission is to create opportunities, restore dignity, and build a more inclusive and
            compassionate society.
          </p>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 px-5">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-8">Find Us</h2>
          <div className="rounded-[24px] overflow-hidden shadow-pink-lg border border-border-pink">
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
      <section className="py-16 px-5 bg-pink-pale/60" id="contact">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-brand bg-pink-light rounded-full px-4 py-1.5 mb-4">
              Get In Touch
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Contact <span className="gradient-text">Us</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <Reveal className="space-y-5">
              <div className="flex gap-4 bg-white rounded-2xl border border-border-pink p-5 shadow-pink-sm">
                <span className="h-11 w-11 shrink-0 rounded-full bg-pink-light text-pink-brand flex items-center justify-center">
                  <i className="fas fa-location-dot"></i>
                </span>
                <div>
                  <strong className="block mb-1">Address</strong>
                  <p className="text-sm text-ink-soft">
                    Office No. 1708, One World, S.V.Road, Near N. M. High School, Malad (West),
                    Mumbai – 400064
                  </p>
                </div>
              </div>
              <div className="flex gap-4 bg-white rounded-2xl border border-border-pink p-5 shadow-pink-sm">
                <span className="h-11 w-11 shrink-0 rounded-full bg-pink-light text-pink-brand flex items-center justify-center">
                  <i className="fas fa-phone"></i>
                </span>
                <div>
                  <strong className="block mb-1">Phone</strong>
                  <p className="text-sm text-ink-soft">
                    <a href="tel:+917039006300" className="hover:text-pink-brand">+91 70390 06300</a>
                    <br />
                    <a href="tel:+917039006400" className="hover:text-pink-brand">+91 70390 06400</a>
                  </p>
                </div>
              </div>
              <div className="flex gap-4 bg-white rounded-2xl border border-border-pink p-5 shadow-pink-sm">
                <span className="h-11 w-11 shrink-0 rounded-full bg-pink-light text-pink-brand flex items-center justify-center">
                  <i className="fas fa-envelope"></i>
                </span>
                <div>
                  <strong className="block mb-1">Email</strong>
                  <p className="text-sm text-ink-soft">
                    <a href="mailto:manncarefoundation@gmail.com" className="hover:text-pink-brand">
                      manncarefoundation@gmail.com
                    </a>
                    <br />
                    <a href="mailto:info.manncarefoundation@gmail.com" className="hover:text-pink-brand">
                      info.manncarefoundation@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
