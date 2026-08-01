import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import galleryData from "../../data/galleryData";
import Partners from "../../components/Partners/Partners";

import "./Home.css";

const stories = [
  {
    id: 1,
    tag: "Impact Story",
    date: "Oct 12, 2024",
    title: "From Support to Self-Reliance",
    description:
      "Through our community initiatives, individuals facing difficult circumstances received the resources, guidance, and opportunities needed to rebuild their lives and move towards a brighter future.",
    image:
      "/images/Volunteers1.jpg",
  },
  {
    id: 2,
    tag: "Project News",
    date: "Sep 28, 2024",
    title: "Sustainable water solutions reach 5 new villages",
    description:
      "Project JAL has successfully implemented solar-powered filtration plants in the drought-hit regions of Rajasthan, serving over 2000 families.",
    image:
      "/images/Volunteers2.jpg",
  },
  {
    id: 3,
    tag: "Volunteer Spotlight",
    date: "Sep 15, 2024",
    title: "Finding purpose in the golden years of others",
    description:
      "Meet our longest-serving volunteer, Arun, who has dedicated his weekends for 5 years to ensuring the residents of Sahara never feel alone.",
    image:
      "/images/Volunteers3.jpg",
  },
];

const testimonials = [
  {
    id: 1,
    quote:
      "The level of transparency and professional dedication seen at AFLF is rare. Every time I visit one of their projects, I am moved by the tangible progress and the genuine love the team has for their work.",
    name: "Dr. Rajesh Sharma",
    role: "Corporate Partner, Global Health Ltd",
    initials: "RS",
    color: "accent",
  },
  {
    id: 2,
    quote:
      "As a monthly donor, I get regular updates that actually show me where my money goes. From a well being dug to an animal being rescued, it makes me feel like I am truly part of the change.",
    name: "Ananya Patel",
    role: "Monthly Supporter Since 2018",
    initials: "AP",
    color: "primary",
  },
  {
    id: 3,
    quote:
      "Volunteering with AFLF has been a life-changing experience. The team's dedication to holistic social service is inspiring, and every moment spent serving the community is deeply fulfilling.",
    name: "Rohit Verma",
    role: "Volunteer, Project VIDHYALAY",
    initials: "RV",
    color: "accent",
  },
  {
    id: 4,
    quote:
      "I have seen firsthand how Project JAL has transformed our village. Clean water has given our children health and our women freedom. AFLF's transparency and commitment are unmatched.",
    name: "Sunita Devi",
    role: "Community Leader, Rajasthan",
    initials: "SD",
    color: "primary",
  },
];

const allProjects = [
  {
    id: 1,
    title: "Project Vidhyalay",
    desc: "Education initiatives for underprivileged children.",
    tag: "Education",
    image: "/images/education/Education1.jpg",
  },
  {
    id: 2,
    title: "Zero Hunger Drive",
    desc: "Eradicating hunger through food distribution and nutrition programs.",
    tag: "Food & Nutrition",
    image: "/images/ZeroHunger/Hunger5.jpg",
  },
  {
    id: 3,
    title: "Project JAL",
    desc: "Clean water access for rural communities through conservation and filtration.",
    tag: "Clean Water",
    image: "/images/jal/jal2.jpg",
  },
  {
    id: 4,
    title: "Project Nari Tarang",
    desc: "Empowering women with education, skills, and self-reliance opportunities.",
    tag: "Women Empowerment",
    image: "/images/NariTarang/img1.jpg",
  },
  {
    id: 5,
    title: "Project Ashray ka Aashra",
    desc: "Ashray Ka Aashra - comprehensive care for orphaned children.",
    tag: "Orphan Care",
    image: "/images/Ashray/img1.jpg",
  },
  {
    id: 6,
    title: "Project Sahara",
    desc: "Creating opportunities for self-reliance.",
    tag: "Disability Support",
    image: "/images/medical/img4.jpg",
  },
  {
    id: 7,
    title: "Project Ashray ka Aashram",
    desc: "Dignified support and homes for the elderly.",
    tag: "Elderly Care",
    image: "/images/oldage/img1.jpg",
  },

   {
    id: 8,
    title: "Project Pashu Premi",
    desc: "Providing care, rescue, and protection for stray and vulnerable animals.",
    tag: "Animal Welfare",
    image: "/images/Pashu/img1.jpg",
  },
];

