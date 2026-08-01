import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./PashuPremi.css";

const galleryImages = [
  { id: 1, src: "/images/Pashu/img1.jpg", alt: "Stray Animal Care" },
  { id: 2, src: "/images/Pashu/img2.jpg", alt: "Animal Rescue" },
  { id: 3, src: "/images/Pashu/img3.jpg", alt: "Veterinary Care" },
  { id: 4, src: "/images/Pashu/img4.jpg", alt: "Animal Compassion" },
  { id: 5, src: "/images/Pashu/img5.jpg", alt: "Pet Care" },
  { id: 6, src: "/images/Pashu/img6.jpg", alt: "Shelter Support" },
];

const missions = [
  {
    title: "Caring for Stray Animals",
    desc: "Thousands of stray animals struggle daily for food, shelter, and survival. AFLF provides nutritious food, clean drinking water, and essential care to help them live healthier and safer lives.",
  },
  {
    title: "Promoting Animal Health & Welfare",
    desc: "We support the well-being of animals through medical assistance, vaccination drives, rescue efforts, and treatment for injured or sick animals, ensuring they receive the care they deserve.",
  },
  {
    title: "Creating Safe Spaces",
    desc: "Our goal is to help provide safe environments and temporary shelters for abandoned and vulnerable animals, protecting them from harsh weather conditions and other dangers.",
  },
  {
    title: "Spreading Awareness & Compassion",
    desc: "Through community engagement and awareness campaigns, we encourage people to treat animals with empathy, promote responsible pet care, and support animal welfare initiatives.",
  },
  {
    title: "Building a Humane Society",
    desc: "We believe that kindness towards animals reflects the values of a compassionate community. By fostering respect for all living beings, we aim to create lasting positive change.",
  },
];

export default function PashuPremi() {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pashu-page" style={{ '--hero-img': 'url(/images/Pashu/pashu.jpg)' }}>
      {/* HERO */}
      <section className="detail-hero">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/banner-mobile5.png" />
          <img src="/images/Pashu/pashu.jpg" alt="Project Pashu Premi" />
        </picture>
        <div className="detail-hero-shape detail-hero-shape--1" />
        <div className="detail-hero-shape detail-hero-shape--2" />
        <div className="section-container">
          <div className="detail-hero-content">
            <span className="detail-hero-badge glass" ref={(el) => (sectionRefs.current[0] = el)}>PROJECT PASHU PREMI</span>
            <h1 ref={(el) => (sectionRefs.current[1] = el)}>Compassion for<br />Every Living Being</h1>
            <p ref={(el) => (sectionRefs.current[2] = el)}>
              Every animal deserves love, safety, nourishment, and compassionate care. Together, we create a more humane society.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="detail-intro" ref={(el) => (sectionRefs.current[3] = el)}>
        <div className="section-container">
          <div className="detail-intro-grid">
            <div className="detail-intro-text">
              <span className="detail-section-tag">WELCOME TO</span>
              <h2>Project Pashu Premi</h2>
              <p>
                At <strong>AFLF (Ashray for Life Foundation)</strong>, we are dedicated to
                protecting, caring for, and improving the lives of stray and vulnerable animals.
                Project Pashu Premi is our heartfelt initiative to ensure every living being
                receives the love, safety, and compassion they deserve.
              </p>
              <p>
                Thousands of stray animals struggle daily for food, shelter, and survival.
                Through this initiative, AFLF provides nutritious food, clean drinking water,
                medical assistance, and essential care to help animals live healthier and
                safer lives.
              </p>
              <p className="detail-quote">
                "Kindness towards animals reflects the values of a compassionate community.
                Together, let's protect, nurture, and celebrate every life."
              </p>
            </div>
            <div className="detail-intro-image">
              <div className="detail-image-frame glass">
                <img src="/images/Pashu/img1.jpg" alt="Stray animal care" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="detail-mission" ref={(el) => (sectionRefs.current[4] = el)}>
        <div className="section-container">
          <h2>Our Mission</h2>
          <p className="detail-section-subtitle">
            Dedicated to creating a safer and more compassionate world for animals
          </p>
          <div className="detail-mission-grid">
            {missions.map((m, i) => (
              <div key={i} className="detail-mission-card glass">
                <div className="detail-mission-num">{String(i + 1).padStart(2, "0")}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="detail-impact" ref={(el) => (sectionRefs.current[5] = el)}>
        <div className="section-container">
          <div className="detail-impact-content">
            <span className="detail-section-tag">OUR IMPACT</span>
            <h2>Building a More Humane World</h2>
            <p>
              Every animal rescued, fed, and cared for is a victory for compassion. Through
              Project Pashu Premi, we have brought hope to countless stray and vulnerable
              animals, providing them with nourishment, medical care, and a safe haven.
            </p>
            <p>
              Each life saved, each injury treated, each full belly — these are the milestones
              that drive us forward. Your support helps us create a world where no animal is
              left behind or forgotten.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="detail-stats" ref={(el) => (sectionRefs.current[6] = el)}>
        <div className="detail-stats-grid">
          <div className="detail-stat glass">
            <span className="detail-stat-number">2000+</span>
            <span className="detail-stat-label">Animals Fed</span>
          </div>
          <div className="detail-stat glass">
            <span className="detail-stat-number">500+</span>
            <span className="detail-stat-label">Rescues</span>
          </div>
          <div className="detail-stat glass">
            <span className="detail-stat-number">50+</span>
            <span className="detail-stat-label">Vaccination Drives</span>
          </div>
          <div className="detail-stat glass">
            <span className="detail-stat-number">1000+</span>
            <span className="detail-stat-label">Medical Treatments</span>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="detail-gallery" ref={(el) => (sectionRefs.current[7] = el)}>
        <div className="section-container">
          <h2>Moments of Compassion</h2>
          <p className="detail-section-subtitle">Every life matters — celebrating the animals we've helped together</p>
          <div className="detail-gallery-grid">
            {galleryImages.map((img) => (
              <div key={img.id} className="detail-gallery-item glass">
                <img src={img.src} alt={img.alt} />
                <div className="detail-gallery-overlay">
                  <span>{img.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="detail-cta">
        <div className="section-container">
          <h2>Support Our Mission</h2>
          <p>Your support can help us protect, nurture, and care for more animals in need.</p>
          <div className="detail-cta-btns">
            <Link to="/donate" className="btn-primary-glass">Donate Now</Link>
            <Link to="/volunteer" className="btn-secondary-glass">Become a Volunteer</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
