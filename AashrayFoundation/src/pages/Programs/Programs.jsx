import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Programs.css";

const programs = [
  {
    id: 1,
    title: "Project Vidhyalay",
    desc: "Breaking the cycle of illiteracy by ensuring every underprivileged child has access to quality education.",
    tag: "Education",
    icon: "school",
    link: "/programs/education",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Nari Tarang",
    desc: "Empowering women with skills, confidence, and opportunities to lead independent and dignified lives.",
    tag: "Women Empowerment",
    icon: "diversity_3",
    link: "/programs/women-empowerment",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Zero Hunger Drive",
    desc: "Fighting hunger by providing nutritious meals and ensuring no one sleeps hungry.",
    tag: "Food & Nutrition",
    icon: "restaurant",
    link: "/programs/zero-hunger-drive",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Project JAL",
    desc: "Ensuring access to clean and safe water for healthier communities and a sustainable future.",
    tag: "Clean Water",
    icon: "water_drop",
    link: "/programs/jal-project",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Ashray Ka Aashra",
    desc: "Providing care, education, and hope to orphaned children for a brighter tomorrow.",
    tag: "Orphan Care",
    icon: "home_heart",
    link: "/programs/orphanage",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Life-Line",
    desc: "Providing life-saving medical care and critical surgery support to those who cannot afford it.",
    tag: "Medical",
    icon: "medical_services",
    link: "/programs/medical",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop",
  },
  {
    id: 7,
    title: "Sahara",
    desc: "Supporting elderly individuals with care, dignity, and companionship for a better quality of life.",
    tag: "Elderly Care",
    icon: "elderly",
    link: "/programs/old-age-home",
    image: "https://images.unsplash.com/photo-1516307365426-bea591f05011?w=600&h=400&fit=crop",
  },
  {
    id: 8,
    title: "Pashupremi",
    desc: "Rescue and welfare programs for animals, ensuring compassion for every living being.",
    tag: "Animal Welfare",
    icon: "pets",
    link: "/programs/pashu-premi",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop",
  },
];

function Programs() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".prog-card").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="programs-page">
      <section className="bsct-home-hero-section">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/banner-mobile4.png" />
          <img src="/images/banner.jpg" alt="Our Programs" />
        </picture>
      </section>
      {/* HERO */}
      <section className="prog-hero">
        <div className="prog-hero-shape prog-hero-shape--1" />
        <div className="prog-hero-shape prog-hero-shape--2" />
        <div className="section-container">
          <div className="prog-hero-content">
            <span className="prog-hero-badge glass">Our Initiatives</span>
            <h1 className="prog-hero-title">Our Programs</h1>
            <p className="prog-hero-desc">
              We work tirelessly to transform lives through education, healthcare, community support, and sustainable development initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* PROGRAMS GRID */}
      <section className="prog-grid-section">
        <div className="section-container">
          <div className="prog-grid">
            {programs.map((p, i) => (
              <Link to={p.link} key={p.id} className={`prog-card ${i % 2 === 0 ? "prog-card-offset" : ""}`}>
                <div className="prog-card-inner glass">
                  <div className="prog-card-image">
                    <img src={p.image} alt={p.title} />
                    <div className="prog-card-image-overlay" />
                  </div>
                  <div className="prog-card-icon-wrap">
                    <span className="material-symbol">{p.icon}</span>
                  </div>
                  <div className="prog-card-body">
                    <h3 className="prog-card-title">{p.title}</h3>
                    <p className="prog-card-desc">{p.desc}</p>
                    <span className="prog-card-tag">{p.tag}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Programs;
