import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Volunteer.css";

const opportunities = [
  {
    title: "Field Volunteer",
    location: "Mumbai, Gujarat",
    type: "Part-time",
    desc: "Work directly with communities on education, hunger relief, and water conservation projects. Help distribute supplies and organize on-ground activities.",
  },
  {
    title: "Administrative Support",
    location: "Remote / Mumbai",
    type: "Flexible",
    desc: "Assist with documentation, data entry, coordination, and day-to-day operations. Help keep our foundation running smoothly.",
  },
  {
    title: "Digital & Social Media",
    location: "Remote",
    type: "Flexible",
    desc: "Manage our social media presence, create content, design graphics, and help spread awareness about our projects and initiatives.",
  },
  {
    title: "Fundraising & Events",
    location: "Mumbai",
    type: "Project-based",
    desc: "Organize fundraising events, reach out to potential donors, and help us build partnerships with corporates and individuals.",
  },
  {
    title: "Teaching & Mentoring",
    location: "Mumbai",
    type: "Part-time",
    desc: "Conduct classes, mentor children under Project VIDHYALAY, and help with skill development programs for women under Nari Tarang.",
  },
  {
    title: "Medical Outreach",
    location: "Mumbai, Thane",
    type: "On-call",
    desc: "Assist with medical camps, health awareness drives, and support Project LIFE-LINE in reaching patients who need critical care.",
  },
];

const benefits = [
  { icon: "badge", title: "Certificate of Service", desc: "Receive a recognized certificate for your contribution and hours served." },
  { icon: "groups", title: "Community Impact", desc: "Be part of a passionate team making real, measurable change in society." },
  { icon: "school", title: "Skill Development", desc: "Gain hands-on experience in social work, project management, and community outreach." },
  { icon: "diversity_3", title: "Networking", desc: "Connect with like-minded individuals, corporates, and industry professionals." },
  { icon: "favorite", title: "Personal Fulfillment", desc: "Experience the joy of giving back and making a difference in someone's life." },
  { icon: "trending_up", title: "Growth Opportunities", desc: "Outstanding volunteers get opportunities for leadership roles and paid positions." },
];

export default function Volunteer() {
  const sectionRefs = useRef([]);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="volunteer-page">
      {/* <section className="bsct-home-hero-section">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/banner-mobile8.png" />
          <img src="/images/banner.jpg" alt="Volunteer" />
        </picture>
      </section> */}
      {/* HERO
      <section className="detail-hero volunteer-hero">
        <div className="detail-hero-shape detail-hero-shape--1" />
        <div className="detail-hero-shape detail-hero-shape--2" />
        <div className="section-container">
          <div className="detail-hero-content">
            <span className="detail-hero-badge glass" ref={(el) => (sectionRefs.current[0] = el)}>GET INVOLVED</span>
            <h1 ref={(el) => (sectionRefs.current[1] = el)}>Volunteer With Us,<br />Be the Change</h1>
            <p ref={(el) => (sectionRefs.current[2] = el)}>
              Join our mission to create a Just, Equitable and Humane Society. Your time and skills can transform lives.
            </p>
          </div>
        </div>
      </section> */}

      {/* WHY VOLUNTEER */}
      <section className="detail-intro" ref={(el) => (sectionRefs.current[3] = el)}>
        <div className="section-container">
          <div className="detail-intro-grid">
            <div className="detail-intro-text">
              <span className="detail-section-tag">WHY VOLUNTEER</span>
              <h2>Make a Difference</h2>
              <p>
                At <strong>Ashray for Life Foundation (AFLF)</strong>, we believe that change starts with
                people like you. Whether you have a few hours a week or a few days a month, your contribution
                can create ripples of impact across our seven key sectors.
              </p>
              <p>
                From teaching children and feeding the hungry to providing medical aid and caring for the
                elderly — every volunteer plays a vital role in our mission. Join us and be part of something
                bigger than yourself.
              </p>
            </div>
            <div className="detail-intro-image">
              <div className="detail-image-frame glass">
                <img
                  src="images/BUTTER.jpg"
                  alt="Volunteers working together"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="detail-mission" ref={(el) => (sectionRefs.current[4] = el)}>
        <div className="section-container">
          <h2>Benefits of Volunteering</h2>
          <p className="detail-section-subtitle">
            When you give your time, you gain so much more in return
          </p>
          <div className="detail-mission-grid detail-mission-grid-6">
            {benefits.map((b, i) => (
              <div key={i} className="detail-mission-card glass">
                <div className="volunteer-benefit-icon">
                  <span className="material-symbol">{b.icon}</span>
                </div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPPORTUNITIES */}
      <section className="detail-impact volunteer-opportunities" ref={(el) => (sectionRefs.current[5] = el)}>
        <div className="section-container">
          <span className="detail-section-tag">OPEN POSITIONS</span>
          <h2>Current Opportunities</h2>
          <p className="detail-section-subtitle">
            Find a role that matches your skills and interests
          </p>
          <div className="volunteer-opp-grid">
            {opportunities.map((opp, i) => (
              <div key={i} className="volunteer-opp-card glass">
                <div className="volunteer-opp-header">
                  <h3>{opp.title}</h3>
                  <span className="volunteer-opp-type">{opp.type}</span>
                </div>
                <p className="volunteer-opp-location">
                  <span className="material-symbol">location_on</span> {opp.location}
                </p>
                <p className="volunteer-opp-desc">{opp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section className="volunteer-form-section" ref={(el) => (sectionRefs.current[6] = el)}>
        <div className="section-container">
          <div className="volunteer-form-card glass">
            <span className="detail-section-tag">APPLY NOW</span>
            <h2>Ready to Join?</h2>
            <p>Fill out the form below and our team will get in touch with you.</p>
            {submitted ? (
              <div className="volunteer-form-success">
                <span className="material-symbol">check_circle</span>
                <h3>Thank You!</h3>
                <p>We have received your application. Our team will reach out to you soon.</p>
              </div>
            ) : (
              <form className="volunteer-form" onSubmit={handleSubmit}>
                <div className="volunteer-form-row">
                  <div className="volunteer-form-group">
                    <label>Full Name *</label>
                    <input type="text" required placeholder="Your full name" />
                  </div>
                  <div className="volunteer-form-group">
                    <label>Email Address *</label>
                    <input type="email" required placeholder="your@email.com" />
                  </div>
                </div>
                <div className="volunteer-form-row">
                  <div className="volunteer-form-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="+91 98765 43210" />
                  </div>
                  <div className="volunteer-form-group">
                    <label>Area of Interest *</label>
                    <select required>
                      <option value="">Select an opportunity</option>
                      {opportunities.map((opp, i) => (
                        <option key={i} value={opp.title}>{opp.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="volunteer-form-group">
                  <label>Why do you want to volunteer with AFLF? *</label>
                  <textarea rows={4} required placeholder="Tell us about yourself and why you'd like to join us..."></textarea>
                </div>
                <button type="submit" className="btn-primary-glass">
                  Submit Application
                  <span className="material-symbol">send</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="detail-cta">
        <div className="section-container">
          <h2>Have Questions?</h2>
          <p>Reach out to us and we will be happy to help you find the right volunteer opportunity.</p>
          <div className="detail-cta-btns">
            <Link to="/ContactUs" className="btn-primary-glass">Contact Us</Link>
            <Link to="/donate" className="btn-secondary-glass">Support Us</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
