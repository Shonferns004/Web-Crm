import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function ImpactRozgaarBooth() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const css = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root { --navy: #03163E; --mid: #315371; --cyan: #00A2D9; --cyan-light: #33bce8; --green: #2eb85c; --gold: #D4AF37; --white: #ffffff; --light-bg: #f4f7fb; --text-dark: #1a1a2e; --text-mid: #4a5568; }
    body { font-family: 'Open Sans', sans-serif; color: var(--text-dark); overflow-x: hidden; }

    .rozgaar-booth-section { background: #fff; padding: 100px 8%; overflow: hidden; }
    .rozgaar-container { max-width: 1300px; margin: auto; }
    .rozgaar-heading { text-align: center; max-width: 850px; margin: 0 auto 70px; }
    .rozgaar-tag { display: inline-block; padding: 10px 24px; background: rgba(0,163,218,.12); color: #00a3da; border-radius: 50px; font-size: 13px; font-weight: 700; letter-spacing: 1px; margin-bottom: 20px; }
    .rozgaar-heading h2 { font-size: 52px; color: #111; margin-bottom: 20px; }
    .rozgaar-heading p { color: #666; line-height: 1.9; font-size: 17px; }
    .rozgaar-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
    .rozgaar-image { position: relative; }
    .rozgaar-image::before { content: ""; position: absolute; width: 180px; height: 180px; background: #00a3da; border-radius: 50%; top: -30px; left: -30px; opacity: .12; }
    .rozgaar-image img { width: 100%; border-radius: 25px; box-shadow: 0 15px 40px rgba(0,0,0,.12); position: relative; z-index: 2; }
    .rozgaar-content { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .rozgaar-card { background: #fff; border: 1px solid rgba(0,163,218,.15); padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,.05); transition: .4s; }
    .rozgaar-card:hover { background: #00a3da; transform: translateY(-8px); }
    .rozgaar-card h3 { margin-bottom: 12px; font-size: 22px; transition: .4s; }
    .rozgaar-card p { color: #666; line-height: 1.7; transition: .4s; }
    .rozgaar-card:hover h3, .rozgaar-card:hover p { color: #fff; }
    .rozgaar-impact { margin-top: 80px; background: linear-gradient(135deg,#00a3da,#008fbe); padding: 60px; border-radius: 30px; color: #fff; display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; align-items: center; }
    .impact-content span { font-size: 14px; font-weight: 700; letter-spacing: 1px; }
    .impact-content h3 { font-size: 40px; margin: 15px 0; }
    .impact-content p { line-height: 1.9; }
    .impact-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 15px; }
    .impact-box { background: rgba(255,255,255,.12); backdrop-filter: blur(10px); padding: 30px 15px; text-align: center; border-radius: 20px; }
    .impact-box h2 { font-size: 38px; margin-bottom: 10px; }
    .impact-box span { font-size: 14px; }

    @media(max-width:991px) {
      .rozgaar-grid { grid-template-columns: 1fr; }
      .rozgaar-content { grid-template-columns: 1fr; }
      .rozgaar-impact { grid-template-columns: 1fr; padding: 35px; }
      .impact-stats { grid-template-columns: 1fr; }
      .rozgaar-heading h2 { font-size: 38px; }
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

      <section className="rozgaar-booth-section">
        <div className="rozgaar-container">
          <div className="rozgaar-heading">
            <span className="rozgaar-tag">MISSION ATMANIRBHAR</span>
            <h2>Rozgaar Booth </h2>
            <p>
              Through the Rozgaar Booth Repairing initiative, Being Sevak
              Charitable Trust helps visually impaired and specially-abled
              individuals restore and renovate their livelihood booths.
              These booths serve as a primary source of income, enabling
              beneficiaries to run small businesses independently and live
              with dignity and self-reliance.
            </p>
          </div>

          <div className="rozgaar-grid">
            <div className="rozgaar-image">
              <img src="/images/g15.webp" alt="Rozgaar Booth Repairing" />
            </div>
            <div className="rozgaar-content">
              <div className="rozgaar-card">
                <h3>Livelihood Restoration</h3>
                <p>Repairing damaged booths helps beneficiaries restart their businesses and regain financial stability.</p>
              </div>
              <div className="rozgaar-card">
                <h3>Economic Independence</h3>
                <p>A functional booth creates a sustainable source of income for visually impaired individuals and families.</p>
              </div>
              <div className="rozgaar-card">
                <h3>Safe Work Environment</h3>
                <p>Renovated structures provide a secure and comfortable workplace for daily business operations.</p>
              </div>
              <div className="rozgaar-card">
                <h3>Empowering Dreams</h3>
                <p>Every repaired booth becomes a symbol of hope, confidence, and self-sufficiency.</p>
              </div>
            </div>
          </div>

          <div className="rozgaar-impact">
            <div className="impact-content">
              <span>SUCCESS STORY</span>
              <h3>From Struggle to Sustainable Income</h3>
              <p>
                Geeta Nazre, a visually impaired beneficiary, was allotted
                a telephone booth in poor condition. Since her family's
                livelihood depended on the booth, urgent repairs and
                replacement were essential. Through support from Being
                Sevak Charitable Trust, the booth was restored, helping
                her continue earning and supporting her family with dignity.
              </p>
            </div>
            <div className="impact-stats">
              <div className="impact-box">
                <h2>100+</h2>
                <span>Booths Supported</span>
              </div>
              <div className="impact-box">
                <h2>500+</h2>
                <span>Lives Empowered</span>
              </div>
              <div className="impact-box">
                <h2>100%</h2>
                <span>Livelihood Focused</span>
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
          <div className="shital-gallery-item"><img src="/images/g11.webp" alt="" /></div>
          <div className="shital-gallery-item"><img src="/images/g12.webp" alt="" /></div>
          <div className="shital-gallery-item"><img src="/images/g14.webp" alt="" /></div>
        </div>
      </section>
    </>
  );
}
