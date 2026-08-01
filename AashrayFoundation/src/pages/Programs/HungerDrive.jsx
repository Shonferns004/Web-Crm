import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./HungerDrive.css";

const galleryImages = [
  { id: 1, src: "/images/ZeroHunger/Hunger7.jpg", alt: "Food Distribution" },
  { id: 2, src: "/images/ZeroHunger/Hunger3.jpg", alt: "Meal Preparation" },
  { id: 3, src: "/images/ZeroHunger/Hunger4.jpg", alt: "Community Kitchen" },
  { id: 4, src: "/images/ZeroHunger/Hunger5.jpg", alt: "Food Packets" },
  { id: 5, src: "/images/ZeroHunger/Hunger6.jpg", alt: "Volunteers Serving" },
  { id: 6, src: "/images/ZeroHunger/Hunger21.jpg", alt: "Happy Children Eating" },
];

const missions = [
  {
    title: "Monthly Food Kits",
    desc: "We distribute essential food kits containing rice, wheat flour, rava, poha, oil, masala, and more to BPL families and individuals in need across Mumbai's slums.",
  },
  {
    title: "Reaching the Most Vulnerable",
    desc: "Our focus is on senior citizens, Divyang members, visually impaired individuals, homeless people, and those who struggle daily to find a single meal.",
  },
  {
    title: "Ending Hunger Together",
    desc: "Through community support and collective action, we aim to eliminate hunger-related deaths and ensure no one sleeps hungry in Mumbai.",
  },
];

export default function HungerDrive() {
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
    <div className="hunger-page" style={{ '--hero-img': 'url(/images/ZeroHunger/Hunger.jpg)' }}>
      {/* HERO */}
      <section className="detail-hero">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/banner-mobile6.png" />
          <img src="/images/ZeroHunger/Hunger.jpg" alt="Zero Hunger Drive" />
        </picture>
        <div className="detail-hero-shape detail-hero-shape--1" />
        <div className="detail-hero-shape detail-hero-shape--2" />
        <div className="section-container">
          <div className="detail-hero-content">
            <span className="detail-hero-badge glass" ref={(el) => (sectionRefs.current[0] = el)}>PROJECT ZERO HUNGER DRIVE</span>
            <h1 ref={(el) => (sectionRefs.current[1] = el)}>Ending Hunger,<br />One Meal at a Time</h1>
            <p ref={(el) => (sectionRefs.current[2] = el)}>
              Dedicated to providing essential food to those in dire need — because no one should go to bed hungry.
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
              <h2>Project Zero Hunger Drive</h2>
              <p>
                At <strong>AFLF (Ashray for Life Foundation)</strong>, Project "Zero Hunger Drive" is dedicated to
                providing essential food to those who are in dire need, as countless individuals in Mumbai's slums and
                across India go without food, resulting in tragic hunger-related deaths.
              </p>
              <p>
                Our mission is to combat this issue through monthly food kit distributions. These kits contain items
                such as rice, wheat flour, rava, poha, oil, masala, and more, which are distributed to Below Poverty
                Line (BPL) families, senior citizens, Divyang members, visually impaired individuals, as well as
                those who are homeless and in need in Mumbai.
              </p>
              <p className="detail-quote">
                "There are miles to go before we AFLF sleep — because in Mumbai's slums, many people are left hungry.
                We are hungry for change, and together, we can feed the hungry."
              </p>
            </div>
            <div className="detail-intro-image">
              <div className="detail-image-frame glass">
                <img src="/images/ZeroHunger/Hunger1.jpg" alt="Food distribution" />
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
            Through Project Zero Hunger Drive, we are fighting to end hunger and malnutrition
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
            <h2>Fighting Hunger, Restoring Hope</h2>
            <p>
              Through Project Zero Hunger Drive, we have witnessed the transformation of lives. Families who once
              struggled to find a single meal now receive consistent support. Children who went to school hungry
              now have the nutrition they need to learn and grow.
            </p>
            <p>
              Every food kit distributed, every family supported, every life touched — these are the milestones
              that drive us forward. Together, we are building a community where no one has to suffer from hunger.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="detail-stats" ref={(el) => (sectionRefs.current[6] = el)}>
        <div className="detail-stats-grid">
          <div className="detail-stat glass">
            <span className="detail-stat-number">10,000+</span>
            <span className="detail-stat-label">Food Kits Distributed</span>
          </div>
          <div className="detail-stat glass">
            <span className="detail-stat-number">5,000+</span>
            <span className="detail-stat-label">Families Supported</span>
          </div>
          <div className="detail-stat glass">
            <span className="detail-stat-number">50+</span>
            <span className="detail-stat-label">Slums Reached</span>
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
          <h2>Moments of Hope</h2>
          <p className="detail-section-subtitle">Every meal shared is a step toward a hunger-free world</p>
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
          <p>Your support can help us feed more families and end hunger in our communities.</p>
          <div className="detail-cta-btns">
            <Link to="/donate" className="btn-primary-glass">Donate Now</Link>
            <Link to="/volunteer" className="btn-secondary-glass">Become a Volunteer</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
