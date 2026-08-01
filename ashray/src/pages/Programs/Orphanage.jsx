import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Orphanage.css";

const galleryImages = [
  { id: 1, src: "/images/Ashray/img1.jpg", alt: "Ashray Project" },
  { id: 2, src: "/images/Ashray/img2.jpg", alt: "Ashray Project" },
  { id: 3, src: "/images/Ashray/img3.jpg", alt: "Ashray Project" },
  { id: 4, src: "/images/Ashray/img4.jpg", alt: "Ashray Project" },
  { id: 5, src: "/images/Ashray/img5.jpg", alt: "Ashray Project" },
  { id: 6, src: "/images/Ashray/img6.jpg", alt: "Ashray Project" },
];


const commitments = [
  {
    title: "Free Education",
    desc: "We offer free education to all children in the Ashra shelter, ensuring that financial constraints do not hinder their access to quality learning.",
  },
  {
    title: "School Supplies",
    desc: "We provide school bags and stationery to all the children, equipping them with the tools they need to excel in their studies.",
  },
  {
    title: "Nurturing Environment",
    desc: "Our dedicated team comes together to address the needs of these children, ensuring they receive the care, support, and love they deserve.",
  },
];

export default function Orphanage() {
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
    <div className="orphanage-page" style={{ '--hero-img': 'url("/images/AKA.jpg")' }}>
      {/* HERO */}
      <section className="detail-hero">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/banner-mobile7.png" />
          <img src="/images/AKA.jpg" alt="Project Ashra" />
        </picture>
        <div className="detail-hero-shape detail-hero-shape--1" />
        <div className="detail-hero-shape detail-hero-shape--2" />
        <div className="section-container">
          <div className="detail-hero-content">
            <span className="detail-hero-badge glass" ref={(el) => (sectionRefs.current[0] = el)}>PROJECT ASHRA</span>
            <h1 ref={(el) => (sectionRefs.current[1] = el)}>Empowering Futures,<br />One Child at a Time</h1>
            <p ref={(el) => (sectionRefs.current[2] = el)}>
              A haven of free education for underprivileged children — providing shelter, learning, and hope for a brighter tomorrow.
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
              <h2>Project Ashray Ka Aashra</h2>
              <p>
                The <strong>AFLF (Ashray for Life Foundation)</strong>, also recognized as
                <strong> "Ashray Ka Aashra from Malad,"</strong> serves as a haven of free
                education for underprivileged children. With a dedicated team, the foundation
                comes together to address the needs of these children, ensuring they receive
                the support they require.
              </p>
              <p>
                As a part of their mission, the foundation distributes education kits to these
                young minds, paving the way for a promising and luminous future. We believe in
                the transformative power of education — every child deserves the opportunity to
                learn, grow, and build a brighter future.
              </p>
              <p className="detail-quote">
                "We envision a world where every child has the chance to break free from the
                cycle of poverty through education."
              </p>
            </div>
            <div className="detail-intro-image">
              <div className="detail-image-frame glass">
                <img src="/images/Ashray/img1.jpg" alt="Children at shelter" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMITMENT */}
      <section className="detail-mission" ref={(el) => (sectionRefs.current[4] = el)}>
        <div className="section-container">
          <h2>Our Commitment</h2>
          <p className="detail-section-subtitle">
            Through Project Ashra, we are dedicated to creating lasting change for every child
          </p>
          <div className="detail-mission-grid">
            {commitments.map((m, i) => (
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
            <h2>Shaping Brighter Tomorrows</h2>
            <p>
              Through Project Ashra, we have witnessed the transformation of young lives.
              Children who once had no access to education now dream of becoming doctors,
              teachers, and engineers. The shelter provides not just education but a nurturing
              home where every child feels valued and loved.
            </p>
            <p>
              Every child who steps into our shelter, every education kit we distribute, every
              life we touch — these are the milestones that drive us forward. Together, we are
              sowing the seeds for a more equitable and hopeful future.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="detail-stats" ref={(el) => (sectionRefs.current[6] = el)}>
        <div className="detail-stats-grid">
          <div className="detail-stat glass">
            <span className="detail-stat-number">200+</span>
            <span className="detail-stat-label">Children Supported</span>
          </div>
          <div className="detail-stat glass">
            <span className="detail-stat-number">1000+</span>
            <span className="detail-stat-label">Education Kits Distributed</span>
          </div>
          <div className="detail-stat glass">
            <span className="detail-stat-number">10+</span>
            <span className="detail-stat-label">Years of Service</span>
          </div>
          <div className="detail-stat glass">
            <span className="detail-stat-number">24/7</span>
            <span className="detail-stat-label">Shelter & Care</span>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="detail-gallery" ref={(el) => (sectionRefs.current[7] = el)}>
        <div className="section-container">
          <h2>Moments of Joy</h2>
          <p className="detail-section-subtitle">Every smile tells a story of hope and transformation</p>
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
          <p>Your support can help us provide education, shelter, and hope to more children in need.</p>
          <div className="detail-cta-btns">
            <Link to="/donate" className="btn-primary-glass">Donate Now</Link>
            <Link to="/volunteer" className="btn-secondary-glass">Become a Volunteer</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
