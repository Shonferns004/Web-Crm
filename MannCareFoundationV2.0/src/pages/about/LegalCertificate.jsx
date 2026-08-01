import PageHero from "../../components/PageHero";
import { img } from "../../utils/images";

const certs = [
  { icon: "📄", title: "PAN Certificate", href: "/pdf/pan-card.pdf" },
  { icon: "🤝", title: "NGO Registration", href: "/pdf/ngo-registration.pdf" },
];

export default function LegalCertificate() {
  return (
    <>
      <PageHero desktop={img("/about/hero3.jpeg")} mobile={img("/about/mobile-slide3.jpeg")} alt="Legal Certificates" className="h-[70vh] md:h-[85vh]" />

      <section className="py-16 px-5">
        <div className="max-w-[900px] mx-auto text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-brand bg-pink-light rounded-full px-4 py-1.5 mb-5">
            Legal &amp; Compliance Documents
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Certificates</h1>
          <p className="text-ink-soft max-w-xl mx-auto mb-12">
            Transparency, compliance, and accountability are at the core of MANN Care Foundation.
            Explore our registration and certification documents.
          </p>

          <div className="grid sm:grid-cols-2 gap-7 max-w-xl mx-auto">
            {certs.map((c) => (
              <a
                key={c.title}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="bg-white rounded-[24px] border border-border-pink p-8 shadow-pink-sm hover:shadow-pink-lg hover:-translate-y-2 transition-all"
              >
                <span className="text-4xl block mb-4">{c.icon}</span>
                <h3 className="font-display font-bold mb-2">{c.title}</h3>
                <span className="text-sm font-semibold text-pink-brand">View Document →</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
