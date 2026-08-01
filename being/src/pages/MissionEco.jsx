import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';

export default function MissionEco() {
  const iframeRef = useRef(null);

  useEffect(() => {
    function handleMessage(e) {
      if (iframeRef.current && typeof e.data === 'number') {
        iframeRef.current.style.height = e.data + 'px';
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);
  return (
    <>
      <style>{`
        .mission-eco * { margin: 0; padding: 0; box-sizing: border-box; }
        .mission-eco { font-family: 'Montserrat', sans-serif; overflow-x: hidden; background: #fff; }
        .mission-eco img { width: 100%; display: block; }

        .mission-eco .tax-box {
          width: 100%; height: 70px; display: flex; justify-content: center; align-items: center;
          text-align: center; background: linear-gradient(to right, #009BD4 0%, #0285C3 25%, #046FB1 50%, #074D97 75%, #083D8B 100%); color: #fff;
          margin: 10px 0; padding: 10px; position: relative; overflow: hidden; transition: 0.4s ease;
        }
        .mission-eco .tax-box h1 { font-size: 28px; font-weight: 700; position: relative; z-index: 2; }
        .mission-eco .tax-box p { font-size: 16px; line-height: 1.6; position: relative; z-index: 2; }
        .mission-eco .tax-box::before {
          content: ""; position: absolute; width: 200%; height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.15), transparent);
          top: -50%; left: -50%; animation: meShine 6s linear infinite;
        }
        .mission-eco .tax-box:hover { transform: translateY(-5px) scale(1.01); box-shadow: 0 25px 60px rgba(0,163,218,0.35); }
        @keyframes meShine { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        .mission-eco .hero {
          width: 100%; min-height: 100vh; display: flex; align-items: center; justify-content: center;
          padding: 60px 7%; background: #f4fcff;
        }
        .mission-eco .hero-content { width: 100%; max-width: 1200px; display: flex; align-items: center; justify-content: space-between; gap: 60px; }
        .mission-eco .hero-left { flex: 1; }
        .mission-eco .hero-right { flex: 1; display: flex; justify-content: center; }
        .mission-eco .hero-right img {
          width: 100%; max-width: 520px; height: 550px; object-fit: cover; border-radius: 40px;
          transition: 0.6s ease; transform: perspective(1000px) rotateY(-10deg);
          box-shadow: 0 30px 60px rgba(0,0,0,0.18); animation: meFloatImage 4s ease-in-out infinite;
        }
        .mission-eco .hero-right img:hover { transform: perspective(1000px) rotateY(0deg) scale(1.05); box-shadow: 0 40px 90px rgba(0,0,0,0.25); }
        @keyframes meFloatImage {
          0% { transform: perspective(1000px) rotateY(-10deg) translateY(0); }
          50% { transform: perspective(1000px) rotateY(-10deg) translateY(-12px); }
          100% { transform: perspective(1000px) rotateY(-10deg) translateY(0); }
        }
        .mission-eco .tag { color: #00a3da; display: inline-block; margin-bottom: 25px; font-weight: 800; font-size: 30px; letter-spacing: 1px; background: none; }
        .mission-eco .hero-left h1 { font-size: 62px; line-height: 1.1; margin-bottom: 25px; }
        .mission-eco .hero-left p { font-size: 18px; color: #6b7280; line-height: 1.9; margin-bottom: 35px; }
        .mission-eco .btns { display: flex; gap: 15px; flex-wrap: wrap; }
        .mission-eco .btn { padding: 16px 34px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 18px; transition: 0.3s; }
        .mission-eco .primary { background: #00a3da; color: #fff; box-shadow: 0 15px 35px rgba(0,163,218,0.35); }
        .mission-eco .btn:hover { transform: translateY(-4px); }

        .mission-eco .impact { width: 100%; padding-top: 60px; padding-right: 7%; padding-bottom: 60px; padding-left: 7%; background: #f8fbfd; }
        .mission-eco .box { max-width: 1100px; margin: auto; display: flex; justify-content: center; align-items: center; gap: 25px; flex-wrap: wrap; }
        .mission-eco .card {
          background: #fff; padding: 30px 25px; border-radius: 22px; min-width: 200px;
          text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.08); transition: 0.3s; cursor: pointer;
        }
        .mission-eco .card:hover { transform: translateY(-6px); background: #00a3da; color: #fff; }
        .mission-eco .card h2 { font-size: 38px; color: #00a3da; margin-bottom: 8px; }
        .mission-eco .card:hover h2, .mission-eco .card:hover p { color: #fff; }

        .mission-eco .work { width: 100%; padding: 60px 7%; text-align: center; }
        .mission-eco .work h2 { font-size: 42px; margin-bottom: 40px; }
        .mission-eco .grid { max-width: 1100px; margin: auto; display: grid; grid-template-columns: repeat(3,1fr); gap: 25px; }
        .mission-eco .item { border-radius: 25px; overflow: hidden; background: #fff; box-shadow: 0 10px 25px rgba(0,0,0,0.05); transition: 0.4s; }
        .mission-eco .item img { width: 100%; height: 220px; object-fit: cover; transition: 0.5s; }
        .mission-eco .item:hover img { transform: scale(1.08); }

        .mission-eco .green-earth-wrap { width: 100%; padding: 100px 7%; background: #fff; overflow: hidden; position: relative; }
        .mission-eco .green-earth-wrap::before {
          content: ""; position: absolute; width: 320px; height: 320px; background: #00a3da15;
          border-radius: 50%; top: -120px; right: -120px; filter: blur(20px);
        }
        .mission-eco .green-earth-container { display: flex; align-items: center; justify-content: space-between; gap: 70px; flex-wrap: wrap; }
        .mission-eco .green-earth-gallery { flex: 1; min-width: 320px; position: relative; }
        .mission-eco .green-earth-main-img {
          border-radius: 30px; overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.12), 0 10px 25px rgba(0,163,218,0.15);
          transition: 0.5s;
        }
        .mission-eco .green-earth-main-img:hover { transform: perspective(1000px) rotateY(-5deg) translateY(-8px); }
        .mission-eco .green-earth-main-img img { width: 100%; height: 450px; object-fit: cover; display: block; }
        .mission-eco .green-earth-bottom-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; margin-top: 22px; }
        .mission-eco .green-earth-small-card {
          border-radius: 22px; overflow: hidden;
          box-shadow: 0 12px 30px rgba(0,0,0,0.08), 0 6px 15px rgba(0,163,218,0.12);
          transition: 0.4s; background: #fff;
        }
        .mission-eco .green-earth-small-card:hover { transform: translateY(-8px) scale(1.03); }
        .mission-eco .green-earth-small-card img { width: 100%; height: 130px; object-fit: cover; display: block; }
        .mission-eco .green-earth-content { flex: 1; min-width: 320px; }
        .mission-eco .green-earth-content h2 { font-size: 58px; line-height: 1.1; color: #111; margin-bottom: 25px; font-weight: 800; }
        .mission-eco .green-earth-content p { font-size: 17px; line-height: 1.9; color: #555; margin-bottom: 18px; }
        .mission-eco .green-earth-points { display: flex; gap: 18px; margin-top: 35px; flex-wrap: wrap; }
        .mission-eco .green-earth-box {
          flex: 1; min-width: 140px; background: #fff; border: 1px solid #e9f7fc; padding: 28px 20px;
          border-radius: 24px; text-align: center;
          box-shadow: 0 15px 35px rgba(0,0,0,0.05), 0 10px 20px rgba(0,163,218,0.08); transition: 0.4s;
        }
        .mission-eco .green-earth-box:hover { transform: translateY(-8px); }
        .mission-eco .green-earth-box h3 { font-size: 36px; color: #00a3da; margin-bottom: 8px; font-weight: 800; }
        .mission-eco .green-earth-box span { color: #666; font-size: 15px; }
        .mission-eco .green-earth-btn {
          display: inline-block; margin-top: 38px; background: #00a3da; color: #fff; padding: 16px 34px;
          border-radius: 60px; text-decoration: none; font-weight: 600; transition: 0.4s;
          box-shadow: 0 15px 30px rgba(0,163,218,0.25);
        }
        .mission-eco .green-earth-btn:hover { transform: translateY(-5px); background: #008bb9; }

        .mission-eco .sevak-donation {
          width: 100%; background: linear-gradient(to right, #009BD4 0%, #0285C3 25%, #046FB1 50%, #074D97 75%, #083D8B 100%);
          padding: 55px 4%; min-height: 120px; display: flex; align-items: center;
        }
        .mission-eco .sevak-donation-content { width: 100%; display: flex; justify-content: space-between; align-items: center; min-height: 120px; }
        .mission-eco .sevak-left { display: flex; flex-direction: column; gap: 4px; }
        .mission-eco .sevak-tag { font-size: 20px; font-weight: 700; color: #fff; }
        .mission-eco .sevak-title { font-size: 41px; margin: 0; line-height: 1.2; color: #fff; }
        .mission-eco .sevak-desc { font-size: 15px; margin: 0; color: #fff; }
        .mission-eco .sevak-btn {
          display: inline-block; padding: 15px 36px; background: #00a3da; color: #fff; text-decoration: none;
          border-radius: 6px; font-weight: 700; font-size: 16px; white-space: nowrap; transition: 0.3s;
        }
        .mission-eco .sevak-btn:hover { transform: translateY(-2px); }

        .mission-eco .testimonial-section { padding: 50px 5%; }
        .mission-eco .section-header { text-align: center; margin-bottom: 40px; }
        .mission-eco .section-header h2 { font-size: 42px; margin: 18px 0; }
        .mission-eco .testimonial-grid {
          width: 100%; max-width: 1200px; margin: auto; display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; align-items: stretch;
        }
        .mission-eco .testimonial-card {
          width: 100%; background: #fff; padding: 30px; border-radius: 28px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.07); transition: 0.4s; overflow: hidden; position: relative;
        }
        .mission-eco .testimonial-card:hover { transform: translateY(-10px); }
        .mission-eco .testimonial-card p { line-height: 2; color: #6c7d8e; margin-bottom: 25px; }
        .mission-eco .testimonial-card h4 { color: #00a3da; }
        .mission-eco .testimonial-card h4, .mission-eco .testimonial-card p { position: relative; z-index: 3; transition: 0.4s ease; }
        .mission-eco .testimonial-card:hover h4, .mission-eco .testimonial-card:hover p { color: #fff !important; }
        .mission-eco .testimonial-card::before {
          content: ""; position: absolute; left: 0; bottom: 0; width: 100%; height: 0%;
          background: #00a3da; transition: 0.4s ease; z-index: 1; border-radius: 28px;
        }
        .mission-eco .testimonial-card:hover::before { height: 100%; }
        .mission-eco .testimonial-card > * { position: relative; z-index: 2; }

        @media (max-width: 991px) {
          .mission-eco .hero-content { flex-direction: column; text-align: center; }
          .mission-eco .hero-left h1 { font-size: 46px; }
          .mission-eco .hero-right img { height: auto; aspect-ratio: 16/10; max-height: 420px; transform: none; animation: none; }
          .mission-eco .grid { grid-template-columns: 1fr; }
          .mission-eco .green-earth-container { flex-direction: column; }
          .mission-eco .green-earth-content h2 { font-size: 42px; }
          .mission-eco .sevak-donation-content { flex-direction: column; text-align: center; gap: 20px; min-height: auto; }
          .mission-eco .sevak-title { font-size: 34px; }
        }
        @media (max-width: 600px) {
          .mission-eco .hero-left h1 { font-size: 32px; }
          .mission-eco .tag { font-size: 20px; }
          .mission-eco .btns { flex-direction: column; align-items: center; }
          .mission-eco .hero-right img { height: auto; aspect-ratio: 4/3; max-height: 300px; border-radius: 24px; transform: none; animation: none; }
          .mission-eco .green-earth-wrap { padding: 50px 5%; }
          .mission-eco .green-earth-content h2 { font-size: 34px; }
          .mission-eco .green-earth-btn { display: block; width: fit-content; margin-left: auto; margin-right: auto; }
          .mission-eco .sevak-title { font-size: 28px; }
        }
      `}</style>

      <div className="mission-eco">
        <section className="tax-box">
          <h1>Mission Eco-Warriors</h1>
        </section>

        <section className="hero">
          <div className="hero-content">
            <div className="hero-left">
              <span className="tag">Mission Eco Warriors</span>
              <h1><b>Turning Plastic Bottles Into A Cleaner Future</b></h1>
              <p>
                Mission Eco Warriors by Being Sevak promotes cleanliness and recycling
                by installing Bottle Crusher Machines at metro stations and public places
                to reduce plastic waste and protect the environment.
              </p>
              <div className="btns">
                <a href="#donate" className="btn primary">Support Mission</a>
              </div>
            </div>
            <div className="hero-right">
              <img src="/images/eco main..jpg" alt="Eco Warriors" />
            </div>
          </div>
        </section>

        <div id="donate" style={{ width: '100%', background: '#f4f7fb', padding: '0', overflow: 'hidden', marginBottom: '0', position: 'relative', zIndex: 10, isolation: 'isolate' }}>
          <iframe
            ref={iframeRef}
            src="/donations/donation-ecowarriors.html"
            style={{ width: '100%', height: '650px', border: 'none', display: 'block', marginBottom: '-1px' }}
            title="Donate to Mission Eco Warriors"
          />
        </div>

        <section className="impact">
          <div className="box">
            <div className="card"><h2>25+</h2><p>Machines Installed</p></div>
            <div className="card"><h2>10K+</h2><p>Bottles Recycled</p></div>
            <div className="card"><h2>15+</h2><p>Metro Stations</p></div>
          </div>
        </section>

        <section className="work">
          <h2>Our Activities</h2>
          <div className="grid">
            <div className="item"><img src="/images/eco5.jpeg" alt="" /></div>
            <div className="item"><img src="/images/eco3.jpeg" alt="" /></div>
            <div className="item"><img src="/images/eco2.jpeg" alt="" /></div>
            <div className="item"><img src="/images/eco7.jpeg" alt="" /></div>
            <div className="item"><img src="/images/eco6.jpeg" alt="" /></div>
            <div className="item"><img src="/images/eco4.jpeg" alt="" /></div>
          </div>
        </section>

        <section className="green-earth-wrap">
          <div className="green-earth-container">
            <div className="green-earth-gallery">
              <div className="green-earth-main-img">
                <img src="/images/tree1.jpg" alt="" />
              </div>
              <div className="green-earth-bottom-grid">
                <div className="green-earth-small-card"><img src="/images/tree2.jpg" alt="" /></div>
                <div className="green-earth-small-card"><img src="/images/tree3.jpg" alt="" /></div>
                <div className="green-earth-small-card"><img src="/images/tree4.jpg" alt="" /></div>
              </div>
            </div>
            <div className="green-earth-content">
              <h2>Tree Plantation</h2>
              <p>
                Our Tree Plantation initiative is dedicated to creating a greener, healthier, and more sustainable future for
                communities. Through collective efforts, we plant trees in schools, public spaces, villages, and urban areas
                to improve air quality and protect nature.
              </p>
              <p>
                Every tree planted is a step toward reducing pollution, conserving biodiversity, and spreading environmental
                awareness among people. Together, we aim to inspire communities to care for the planet and build a cleaner tomorrow.
              </p>
              <div className="green-earth-points">
                <div className="green-earth-box"><h3>500+</h3><span>Trees Planted</span></div>
                <div className="green-earth-box"><h3>20+</h3><span>Volunteer Teams</span></div>
                <div className="green-earth-box"><h3>15+</h3><span>Communities Reached</span></div>
              </div>
              <Link to="/donate" className="green-earth-btn">Join The Mission</Link>
            </div>
          </div>
        </section>

        <section className="hero">
          <div className="hero-content">
            <div className="hero-left">
              <span className="tag">Beach Sevak Initiative</span>
              <h1>Clean Beaches, Safe Oceans, Better Future</h1>
              <p>
                Beach Sevak by Being Sevak focuses on cleaning coastal areas,
                protecting marine life and spreading awareness about ocean waste.
              </p>
              <div className="btns">
                <a href="#impact" className="btn primary">Join Mission</a>
              </div>
            </div>
            <div className="hero-right">
              <img src="/images/beach1.png" alt="Beach Sevak" />
            </div>
          </div>
        </section>

        <section className="impact">
          <div className="box">
            <div className="card"><h2>120+</h2><p>Clean Drives</p></div>
            <div className="card"><h2>5T+</h2><p>Waste Removed</p></div>
            <div className="card"><h2>500+</h2><p>Volunteers</p></div>
          </div>
        </section>

        <section className="work">
          <h2>Our Activities</h2>
          <div className="grid">
            <div className="item"><img src="/images/beach2.jpeg" alt="" /></div>
            <div className="item"><img src="/images/beach3.jpeg" alt="" /></div>
            <div className="item"><img src="/images/beach4.jpeg" alt="" /></div>
          </div>
        </section>

        <section className="sevak-donation" id="donate">
          <div className="sevak-donation-content">
            <div className="sevak-left">
              <span className="sevak-tag">Mission Eco Warriors</span>
              <h2 className="sevak-title">Fight Today for a Greener Tomorrow</h2>
              <p className="sevak-desc">
                Join our Eco Warriors movement to protect nature through tree plantation,
                waste management, recycling awareness, and climate action for a sustainable future.
              </p>
            </div>
            <div className="sevak-right">
              <Link to="/donate" className="sevak-btn">Donate Now</Link>
            </div>
          </div>
        </section>

        <br />

        <section className="testimonial-section">
          <div className="section-header">
            <h2>What Our Donors Say</h2>
          </div>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <p>"Being Sevak is doing incredible work for visually impaired and needy families. Proud to support this mission."</p>
              <h4>Riya Sharma</h4>
            </div>
            <div className="testimonial-card">
              <p>"Transparent work, genuine impact, and a wonderful team dedicated to helping people with dignity."</p>
              <h4>Rahul Mehta</h4>
            </div>
            <div className="testimonial-card">
              <p>"Every donation creates real change. Their food distribution drives truly touch lives."</p>
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
