import { Link } from "react-router-dom";
import { img } from "../utils/images";

// ============ COMMON FOOTER (har page pe yahi use hota hai) ============
// Note: Purani site ke footer me links tooti hui thi
// (e.g. individual-support.html bina folder ke, Media #donate pe) —
// yahan sab links sahi routes pe fix kar di gayi hain.

function DonationStrip() {
  const items = [
    { img: img("/images/donate.png"), label: "Donate Now", to: "/get-involved/donate-online" },
    { img: img("/images/secure.png"), label: "Activity Report", to: "/media" },
    { img: img("/images/contact.png"), label: "Contact Us", to: "/contact/get-in-touch" },
  ];
  return (
    <div className="bg-pink-pale border-y border-border-pink py-6">
      <div className="max-w-[900px] mx-auto px-5 flex flex-wrap justify-center gap-8 sm:gap-16">
        {items.map((it) => (
          <Link key={it.label} to={it.to} className="flex flex-col items-center gap-2 group">
            <span className="h-16 w-16 rounded-full bg-white shadow-pink-md flex items-center justify-center group-hover:-translate-y-1 transition-transform">
              <img src={it.img} alt={it.label} className="h-16 w-16 object-contain" />
            </span>
            <span className="text-sm font-semibold text-ink-mid group-hover:text-pink-brand">
              {it.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const footerCols = [
  {
    title: "About Us",
    links: [
      { label: "Our Story", to: "/about/our-story" },
      { label: "Our Team", to: "/about/our-team" },
      { label: "Legal Certificate", to: "/about/legal-certificate" },
    ],
  },
  {
    title: "Our Projects",
    links: [
      { label: "Project Poshan", to: "/projects/poshan" },
      { label: "Project Gyaan", to: "/projects/gyaan" },
      { label: "Project Sakhi", to: "/projects/sakhi" },
      { label: "Project Swasth", to: "/projects/swasth" },
      { label: "Project Pashu", to: "/projects/pashu" },
      { label: "Project Paryavaran", to: "/projects/paryavaran" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Individual Support", to: "/get-involved/individual-support" },
      { label: "Corporate Partnership", to: "/get-involved/corporate-partnership" },
      { label: "Donate Online", to: "/get-involved/donate-online" },
      { label: "Career", to: "/get-involved/career" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Get In Touch", to: "/contact/get-in-touch" },
      { label: "Privacy Policy", to: "/contact/privacy-policy" },
      { label: "Media", to: "/media" },
    ],
  },
];

export default function Footer() {
  return (
    <>
      <DonationStrip />

      <footer className="bg-ink text-white/80">
        <div className="max-w-[1200px] mx-auto px-5 py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={img("/logo.png")} alt="MANN CARE FOUNDATION Logo" className="h-11 w-auto object-contain" />
              <span className="leading-tight">
                <span className="block font-display font-bold text-lg text-white">MANN CARE</span>
                <span className="block text-xs tracking-[0.25em] text-rose-brand font-semibold">FOUNDATION</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-5">
              Empowering women and children from underprivileged communities through compassion, care, and action.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/mann.care.foundation?igsh=Z2h3aGUxNGxnbW1u"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-brand transition-colors"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>

            {/* GPay QR */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-white mb-2">
                <i className="fas fa-qrcode mr-2 text-rose-brand"></i>Scan & Pay via GPay
              </p>
              <img src={img("/gpay-qr.jpeg")} alt="GPay QR Code" className="h-32 w-32 rounded-lg object-contain bg-white p-1" />
            </div>
          </div>

          {footerCols.map((col) => (
            <div key={col.title}>
              <h5 className="font-display font-bold text-white mb-4">{col.title}</h5>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.to + l.label}>
                    <Link to={l.to} className="text-sm hover:text-rose-brand transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact info + spans full on small */}
          <div className="md:col-span-2 lg:col-span-6 border-t border-white/10 pt-8 grid gap-3 sm:grid-cols-3 text-sm">
            <p><i className="fas fa-phone mr-2 text-rose-brand"></i>+91 70390 06300</p>
            <p><i className="fas fa-envelope mr-2 text-rose-brand"></i>manncarefoundation@gmail.com</p>
            <p><i className="fas fa-location-dot mr-2 text-rose-brand"></i>Malad (West), Mumbai – 400064</p>
          </div>
        </div>

        <div className="border-t border-white/10 py-5 text-center text-xs text-white/60 px-5">
          © 2026 MANN CARE FOUNDATION. All Rights Reserved. | Designed with{" "}
          <i className="fas fa-heart text-pink-brand"></i> for a better tomorrow.
        </div>
      </footer>
    </>
  );
}
