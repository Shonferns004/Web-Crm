import { Link } from 'react-router-dom';

export default function NGOCollaboration() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --navy: #03163E;
          --mid: #315371;
          --cyan: #00A2D9;
          --cyan-light: #33bce8;
          --green: #2eb85c;
          --gold: #D4AF37;
          --white: #ffffff;
          --light-bg: #f4f7fb;
          --text-dark: #1a1a2e;
          --text-mid: #4a5568;
        }
        body { font-family: 'Open Sans', sans-serif; color: var(--text-dark); overflow-x: hidden; scroll-behavior: smooth; }
        .ngo-collab-section {
          width: 100%;
          padding: 100px 8%;
          background: #fff;
          position: relative;
          overflow: hidden;
        }
        .ngo-collab-section::before {
          content: "";
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: #00a3d4;
          opacity: 0.08;
          top: -200px; right: -150px;
          filter: blur(20px);
        }
        .ngo-collab-container { position: relative; z-index: 2; }
        .ngo-top-heading { text-align: center; margin-bottom: 70px; }
        .ngo-top-heading span {
          display: inline-block;
          padding: 12px 28px;
          background: #00a3d4;
          color: #fff;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1px;
          box-shadow: 0 12px 25px rgba(0,163,212,0.35);
          margin-bottom: 25px;
        }
        .ngo-top-heading h2 {
          font-size: 58px;
          color: #111;
          margin-bottom: 20px;
          font-weight: 800;
        }
        .ngo-top-heading p {
          max-width: 850px;
          margin: auto;
          font-size: 18px;
          line-height: 1.9;
          color: #555;
        }
        .ngo-content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        .ngo-left-content,
        .ngo-right-content {
          display: flex;
          flex-direction: column;
          gap: 35px;
        }
        .ngo-card {
          background: #fff;
          padding: 45px;
          border-radius: 35px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.06), 0 0 30px rgba(0,163,212,0.08);
          transition: 0.5s;
        }
        .ngo-card::before {
          content: "";
          position: absolute;
          width: 180px; height: 180px;
          background: #00a3d4;
          opacity: 0.08;
          border-radius: 50%;
          top: -70px; right: -70px;
        }
        .ngo-card:hover { transform: translateY(-12px); }
        .large-card { transform: rotate(-2deg); }
        .dark-card {
          background: #FFF;
          color: #fff;
          transform: rotate(2deg);
          box-shadow: 0 25px 50px rgba(0,163,212,0.35);
        }
        .dark-card p, .dark-card h3 { color: #fff; }
        .ngo-card h3 {
          font-size: 34px;
          margin-bottom: 20px;
          color: #00a3d4;
          position: relative;
          z-index: 2;
        }
        .ngo-card p {
          font-size: 17px;
          line-height: 1.9;
          color: #555;
          margin-bottom: 18px;
          position: relative;
          z-index: 2;
        }
        .ngo-floating-box {
          background: #fff;
          padding: 35px;
          border-left: 6px solid #00a3d4;
          border-radius: 30px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.05), 0 0 25px rgba(0,163,212,0.08);
          margin-top: 60px;
          transition: 0.4s;
        }
        .ngo-floating-box:hover { transform: translateX(12px); }
        .ngo-floating-box h3 {
          font-size: 30px;
          margin-bottom: 15px;
          color: #00a3d4;
        }
        .ngo-floating-box p {
          font-size: 17px;
          line-height: 1.9;
          color: #555;
        }
        .ngo-quote {
          margin-top: 30px;
          padding: 25px;
          border-radius: 25px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
          font-size: 24px;
          line-height: 1.7;
          font-weight: 600;
          border: 1px solid rgba(255,255,255,0.15);
        }
        @media(max-width: 991px) {
          .ngo-content-grid { grid-template-columns: 1fr; }
          .ngo-top-heading h2 { font-size: 42px; }
          .large-card, .dark-card { transform: none; }
          .ngo-floating-box { margin-top: 0; }
        }
        @media(max-width: 600px) {
          .ngo-collab-section { padding: 80px 5%; }
          .ngo-card, .ngo-floating-box { padding: 28px; }
          .ngo-top-heading h2 { font-size: 32px; }
          .ngo-card h3, .ngo-floating-box h3 { font-size: 26px; }
          .ngo-quote { font-size: 20px; }
        }
      `}</style>

      <section className="ngo-collab-section">
        <div className="ngo-collab-container">
          <div className="ngo-top-heading">
            <span style={{cursor:'pointer'}} onClick={() => document.getElementById('ngo-content').scrollIntoView({ behavior: 'smooth' })}>BSCT Partnerships</span>
            <h2>NGO Collaboration & Partnerships</h2>
            <p>
              Together, we can create stronger communities and lasting change through meaningful partnerships and collective social responsibility.
            </p>
          </div>

          <div className="ngo-content-grid" id="ngo-content">
            <div className="ngo-left-content">
              <div className="ngo-card large-card">
                <h3>Creating Sustainable Impact</h3>
                <p>
                  In today's rapidly evolving world, addressing social, economic, and environmental challenges requires collective efforts and meaningful partnerships.
                </p>
                <p>
                  Non-Governmental Organizations (NGOs) play a vital role in creating positive change, but the journey of building and sustaining impactful initiatives often comes with significant challenges.
                </p>
              </div>

              <div className="ngo-card">
                <h3>Why Collaboration Matters</h3>
                <p>
                  At Being Sevak Charitable Trust, we strongly believe that collaboration is the key to creating long-term and sustainable social impact.
                </p>
                <p>
                  By partnering with like-minded organizations, institutions, social groups, and changemakers, we can combine resources, expertise, and community reach to serve society more effectively.
                </p>
              </div>
            </div>

            <div className="ngo-right-content">
              <div className="ngo-floating-box">
                <h3>Shared Mission</h3>
                <p>
                  Collaboration is more than just working together — it is a shared commitment towards common goals, social responsibility, and community empowerment.
                </p>
              </div>

              <div className="ngo-card dark-card">
                <h3>Building Stronger Communities</h3>
                <p>
                  Whether through formal partnerships or informal associations, these relationships help strengthen initiatives, expand outreach, and create greater impact for the communities we serve.
                </p>
                <p>
                  BSCT welcomes NGOs, community groups, educational institutions, healthcare organizations, and social leaders to join hands with us in building a compassionate, inclusive, and empowered society.
                </p>
                <div className="ngo-quote">
                  "Together, We Can Create Stronger Communities and Lasting Change."
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
