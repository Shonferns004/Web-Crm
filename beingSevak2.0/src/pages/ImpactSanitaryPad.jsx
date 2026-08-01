import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function ImpactSanitaryPad() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const css = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root { --navy: #03163E; --mid: #315371; --cyan: #00A2D9; --cyan-light: #33bce8; --green: #2eb85c; --gold: #D4AF37; --white: #ffffff; --light-bg: #f4f7fb; --text-dark: #1a1a2e; --text-mid: #4a5568; }
    body { font-family: 'Open Sans', sans-serif; color: var(--text-dark); overflow-x: hidden; }

    .sanitary-section { background: #fff; padding: 100px 8%; overflow: hidden; }
    .sanitary-container { max-width: 1300px; margin: auto; }
    .sanitary-heading { text-align: center; max-width: 850px; margin: 0 auto 70px; }
    .sanitary-tag { display: inline-block; padding: 10px 24px; background: rgba(0,163,218,.12); color: #00a3da; border-radius: 50px; font-size: 13px; font-weight: 700; letter-spacing: 1px; margin-bottom: 20px; }
    .sanitary-heading h2 { font-size: 52px; color: #111; margin-bottom: 20px; }
    .sanitary-heading p { color: #666; line-height: 1.9; font-size: 17px; }
    .sanitary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
    .sanitary-image { position: relative; }
    .sanitary-image::before { content: ""; position: absolute; width: 200px; height: 200px; background: #00a3da; border-radius: 50%; top: -35px; left: -35px; opacity: .12; }
    .sanitary-image img { width: 100%; border-radius: 25px; box-shadow: 0 15px 40px rgba(0,0,0,.12); position: relative; z-index: 2; }
    .sanitary-content { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .sanitary-card { background: #fff; border: 1px solid rgba(0,163,218,.15); padding: 30px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,.05); transition: .4s; }
    .sanitary-card:hover { background: #00a3da; transform: translateY(-8px); }
    .sanitary-card h3 { font-size: 22px; margin-bottom: 12px; transition: .4s; }
    .sanitary-card p { color: #666; line-height: 1.7; transition: .4s; }
    .sanitary-card:hover h3, .sanitary-card:hover p { color: #fff; }
    .sanitary-impact { margin-top: 80px; background: linear-gradient(135deg,#00a3da,#008ec0); padding: 60px; border-radius: 30px; color: #fff; display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; align-items: center; }
    .sanitary-story span { font-size: 14px; font-weight: 700; letter-spacing: 1px; }
    .sanitary-story h3 { font-size: 42px; margin: 15px 0; }
    .sanitary-story p { line-height: 1.9; }
    .sanitary-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 15px; }
    .sanitary-box { background: rgba(255,255,255,.12); backdrop-filter: blur(10px); padding: 30px 15px; text-align: center; border-radius: 20px; }
    .sanitary-box h2 { font-size: 40px; margin-bottom: 10px; }
    .sanitary-box span { font-size: 14px; }

    @media(max-width:991px) {
      .sanitary-grid { grid-template-columns: 1fr; }
      .sanitary-content { grid-template-columns: 1fr; }
      .sanitary-impact { grid-template-columns: 1fr; padding: 35px; }
      .sanitary-stats { grid-template-columns: 1fr; }
      .sanitary-heading h2 { font-size: 38px; }
      .sanitary-story h3 { font-size: 30px; }
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

      <section className="sanitary-section">
        <div className="sanitary-container">
          <div className="sanitary-heading">
            <span className="sanitary-tag">WOMEN HEALTH & HYGIENE INITIATIVE</span>
            <h2>Sanitary Pad Vending Machine</h2>
            <p>
              Being Sevak Charitable Trust has installed Sanitary Pad Vending
              Machines at metro stations to promote menstrual hygiene,
              dignity, and accessibility for women commuters. These machines
              ensure that sanitary pads are available when needed, helping
              women manage their health safely and confidently while
              travelling. Through this initiative, we are creating cleaner,
              healthier, and more inclusive public spaces.
            </p>
          </div>

          <div className="sanitary-grid">
            <div className="sanitary-image">
              <img src="/images/g24.webp" alt="Sanitary Pad Vending Machine" />
            </div>
            <div className="sanitary-content">
              <div className="sanitary-card">
                <h3>Menstrual Hygiene</h3>
                <p>Providing easy access to sanitary pads helps women maintain hygiene and health during emergencies.</p>
              </div>
              <div className="sanitary-card">
                <h3>Metro Station Access</h3>
                <p>Strategically installed at metro stations for maximum convenience and public benefit.</p>
              </div>
              <div className="sanitary-card">
                <h3>Women Empowerment</h3>
                <p>Supporting dignity, confidence, and comfort for women in public spaces.</p>
              </div>
              <div className="sanitary-card">
                <h3>Health Awareness</h3>
                <p>Encouraging awareness about menstrual health and breaking social stigma through accessibility.</p>
              </div>
            </div>
          </div>

          <div className="sanitary-impact">
            <div className="sanitary-story">
              <span>COMMUNITY IMPACT</span>
              <h3>Supporting Women Every Day</h3>
              <p>
                Thousands of women travel through metro stations daily.
                Access to sanitary pads during unexpected situations can
                make a significant difference. By installing Sanitary Pad
                Vending Machines, Being Sevak Charitable Trust ensures that
                essential hygiene products are available whenever required,
                creating a safer and more supportive environment for women.
              </p>
            </div>
            <div className="sanitary-stats">
              <div className="sanitary-box">
                <h2>10+</h2>
                <span>Machines Installed</span>
              </div>
              <div className="sanitary-box">
                <h2>50K+</h2>
                <span>Women Benefited</span>
              </div>
              <div className="sanitary-box">
                <h2>100%</h2>
                <span>Hygiene Focused</span>
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
          <div className="shital-gallery-item"><img src="/images/g21.webp" alt="" /></div>
          <div className="shital-gallery-item"><img src="/images/g22.webp" alt="" /></div>
          <div className="shital-gallery-item"><img src="/images/g23.jpg" alt="" /></div>
        </div>
      </section>
    </>
  );
}
