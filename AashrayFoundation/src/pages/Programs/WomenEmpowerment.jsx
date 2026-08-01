import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./WomenEmpowerment.css";

const galleryImages = [
  { id: 1, src: "/images/NariTarang/img2.jpg", alt: "Women Empowerment" },
  { id: 2, src: "/images/NariTarang/img3.jpg", alt: "Vocational Training" },
  { id: 3, src: "/images/NariTarang/img4.jpg", alt: "Skill Development" },
  { id: 4, src: "/images/NariTarang/img5.jpg", alt: "Women Entrepreneurs" },
  { id: 5, src: "/images/NariTarang/img6.jpg", alt: "Community Support" },
  { id: 6, src: "/images/NariTarang/img1.jpg", alt: "Education For Girls" },
];

const focusAreas = [
  {
    title: "Education for Girls",
    desc: "We believe education is the key to empowerment. Through our initiatives, we provide girls with access to quality education, opening doors to a world of opportunities and knowledge.",
  },
  {
    title: "Self-Defense Training",
    desc: "Safety is paramount. We equip girls and women with self-defense techniques, ensuring they can protect themselves and stand up against any form of threat.",
  },
  {
    title: "Vocational Training",
    desc: "We offer training programs in sewing, beauty, candle making, and small business management. These skills boost self-confidence and create pathways to financial independence.",
  },
  {
    title: "Entrepreneurship",
    desc: "Our training nurtures the entrepreneurial spirit. We provide women with the tools and knowledge to start and manage their small businesses, fostering economic self-sufficiency.",
  },
  {
    title: "Health & Well-being",
    desc: "Empowerment also involves taking care of physical and mental well-being. We raise awareness about women's health issues and provide resources for overall wellness.",
  },
  {
    title: "Join Our Movement",
    desc: "Women's empowerment is a collective effort. You can support AFLF's mission by contributing, volunteering, or spreading awareness. Together, we can light the path to independence.",
  },
];

export default function WomenEmpowerment() {
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
    <div className="womens-page" style={{ '--hero-img': 'url(/images/NariTarang/naariiiii.jpg)' }}>
      {/* HERO */}
      <section className="detail-hero">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/banner-mobile1.png" />
          <img src="/images/NariTarang/naariiiii.jpg" alt="Women Empowerment" />
        </picture>
        <div className="detail-hero-shape detail-hero-shape--1" />
        <div className="detail-hero-shape detail-hero-shape--2" />
        <div className="section-container">
          <div className="detail-hero-content">
            <span className="detail-hero-badge glass" ref={(el) => (sectionRefs.current[0] = el)}>PROJECT NARI TARANG</span>
            <h1 ref={(el) => (sectionRefs.current[1] = el)}>Empowering Women,<br />Transforming Communities</h1>
            <p ref={(el) => (sectionRefs.current[2] = el)}>
              Enabling women to take charge of their lives, make independent choices, and lead healthier, more fulfilling lives.
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
              <h2>Project Nari Tarang</h2>
              <p>
                At <strong>AFLF (Ashray for Life Foundation)</strong>, we are dedicated to the cause
                of women's empowerment through Project <strong>"Nari Tarang"</strong> — striving to
                enable women to take charge of their lives, make independent choices, and lead
                healthier, more fulfilling lives.
              </p>
              <p>
                Empowering women is not just a choice; it's a necessity. We believe that empowered
                women are the cornerstone of a stronger, more equitable society. Through our
                comprehensive initiatives, we light the path to independence and brighter futures
                for women and girls.
              </p>
              <p className="detail-quote">
                "Empower women, empower the world. At AFLF, we believe that every woman has the
                power to shape her destiny."
              </p>
            </div>
            <div className="detail-intro-image">
              <div className="detail-image-frame glass">
                <img src="/images/NariTarang/Q9.jpg" alt="Women Empowerment" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section className="detail-mission" ref={(el) => (sectionRefs.current[4] = el)}>
        <div className="section-container">
          <h2>Our Focus Areas</h2>
          <p className="detail-section-subtitle">
            Through Project Nari Tarang, we create lasting change for women and girls
          </p>
          <div className="detail-mission-grid detail-mission-grid-6">
            {focusAreas.map((m, i) => (
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
            <h2>Transforming Lives, Building Futures</h2>
            <p>
              Through Project Nari Tarang, we have witnessed the transformation of countless women.
              Girls who once had no access to education now dream of careers. Women who depended on
              others now run their own businesses. Communities once held back by inequality now
              thrive with empowered women leading the way.
            </p>
            <p>
              Every girl educated, every woman trained, every life empowered — these are the
              milestones that drive us forward. Together, we are building a world where every
              woman has the power to shape her own destiny.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="detail-stats" ref={(el) => (sectionRefs.current[6] = el)}>
        <div className="detail-stats-grid">
          <div className="detail-stat glass">
            <span className="detail-stat-number">500+</span>
            <span className="detail-stat-label">Women Empowered</span>
          </div>
          <div className="detail-stat glass">
            <span className="detail-stat-number">200+</span>
            <span className="detail-stat-label">Girls Educated</span>
          </div>
          <div className="detail-stat glass">
            <span className="detail-stat-number">100+</span>
            <span className="detail-stat-label">Businesses Started</span>
          </div>
          <div className="detail-stat glass">
            <span className="detail-stat-number">24/7</span>
            <span className="detail-stat-label">Community Support</span>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="detail-gallery" ref={(el) => (sectionRefs.current[7] = el)}>
        <div className="section-container">
          <h2>Moments of Empowerment</h2>
          <p className="detail-section-subtitle">Every story of empowerment inspires a brighter tomorrow</p>
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
          <p>Your support can help us empower more women and build a more equitable society.</p>
          <div className="detail-cta-btns">
            <Link to="/donate" className="btn-primary-glass">Donate Now</Link>
            <Link to="/volunteer" className="btn-secondary-glass">Become a Volunteer</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
