import PageHero from "../../components/PageHero";
import SectionHead from "../../components/SectionHead";
import { img } from "../../utils/images";

const boxes = [
  { title: "Introduction", text: "Mann Care Foundation respects your privacy and is committed to protecting your personal information." },
  { title: "Information We Collect", text: "We may collect name, email, phone number, and donation details when you interact with us." },
  { title: "How We Use Information", text: "We use data only for communication, donation processing, and improving services." },
  { title: "Data Protection", text: "We do not sell or share your personal information with third parties." },
  { title: "Cookies", text: "Our website may use cookies to improve user experience." },
  { title: "Contact Us", text: "Email: manncarefoundation@gmail.com | Phone: +91 7039006300" },
];

const cardCls =
  "bg-white rounded-2xl border border-primary/5 shadow-[0_10px_30px_-5px_rgba(138,0,72,0.08)]";

export default function Policy() {
  return (
    <>
      <PageHero desktop={img("/contact/hero2.jpeg")} mobile={img("/contact/mobile-slide2.jpeg")} alt="Privacy Policy" title="Privacy Policy" />

      <section className="py-section-padding-mobile md:py-section-padding-desktop px-6 lg:px-8 bg-surface">
        <div className="max-w-[850px] mx-auto">
          <SectionHead tag="Legal Notice" title="Privacy Policy" align="center" />
          <div className="space-y-6">
            {boxes.map((b) => (
              <div key={b.title} className={`${cardCls} p-7`}>
                <h2 className="font-display-lg font-extrabold text-2xl uppercase text-on-surface tracking-tight mb-2">
                  {b.title}
                </h2>
                <p className="text-lg text-on-surface-variant">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
