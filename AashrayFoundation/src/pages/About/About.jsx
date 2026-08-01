import { Link } from 'react-router-dom';
import './About.css';

const sectors = [
  { name: "Education", icon: "school" },
  { name: "Zero Hunger Drive", icon: "restaurant" },
  { name: "Water Conservation", icon: "water_drop" },
  { name: "Women Empowerment", icon: "diversity_3" },
  { name: "Orphanage", icon: "home_heart" },
  { name: "Medical Aid", icon: "medical_services" },
  { name: "Old-Age Homes", icon: "elderly" },
];

function About() {
  return (
    <main className="page-about">
      <section className="bsct-home-hero-section">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/banner-mobile1.png" />
          <img src="/images/banner.jpg" alt="About Us" />
        </picture>
      </section>
      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-shape about-hero-shape--1" />
        <div className="about-hero-shape about-hero-shape--2" />
        <div className="section-container">
          <div className="about-hero-content">
            <span className="about-hero-badge glass">About Us</span>
            <h1>Who We Are</h1>
            <p>Ashray for Life Foundation (AFLF) — dedicated to holistic social service through seven key sectors of development.</p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="about-intro">
        <div className="section-container">
          <div className="about-intro-content">
            <p>
              <strong>Ashray for Life Foundation (AFLF)</strong>, established in 2022 by Mr. Naresh Bhanushali
              in Vadodara, Gujarat, is a non-profit organization (NGO) dedicated to making a lasting impact on
              society. Our foundation focuses on seven key sectors: Education, Zero Hunger Drive, Water
              Conservation, Women Empowerment, Orphanage, Medical Aid, and Old-Age Homes.
            </p>
            <p>
              We believe in taking <strong>"Sampoorn Samaj Seva"</strong> — holistic social service — and aim to
              bring meaningful change across all sections of society, from children to the elderly. The foundation
              proudly operates with <strong>100% transparency</strong>, ensuring that every donation and resource
              is utilized efficiently and ethically for maximum societal benefit.
            </p>
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section className="about-sectors">
        <div className="section-container">
          <h2>Our Seven Pillars</h2>
          <p className="about-sectors-subtitle">Focusing our efforts where they are needed the most</p>
          <div className="about-sectors-grid">
            {sectors.map((s, i) => (
              <div key={i} className="about-sector-card glass">
                <span className="material-symbol">{s.icon}</span>
                <h3>{s.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="about-mv">
        <div className="section-container">
          <div className="about-mv-grid">
            <div className="about-mv-card glass-dark">
              <h2>Our Mission</h2>
              <p>To create a Just, Equitable and Humane Society through holistic and sustainable interventions in the seven key sectors of social development.</p>
            </div>
            <div className="about-mv-card glass-dark about-mv-card-offset">
              <h2>Our Vision</h2>
              <p>To build a self-reliant society where every individual, regardless of their socio-economic status, has access to basic necessities and opportunities for a dignified life.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="about-founder">
        <div className="section-container">
          <div className="about-founder-grid">
            <div className="about-founder-image">
              <div className="about-founder-frame glass">
                <img src="/images/team/naresh-bhanushali.jpg" alt="Mr. Naresh Bhanushali" />
              </div>
            </div>
            <div className="about-founder-text">
              <span className="about-founder-tag">FOUNDER</span>
              <h2>Mr. Naresh Bhanushali</h2>
              <p>
                Shri Naresh Bhanushali, the founder of Ashray for Life Foundation (AFLF), is a passionate
                social worker from Vadodara, Gujarat. His vision is to create a self-sustaining and inclusive
                support system for the most vulnerable members of society.
              </p>
              <p>
                Under his leadership, AFLF has grown from a vision into a movement that touches lives across
                all seven sectors of social impact. He is supported by a dedicated team of trustees and
                professionals who ensure the foundation's mission is carried forward effectively.
              </p>
              <Link to="/about/management-team" className="btn-primary-glass">
                Meet Our Team
                <span className="material-symbol">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
