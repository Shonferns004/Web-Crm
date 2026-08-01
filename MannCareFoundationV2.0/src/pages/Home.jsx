import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { homeProjects } from "../data/projects";
import DonateSection from "../components/DonateSection";
import Reveal from "../components/Reveal";
import { img } from "../utils/images";

// ---------- HERO SLIDER (6 slides, auto-rotate + dots + text CTA) ----------
const SLIDES = [
  {
    desktop: img("/images/heroslide1.jpeg"),
    mobile: img("/images/mobile-slide1.jpeg"),
    heading: "Empowering Women & Children",
    sub: "Transforming lives through nutrition, education, health, and hygiene across 7 states of India.",
    cta: "Donate Now",
    ctaLink: "#donate",
    cta2: "Learn More",
    cta2Link: "#about",
  },
  {
    desktop: img("/images/heroslide2.jpeg"),
    mobile: img("/images/mobile-slide2.jpeg"),
    heading: "Nourishing Lives, Building Futures",
    sub: "Project Poshan ensures every child and family gets access to nutritious food and dignity.",
    cta: "Support Poshan",
    ctaLink: "#donate",
    cta2: "Our Projects",
    cta2Link: "#projects",
  },
  {
    desktop: img("/images/heroslide3.jpeg"),
    mobile: img("/images/mobile-slide3.jpeg"),
    heading: "Education Changes Everything",
    sub: "Project Gyaan brings quality education and learning resources to underprivileged children.",
    cta: "Support Education",
    ctaLink: "#donate",
    cta2: "Learn More",
    cta2Link: "#about",
  },
  {
    desktop: img("/images/heroslide4.jpeg"),
    mobile: img("/images/mobile-slide4.jpeg"),
    heading: "Healthcare For All",
    sub: "Project Swasth provides medical aid, health camps, and hygiene awareness to communities in need.",
    cta: "Donate Now",
    ctaLink: "#donate",
    cta2: "Our Activities",
    cta2Link: "#activities",
  },
  {
    desktop: img("/images/heroslide5.jpeg"),
    mobile: img("/images/mobile-slide5.jpeg"),
    heading: "Women Empowerment In Action",
    sub: "Project Sakhi supports women with skills, resources, and confidence to lead independent lives.",
    cta: "Join Us",
    ctaLink: "#get-involved",
    cta2: "Learn More",
    cta2Link: "#about",
  },
  {
    desktop: img("/images/heroslide6.jpeg"),
    mobile: img("/images/mobile-slide6.jpeg"),
    heading: "Together We Can Make A Difference",
    sub: "Every hand that joins our mission helps build a stronger, healthier, and more empowered India.",
    cta: "Get Involved",
    ctaLink: "#get-involved",
    cta2: "Donate Now",
    cta2Link: "#donate",
  },
];

