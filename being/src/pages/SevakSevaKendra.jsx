import { Link } from 'react-router-dom';

export default function SevakSevaKendra() {
  return (
    <>
      <style>{`
        .sevak-seva-kendra * { margin: 0; padding: 0; box-sizing: border-box; }
        .sevak-seva-kendra { font-family: 'Montserrat', sans-serif; background: #f4f6f8; color: #1d2b36; overflow-x: hidden; }
        .sevak-seva-kendra img { width: 100%; display: block; }

        .sevak-seva-kendra .tax-box {
          width: 100%; height: 70px; display: flex; justify-content: center; align-items: center;
          text-align: center; background: linear-gradient(to right, #009BD4 0%, #0285C3 25%, #046FB1 50%, #074D97 75%, #083D8B 100%);
          color: #fff; margin: 10px 0; padding: 10px; position: relative; overflow: hidden; transition: 0.4s ease;
        }
        .sevak-seva-kendra .tax-box h1 { font-size: 28px; font-weight: 700; position: relative; z-index: 2; }
        .sevak-seva-kendra .tax-box p { font-size: 16px; line-height: 1.6; position: relative; z-index: 2; }
        .sevak-seva-kendra .tax-box::before {
          content: ""; position: absolute; width: 200%; height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.15), transparent);
          top: -50%; left: -50%; animation: sskShine 6s linear infinite;
        }
        .sevak-seva-kendra .tax-box:hover { transform: translateY(-5px) scale(1.01); box-shadow: 0 25px 60px rgba(0,163,218,0.35); }
        @keyframes sskShine { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        .sevak-seva-kendra .hero-section {
          width: 100%; min-height: 100vh; display: flex; align-items: center; justify-content: center;
          gap: 40px; padding: 50px 5%; overflow: hidden;
          background: radial-gradient(circle at top left, #dff6ff 0%, transparent 35%),
          radial-gradient(circle at bottom right, #c7ecff 0%, transparent 35%),
          linear-gradient(135deg, #ffffff, #eef8ff);
        }
        .sevak-seva-kendra .hero-left { flex: 1; max-width: 520px; }
        .sevak-seva-kendra .tag { color: #00a3da; display: inline-block; margin-bottom: 25px; font-weight: 800; font-size: 30px; letter-spacing: 1px; background: none; }
        .sevak-seva-kendra .hero-left h1 { font-size: 62px; line-height: 1.1; font-weight: 800; margin-bottom: 22px; color: #1c2b36; }
        .sevak-seva-kendra .hero-left h1 span { color: #00a3da; }
        .sevak-seva-kendra .hero-left p { font-size: 18px; line-height: 1.9; color: #51606d; margin-bottom: 30px; }
        .sevak-seva-kendra .hero-buttons { display: flex; gap: 15px; flex-wrap: wrap; }
        .sevak-seva-kendra .primary-btn {
          text-decoration: none; padding: 14px 26px; border-radius: 50px; font-size: 18px; font-weight: 700;
          transition: 0.3s; background: #00a3da; color: #fff; box-shadow: 0 15px 35px rgba(0,163,218,0.35);
        }
        .sevak-seva-kendra .primary-btn:hover { transform: translateY(-4px); }
        .sevak-seva-kendra .hero-right {
          flex: 1; display: flex; justify-content: center; align-items: center;
          position: relative; max-width: 500px; min-height: 500px;
        }
        .sevak-seva-kendra .main-image-card {
          width: 100%; max-width: 480px; position: relative; z-index: 2;
          transform: perspective(1000px) rotate(-3deg);
          box-shadow: 0 20px 50px rgba(0,0,0,0.15), 0 10px 25px rgba(0,163,218,0.12);
          transition: 0.6s ease; animation: sskFloatCard 4s ease-in-out infinite;
        }
        .sevak-seva-kendra .main-image-card img { width: 100%; display: block; object-fit: cover; border-radius: 30px; transition: 0.6s ease; }
        .sevak-seva-kendra .main-image-card:hover { transform: perspective(1000px) rotate(0deg) scale(1.05); box-shadow: 0 40px 90px rgba(0,0,0,0.25); }
        @keyframes sskFloatCard {
          0% { transform: perspective(1000px) rotate(-3deg) translateY(0); }
          50% { transform: perspective(1000px) rotate(-3deg) translateY(-12px); }
          100% { transform: perspective(1000px) rotate(-3deg) translateY(0); }
        }
        .sevak-seva-kendra .floating-card {
          position: absolute; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px);
          padding: 15px 18px; border-radius: 20px; min-width: 160px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.10); z-index: 5; animation: sskFloat 3s ease-in-out infinite;
        }
        .sevak-seva-kendra .floating-card h3 { color: #00a3da; font-size: 34px; margin-bottom: 4px; }
        .sevak-seva-kendra .floating-card p { font-size: 12px; font-weight: 600; color: #51606d; }
        .sevak-seva-kendra .card1 { top: -10px; left: -10px; }
        .sevak-seva-kendra .card2 { bottom: -10px; right: -10px; }
        @keyframes sskFloat { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }

        .sevak-seva-kendra .about-section { width: 100%; display: flex; align-items: center; justify-content: center; gap: 45px; padding: 45px 5%; background: #fff; }
        .sevak-seva-kendra .about-image { position: relative; }
        .sevak-seva-kendra .about-image img { border-radius: 35px; height: 450px; object-fit: cover; box-shadow: 0 25px 50px rgba(0,0,0,0.12); transition: 0.5s ease; }
        .sevak-seva-kendra .about-image img:hover { transform: scale(1.03); box-shadow: 0 40px 90px rgba(0,0,0,0.2); }
        .sevak-seva-kendra .about-image::before {
          content: ""; position: absolute; top: 20px; left: 20px; width: 100%; height: 100%;
          border-radius: 35px; background: linear-gradient(135deg, rgba(0,163,218,0.2), transparent);
          filter: blur(12px); z-index: -1;
        }
        .sevak-seva-kendra .about-content { flex: 1; max-width: 520px; }
        .sevak-seva-kendra .mini-title { color: #00a3da; font-weight: 700; font-size: 30px; margin-bottom: 18px; display: block; }
        .sevak-seva-kendra .about-content h2 { font-size: 42px; line-height: 1.2; margin-bottom: 22px; }
        .sevak-seva-kendra .about-content h2 span { color: #00a3da; }
        .sevak-seva-kendra .about-content p { font-size: 15px; line-height: 1.8; color: #51606d; }
        .sevak-seva-kendra .feature-boxes { display: flex; flex-wrap: wrap; gap: 15px; margin-top: 28px; }
        .sevak-seva-kendra .feature-card {
          background: #f7fcff; padding: 20px; border-radius: 22px; transition: 0.3s ease;
          cursor: pointer; flex: 1 1 calc(50% - 15px); min-width: 160px;
        }
        .sevak-seva-kendra .feature-card:hover { background: #00a3da; }
        .sevak-seva-kendra .feature-card:hover h4, .sevak-seva-kendra .feature-card:hover p, .sevak-seva-kendra .feature-card:hover .icon { color: #fff; }
        .sevak-seva-kendra .icon { font-size: 28px; margin-bottom: 12px; }
        .sevak-seva-kendra .feature-card h4 { font-size: 17px; margin-bottom: 8px; }
        .sevak-seva-kendra .feature-card p { font-size: 13px; }

        .sevak-seva-kendra .impact-section {
          width: 100%; padding: 60px 5%;
          background: radial-gradient(circle at top left, #dff6ff 0%, transparent 35%),
          linear-gradient(135deg, #f4f6f8, #eef8ff);
        }
        .sevak-seva-kendra .section-heading { text-align: center; margin-bottom: 35px; }
        .sevak-seva-kendra .section-heading span { color: #00a3da; font-weight: 800; font-size: 20px; }
        .sevak-seva-kendra .section-heading h2 { font-size: 40px; margin-top: 10px; }
        .sevak-seva-kendra .impact-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 18px; }
        .sevak-seva-kendra .impact-card {
          background: #fff; padding: 28px 18px; text-align: center; border-radius: 24px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06); transition: 0.3s ease; position: relative; overflow: hidden; cursor: pointer;
        }
        .sevak-seva-kendra .impact-card::before {
          content: ""; position: absolute; left: 0; bottom: 0; width: 100%; height: 0%;
          background: #00a3da; transition: 0.4s ease; z-index: 1;
        }
        .sevak-seva-kendra .impact-card:hover::before { height: 100%; }
        .sevak-seva-kendra .impact-card h3, .sevak-seva-kendra .impact-card p { position: relative; z-index: 2; transition: 0.3s ease; }
        .sevak-seva-kendra .impact-card:hover h3, .sevak-seva-kendra .impact-card:hover p { color: #fff; }

        .sevak-seva-kendra .techvision-wrap { width: 100%; padding: 70px 7%; background: #fff; overflow: hidden; }
        .sevak-seva-kendra .techvision-container { display: flex; align-items: center; justify-content: space-between; gap: 70px; flex-wrap: wrap; }
        .sevak-seva-kendra .techvision-image-side { flex: 1; min-width: 320px; }
        .sevak-seva-kendra .techvision-image-box {
          position: relative; border-radius: 35px; overflow: hidden; background: #fff;
          box-shadow: 0 25px 60px rgba(0,0,0,0.12), 0 12px 30px rgba(0,163,218,0.18); transition: 0.5s;
        }
        .sevak-seva-kendra .techvision-image-box:hover { transform: translateY(-10px) rotate(-1deg); }
        .sevak-seva-kendra .techvision-image-box img { width: 100%; height: 620px; object-fit: cover; display: block; }
        .sevak-seva-kendra .techvision-content-side { flex: 1; min-width: 320px; }
        .sevak-seva-kendra .techvision-mini-title {
          display: inline-block; padding: 10px 22px; background: #00a3da; color: #fff; border-radius: 60px;
          font-size: 20px; font-weight: 700; margin-bottom: 20px;
          transition: none;
        }
        .sevak-seva-kendra .techvision-mini-title:hover {
          background: #00a3da; color: #fff;
        }
        .sevak-seva-kendra .techvision-content-side h3 { font-size: 38px; line-height: 1.1; color: #111; margin-bottom: 28px; font-weight: 800; }
        .sevak-seva-kendra .techvision-content-side p { font-size: 17px; line-height: 1.9; color: #555; margin-bottom: 18px; }
        .sevak-seva-kendra .techvision-feature-grid { display: flex; flex-wrap: wrap; gap: 18px; margin-top: 35px; }
        .sevak-seva-kendra .techvision-feature-card {
          flex: 1; min-width: 180px; background: #fff; border: 1px solid #e8f6fc; padding: 28px 22px;
          border-radius: 24px; transition: 0.4s;
          box-shadow: 0 12px 30px rgba(0,0,0,0.05), 0 8px 20px rgba(0,163,218,0.08);
        }
        .sevak-seva-kendra .techvision-feature-card:hover { transform: translateY(-8px); }
        .sevak-seva-kendra .techvision-feature-card h3 { font-size: 22px; color: #00a3da; margin-bottom: 10px; font-weight: 700; }
        .sevak-seva-kendra .techvision-feature-card span { font-size: 15px; color: #666; line-height: 1.7; }
        .sevak-seva-kendra .techvision-btn {
          display: inline-block; margin-top: 40px; padding: 16px 35px; background: #00a3da; color: #fff;
          text-decoration: none; border-radius: 60px; font-weight: 600; transition: 0.4s;
          box-shadow: 0 15px 30px rgba(0,163,218,0.25);
        }
        .sevak-seva-kendra .techvision-btn:hover { background: #008dbd; transform: translateY(-5px); }

        .sevak-seva-kendra .sevak-donation {
          width: 100%; background: linear-gradient(to right, #009BD4 0%, #0285C3 25%, #046FB1 50%, #074D97 75%, #083D8B 100%);
          padding: 50px 4%; min-height: 120px; display: flex; align-items: center;
        }
        .sevak-seva-kendra .sevak-donation-content { width: 100%; display: flex; justify-content: space-between; align-items: center; min-height: 120px; }
        .sevak-seva-kendra .sevak-left { display: flex; flex-direction: column; gap: 4px; }
        .sevak-seva-kendra .sevak-tag { font-size: 20px; font-weight: 700; color: #fff; }
        .sevak-seva-kendra .sevak-title { font-size: 41px; margin: 0; line-height: 1.2; color: #fff; }
        .sevak-seva-kendra .sevak-desc { font-size: 15px; margin: 0; color: #fff; }
        .sevak-seva-kendra .sevak-btn {
          display: inline-block; padding: 15px 36px; background: #00a3da; color: #fff; text-decoration: none;
          border-radius: 6px; font-weight: 700; font-size: 16px; white-space: nowrap; transition: 0.3s;
        }
        .sevak-seva-kendra .sevak-btn:hover { transform: translateY(-2px); }

        .sevak-seva-kendra .testimonial-section { padding: 50px 5%; }
        .sevak-seva-kendra .section-header { text-align: center; margin-bottom: 40px; }
        .sevak-seva-kendra .section-header h2 { font-size: 42px; margin: 18px 0; }
        .sevak-seva-kendra .testimonial-grid {
          width: 100%; max-width: 1200px; margin: auto; display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; align-items: stretch;
        }
        .sevak-seva-kendra .testimonial-card {
          width: 100%; background: #fff; padding: 30px; border-radius: 28px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.07); transition: 0.4s; overflow: hidden; position: relative;
        }
        .sevak-seva-kendra .testimonial-card:hover { transform: translateY(-10px); }
        .sevak-seva-kendra .testimonial-card p { line-height: 2; color: #6c7d8e; margin-bottom: 25px; }
        .sevak-seva-kendra .testimonial-card h4 { color: #00a3da; }
        .sevak-seva-kendra .testimonial-card h4, .sevak-seva-kendra .testimonial-card p { position: relative; z-index: 3; transition: 0.4s ease; }
        .sevak-seva-kendra .testimonial-card:hover h4, .sevak-seva-kendra .testimonial-card:hover p { color: #fff !important; }
        .sevak-seva-kendra .testimonial-card::before {
          content: ""; position: absolute; left: 0; bottom: 0; width: 100%; height: 0%;
          background: #00a3da; transition: 0.4s ease; z-index: 1; border-radius: 28px;
        }
        .sevak-seva-kendra .testimonial-card:hover::before { height: 100%; }
        .sevak-seva-kendra .testimonial-card > * { position: relative; z-index: 2; }

        @media (max-width: 991px) {
          .sevak-seva-kendra .hero-section, .sevak-seva-kendra .about-section { flex-direction: column; text-align: center; }
          .sevak-seva-kendra .hero-left, .sevak-seva-kendra .about-content { max-width: 100%; }
          .sevak-seva-kendra .hero-buttons { justify-content: center; }
          .sevak-seva-kendra .hero-left h1 { font-size: 46px; }
          .sevak-seva-kendra .about-content h2, .sevak-seva-kendra .section-heading h2, .sevak-seva-kendra .techvision-content-side h3 { font-size: 34px; }
          .sevak-seva-kendra .impact-grid { grid-template-columns: repeat(2,1fr); }
          .sevak-seva-kendra .feature-boxes { flex-direction: column; }
          .sevak-seva-kendra .techvision-container { flex-direction: column; }
          .sevak-seva-kendra .techvision-image-box img { height: 500px; }
          .sevak-seva-kendra .sevak-donation-content { flex-direction: column; text-align: center; gap: 20px; min-height: auto; }
          .sevak-seva-kendra .sevak-title { font-size: 34px; }
          .sevak-seva-kendra .testimonial-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .sevak-seva-kendra .hero-left h1 { font-size: 38px; }
          .sevak-seva-kendra .hero-buttons { flex-direction: column; }
          .sevak-seva-kendra .hero-right { min-height: auto; padding-bottom: 40px; }
          .sevak-seva-kendra .main-image-card { max-width: 100%; }
          .sevak-seva-kendra .floating-card { position: absolute; padding: 5px 8px; }
          .sevak-seva-kendra .floating-card h3 { font-size: 14px; line-height: 1.1; }
          .sevak-seva-kendra .floating-card p { font-size: 10px; margin: 0; }
          .sevak-seva-kendra .techvision-wrap { padding: 50px 5%; }
          .sevak-seva-kendra .techvision-content-side h3 { font-size: 28px; }
          .sevak-seva-kendra .techvision-image-box img { height: 350px; }
          .sevak-seva-kendra .sevak-title { font-size: 28px; }
        }
      `}</style>

      <div className="sevak-seva-kendra">
        <section className="tax-box">
          <h1>Sevak Seva Kendra</h1>
        </section>

        <section className="hero-section">
          <div className="hero-left">
            <span className="tag">Sevak Seva Kendra</span>
            <h1>
              Building A Better <span>Community</span><br />
              Through Care & Development
            </h1>
            <p>
              Sevak Niwas Kendra by Being Sevak Charitable Trust provides education,
              digital learning, healthcare, women empowerment and skill development
              initiatives for building a stronger and self-reliant society.
            </p>
            <div className="hero-buttons">
              <a href="#donate" className="primary-btn">Support Sevak Niwas</a>
            </div>
          </div>
          <div className="hero-right">
            <div className="main-image-card">
              <img src="/images/sevak1.jpeg" alt="Sevak Niwas Kendra" />
              <div className="floating-card card1">
                <h3>5000+</h3>
                <p>Lives Empowered</p>
              </div>
              <div className="floating-card card2">
                <h3>50+</h3>
                <p>Community Programs</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-image">
            <img src="/images/library.jpeg" alt="Library" />
          </div>
          <div className="about-content">
            <span className="mini-title">Library</span>
            <h2>Knowledge & Learning <span>For Everyone</span></h2>
            <p>
              Our library provides books, study material and peaceful learning spaces
              for children, students and community members to encourage education and growth.
            </p>
            <div className="feature-boxes">
              <div className="feature-card">
                <div className="icon">📚</div>
                <h4>Study Resources</h4>
                <p>Books and learning material for students.</p>
              </div>
              <div className="feature-card">
                <div className="icon">📖</div>
                <h4>Reading Space</h4>
                <p>Quiet and comfortable learning environment.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="impact-section" id="impact">
          <div className="section-heading">
            <span>Sevak Computer Centre</span>
            <h2>Digital Skills For The Future</h2>
          </div>
          <div className="impact-grid">
            <div className="impact-card"><h3>3000+</h3><p>Students Trained</p></div>
            <div className="impact-card"><h3>100+</h3><p>Computer Workshops</p></div>
            <div className="impact-card"><h3>50+</h3><p>Digital Courses</p></div>
            <div className="impact-card"><h3>24/7</h3><p>Learning Support</p></div>
          </div>
        </section>

        <section className="techvision-wrap">
          <div className="techvision-container">
            <div className="techvision-image-side">
              <div className="techvision-image-box">
                <img src="/images/ai2.jpg" alt="AI Digital Centre" />
              </div>
            </div>
            <div className="techvision-content-side">
              <span className="techvision-mini-title">AI & Digital Innovation Centre</span>
              <h3>Technology Driven Learning & Innovation</h3>
              <p>
                Our AI & Digital Innovation Centre is focused on empowering students and youth with future-ready technology
                skills. Through practical learning, workshops, and digital exposure, we help individuals explore the world of
                Artificial Intelligence, coding, robotics, and innovation.
              </p>
              <p>
                The centre creates opportunities for creative thinking, digital transformation, and modern skill development
                while building confidence among young learners for tomorrow's technology-driven world.
              </p>
              <div className="techvision-feature-grid">
                <div className="techvision-feature-card"><h3>AI Learning</h3><span>Hands-on practical training</span></div>
                <div className="techvision-feature-card"><h3>Digital Skills</h3><span>Modern technology education</span></div>
                <div className="techvision-feature-card"><h3>Innovation Lab</h3><span>Creative project development</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="about-content">
            <span className="mini-title">Physiotherapy Centre</span>
            <h2>Care & Recovery Through <span>Therapy Support</span></h2>
            <p>
              Our Physiotherapy Centre provides rehabilitation and physical therapy
              support for elderly people, patients and individuals recovering from injuries.
            </p>
            <div className="feature-boxes">
              <div className="feature-card">
                <div className="icon">🧑‍⚕️</div>
                <h4>Therapy Sessions</h4>
                <p>Professional physiotherapy and rehabilitation support.</p>
              </div>
              <div className="feature-card">
                <div className="icon">❤️</div>
                <h4>Patient Care</h4>
                <p>Helping patients recover with proper guidance.</p>
              </div>
              <div className="feature-card">
                <div className="icon">💪</div>
                <h4>Rehabilitation</h4>
                <p>Guided recovery exercises for injury patients.</p>
              </div>
              <div className="feature-card">
                <div className="icon">🏥</div>
                <h4>Elderly Care</h4>
                <p>Special therapy sessions for senior citizens.</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img src="/images/physio.jpeg" alt="Physiotherapy" />
          </div>
        </section>

        <section className="impact-section">
          <div className="section-heading">
            <span>Women Empowerment</span>
            <h2>Empowering Women Towards Independence</h2>
          </div>
          <div className="impact-grid">
            <div className="impact-card"><h3>2000+</h3><p>Women Supported</p></div>
            <div className="impact-card"><h3>150+</h3><p>Skill Workshops</p></div>
            <div className="impact-card"><h3>100+</h3><p>Employment Support</p></div>
            <div className="impact-card"><h3>50+</h3><p>Self Help Groups</p></div>
          </div>
        </section>

        <section className="techvision-wrap">
          <div className="techvision-container">
            <div className="techvision-image-side">
              <div className="techvision-image-box">
                <img src="/images/rasoi.jpeg" alt="Rasoi Ghar" />
              </div>
            </div>
            <div className="techvision-content-side">
              <span className="techvision-mini-title">Rasoi Ghar</span>
              <h3>Serving Nutritious Meals With Love & Care</h3>
              <p>
                Our Rasoi Ghar initiative is dedicated to providing fresh, hygienic, and nutritious meals to underprivileged
                families, homeless individuals, senior citizens, and daily wage workers. Through this initiative, we aim to
                fight hunger and spread humanity across communities.
              </p>
              <p>
                Every meal served represents compassion, dignity, and hope for those in need. With the support of volunteers
                and donors, we continue creating a positive social impact by ensuring that no one sleeps hungry.
              </p>
              <div className="techvision-feature-grid">
                <div className="techvision-feature-card"><h3>1000+</h3><span>Meals Served Every Month</span></div>
                <div className="techvision-feature-card"><h3>Daily Support</h3><span>Helping Families & Workers</span></div>
                <div className="techvision-feature-card"><h3>Community Care</h3><span>Driven By Humanity & Kindness</span></div>
              </div>
              <Link to="/donate" className="techvision-btn">Support The Mission</Link>
            </div>
          </div>
        </section>

        <section className="impact-section">
          <div className="section-heading">
            <span>Youth Skill Development</span>
            <h2>Training & Career Development Programmes</h2>
          </div>
          <div className="impact-grid">
            <div className="impact-card"><h3>500+</h3><p>Youth Trained</p></div>
            <div className="impact-card"><h3>80+</h3><p>Skill Workshops</p></div>
            <div className="impact-card"><h3>40+</h3><p>Training Sessions</p></div>
            <div className="impact-card"><h3>100+</h3><p>Career Opportunities</p></div>
          </div>
        </section>

        <section className="sevak-donation" id="donate">
          <div className="sevak-donation-content">
            <div className="sevak-left">
              <span className="sevak-tag">Mission Sevak Niwas</span>
              <h2 className="sevak-title">Providing Shelter & Support</h2>
              <p className="sevak-desc">
                Your donation provides housing, care and dignity to visually impaired individuals and families in need.
              </p>
            </div>
            <div className="sevak-right">
              <Link to="/donate" className="sevak-btn">Donate Now</Link>
            </div>
          </div>
        </section>

        <section className="testimonial-section">
          <div className="section-header">
            <h2>What Our Donors Say</h2>
          </div>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <p>Being Sevak is doing incredible work for visually impaired and needy families. Proud to support this mission.</p>
              <h4>Riya Sharma</h4>
            </div>
            <div className="testimonial-card">
              <p>Transparent work, genuine impact, and a wonderful team dedicated to helping people with dignity.</p>
              <h4>Rahul Mehta</h4>
            </div>
            <div className="testimonial-card">
              <p>Every donation creates real change. Their food distribution drives truly touch lives.</p>
              <h4>Anjali Verma</h4>
            </div>
          </div>
        </section>

        <section className="tax-box">
          <p>Get <b>50% Exemption</b> on your donation under <b>Section 80G of Income Tax Act 1961</b></p>
        </section>
      </div>
    </>
  );
}
