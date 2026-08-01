import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function ImpactHealthToHygiene() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const css = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root { --navy: #03163E; --mid: #315371; --cyan: #00A2D9; --cyan-light: #33bce8; --green: #2eb85c; --gold: #D4AF37; --white: #ffffff; --light-bg: #f4f7fb; --text-dark: #1a1a2e; --text-mid: #4a5568; }
    body { font-family: 'Open Sans', sans-serif; color: var(--text-dark); overflow-x: hidden; }

    .hygiene-section { background: #fff; padding: 100px 8%; overflow: hidden; }
    .hygiene-container { max-width: 1300px; margin: auto; }
    .hygiene-heading { text-align: center; max-width: 850px; margin: 0 auto 70px; }
    .hygiene-tag { display: inline-block; padding: 10px 24px; background: rgba(0,163,218,.12); color: #00a3da; border-radius: 50px; font-size: 13px; font-weight: 700; letter-spacing: 1px; margin-bottom: 20px; }
    .hygiene-heading h2 { font-size: 52px; color: #111; margin-bottom: 20px; }
    .hygiene-heading p { color: #666; line-height: 1.9; font-size: 17px; }
    .hygiene-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
    .hygiene-image { position: relative; }
    .hygiene-image::before { content: ""; position: absolute; width: 200px; height: 200px; background: #00a3da; border-radius: 50%; top: -35px; left: -35px; opacity: .12; }
    .hygiene-image img { width: 100%; border-radius: 25px; box-shadow: 0 15px 40px rgba(0,0,0,.12); position: relative; z-index: 2; }
    .hygiene-content { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .hygiene-card { background: #fff; border: 1px solid rgba(0,163,218,.15); padding: 30px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,.05); transition: .4s; }
    .hygiene-card:hover { background: #00a3da; transform: translateY(-8px); }
    .hygiene-card h3 { font-size: 22px; margin-bottom: 12px; transition: .4s; }
    .hygiene-card p { color: #666; line-height: 1.7; transition: .4s; }
    .hygiene-card:hover h3, .hygiene-card:hover p { color: #fff; }
    .hygiene-impact { margin-top: 80px; background: linear-gradient(135deg,#00a3da,#008ec0); padding: 60px; border-radius: 30px; color: #fff; display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; align-items: center; }
    .hygiene-story span { font-size: 14px; font-weight: 700; letter-spacing: 1px; }
    .hygiene-story h3 { font-size: 42px; margin: 15px 0; }
    .hygiene-story p { line-height: 1.9; }
    .hygiene-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 15px; }
    .hygiene-box { background: rgba(255,255,255,.12); backdrop-filter: blur(10px); padding: 30px 15px; text-align: center; border-radius: 20px; }
    .hygiene-box h2 { font-size: 40px; margin-bottom: 10px; }
    .hygiene-box span { font-size: 14px; }

    @media(max-width:991px) {
      .hygiene-grid { grid-template-columns: 1fr; }
      .hygiene-content { grid-template-columns: 1fr; }
      .hygiene-impact { grid-template-columns: 1fr; padding: 35px; }
      .hygiene-stats { grid-template-columns: 1fr; }
      .hygiene-heading h2 { font-size: 38px; }
      .hygiene-story h3 { font-size: 30px; }
    }

    .shital-gallery-section { padding: 90px 8%; background: #fff; }
    .shital-gallery-heading { text-align: center; max-width: 800px; margin: 0 auto 50px; }
    .shital-gallery-heading span { display: inline-block; padding: 10px 24px; background: rgba(0,163,218,.12); color: #00a3da; border-radius: 50px; font-size: 13px; font-weight: 700; letter-spacing: 1px; margin-bottom: 18px; }
    .shital-gallery-heading h2 { font-size: 48px; color: #111; margin-bottom: 15px; }
    .shital-gallery-heading p { color: #666; font-size: 17px; line-height: 1.8; }
    .shital-gallery { display: grid; grid-template-columns: repeat(3,1fr); gap: 25px; }
    .shital-gallery-item { overflow: hidden; border-radius: 25px; box-shadow: 0 15px 35px rgba(0,0,0,.08); position: relative; }
    .shital-gallery-item img { width: 100%; height: auto; display: block; transition: 0.6s ease; }
    .shital-gallery-item:hover img { transform: scale(1.08); }
    .shital-gallery-item::after { content: ""; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.15), transparent); opacity: 0; transition: .4s; }
    .shital-gallery-item:hover::after { opacity: 1; }
    @media(max-width:991px) { .shital-gallery { grid-template-columns: 1fr; } .shital-gallery-heading h2 { font-size: 38px; } }
  `;

  return (
    <>
      <style>{css}</style>

      <section className="hygiene-section">
        <div className="hygiene-container">
          <div className="hygiene-heading">
            <span className="hygiene-tag">SCHOOL INFRASTRUCTURE DEVELOPMENT</span>
            <h2>Health to Hygiene</h2>
            <p>
              Through the Health to Hygiene initiative, Being Sevak Charitable
              Trust works towards creating clean, safe, and healthy learning
              environments for children. We support the repair and renovation
              of school toilets, handwashing stations, kitchens, drinking
              water facilities, and sanitation infrastructure, ensuring that
              every child has access to a hygienic and dignified educational
              environment.
            </p>
          </div>

          <div className="hygiene-grid">
            <div className="hygiene-image">
              <img src="/images/g31.png" alt="Health to Hygiene" />
            </div>
            <div className="hygiene-content">
              <div className="hygiene-card">
                <h3>Toilet Renovation</h3>
                <p>Repairing and upgrading school toilets to provide clean, safe, and usable sanitation facilities.</p>
              </div>
              <div className="hygiene-card">
                <h3>Handwashing Stations</h3>
                <p>Installing and repairing wash basins to promote healthy hygiene practices among students.</p>
              </div>
              <div className="hygiene-card">
                <h3>Kitchen Improvement</h3>
                <p>Renovating school kitchens to support safe meal preparation and nutrition programs.</p>
              </div>
              <div className="hygiene-card">
                <h3>Healthy Learning Spaces</h3>
                <p>Creating hygienic school environments that improve student health, attendance, and well-being.</p>
              </div>
            </div>
          </div>

          <div className="hygiene-impact">
            <div className="hygiene-story">
              <span>COMMUNITY IMPACT</span>
              <h3>Building Healthier Schools for Every Child</h3>
              <p>
                A clean school environment directly impacts student health,
                confidence, and academic performance. Through repairs and
                renovations of sanitation facilities, kitchens, wash areas,
                and hygiene infrastructure, Being Sevak Charitable Trust is
                helping schools provide safer and healthier spaces where
                children can learn, grow, and thrive with dignity.
              </p>
            </div>
            <div className="hygiene-stats">
              <div className="hygiene-box">
                <h2>100+</h2>
                <span>Schools Supported</span>
              </div>
              <div className="hygiene-box">
                <h2>500+</h2>
                <span>Facilities Renovated</span>
              </div>
              <div className="hygiene-box">
                <h2>50K+</h2>
                <span>Students Benefited</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shital-gallery-section">
        <div className="shital-gallery-heading">
          <span>PROJECT GALLERY</span>
          <h2>Moments of Impact</h2>
          <p>Explore glimpses of our initiatives, community outreach programs, and the positive impact created through collective efforts.</p>
        </div>
        <div className="shital-gallery">
          <div className="shital-gallery-item"><img src="/images/g32.png" alt="" /></div>
          <div className="shital-gallery-item"><img src="/images/g33.png" alt="" /></div>
          <div className="shital-gallery-item"><img src="/images/g34.png" alt="" /></div>
        </div>
      </section>
    </>
  );
}