function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      className="relative w-full max-h-[90vh] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-live="polite"
      role="region"
      aria-label="Hero slider"
    >
      {/* Slides */}
      <div className="relative w-full">
        {SLIDES.map((s, i) => (
          <picture
            key={i}
            className={`${i === active ? "block" : "hidden"} w-full`}
          >
            <source media="(max-width:768px)" srcSet={s.mobile} />
            <img
              src={s.desktop}
              alt={s.heading}
              loading={i === 0 ? "eager" : "lazy"}
              className="w-full h-auto object-cover max-h-[90vh]"
            />
          </picture>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === active ? "w-7 bg-pink-brand" : "w-2.5 bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

// ---------- Section heading helper ----------
function SectionHead({ tag, children, sub }) {
  return (
    <div className="text-center mb-12">
      {tag && (
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-brand bg-pink-light rounded-full px-4 py-1.5 mb-4">
          {tag}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-bold">{children}</h2>
      {sub && <p className="text-ink-soft mt-3 max-w-xl mx-auto">{sub}</p>}
    </div>
  );
}

// ---------- ACTIVITIES marquee data ----------
const activities = [
  [img("/media/l1.jpg"), "Litchi Distribution"],
  [img("/media/w1.jpg"), "Watermelon Distribution"],
  [img("/media/b1.JPG"), "Buttermilk Distribution"],
  [img("/media/snack1.jpeg"), "Snack Distribution"],
  [img("/media/l2.jpg"), "Litchi Distribution"],
  [img("/media/w2.jpg"), "Watermelon Distribution"],
  [img("/media/b2.JPG"), "Buttermilk Distribution"],
  [img("/media/snack2.jpeg"), "Snack Distribution"],
  [img("/media/l3.jpg"), "Litchi Distribution"],
  [img("/media/w3.jpg"), "Watermelon Distribution"],
  [img("/media/b3.JPG"), "Buttermilk Distribution"],
  [img("/media/snack3.jpeg"), "Snack Distribution"],
  [img("/media/l4.jpg"), "Litchi Distribution"],
  [img("/media/w4.jpg"), "Watermelon Distribution"],
  [img("/media/b4.JPG"), "Buttermilk Distribution"],
  [img("/media/snack4.jpeg"), "Snack Distribution"],
  [img("/media/w5.jpg"), "Watermelon Distribution"],
  [img("/media/b5.JPG"), "Buttermilk Distribution"],
  [img("/media/b6.JPG"), "Buttermilk Distribution"],
  [img("/media/snack5.jpeg"), "Snack Distribution"],
];

const partnerLogos = ["11", "12", "13", "14", "15", "16", "17", "18"];

const causes = [
  ["fa-book", "Education"],
  ["fa-apple-alt", "Nutrition"],
  ["fa-user", "Women Empowerment"],
  ["fa-ambulance", "Health Care"],
  ["fa-home", "Disaster Management"],
];

export default function Home() {
  const [partnerPage, setPartnerPage] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setPartnerPage((p) => (p + 1) % 2);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <HeroSlider />

      {/* ===== HERO ===== */}
      <section className="pt-4 pb-10 lg:pt-6 lg:pb-16 px-5" id="home">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Empowering
              <br />
              <span className="gradient-text">Women &amp; Children</span>
              <br />
              Across India
            </h1>
            <p className="text-ink-soft text-lg mb-8 max-w-xl">
              MANN CARE FOUNDATION transforms lives through nutrition, education, health, hygiene
              &amp; empowerment — reaching 7 states with compassion in action.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="#donate"
                className="inline-flex items-center gap-2 bg-pink-brand text-white px-7 py-3.5 rounded-full font-semibold shadow-pink-md hover:bg-pink-mid hover:-translate-y-0.5 transition"
              >
                <i className="fas fa-heart"></i> Donate Now
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 border-2 border-pink-brand text-pink-brand px-7 py-3.5 rounded-full font-semibold hover:bg-pink-pale transition"
              >
                Learn More <i className="fas fa-arrow-right"></i>
              </a>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <span className="block font-display text-4xl font-bold text-pink-brand">6</span>
                <span className="text-sm text-ink-soft">Projects</span>
              </div>
              <div className="h-12 w-px bg-border-pink"></div>
              <div className="text-center">
                <span className="block font-display text-4xl font-bold text-pink-brand">∞</span>
                <span className="text-sm text-ink-soft">Impact</span>
              </div>
            </div>
          </div>
          <div>
            <img
              src={img("/images/women-child.jpeg")}
              alt="NGO Support"
              className="w-full max-h-[400px] rounded-[32px] shadow-pink-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="py-12 px-5 bg-pink-pale/60" id="about">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12 flex items-center gap-3 flex-wrap">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-brand bg-pink-light rounded-full px-4 py-1.5">
              Who We Are
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold">About <span className="gradient-text">MANN CARE FOUNDATION</span></h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <Reveal>
              <div className="relative">
                <img
                  src={img("/images/about-us.jpeg")}
                  alt="MANN CARE FOUNDATION"
                  className="w-full max-h-[380px] rounded-[32px] shadow-pink-lg object-cover"
                />
                <div className="absolute -bottom-5 left-6 bg-white rounded-2xl shadow-pink-md px-5 py-3 flex items-center gap-3">
                  <i className="fas fa-award text-pink-brand text-xl"></i>
                  <span className="font-semibold text-sm">Trusted NGO</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p className="text-lg font-medium mb-3">
                MANN CARE FOUNDATION is a compassionate non-profit committed to transforming lives
                of women and children from underprivileged and marginalized communities.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  ["fa-leaf", "Sustainable"],
                  ["fa-users", "Community-First"],
                  ["fa-heart", "Empathetic"],
                  ["fa-chart-line", "Measurable Impact"],
                ].map(([icon, label]) => (
                  <div
                    key={label}
                    className="bg-white rounded-xl border border-border-pink px-3 py-3 text-center shadow-pink-sm"
                  >
                    <i className={`fas ${icon} text-pink-brand text-lg mb-1 block`}></i>
                    <span className="text-xs font-semibold">{label}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex gap-4 bg-white rounded-2xl border border-border-pink p-4 shadow-pink-sm">
                  <span className="h-10 w-10 shrink-0 rounded-full bg-pink-light text-pink-brand flex items-center justify-center">
                    <i className="fas fa-bullseye"></i>
                  </span>
                  <div>
                    <strong className="block mb-1 text-sm">Our Mission</strong>
                    <p className="text-xs text-ink-soft">
                      Addressing fundamental needs — nutritious food, quality education, menstrual
                      hygiene, healthcare awareness, and self-reliance for women and children.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 bg-white rounded-2xl border border-border-pink p-4 shadow-pink-sm">
                  <span className="h-10 w-10 shrink-0 rounded-full bg-pink-light text-pink-brand flex items-center justify-center">
                    <i className="fas fa-eye"></i>
                  </span>
                  <div>
                    <strong className="block mb-1 text-sm">Our Vision</strong>
                    <p className="text-xs text-ink-soft">
                      An inclusive society where every woman is empowered and every child is
                      nourished, educated, and free from preventable illness and inequality.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section className="pt-10 pb-20 px-5" id="projects">
        <div className="max-w-[1200px] mx-auto">
          <SectionHead>
            Our <span className="gradient-text">Projects</span>
          </SectionHead>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {homeProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <div className="bg-white rounded-[24px] border border-border-pink shadow-pink-sm hover:shadow-pink-lg hover:-translate-y-2 transition-all overflow-hidden flex flex-col h-full">
                  <div
                    className="flex items-center justify-between px-5 py-4"
                    style={{ background: "linear-gradient(135deg, #e91e8c, #f472b6)" }}
                  >
                    <span className="h-11 w-11 rounded-2xl bg-white shadow-pink-sm flex items-center justify-center text-lg text-pink-brand">
                      <i className={`fas ${p.icon}`}></i>
                    </span>
                    <span className="font-display text-2xl font-bold text-white">{p.num}</span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-display text-lg font-bold mb-1">
                      <Link to={`/projects/${p.slug}`} className="hover:text-pink-brand transition-colors">
                        {p.name}
                      </Link>
                    </h3>
                    <p className="text-xs font-semibold text-pink-brand uppercase tracking-wide mb-2">
                      {p.tag}
                    </p>
                    <p className="text-sm text-ink-soft mb-3">{p.desc}</p>
                    <ul className="space-y-1.5 text-xs mb-5">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex gap-2">
                          <i className="fas fa-check-circle text-pink-brand mt-0.5"></i>
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/get-involved/donate-online"
                      className="mt-auto inline-flex items-center justify-center gap-2 bg-baby-pink text-pink-brand font-semibold rounded-full py-3 text-sm hover:bg-pink-brand hover:text-white transition"
                    >
                      <i className="fas fa-heart"></i> Donate Now
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OUR ACTIVITIES (marquee) ===== */}
      <section className="py-20 overflow-hidden bg-pink-pale/60" id="activities">
        <SectionHead>
          Our <span className="gradient-text">Activities</span>
        </SectionHead>
        <div className="relative">
          <div className="marquee-track flex gap-6 w-max">
            {[...activities, ...activities].map(([src, caption], i) => (
              <figure key={i} className="w-64 shrink-0">
                <img
                  src={src}
                  alt={caption}
                  loading="lazy"
                  className="h-72 w-full object-cover rounded-2xl shadow-pink-sm"
                />
                <figcaption className="text-center text-sm font-medium text-ink-soft mt-2">
                  {caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GET INVOLVED ===== */}
      <section className="py-10 px-5" id="get-involved">
        <div className="-mb-8">
          <SectionHead>
            Get <span className="gradient-text">Involved</span>
          </SectionHead>
        </div>
        <p className="text-center text-xl font-medium mb-3">Together, we can create lasting change.</p>
        <p className="text-center text-ink-soft max-w-2xl mx-auto mb-12">
          Every act of kindness has the power to transform lives. Whether you choose to donate,
          volunteer, partner with us, or spread awareness, your support helps us provide food,
          education, healthcare, and opportunities to those who need them most.
        </p>

        <div className="overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex justify-center gap-7 w-max mx-auto">
          {[
            {
              icon: "fa-hand-holding-heart",
              title: "Donate",
              desc: "Support our initiatives and help bring hope, care, and opportunities to underprivileged communities.",
              to: "/get-involved/donate-online",
              btn: "Donate Now",
            },
            {
              icon: "fa-users",
              title: "Volunteer",
              desc: "Join our activities and become a part of meaningful change through your time and skills today together.",
              to: "/get-involved/career",
              btn: "Become a Volunteer",
            },
            {
              icon: "fa-handshake",
              title: "Partner With Us",
              desc: "Collaborate through CSR initiatives and community programs to create sustainable impact.",
              to: "/get-involved/corporate-partnership",
              btn: "Partner Now",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="w-80 shrink-0 bg-white rounded-[24px] border border-border-pink p-8 shadow-pink-sm"
            >
              <i className={`fas ${c.icon} text-4xl text-pink-brand mb-4`}></i>
              <h3 className="font-display text-xl font-bold mb-3">{c.title}</h3>
              <p className="text-sm text-ink-soft mb-6">{c.desc}</p>
              <Link to={c.to} className="font-semibold text-pink-brand hover:underline">
                {c.btn} →
              </Link>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* ===== CAUSE YOU CAN SUPPORT ===== */}
      <section className="py-10 px-5 bg-pink-pale/60">
        <div className="max-w-[1100px] mx-auto">
          <SectionHead>Cause you can Support</SectionHead>
          <div className="flex flex-wrap justify-center gap-6">
            {causes.map(([icon, label]) => (
              <div
                key={label}
                className="w-40 bg-white rounded-2xl border border-border-pink p-6 text-center shadow-pink-sm hover:-translate-y-1 transition-transform"
              >
                <span className="h-20 w-20 mx-auto mb-3 rounded-full bg-pink-light text-pink-brand flex items-center justify-center text-3xl">
                  <i className={`fas ${icon}`}></i>
                </span>
                <h3 className="text-sm font-semibold">{label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DONATE ===== */}
      <DonateSection />

      {/* ===== PARTNERS ===== */}
      <section className="py-10 px-5">
        <div className="max-w-[1100px] mx-auto">
          <SectionHead>
            Our <span className="gradient-text">Partners</span>
          </SectionHead>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
            {partnerLogos.slice(0, 4).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-border-pink p-5 shadow-pink-sm flex items-center justify-center h-[100px]"
              >
                <img src={img(`/images/${partnerLogos[partnerPage * 4 + i]}.png`)} alt={`Partner`} loading="lazy" className="max-h-20 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="py-20 px-5 bg-pink-pale/60" id="contact">
        <div className="max-w-[1200px] mx-auto">
          <SectionHead>
            Contact <span className="gradient-text">Us</span>
          </SectionHead>

          <div className="grid lg:grid-cols-2 gap-10">
            <Reveal className="space-y-5">
              {[
                {
                  icon: "fa-location-dot",
                  title: "Address",
                  body: (
                    <>Office No. 1708, One World, S.V.Road, Near N. M. High School, Malad (West), Mumbai – 400064</>
                  ),
                },
                {
                  icon: "fa-phone",
                  title: "Phone",
                  body: (
                    <>
                      <a href="tel:+917039006300" className="hover:text-pink-brand">+91 70390 06300</a>
                      <br />
                      <a href="tel:+917039006400" className="hover:text-pink-brand">+91 70390 06400</a>
                    </>
                  ),
                },
                {
                  icon: "fa-envelope",
                  title: "Email",
                  body: (
                    <>
                      <a href="mailto:manncarefoundation@gmail.com" className="hover:text-pink-brand">
                        manncarefoundation@gmail.com
                      </a>
                      <br />
                      <a href="mailto:info.manncarefoundation@gmail.com" className="hover:text-pink-brand">
                        info.manncarefoundation@gmail.com
                      </a>
                    </>
                  ),
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="flex gap-4 bg-white rounded-2xl border border-border-pink p-5 shadow-pink-sm"
                >
                  <span className="h-11 w-11 shrink-0 rounded-full bg-pink-light text-pink-brand flex items-center justify-center">
                    <i className={`fas ${c.icon}`}></i>
                  </span>
                  <div>
                    <strong className="block mb-1">{c.title}</strong>
                    <p className="text-sm text-ink-soft">{c.body}</p>
                  </div>
                </div>
              ))}
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

// ---------- Contact form (shared style, local state) ----------
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const inputCls =
    "w-full rounded-xl border border-border-pink bg-white px-4 py-3 text-ink placeholder:text-ink-soft focus:outline-none focus:border-pink-brand focus:ring-2 focus:ring-pink-light transition";

  if (sent) {
    return (
      <div className="bg-white rounded-[24px] border border-border-pink p-10 shadow-pink-sm text-center">
        <i className="fas fa-check-circle text-5xl text-pink-brand mb-4"></i>
        <h3 className="font-display text-2xl font-bold mb-2">Message Sent!</h3>
        <p className="text-ink-soft">Thank you for reaching out. We will get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[24px] border border-border-pink p-8 shadow-pink-sm space-y-4">
      <input type="text" placeholder="Your Full Name" className={inputCls} />
      <input type="email" placeholder="Email Address" className={inputCls} />
      <input type="tel" placeholder="Phone Number" className={inputCls} />
      <textarea placeholder="Your Message" rows={4} className={inputCls}></textarea>
      <button
        type="button"
        onClick={() => setSent(true)}
        className="w-full bg-pink-brand text-white rounded-full py-3.5 font-bold shadow-pink-md hover:bg-pink-mid transition"
      >
        <i className="fas fa-paper-plane mr-2"></i>Send Message
      </button>
    </div>
  );
}
