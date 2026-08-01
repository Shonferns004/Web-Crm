import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Awards = () => {
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => revealObserver.observe(el));
    return () => revealEls.forEach(el => revealObserver.unobserve(el));
  }, []);

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{--navy:#03163E;--mid:#315371;--cyan:#00A2D9;--cyan-light:#33bce8;--green:#2eb85c;--white:#ffffff;--light-bg:#f4f7fb;--text-dark:#1a1a2e;--text-mid:#4a5568;--gold:#D4AF37}
        body{font-family:'Open Sans',sans-serif;color:var(--text-dark);background:#fff;scroll-behavior:smooth}
        .section-title{text-align:center;font-size:34px;font-weight:800;margin:55px auto 25px;color:var(--cyan);font-family:'Montserrat',sans-serif;display:block;width:100%;max-width:1400px;padding:0 60px}
        .awards-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:25px;padding:20px 60px 70px;max-width:1400px;margin:auto}
        .award-card{background:#fff;border-radius:14px;box-shadow:0 5px 18px rgba(0,0,0,0.1);overflow:hidden;text-align:center;transition:0.3s}
        .award-card:hover{transform:translateY(-6px)}
        .award-card img{width:100%;height:240px;object-fit:contain;padding:15px;background:#fff}
        .award-name{background:#00a3da;color:#fff;padding:14px;font-weight:700;font-size:16px;font-family:'Montserrat',sans-serif;text-align:center}
        .letter-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:22px;padding:20px 60px 80px;max-width:1400px;margin:auto}
        .letter-grid img{width:100%;height:340px;object-fit:contain;border-radius:12px;box-shadow:0 4px 14px rgba(0,0,0,0.1);transition:0.3s;background:#fff}
        .letter-grid img:hover{transform:scale(1.03)}
        .tax-box{width:100%;height:70px;display:flex;justify-content:center;align-items:center;text-align:center;background:linear-gradient(to right,#009BD4 0%,#0285C3 25%,#046FB1 50%,#074D97 75%,#083D8B 100%);color:#fff;border-radius:0;margin:20px 0;padding:10px}
        .tax-box h1{font-family:'Montserrat',sans-serif;font-size:20px;font-weight:800;letter-spacing:2px;color:#fff;margin:0;padding:10px}
        .hero{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:0;position:relative;overflow:hidden;padding:10px 8%}
        .hero-content{position:relative;z-index:2}
        .hero-content .tag{background:transparent;color:#00a3da;padding:0;border-radius:0;display:inline-block;margin-bottom:25px;font-weight:800;font-size:35px;letter-spacing:1px}
        .hero h1{font-size:20px;line-height:1.1;font-weight:800;margin-bottom:25px;padding:10px;color:var(--navy)}
        .hero h1 span{color:#00a3da}
        .hero p{font-size:18px;line-height:1.9;color:#66788a;margin-bottom:35px}
        .hero-buttons{display:flex;gap:18px;flex-wrap:wrap}
        .hero-buttons .donate-btn{display:inline-block;padding:15px 36px;background:#00a3da;color:#fff;text-decoration:none;border-radius:6px;font-weight:700;transition:0.4s;box-shadow:0 10px 25px rgba(11,77,120,0.25)}
        .hero-buttons .donate-btn:hover{background:#007d94;transform:translateY(-1px)}
        .hero-image{position:relative;z-index:2;display:flex;justify-content:center}
        .hero-image img{width:100%;max-width:500px;border-radius:30px;box-shadow:0 25px 50px rgba(0,0,0,0.15);transition:0.5s ease}
        .hero-image img:hover{transform:scale(1.02)}
        .floating-card{position:absolute;background:rgba(255,255,255,0.95);backdrop-filter:blur(8px);padding:18px 24px;border-radius:18px;box-shadow:0 15px 35px rgba(0,0,0,0.12);text-align:center;z-index:3;animation:floatCard 3s ease-in-out infinite alternate}
        .floating-card.card1{top:5%;left:-10px}
        .floating-card.card2{bottom:10%;right:-10px;animation-delay:2s}
        .floating-card h3{font-size:28px;font-weight:800;color:#00a3da}
        .floating-card p{font-size:13px;color:#555;margin:0}
        @keyframes floatCard{0%{transform:translateY(0);}100%{transform:translateY(-15px);}}
        .blur{position:absolute;width:500px;height:500px;border-radius:50%;filter:blur(120px);opacity:0.15;z-index:0;pointer-events:none}
        .blur1{background:#00a3da;top:-100px;left:-100px}
        .blur2{background:#315270;bottom:-100px;right:-100px}
        @media(max-width:900px){.hero{grid-template-columns:1fr;text-align:center;gap:50px}.hero h1{font-size:42px}.hero p{font-size:16px}.hero-buttons{justify-content:center}.hero-image img{max-width:90%}.floating-card.card1{left:5%}.floating-card.card2{right:5%}}
        @media(max-width:550px){.hero h1{font-size:32px}.hero p{font-size:14px}.floating-card{padding:12px 16px}.floating-card h3{font-size:22px}}
        .values-section{background:var(--light-bg);padding:80px 24px}
        .values-inner{max-width:1200px;margin:0 auto}
        .values-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:25px;margin-top:50px}
        .value-card{background:#fff;padding:35px 28px;border-radius:28px;box-shadow:0 20px 40px rgba(0,0,0,0.05);text-align:center;position:relative;overflow:hidden;cursor:pointer;transition:0.5s ease}
        .value-card::before{content:'';position:absolute;left:0;bottom:0;width:100%;height:0%;background:var(--cyan);transition:0.5s ease;z-index:1}
        .value-card:hover::before{height:100%}
        .value-card:hover{transform:translateY(-12px)}
        .value-card>*{position:relative;z-index:2;transition:0.4s ease}
        .value-card .val-icon{font-size:2.4rem;color:var(--cyan);margin-bottom:16px}
        .value-card h3{font-family:'Montserrat',sans-serif;font-size:1.15rem;color:var(--navy);margin-bottom:12px}
        .value-card p{font-size:0.88rem;line-height:1.7;color:var(--text-mid)}
        .value-card:hover .val-icon,.value-card:hover h3,.value-card:hover p{color:#fff}
        .testimonials-section{padding:80px 24px;background:#fff}
        .testimonials-inner{max-width:1200px;margin:0 auto}
        .testimonial-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:25px;margin-top:50px;align-items:stretch}
        .testimonial-card{background:#fff;padding:30px;border-radius:28px;box-shadow:0 20px 40px rgba(0,0,0,0.07);transition:0.4s ease;overflow:hidden;position:relative;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between}
        .testimonial-card::before{content:'';position:absolute;left:0;bottom:0;width:100%;height:0%;background:var(--cyan);transition:0.4s ease;z-index:1;border-radius:28px}
        .testimonial-card:hover::before{height:100%}
        .testimonial-card:hover{transform:translateY(-10px)}
        .testimonial-card>*{position:relative;z-index:2}
        .testimonial-card p{line-height:1.9;color:var(--text-mid);margin-bottom:20px;font-size:0.92rem}
        .testimonial-card h4{font-family:'Montserrat',sans-serif;color:var(--cyan);font-size:1rem}
        .testimonial-card span{font-size:0.8rem;color:var(--text-mid)}
        .testimonial-card:hover p,.testimonial-card:hover h4,.testimonial-card:hover span{color:#fff !important}
        .testimonial-card .quote-icon{font-size:1.6rem;color:var(--cyan-light);margin-bottom:12px;opacity:0.5}
        .testimonial-card:hover .quote-icon{color:rgba(255,255,255,0.6)}
        .reveal{opacity:0;transform:translateY(40px);transition:opacity 0.7s ease,transform 0.7s ease}
        .reveal.visible{opacity:1;transform:translateY(0)}
        @media(max-width:768px){.awards-grid{padding:20px;grid-template-columns:1fr}.letter-grid{padding:20px;grid-template-columns:1fr}.values-grid{grid-template-columns:1fr}.testimonial-grid{grid-template-columns:1fr}}
      `}</style>

      <section className="tax-box"><h1>Awards &amp; Achievements</h1></section>

      <section className="hero" id="home">
        <div className="hero-content">
          <span className="tag">BEING SEVAK CHARITABLE TRUST</span>
          <h1>Awards &amp; <span>Achievements</span></h1>
          <p>Recognized nationally for outstanding contribution to social welfare, community development, and humanitarian service across India.</p>
          <div className="hero-buttons"><a href="#achievements" className="donate-btn">View Awards</a></div>
        </div>
        <div className="hero-image">
          <div className="floating-card card1"><h3>17+</h3><p>National Awards</p></div>
          <div className="floating-card card2"><h3>1M+</h3><p>Lives Impacted</p></div>
          <img src="/images/awardsAchive.jpg" alt="Awards"/>
        </div>
        <div className="blur blur1"></div><div className="blur blur2"></div>
      </section>

      <h2 className="section-title reveal" id="achievements">Our Achievements</h2>
      <div className="awards-grid reveal">
        <div className="award-card"><img src="/images/IIIA AWARD.jpg" alt="IIIA Award"/><div className="award-name">IIIA AWARD</div></div>
        <div className="award-card"><img src="/images/COVID WARRIOR.jpg" alt="Covid Warrior"/><div className="award-name">COVID WARRIOR</div></div>
        <div className="award-card"><img src="/images/BUSINESS AWARD 2023.jpg" alt="Business Award 2023"/><div className="award-name">BUSINESS AWARD 2023</div></div>
        <div className="award-card"><img src="/images/ACHIEVEMENT AWARD.jpg" alt="Achievement Award"/><div className="award-name">ACHIEVEMENT AWARD</div></div>
        <div className="award-card"><img src="/images/SEVAK STAR AWARD.jpg" alt="Sevak Star Award"/><div className="award-name">SEVAK STAR AWARD</div></div>
        <div className="award-card"><img src="/images/POPULAR CIVILIAN   AWARD.jpg" alt="Popular Civilian Award"/><div className="award-name">POPULAR CIVILIAN AWARD</div></div>
        <div className="award-card"><img src="/images/DADA SAHEB.jpg" alt="Dada Saheb Phalke Award"/><div className="award-name">DADA SAHEB PHALKE AWARD</div></div>
        <div className="award-card"><img src="/images/PRIDE OF INDIA ICON AWARD.jpg" alt="Pride of India Icon Award"/><div className="award-name">PRIDE OF INDIA ICON AWARD</div></div>
        <div className="award-card"><img src="/images/BUSINESS AWARD 2023 (1).jpg" alt="Business Award 2023"/><div className="award-name">BUSINESS AWARD <br/>2023</div></div>
        <div className="award-card"><img src="/images/MAHATMA GANDHI RATNA AWARD.jpg" alt="Mahatma Gandhi Ratna Award"/><div className="award-name">MAHATMA GANDHI RATNA AWARD</div></div>
        <div className="award-card"><img src="/images/CHHATRAPATI SHIVAJI   MAHARAJ GAURAV AWARD 2021.jpg" alt="Shivaji Maharaj Gaurav Award"/><div className="award-name">SHIVAJI MAHARAJ GAURAV AWARD</div></div>
        <div className="award-card"><img src="/images/BORIVALI BLOOD CENTRE  AWARD.jpg" alt="Borivali Blood Centre Award"/><div className="award-name">BORIVALI BLOOD CENTRE AWARD</div></div>
        <div className="award-card"><img src="/images/MARATHA LIFE FOUNDATION AWARD.jpg" alt="Maratha Life Foundation"/><div className="award-name">MARATHA LIFE FOUNDATION</div></div>
      </div>

      <h2 className="section-title reveal">Appreciation Letters</h2>
      <div className="letter-grid reveal">
        <img src="/images/appre1.jpeg" alt="Appreciation 1"/>
        <img src="/images/appre2.jpeg" alt="Appreciation 2"/>
        <img src="/images/appre3.jpeg" alt="Appreciation 3"/>
        <img src="/images/appre4.jpeg" alt="Appreciation 4"/>
        <img src="/images/appre5.jpeg" alt="Appreciation 5"/>
        <img src="/images/appre6.jpeg" alt="Appreciation 6"/>
        <img src="/images/appre7.jpeg" alt="Appreciation 7"/>
        <img src="/images/appre8.jpeg" alt="Appreciation 8"/>
        <img src="/images/appre9.jpeg" alt="Appreciation 9"/>
        <img src="/images/appre11.jpg" alt="Appreciation 11"/>
      </div>

      <section className="values-section">
        <div className="values-inner">
          <div className="section-header" style={{textAlign:'center'}}><span style={{color:'var(--cyan)',fontWeight:700,fontSize:'1.5rem',letterSpacing:1,display:'block',marginBottom:8}}>OUR HONORS</span><h2 style={{fontFamily:'Montserrat, sans-serif',fontSize:'2rem',color:'var(--navy)'}}>Awards &amp; Recognition</h2></div>
          <div className="values-grid">
            <div className="value-card reveal"><div className="val-icon"><i className="fas fa-trophy"></i></div><h3>National Recognition</h3><p>Honored with prestigious awards including Dada Saheb Phalke Award and Mahatma Gandhi Ratna.</p></div>
            <div className="value-card reveal"><div className="val-icon"><i className="fas fa-star"></i></div><h3>Excellence</h3><p>Recognized for outstanding contribution to social welfare and community development.</p></div>
            <div className="value-card reveal"><div className="val-icon"><i className="fas fa-medal"></i></div><h3>World Records</h3><p>Harvard World Record and multiple national accolades for humanitarian work.</p></div>
            <div className="value-card reveal"><div className="val-icon"><i className="fas fa-award"></i></div><h3>Industry Honor</h3><p>IIIA Award, Business Award 2023, and numerous other prestigious recognitions.</p></div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="testimonials-inner">
          <div className="section-header" style={{textAlign:'center'}}><span style={{color:'var(--cyan)',fontWeight:700,fontSize:'1.5rem',letterSpacing:1,display:'block',marginBottom:8}}>TESTIMONIALS</span><h2 style={{fontFamily:'Montserrat, sans-serif',fontSize:'2rem',color:'var(--navy)'}}>Recognized by Leaders</h2></div>
          <div className="testimonial-grid">
            <div className="testimonial-card reveal"><div><div className="quote-icon"><i className="fas fa-quote-left"></i></div><p>BSCT's award-winning work in education and nourishment sets a benchmark for NGOs across India.</p></div><div><h4>Dr. Amit Sharma</h4><span>Award Committee Member</span></div></div>
            <div className="testimonial-card reveal"><div><div className="quote-icon"><i className="fas fa-quote-left"></i></div><p>Their Harvard World Record is a testament to the scale and quality of their social impact.</p></div><div><h4>Prof. Sunita Reddy</h4><span>Academic &amp; Researcher</span></div></div>
            <div className="testimonial-card reveal"><div><div className="quote-icon"><i className="fas fa-quote-left"></i></div><p>Being Sevak's achievements inspire other organizations to strive for excellence in social service.</p></div><div><h4>Rajiv Kapoor</h4><span>Philanthropist</span></div></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Awards;
