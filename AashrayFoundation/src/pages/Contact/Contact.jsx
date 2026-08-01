import { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      {/* HERO */}
      {/* <section className="bsct-home-hero-section">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/banner-mobile1.png" />
          <img src="/images/banner.jpg" alt="Contact Us" />
        </picture>
      </section> */}
      <section className="contact-hero">
        <div className="contact-hero-shape contact-hero-shape--1" />
        <div className="contact-hero-shape contact-hero-shape--2" />
        <div className="section-container">
          <div className="contact-hero-content">
            <span className="contact-hero-badge glass">Get In Touch</span>
            <h1>Contact Us</h1>
            <p>We'd love to hear from you. Get in touch with our team.</p>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="contact-main">
        <div className="section-container">
          <div className="contact-grid">
            <div className="contact-info">
              {/* <h2>Get in Touch</h2>
              <p className="contact-info-desc">
                Have a question, want to volunteer, or need more information?
                We're here to help.
              </p> */}

              <div className="contact-info-item glass">
                <div className="contact-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3>Address</h3>
                  <p>
                    Unit - 218, 2nd Floor, Auris Galleria,<br />
                    New Link Road, Auris Serenity,<br />
                    Malad (West), Mumbai - 400064.
                  </p>
                </div>
              </div>

              <div className="contact-info-item glass">
                <div className="contact-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h3>Phone</h3>
                  <p>+91 9930028300</p>
                </div>
              </div>

              <div className="contact-info-item glass">
                <div className="contact-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <h3>Email</h3>
                  <p>ashrayforlifefoundation@gmail.com</p>
                </div>
              </div>

              <div className="contact-info-item glass">
                <div className="contact-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="15" y1="3" x2="15" y2="21" />
                  </svg>
                </div>
                <div>
                  <h3> Bank Details</h3>
                  <p>
                    <strong>Account Name:</strong> Ashray For Life Foundation<br />
                    <strong>Bank:</strong> Axis Bank (Malad-West)<br />
                    <strong>Account No:</strong> 923010009459428<br />
                    <strong>IFSC:</strong> UTIB0004707
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper glass">
              {submitted ? (
                <div className="contact-success">
                  <div className="contact-success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#4a6fa5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h3>Thank You!</h3>
                  <p>Your message has been sent successfully. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <h2>Send Us a Message</h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input type="text" id="name" placeholder="Your full name" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input type="text" id="subject" placeholder="How can we help?" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" rows="5" placeholder="Write your message here..." required></textarea>
                  </div>
                  <button type="submit" className="contact-submit">Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
