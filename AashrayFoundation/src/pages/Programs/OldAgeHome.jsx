import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./OldAgeHome.css";

const galleryImages = [
  { id: 1, src: "/images/oldage/img1.jpg", alt: "Elderly Care" },
  { id: 2, src: "/images/oldage/img2.jpg", alt: "Quality Time" },
  { id: 3, src: "/images/oldage/img3.jpg", alt: "Celebrations" },
  { id: 4, src: "/images/oldage/img4.jpg", alt: "Community Support" },
  { id: 5, src: "/images/oldage/img5.jpg", alt: "Golden Years" },
  { id: 6, src: "/images/oldage/img6.jpg", alt: "Dignity And Respect" },
];

const missions = [
  {
    title: "Advocating for the Elderly",
    desc: "In a country with a projected 138 million elderly individuals, AFLF is their voice. We champion their concerns and rights, ensuring they lead secure, joyful, and dignified lives.",
  },
  {
    title: "Supporting Old-Age Homes",
    desc: "We provide essential support in the form of food grains, regular visits, and quality time spent, making their days brighter and more meaningful.",
  },
  {
    title: "Celebrating Life's Moments",
    desc: "We celebrate the special occasions of our elderly friends, like birthdays and festivals, bringing smiles, joy, and a sense of belonging to their lives.",
  },
];

export default function OldAgeHome() {
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
    <div className="oldage-page" style={{ '--hero-img': 'url(/images/oldage/oldage.jpg)' }}>
      {/* HERO */}
      <section className="detail-hero">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/banner-mobile8.png" />
          <img src="/images/oldage.jpg" alt="" />
        </picture>
        <div className="detail-hero-shape detail-hero-shape--1" />
        <div className="detail-hero-shape detail-hero-shape--2" />
        <div className="section-container">
          <div className="detail-hero-content">
            <span className="detail-hero-badge glass" ref={(el) => (sectionRefs.current[0] = el)}>PROJECT SAHARA</span>
            <h1 ref={(el) => (sectionRefs.current[1] = el)}>Dignity & Care,<br />For Every Senior</h1>
            <p ref={(el) => (sectionRefs.current[2] = el)}>
              We envision a society where our seniors have the right to an active, healthy, and dignified life, regardless of their circumstances.
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
              <h2>Project Ashray Ka Aashram </h2>
              <p>
                At <strong>AFLF (Ashray for Life Foundation)</strong>, we are dedicated to a
                cause that transcends age, but centers on the invaluable wisdom and experience
                of our elderly population. We envision a society where our seniors have the
                right to an active, healthy, and dignified life, regardless of their circumstances.
              </p>
              <p>
                In a country with a projected 138 million elderly individuals, AFLF is their
                voice. We champion their concerns and rights, working tirelessly to ensure
                that they lead secure, joyful, and dignified lives.
              </p>
              <p className="detail-quote">
                "Together, we can ensure that our seniors live their golden years with the
                dignity and respect they deserve."
              </p>
            </div>
            <div className="detail-intro-image">
              <div className="detail-image-frame glass">
                <img src="/images/oldage/img1.jpg" alt="Elderly care" />
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
            Dedicated to empowering and uplifting the lives of disadvantaged older persons
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
            <h2>Giving Seniors the Dignity They Deserve</h2>
            <p>
              For many elderly individuals, old-age homes are their haven. Through Project
              Ashray Ka Aashram , we provide essential support, companionship, and a sense of belonging.
              Our regular visits, food grain distributions, and festive celebrations bring
              warmth and joy to their golden years.
            </p>
            <p>
              Every smile we bring, every celebration we share, every moment of dignity we
              restore — these are the milestones that drive us forward. Together, we can
              ensure that no senior feels forgotten or alone.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="detail-stats" ref={(el) => (sectionRefs.current[6] = el)}>
        <div className="detail-stats-grid">
          <div className="detail-stat glass">
            <span className="detail-stat-number">138M+</span>
            <span className="detail-stat-label">Elderly Population</span>
          </div>
          <div className="detail-stat glass">
            <span className="detail-stat-number">500+</span>
            <span className="detail-stat-label">Seniors Supported</span>
          </div>
          <div className="detail-stat glass">
            <span className="detail-stat-number">50+</span>
            <span className="detail-stat-label">Old-Age Homes</span>
          </div>
          <div className="detail-stat glass">
            <span className="detail-stat-number">100+</span>
            <span className="detail-stat-label">Celebrations Hosted</span>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="detail-gallery" ref={(el) => (sectionRefs.current[7] = el)}>
        <div className="section-container">
          <h2>Moments of Joy</h2>
          <p className="detail-section-subtitle">Bringing smiles, joy, and a sense of belonging to our senior friends</p>
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
          <p>Your support can help us bring dignity, care, and companionship to more seniors in need.</p>
          <div className="detail-cta-btns">
            <Link to="/donate" className="btn-primary-glass">Donate Now</Link>
            <Link to="/volunteer" className="btn-secondary-glass">Become a Volunteer</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
