import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function ImpactDialysisCentre() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const css = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root { --navy: #03163E; --mid: #315371; --cyan: #00A2D9; --cyan-light: #33bce8; --green: #2eb85c; --gold: #D4AF37; --white: #ffffff; --light-bg: #f4f7fb; --text-dark: #1a1a2e; --text-mid: #4a5568; }
    body { font-family: 'Open Sans', sans-serif; color: var(--text-dark); overflow-x: hidden; }

    .dialysis-support-section { background: #fff; padding: 100px 8%; overflow: hidden; }
    .dialysis-container { max-width: 1300px; margin: auto; }
    .dialysis-heading { text-align: center; max-width: 850px; margin: 0 auto 70px; }
    .dialysis-tag { display: inline-block; padding: 10px 24px; background: rgba(0,163,218,.12); color: #00a3da; border-radius: 50px; font-size: 13px; font-weight: 700; letter-spacing: 1px; margin-bottom: 20px; }
    .dialysis-heading h2 { font-size: 52px; color: #111; margin-bottom: 20px; }
    .dialysis-heading p { color: #666; line-height: 1.9; font-size: 17px; }
    .dialysis-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
    .dialysis-image { position: relative; }
    .dialysis-image::before { content: ""; position: absolute; width: 200px; height: 200px; background: #00a3da; border-radius: 50%; top: -35px; left: -35px; opacity: .12; }
    .dialysis-image img { width: 100%; border-radius: 25px; box-shadow: 0 15px 40px rgba(0,0,0,.12); position: relative; z-index: 2; }
    .dialysis-content { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .dialysis-card { background: #fff; border: 1px solid rgba(0,163,218,.15); padding: 30px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,.05); transition: .4s; }
    .dialysis-card:hover { background: #00a3da; transform: translateY(-8px); }
    .dialysis-card h3 { font-size: 22px; margin-bottom: 12px; transition: .4s; }
    .dialysis-card p { color: #666; line-height: 1.7; transition: .4s; }
    .dialysis-card:hover h3, .dialysis-card:hover p { color: #fff; }
    .dialysis-impact { margin-top: 80px; background: linear-gradient(135deg,#00a3da,#008ec0); padding: 60px; border-radius: 30px; color: #fff; display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; align-items: center; }
    .dialysis-story span { font-size: 14px; font-weight: 700; letter-spacing: 1px; }
    .dialysis-story h3 { font-size: 42px; margin: 15px 0; }
    .dialysis-story p { line-height: 1.9; }
    .dialysis-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 15px; }
    .dialysis-box { background: rgba(255,255,255,.12); backdrop-filter: blur(10px); padding: 30px 15px; text-align: center; border-radius: 20px; }
    .dialysis-box h2 { font-size: 40px; margin-bottom: 10px; }
    .dialysis-box span { font-size: 14px; }

    @media(max-width:991px) {
      .dialysis-grid { grid-template-columns: 1fr; }
      .dialysis-content { grid-template-columns: 1fr; }
      .dialysis-impact { grid-template-columns: 1fr; padding: 35px; }
      .dialysis-stats { grid-template-columns: 1fr; }
      .dialysis-heading h2 { font-size: 38px; }
      .dialysis-story h3 { font-size: 30px; }
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

      <section className="dialysis-support-section">
        <div className="dialysis-container">
          <div className="dialysis-heading">
            <span className="dialysis-tag">HEALTHCARE SUPPORT PROGRAM</span>
            <h2>Dialysis Centre Support</h2>
            <p>
              Chronic kidney disease requires ongoing dialysis, often placing
              a heavy financial burden on low-income families. Through our
              Dialysis Centre Support initiative, Being Sevak Charitable Trust
              provides subsidized or free dialysis sessions, medical
              assistance, and compassionate care to patients who would
              otherwise be unable to afford life-sustaining treatment.
            </p>
          </div>

          <div className="dialysis-grid">
            <div className="dialysis-image">
              <img src="/images/g61.png" alt="Dialysis Centre Support" />
            </div>
            <div className="dialysis-content">
              <div className="dialysis-card">
                <h3>Affordable Dialysis Sessions</h3>
                <p>Providing free or subsidized dialysis treatments for underprivileged patients.</p>
              </div>
              <div className="dialysis-card">
                <h3>Expert Medical Staff</h3>
                <p>Experienced doctors and nephrologists oversee every session for safety and quality care.</p>
              </div>
              <div className="dialysis-card">
                <h3>Emotional Support</h3>
                <p>Compassionate assistance and counseling to help patients through their treatment journey.</p>
              </div>
              <div className="dialysis-card">
                <h3>Saving Lives Every Day</h3>
                <p>Ensuring that no kidney patient is denied treatment because of financial hardship.</p>
              </div>
            </div>
          </div>

          <div className="dialysis-impact">
            <div className="dialysis-story">
              <span>IMPACT STORY</span>
              <h3>A Second Chance at Life</h3>
              <p>
                Priya, a young working woman from an underprivileged family,
                was diagnosed with chronic kidney disease and needed regular
                dialysis that her family could barely afford. Through the
                Dialysis Centre Support of Being Sevak Charitable Trust,
                she received life-saving treatment and the support she
                needed to continue fighting for her life and her dreams.
              </p>
            </div>
            <div className="dialysis-stats">
              <div className="dialysis-box">
                <h2>1000+</h2>
                <span>Patients Treated</span>
              </div>
              <div className="dialysis-box">
                <h2>24/7</h2>
                <span>Care Available</span>
              </div>
              <div className="dialysis-box">
                <h2>100%</h2>
                <span>Life Saving Focus</span>
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
          <div className="shital-gallery-item"><img src="/images/g58.png" alt="" /></div>
          <div className="shital-gallery-item"><img src="/images/g59.png" alt="" /></div>
          <div className="shital-gallery-item"><img src="/images/g60.png" alt="" /></div>
        </div>
      </section>
    </>
  );
}
