import PageHero from "../../components/PageHero";
import SectionHead from "../../components/SectionHead";
import Icon from "../../components/Icon";
import { img } from "../../utils/images";

const certs = [
  { icon: "description", title: "PAN Certificate", href: "/pdf/pan-card.pdf" },
  { icon: "handshake", title: "NGO Registration", href: "/pdf/ngo-registration.pdf" },
];

export default function LegalCertificate() {
  return (
    <>
      <PageHero
        desktop={img("/about/hero3.jpeg")}
        mobile={img("/about/mobile-slide3.jpeg")}
        alt="Legal Certificates"
        title="Certificates"
      />

      <section className="py-14 md:py-14 px-6 lg:px-8 bg-surface">
        <div className="max-w-[900px] mx-auto text-center">
          <SectionHead
            tag="Legal & Compliance Documents"
            title="Our Certificates"
            sub="Transparency, compliance, and accountability are at the core of MANN Care Foundation. Explore our registration and certification documents."
          />

          <div className="grid sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            {certs.map((c) => (
              <a
                key={c.title}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="brutal-border-heavy p-6 bg-white brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all block text-center"
              >
                <Icon name={c.icon} className="text-7xl text-primary block mb-5" />
                <h3 className="font-display-lg text-2xl uppercase text-primary tracking-tight mb-4">
                  {c.title}
                </h3>
                <span className="font-label-bold text-sm uppercase tracking-[0.15em] text-primary flex items-center justify-center gap-2">
                  View Document
                  <Icon name="arrow_forward" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