function Home() {
  const [showAll, setShowAll] = useState(false);
  const projects = showAll ? allProjects : allProjects.slice(0, 4);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains("reveal")) {
              setTimeout(() => entry.target.classList.add("visible"), i * 100);
            } else {
              entry.target.classList.add("animate-in");
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".observe-fade, .reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>

<section className="bsct-home-hero-section">
  <picture>
    <source
      media="(max-width: 768px)"
      srcSet="/images/banner-mobile.jpeg"
    />
    <img
      src="/images/banner.jpg" 
      alt="BSCT Banner"
    />
  </picture>
</section>

      {/* ===== HERO ===== */}
      <section className="home-hero">
        <div className="hero-shape hero-shape--1" />
        <div className="hero-shape hero-shape--2" />
        <div className="hero-container">
          <div className="hero-text-col">
            <span className="hero-badge">Empowering Lives Since 2022</span>
            <h1 className="hero-title">
              Creating A Better <span className="hero-title-accent">Future Together</span>
            </h1>
            <p className="hero-desc">
              We are dedicated to providing sustainable support for those in need, bridging the gap between hope and reality through community-driven initiatives.
            </p>
            <div className="hero-btns">
              <Link to="/donate" className="btn-primary-glass">
                <span className="material-symbol">volunteer_activism</span>
                Donate Now
              </Link>
              <Link to="/about" className="btn-secondary-glass">
                Learn Our Story
              </Link>
            </div>
          </div>
          <div className="hero-image-col">
            <div className="hero-image-frame">
              <img
                src="/images/banner1.jpg"
                alt="Children smiling"
              />
            </div>
            <div className="hero-decor" />
          </div>
        </div>
      </section>

      {/* ===== STATS & INTRO ===== */}
      <section className="stats-section">
        <div className="section-container">
          <div className="stats-grid">
            <div className="stats-text-col">
              <h2 className="stats-title">Who We Are<br /></h2>
              <p className="stats-desc">
                Ashray for Life Foundation (AFLF), established in 2022 by Mr. Naresh Bhanushali in Vadodara, Gujarat, is a non-profit organization (NGO) dedicated to making a lasting impact on society. We focus on seven key sectors: Education, Zero Hunger Drive, Water Conservation, Women Empowerment, Orphanage, Medical Aid, and Old-Age Homes.
              </p>
              <div className="stats-numbers">
                <div className="stat-card glass">
                  <span className="stat-value">15k+</span>
                  <span className="stat-label">Impacted</span>
                </div>
                <div className="stat-card glass">
                  <span className="stat-value">50+</span>
                  <span className="stat-label">Projects</span>
                </div>
                <div className="stat-card glass">
                  <span className="stat-value">12</span>
                  <span className="stat-label">Cities</span>
                </div>
              </div>
            </div>
            <div className="stats-cards-col">
              <div className="stats-bg-glow" />
              <div className="stat-feature-card glass-dark">
                <h3>Our Institutional Trust</h3>
                <p>Partnered with over 30 corporate entities to ensure transparency and high-impact delivery of every single rupee donated.</p>
              </div>
              <div className="stat-feature-card glass">
                <div className="feature-icon">
                  <span className="material-symbol">verified</span>
                </div>
                <h4>Transparency</h4>
                <p>100% auditable funds allocation across all sectors.</p>
              </div>
              <div className="stat-feature-card glass">
                <div className="feature-icon">
                  <span className="material-symbol">groups</span>
                </div>
                <h4>Community</h4>
                <p>Driven by 500+ dedicated volunteers nationwide.</p>
              </div>
              <div className="stat-feature-card glass">
                <div className="feature-icon">
                  <span className="material-symbol">monitoring</span>
                </div>
                <h4>Impact</h4>
                <p>Measurable outcomes across 7 sectors with 100+ grassroots projects delivered.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section className="projects-section">
        <div className="section-container">
          <div className="projects-header">
            <div>
              <h2 className="projects-title">Our Projects</h2>
              <p className="projects-subtitle">Focusing our efforts where they are needed the most.</p>
            </div>
            {/* <button onClick={() => setShowAll(!showAll)} className="projects-view-btn glass">
              {showAll ? "Show Less" : "View All Projects"}
              <span className="material-symbol">{showAll ? "expand_less" : "arrow_forward"}</span>
            </button> */}
          </div>
          <div className="projects-grid">
            <div className="projects-track">
              {[...projects, ...projects].map((project, i) => (
                <div key={`${project.id}-${i}`} className="project-card-wrapper">
                  <div className="project-card glass">
                    <div className="project-card-image">
                      <img src={project.image} alt={project.title} />
                    </div>
                    <h3 className="project-card-title">{project.title}</h3>
                    <p className="project-card-desc">{project.desc}</p>
                    <span className="project-card-tag">{project.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== MISSION & VISION ===== */}
      <section className="mv-section-new">
        <div className="mv-bg-new"></div>
        <div className="mv-overlay-new"></div>
        <div className="mv-glow-new mv-glow-new-1"></div>
        <div className="mv-glow-new mv-glow-new-2"></div>
        <div className="mv-container-new">
          <div>
            <h2 className="mv-heading-new">
              <span className="mv-heading-white">Our Mission &amp; </span>
              <span className="mv-heading-sun">Our Vision</span>
            </h2>
            <div className="mv-blocks-new">
              <div className="reveal">
                <div className="mv-icon-new">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4M12 21a9 9 0 110-18 9 9 0 010 18z" />
                  </svg>
                </div>
                <h3 className="mv-block-title-new">Our Mission</h3>
                <p className="mv-block-text-new">
                  To create a Just, Equitable and Humane Society through holistic and sustainable interventions in the seven key sectors of social development.
                </p>
              </div>
              <div className="reveal">
                <div className="mv-icon-new">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4M12 21a9 9 0 110-18 9 9 0 010 18z" />
                  </svg>
                </div>
                <h3 className="mv-block-title-new">Our Vision</h3>
                <p className="mv-block-text-new">
                  To build a self-reliant society where every individual, regardless of their socio-economic status, has access to basic necessities and opportunities for a dignified life.
                </p>
              </div>
            </div>
          </div>
          <div className="reveal mv-image-wrap-new">
            <img src="/images/mission-bg.jpg" alt="Our mission in action" />
          </div>
        </div>
      </section>

      {/* =====  GET INVOLVED ===== */}
      <section className="involved-section">
        <div className="section-container">
          <div className="involved-grid">
            <div className="involved-image-col">
              <div className="involved-card glass">
                <h3>Get Involved</h3>
                <p>Lend your skills and time to make a tangible difference in the lives of many. We have opportunities in field work, administration, and digital support.</p>
                <Link to="/volunteer" className="btn-primary-glass">
                  Become a Volunteer
                  <span className="material-symbol">person_add</span>
                </Link>
              </div>
              <img
                src="/images/Volunteers.jpg"
                alt="Volunteers"
                className="involved-img-back"
              />
            </div>
            <div className="involved-form-col">
              <div className="involved-form-card glass">
                <div className="involved-form-glow" />
                <h3>Support Our Mission</h3>
                <p>Your support helps us drive our largest projects and create lasting change in communities. Join us in making a difference.</p>
                <Link to="/volunteer" className="btn-primary-glass">
                  Join Us Today
                  <span className="material-symbol">handshake</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STORIES ===== */}
      <section className="stories-section">
        <div className="section-container">
          <h2 className="stories-main-title">Stories of Change</h2>
          <div className="stories-grid-new">
            {stories.map((story, i) => (
              <article key={story.id} className="story-article">
                <div className="story-image-wrap asymmetric-card">
                  <img src={story.image} alt={story.title} />
                  <div className="story-image-overlay" />
                </div>
                <div className="story-content">
                  <div className="story-meta">
                    <span className="story-tag">{story.tag}</span>
                    <span className="story-date">{story.date}</span>
                  </div>
                  <h3 className="story-title">{story.title}</h3>
                  <p className="story-desc">{story.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}


{/* ===== TESTIMONIALS ===== */}
<section className="tm-section">
  {/* ambient glows */}
  <div className="tm-glow tm-glow--1" />
  <div className="tm-glow tm-glow--2" />

  <div className="section-container">
    <div className="tm-header">
      <span className="tm-eyebrow">Stories of impact</span>
      <h2 className="tm-title">Voices of Hope</h2>
      <p className="tm-subtitle">
        Real people, real change — words from the community we serve and the
        hands that help us grow.
      </p>
    </div>

    <div className="tm-grid">
      {testimonials.map((t, i) => (
        <article
          key={t.id}
          className={`tm-card tm-card--${t.color}`}
          style={{ "--i": i }}
        >
          <div className="tm-quote-mark" aria-hidden="true">"</div>

          <p className="tm-quote">{t.quote}</p>

          <div className="tm-author">
            <div className="tm-avatar">{t.initials}</div>
            <div className="tm-author-info">
              <h4 className="tm-name">{t.name}</h4>
              <p className="tm-role">{t.role}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>






      {/* <section className="testimonials-section">
        <div className="testimonials-glow" />
        <div className="section-container">
          <div className="testimonials-header">
            <h2 className="testimonials-title">Voices of Hope</h2>
            <div className="testimonials-dots">
              <span className="dot dot--sm" />
              <span className="dot dot--lg" />
              <span className="dot dot--sm" />
            </div>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.id} className={`testimonial-card glass border-${t.color}`}>
                <span className="testimonial-quote-icon">"</span>
                <p className="testimonial-quote">{t.quote}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initials}</div>
                  <div>
                    <h4 className="testimonial-name">{t.name}</h4>
                    <p className="testimonial-role">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ===== NEWSLETTER ===== */}
      <section className="newsletter glass">
        <div className="section-container">
          <h3>Sign up for newsletter</h3>
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); const i = e.target.querySelector("input"); const b = e.target.querySelector("button"); if (i.value.trim()) { b.textContent = "Subscribed!"; b.style.background = "#2e7d32"; i.value = ""; setTimeout(() => { b.textContent = "Sign Up"; b.style.background = ""; }, 3000); } }}>
            <input type="email" placeholder="Your email" required />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </section>

      <Partners />
    </>
  );
}

export default Home;
