import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Education.css";

const galleryImages = [
  { id: 1, src: "/images/education/Education2.jpg", alt: "Education Support" },
  { id: 2, src: "/images/education/Education3.jpg", alt: "Children Learning" },
  { id: 3, src: "/images/education/Education4.jpg", alt: "School Activities" },
  { id: 4, src: "/images/education/Education5.jpg", alt: "Educational Materials" },
  { id: 5, src: "/images/education/Education6.jpg", alt: "Classroom Support" },
  { id: 6, src: "/images/education/Education78.jpg", alt: "Students Learning" },
];

const missions = [
  {
    title: "Eliminating Child Labor",
    desc: "No child should ever have to work to survive. Through Project Vidhyalay, we work tirelessly to eradicate child labor, providing young souls with the gift of education.",
  },
  {
    title: "Access to Basic Education",
    desc: "Illiteracy and poverty have kept countless children from accessing even basic education. Project Vidhyalay bridges this gap, offering a pathway to learning and empowerment.",
  },
  {
    title: "Empowering Women",
    desc: "We empower daily wage workers and school dropout women with basic education, giving them the ability to read, write, and sign their names, opening doors to a brighter future.",
  },
];

export default function Education() {
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

  return ( <div className="education-page" style={{ '--hero-img': 'url(/images/education/Educationhome.jpg)' }}>
   
      {/* HERO */}
      <section className="detail-hero">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/banner-mobile3.png" />
          <img src="/images/education/Educationhome.jpg" alt="Education for All" />
        </picture>
        <div className="detail-hero-shape detail-hero-shape--1" />
        <div className="detail-hero-shape detail-hero-shape--2" />
        <div className="section-container">
          <div className="detail-hero-content">
            <span className="detail-hero-badge glass" ref={(el) => (sectionRefs.current[0] = el)}>PROJECT VIDHYALAY</span>
            <h1 ref={(el) => (sectionRefs.current[1] = el)}>Education for All,<br />Hope for Every Child</h1>
            <p ref={(el) => (sectionRefs.current[2] = el)}>
              Breaking the cycle of illiteracy and poverty by ensuring every underprivileged child has access to quality education.
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
              <h2>Project Vidhyalay</h2>
              <p>
                At <strong>AFLF (Ashray for Life Foundation)</strong>, we are committed to breaking the cycle
                of illiteracy and poverty by ensuring that every underprivileged child, every slum dweller,
                and every orphaned child has the opportunity to receive a quality education.
              </p>
              <p>
                Project Vidhyalay is our flagship initiative, dedicated to the cause of{" "}
                <strong>"Education for All."</strong> We believe that education is not just a fundamental
                right — it is the most powerful tool to transform lives, families, and entire communities.
              </p>
            </div>
            <div className="detail-intro-image">
              <div className="detail-image-frame glass">
                <img src="/images/education/Education1.jpg" alt="Students Learning" />
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
            Through Project Vidhyalay, we are dedicated to creating lasting change
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
            <h2>Transforming Lives Through Education</h2>
            <p>
              Through Project Vidhyalay, we have witnessed the transformation of lives. We've seen
              children trade their work tools for books, slum communities embrace education as a
              beacon of hope, and women gaining the confidence to pursue better opportunities for
              themselves and their families.
            </p>
            <p>
              Every child who steps into our classrooms, every woman who learns to read and write,
              every family that breaks free from poverty — these are the milestones that drive us
              forward. Education is the key that unlocks a world of possibilities.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="detail-stats" ref={(el) => (sectionRefs.current[6] = el)}>
        <div className="detail-stats-grid">
          <div className="detail-stat glass">
            <span className="detail-stat-number">500+</span>
            <span className="detail-stat-label">Children Educated</span>
          </div>
          <div className="detail-stat glass">
            <span className="detail-stat-number">200+</span>
            <span className="detail-stat-label">Women Empowered</span>
          </div>
          <div className="detail-stat glass">
            <span className="detail-stat-number">50+</span>
            <span className="detail-stat-label">Communities Reached</span>
          </div>
          <div className="detail-stat glass">
            <span className="detail-stat-number">100%</span>
            <span className="detail-stat-label">Dedicated to Change</span>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="detail-gallery" ref={(el) => (sectionRefs.current[7] = el)}>
        <div className="section-container">
          <h2>Moments of Learning</h2>
          <p className="detail-section-subtitle">Every picture tells a story of hope and transformation</p>
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
          <p>Your support can help us educate more children and transform more lives through learning.</p>
          <div className="detail-cta-btns">
            <Link to="/donate" className="btn-primary-glass">Donate Now</Link>
            <Link to="/volunteer" className="btn-secondary-glass">Become a Volunteer</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
