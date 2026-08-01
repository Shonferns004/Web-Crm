import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Medical.css";

const galleryImages = [
  { id: 1, src: "/images/Sahara/img1.jpg", alt: "Medical care" },
  { id: 2, src: "/images/Sahara/img2.jpg", alt: "Surgery support" },
  { id: 3, src: "/images/Sahara/img3.jpg", alt: "Hospital care" },
  // { id: 4, src: "/images/Sahara/img4.jpg", alt: "Child healthcare" },
  // { id: 5, src: "/images/Sahara/img5.jpg", alt: "Medical treatment" },
  // { id: 6, src: "/images/Sahara/img6.jpg", alt: "Hope and healing" },
];

const missions = [
  {
    title: "Promoting Independence",
    desc: "We empower disabled and specially-abled individuals by providing resources that help them live independently and with dignity.",
  },
  {
    title: "Mobility & Accessibility Support",
    desc: "Through wheelchairs and tricycles, we enhance mobility, enabling beneficiaries to participate actively in daily life and society.",
  },
  {
    title: "Sustainable Livelihood Opportunities",
    desc: "By providing sewing machines, flour mills, and skill support, we help individuals generate income and build a self-reliant future.",
  },
];

export default function Medical() {
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
    <div className="medical-page" style={{ '--hero-img': 'url(/images/Sahara/Sahara.jpg)' }}>
      {/* HERO */}
      <section className="detail-hero">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/banner-mobile4.png" />
          <img src="/images/Sahara/Sahara.jpg" alt="Project Life-Line" />
        </picture>
        <div className="detail-hero-shape detail-hero-shape--1" />
        <div className="detail-hero-shape detail-hero-shape--2" />
        <div className="section-container">
          <div className="detail-hero-content">
            <span className="detail-hero-badge glass" ref={(el) => (sectionRefs.current[0] = el)}>PROJECT LIFE-LINE</span>
            <h1 ref={(el) => (sectionRefs.current[1] = el)}>Saving Lives,<br />One Surgery at a Time</h1>
            <p ref={(el) => (sectionRefs.current[2] = el)}>
              Every heartbeat counts. Project Lifeline is our unwavering commitment to providing
              a lifeline of hope to the poorest and most vulnerable among us.
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
              <h2>Project Sahara</h2>
                <p>
                At <strong>AFLF (Ashray For Life Foundation)</strong>, we believe that every
                individual deserves the opportunity to live with dignity, independence, and
                self-confidence. <strong>Project SAHARA</strong> is dedicated to empowering
                disabled and specially-abled individuals by providing essential resources that
                help them lead self-reliant and fulfilling lives.
              </p>
              <p>
                Through this initiative, we provide livelihood and mobility support such as
                sewing machines, flour mills, and wheelchairs. These resources
                enable beneficiaries to earn a sustainable income, improve their mobility, and
                actively participate in society with greater confidence and independence.
              </p>
             <p className="detail-quote">
              "Empowering abilities, restoring dignity, and creating pathways to
              independence for a brighter tomorrow."
            </p>
            </div>
            <div className="detail-intro-image">
              <div className="detail-image-frame glass">
                <img
                  src="/images/Sahara/img4.jpg"
                  alt="Medical care"
                />
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
             Enabling independence and dignity for disabled and specially-abled individuals.
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
            <h2>Transforming Lives Through Independence</h2>
           <p>
            Through Project SAHARA, disabled and specially-abled individuals have gained
            greater mobility, confidence, and opportunities for self-reliance. Access to
            livelihood resources has helped beneficiaries support themselves and their
            families with dignity.
          </p>
           <p>
            Every wheelchair delivered, every tricycle provided, and every livelihood tool
            distributed represents a step toward empowerment. Together, we are building a
            more inclusive society where abilities are strengthened and lives are transformed.
          </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="detail-stats" ref={(el) => (sectionRefs.current[6] = el)}>
        <div className="detail-stats-grid">
          <div className="detail-stat glass">
            <span className="detail-stat-number">500+</span>
            <span className="detail-stat-label">Lives Empowered</span>
          </div>
          <div className="detail-stat glass">
            <span className="detail-stat-number">100+</span>
            <span className="detail-stat-label">Mobility Aids Provided</span>
          </div>
          <div className="detail-stat glass">
            <span className="detail-stat-number">200+</span>
            <span className="detail-stat-label">Livelihood Tools Distributed</span>
          </div>
          <div className="detail-stat glass">
            <span className="detail-stat-number">24/7</span>
            <span className="detail-stat-label">Families Supported</span>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="detail-gallery" ref={(el) => (sectionRefs.current[7] = el)}>
        <div className="section-container">
          <h2>Moments of Healing</h2>
          <p className="detail-section-subtitle">Every life saved is a testament to the power of compassion</p>
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
          <p>  Your support can help empower disabled and specially-abled individuals with mobility, livelihood opportunities, and a life of dignity..</p>
          <div className="detail-cta-btns">
            <Link to="/donate" className="btn-primary-glass">Donate Now</Link>
            <Link to="/volunteer" className="btn-secondary-glass">Become a Volunteer</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
