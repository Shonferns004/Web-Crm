import Button from '../Common/Button';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-badge">
          <img
            src="https://plca-p-001.sitecorecontenthub.cloud/api/public/content/6f616705ba2e498682b56caf9bf15ce5?v=8f4e03de"
            alt="2x match"
            className="match-badge"
          />
        </div>
        <h1>Donate to support<br/>Girls&apos; Rights</h1>
        <p>
          Help girls overcome barriers to education, health, and safety.<br/>
          A better world for them means a better world for all of us.
        </p>
        <Button variant="donate-lg" href="/donate">Donate now</Button>
      </div>
    </section>
  );
}

export default Hero;
