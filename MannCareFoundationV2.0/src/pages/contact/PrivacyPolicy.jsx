import PageHero from "../../components/PageHero";
import { img } from "../../utils/images";

const boxes = [
  { title: "Introduction", text: "Mann Care Foundation respects your privacy and is committed to protecting your personal information." },
  { title: "Information We Collect", text: "We may collect name, email, phone number, and donation details when you interact with us." },
  { title: "How We Use Information", text: "We use data only for communication, donation processing, and improving services." },
  { title: "Data Protection", text: "We do not sell or share your personal information with third parties." },
  { title: "Cookies", text: "Our website may use cookies to improve user experience." },
  { title: "Contact Us", text: "Email: manncarefoundation@gmail.com | Phone: +91 7039006300" },
];

export default function PrivacyPolicy() {
  return (
    <>
      <PageHero desktop={img("/contact/hero2.jpeg")} mobile={img("/contact/mobile-slide2.jpeg")} alt="Privacy Policy" className="h-[70vh] md:h-[85vh]" />

      <section className="py-16 px-5">
        <div className="max-w-[850px] mx-auto">
          <h1 className="font-display text-4xl font-bold text-center mb-12">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <div className="space-y-6">
            {boxes.map((b) => (
              <div key={b.title} className="bg-white rounded-[24px] border border-border-pink p-7 shadow-pink-sm">
                <h2 className="font-display text-xl font-bold mb-2 text-pink-brand">{b.title}</h2>
                <p className="text-ink-soft">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
