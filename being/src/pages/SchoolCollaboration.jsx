import { Link } from 'react-router-dom';

export default function SchoolCollaboration() {
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
        body { font-family: 'Open Sans', sans-serif; color: var(--text-dark); overflow-x: hidden; }
        .school-collab-section {
          width: 100%;
          padding: 100px 8%;
          background: #fff;
          overflow: hidden;
          position: relative;
        }
        .school-collab-section::before {
          content: "";
          position: absolute;
          width: 420px; height: 420px;
          background: #00a3d4;
          opacity: 0.08;
          border-radius: 50%;
          top: -150px; right: -120px;
          filter: blur(20px);
        }
        .school-collab-container {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 60px;
          align-items: center;
        }
        .school-tag {
          display: inline-block;
          padding: 10px 22px;
          background: #00a3d4;
          color: #fff;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 20px;
          box-shadow: 0 10px 25px rgba(0,163,212,0.35);
        }
        .school-collab-left h2 {
          font-size: 55px;
          line-height: 1.2;
          margin-bottom: 25px;
          color: #111;
          font-weight: 800;
        }
        .school-collab-left h2 span {
          color: #00a3d4;
          text-shadow: 0 5px 15px rgba(0,163,212,0.25);
        }
        .school-collab-left p {
          font-size: 17px;
          line-height: 1.9;
          color: #555;
          margin-bottom: 18px;
        }
        .school-highlight-box {
          background: #fff;
          border-left: 6px solid #00a3d4;
          padding: 30px;
          border-radius: 25px;
          margin: 35px 0;
          box-shadow: 0 12px 30px rgba(0,0,0,0.05), 0 0 25px rgba(0,163,212,0.10);
          transition: 0.4s;
        }
        .school-highlight-box:hover { transform: translateY(-8px); }
        .school-highlight-box h3 {
          font-size: 28px;
          color: #00a3d4;
          margin-bottom: 15px;
        }
        .school-points {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        .school-point {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          background: #fff;
          padding: 22px;
          border-radius: 25px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05), 0 0 20px rgba(0,163,212,0.08);
          transition: 0.4s;
        }
        .school-point:hover { transform: translateX(10px); }
        .school-icon {
          min-width: 65px;
          height: 65px;
          background: #00a3d4;
          color: #fff;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
          box-shadow: 0 12px 25px rgba(0,163,212,0.35);
        }
        .school-point h4 { font-size: 22px; margin-bottom: 8px; color: #111; }
        .school-point p { margin: 0; font-size: 15px; }
        .school-bottom-box {
          margin-top: 45px;
          background: linear-gradient(135deg, #00a3d4, #0085ad);
          padding: 40px;
          border-radius: 30px;
          color: #fff;
          box-shadow: 0 20px 40px rgba(0,163,212,0.30);
        }
        .school-bottom-box p { color: #fff; margin-bottom: 18px; }
        .school-bottom-box h4 { font-size: 28px; line-height: 1.5; font-weight: 700; }
        .school-collab-right {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        .school-card {
          background: #fff;
          padding: 40px 35px;
          border-radius: 30px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0,0,0,0.06), 0 0 25px rgba(0,163,212,0.08);
          transition: 0.4s;
        }
        .school-card::before {
          content: "";
          position: absolute;
          width: 140px; height: 140px;
          background: #00a3d4;
          opacity: 0.08;
          border-radius: 50%;
          top: -50px; right: -50px;
        }
        .school-card:hover { transform: translateY(-10px); }
        .school-card h3 {
          font-size: 30px;
          margin-bottom: 15px;
          color: #00a3d4;
          position: relative;
          z-index: 2;
        }
        .school-card p {
          font-size: 16px;
          line-height: 1.8;
          color: #555;
          position: relative;
          z-index: 2;
        }
        .school-card-one { margin-top: 40px; }
        .school-card-two { margin-left: 40px; }
        .school-card-three { margin-top: 10px; }
        @media(max-width: 991px) {
          .school-collab-container { grid-template-columns: 1fr; }
          .school-collab-left h2 { font-size: 40px; }
          .school-card-two { margin-left: 0; }
          .school-card-one { margin-top: 0; }
        }
        @media(max-width: 600px) {
          .school-collab-section { padding: 80px 5%; }
          .school-collab-left h2 { font-size: 32px; }
          .school-highlight-box, .school-card, .school-bottom-box, .school-point { padding: 25px; }
          .school-bottom-box h4 { font-size: 22px; }
        }
      `}</style>

      <section className="school-collab-section">
        <div className="school-collab-container">
          <div className="school-collab-left">
            <h2>
              School & Institute <span>Collaboration</span>
            </h2>

            <p>
              At Being Sevak Charitable Trust, we believe that children are not only the future of our nation but also powerful agents of positive change within society.
            </p>

            <p>
              Instilling compassion, empathy, and social responsibility at an early age helps shape responsible individuals and future leaders.
            </p>

            <div className="school-highlight-box">
              <h3>Joy Of Giving (JOG) Program</h3>
              <p>
                Launched in 2022, the JOG Program is a unique student engagement initiative designed to create awareness about social inequalities and encourage kindness, gratitude, and community participation among students.
              </p>
            </div>

            <p>
              Through interactive sessions, awareness activities, and meaningful engagements conducted in schools and educational institutions, the JOG Program helps students understand the realities faced by underprivileged communities.
            </p>

            <p>
              The initiative encourages children to value their privileges, develop empathy for others, and contribute positively towards society.
            </p>

            <div className="school-points">
              <div className="school-point">
                <div className="school-icon">01</div>
                <div>
                  <h4>Empathy Building</h4>
                  <p>Helping students understand social realities and humanity.</p>
                </div>
              </div>
              <div className="school-point">
                <div className="school-icon">02</div>
                <div>
                  <h4>Community Participation</h4>
                  <p>Encouraging kindness, gratitude, and the spirit of giving.</p>
                </div>
              </div>
              <div className="school-point">
                <div className="school-icon">03</div>
                <div>
                  <h4>Future Leaders</h4>
                  <p>Nurturing socially conscious and responsible citizens.</p>
                </div>
              </div>
            </div>

            <div className="school-bottom-box">
              <p>
                BSCT collaborates with schools, colleges, and educational institutes to conduct impactful sessions and activities that inspire students to embrace humanity, kindness, and social responsibility.
              </p>
              <h4>
                Together, let us inspire the next generation to become compassionate and socially aware citizens.
              </h4>
            </div>
          </div>

          <div className="school-collab-right">
            <div className="school-card school-card-one">
              <h3>Awareness Sessions</h3>
              <p>
                Interactive activities that create awareness about social inequalities and community welfare.
              </p>
            </div>
            <div className="school-card school-card-two">
              <h3>Student Engagement</h3>
              <p>
                Meaningful participation programs that encourage kindness and empathy among students.
              </p>
            </div>
            <div className="school-card school-card-three">
              <h3>Social Responsibility</h3>
              <p>
                Inspiring children to become responsible citizens dedicated to building a better society.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
