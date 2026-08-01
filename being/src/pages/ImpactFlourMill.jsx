import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function ImpactFlourMill() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const css = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root { --navy: #03163E; --mid: #315371; --cyan: #00A2D9; --cyan-light: #33bce8; --green: #2eb85c; --gold: #D4AF37; --white: #ffffff; --light-bg: #f4f7fb; --text-dark: #1a1a2e; --text-mid: #4a5568; }
    body { font-family: 'Open Sans', sans-serif; color: var(--text-dark); overflow-x: hidden; }

    .flourmill-section { background: #fff; padding: 100px 8%; overflow: hidden; }
    .flourmill-container { max-width: 1300px; margin: auto; }
    .flourmill-heading { text-align: center; max-width: 850px; margin: 0 auto 70px; }
    .flourmill-tag { display: inline-block; padding: 10px 24px; background: rgba(0,163,218,.12); color: #00a3da; border-radius: 50px; font-size: 13px; font-weight: 700; letter-spacing: 1px; margin-bottom: 20px; }
    .flourmill-heading h2 { font-size: 52px; color: #111; margin-bottom: 20px; }
    .flourmill-heading p { color: #666; line-height: 1.9; font-size: 17px; }
    .flourmill-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
    .flourmill-image { position: relative; }
    .flourmill-image::before { content: ""; position: absolute; width: 200px; height: 200px; background: #00a3da; border-radius: 50%; top: -35px; left: -35px; opacity: .12; }
    .flourmill-image img { width: 100%; border-radius: 25px; box-shadow: 0 15px 40px rgba(0,0,0,.12); position: relative; z-index: 2; }
    .flourmill-content { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .flourmill-card { background: #fff; border: 1px solid rgba(0,163,218,.15); padding: 30px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,.05); transition: .4s; }
    .flourmill-card:hover { background: #00a3da; transform: translateY(-8px); }
    .flourmill-card h3 { font-size: 22px; margin-bottom: 12px; transition: .4s; }
    .flourmill-card p { color: #666; line-height: 1.7; transition: .4s; }
    .flourmill-card:hover h3, .flourmill-card:hover p { color: #fff; }
    .flourmill-impact { margin-top: 80px; background: linear-gradient(135deg,#00a3da,#008ec0); padding: 60px; border-radius: 30px; color: #fff; display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; align-items: center; }
    .flourmill-story span { font-size: 14px; font-weight: 700; letter-spacing: 1px; }
    .flourmill-story h3 { font-size: 42px; margin: 15px 0; }
    .flourmill-story p { line-height: 1.9; }
    .flourmill-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 15px; }
    .flourmill-box { background: rgba(255,255,255,.12); backdrop-filter: blur(10px); padding: 30px 15px; text-align: center; border-radius: 20px; }
    .flourmill-box h2 { font-size: 40px; margin-bottom: 10px; }
    .flourmill-box span { font-size: 14px; }

    @media(max-width:991px) {
      .flourmill-grid { grid-template-columns: 1fr; }
      .flourmill-content { grid-template-columns: 1fr; }
      .flourmill-impact { grid-template-columns: 1fr; padding: 35px; }
      .flourmill-stats { grid-template-columns: 1fr; }
      .flourmill-heading h2 { font-size: 38px; }
      .flourmill-story h3 { font-size: 30px; }
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

      <section className="flourmill-section">
        <div className="flourmill-container">
          <div className="flourmill-heading">
            <span className="flourmill-tag">MISSION ATMANIRBHAR</span>
            <h2>Flour Mill Support Program</h2>
            <p>
              Through the Flour Mill Support Program, Being Sevak Charitable
              Trust empowers visually impaired and economically weaker families
              by providing flour milling machines as a source of sustainable
              livelihood. This initiative helps beneficiaries generate income,
              become self-reliant, and support their families with dignity.
            </p>
          </div>

          <div className="flourmill-grid">
            <div className="flourmill-image">
              <img src="/images/g41.webp" alt="Flour Mill Support" />
            </div>
            <div className="flourmill-content">
              <div className="flourmill-card">
                <h3>Income Generation</h3>
                <p>Flour mills create a reliable source of income for beneficiaries and their families.</p>
              </div>
              <div className="flourmill-card">
                <h3>Self-Reliance</h3>
                <p>Supporting individuals to become financially independent through small-scale business opportunities.</p>
              </div>
              <div className="flourmill-card">
                <h3>Community Service</h3>
                <p>Local residents benefit from easy access to grain grinding facilities within their communities.</p>
              </div>
              <div className="flourmill-card">
                <h3>Sustainable Livelihood</h3>
                <p>A one-time support that creates long-term earning opportunities and financial stability.</p>
              </div>
            </div>
          </div>

          <div className="flourmill-impact">
            <div className="flourmill-story">
              <span>SUCCESS STORY</span>
              <h3>From Support to Self-Sufficiency</h3>
              <p>
                For many families, a flour mill is more than a machine —
                it is a pathway to financial independence. Through this
                initiative, beneficiaries can operate their own small
                business, earn a steady income, and build a brighter future
                for their families while contributing to their local
                communities.
              </p>
            </div>
            <div className="flourmill-stats">
              <div className="flourmill-box">
                <h2>500+</h2>
                <span>Families Empowered</span>
              </div>
              <div className="flourmill-box">
                <h2>100%</h2>
                <span>Livelihood Focused</span>
              </div>
              <div className="flourmill-box">
                <h2>24/7</h2>
                <span>Income Opportunity</span>
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
          <div className="shital-gallery-item"><img src="/images/g42.webp" alt="" /></div>
          <div className="shital-gallery-item"><img src="/images/g43.webp" alt="" /></div>
          <div className="shital-gallery-item"><img src="/images/g44.webp" alt="" /></div>
        </div>
      </section>
    </>
  );
}
