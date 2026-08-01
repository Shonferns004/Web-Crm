import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./JalProject.css";

const galleryImages = [
  { id: 1, src: "/images/jal/imgjal1.jpg", alt: "Clean Drinking Water" },
  { id: 2, src: "/images/jal/imgjal2.jpg", alt: "Water Purification" },
  { id: 3, src: "/images/jal/img3.jpg", alt: "Community Water Access" },
  { id: 4, src: "/images/jal/img4.jpg", alt: "Water Facility Installation" },
  { id: 5, src: "/images/jal/img5.jpg", alt: "Clean Water Distribution" },
  { id: 6, src: "/images/jal/imgjal6.jpg", alt: "Children Drinking Clean Water" },
];

const missions = [
  {
    title: "Clean Water Facilities",
    desc: "Installing clean water facilities, purifiers, and distribution points in areas where the need is most acute across Mumbai, New Mumbai, and Thane.",
  },
  {
    title: "Reaching the Needy",
    desc: "Focusing on underprivileged communities who face the daily struggle of accessing safe and clean water sources, affecting their health and well-being.",
  },
  {
    title: "Sustainable Impact",
    desc: "Working tirelessly to ensure that no one in our community has to go without clean, fresh drinking water — because clean water is the foundation of life.",
  },
];

export default function JalProject() {
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
    <div className="jal-page" style={{ '--hero-img': 'url(/images/jal/jal.jpg)' }}>
      {/* HERO */}
      <section className="detail-hero">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/banner-mobile2.png" />
          <img src="/images/jal/jal.jpg" alt="Project Jal" />
        </picture>
        <div className="detail-hero-shape detail-hero-shape--1" />
        <div className="detail-hero-shape detail-hero-shape--2" />
        <div className="section-container">
          <div className="detail-hero-content">
            <span className="detail-hero-badge glass" ref={(el) => (sectionRefs.current[0] = el)}>PROJECT JAL</span>
            <h1 ref={(el) => (sectionRefs.current[1] = el)}>Clean Water,<br />A Fundamental Right</h1>
            <p ref={(el) => (sectionRefs.current[2] = el)}>
              Dedicated to providing clean drinking water to underprivileged communities — because clean water is a fundamental human right.
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
              <h2>Project Jal</h2>
              <p>
                In a world where clean drinking water is a basic necessity, the{" "}
                <strong>AFLF (Ashray for Life Foundation)</strong> is committed to making a
                difference through our dedicated project, <strong>"Jal."</strong>
              </p>
              <p>
                Clean drinking water is not a luxury; it's a fundamental human right. Yet, many
                underprivileged communities in Mumbai, New Mumbai, and Thane face the daily struggle
                of accessing safe and clean water sources. This challenge not only affects their
                health but also their overall well-being.
              </p>
              <p>
                Through <strong>AFLF Project Jal</strong>, we are committed to installing clean water
                facilities, purifiers, and distribution points in areas where the need is most acute.
                We work tirelessly to ensure that no one in our community has to go without clean,
                fresh drinking water.
              </p>
              <p className="detail-quote">
                "Clean water is the foundation of life, and together, we can make a significant impact."
              </p>
            </div>
            <div className="detail-intro-image">
              <div className="detail-image-frame glass">
                <img src="/images/jal/imgjal1.jpg" alt="Clean Water" />
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
            Through Project Jal, we are fighting to ensure clean water access for all
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
            <h2>Bringing Clean Water, Restoring Hope</h2>
            <p>
              Through Project Jal, we have witnessed the transformation of communities. Families who
              once struggled to access clean drinking water now have reliable sources of safe water.
              Children who fell ill from waterborne diseases now have the foundation for good health.
            </p>
            <p>
              Every water facility installed, every purifier distributed, every life touched — these
              are the milestones that drive us forward. Together, we are building communities where
              clean water flows freely to every corner.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="detail-stats" ref={(el) => (sectionRefs.current[6] = el)}>
        <div className="detail-stats-grid">
          <div className="detail-stat glass">
            <span className="detail-stat-number">50+</span>
            <span className="detail-stat-label">Water Facilities Installed</span>
          </div>
          <div className="detail-stat glass">
            <span className="detail-stat-number">10,000+</span>
            <span className="detail-stat-label">People Served</span>
          </div>
          <div className="detail-stat glass">
            <span className="detail-stat-number">25+</span>
            <span className="detail-stat-label">Communities Reached</span>
          </div>
          <div className="detail-stat glass">
            <span className="detail-stat-number">24/7</span>
            <span className="detail-stat-label">Community Service</span>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="detail-gallery" ref={(el) => (sectionRefs.current[7] = el)}>
        <div className="section-container">
          <h2>Moments of Impact</h2>
          <p className="detail-section-subtitle">Every drop of clean water brings hope and health</p>
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
          <p>Your support can help us bring clean water to more communities and save lives.</p>
          <div className="detail-cta-btns">
            <Link to="/donate" className="btn-primary-glass">Donate Now</Link>
            <Link to="/volunteer" className="btn-secondary-glass">Become a Volunteer</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
