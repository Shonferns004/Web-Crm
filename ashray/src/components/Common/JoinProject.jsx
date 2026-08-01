import { Link } from 'react-router-dom';
import './JoinProject.css';

function JoinProject() {
  return (
    <section className="join-project">
      <div className="join-cta">
        <div className="container join-cta-inner">
          <p className="join-cta-text">Join Our Project — Help us make a difference</p>
          <Link to="/donate" className="join-donate-btn">Donate Now</Link>
        </div>
      </div>
      <div className="join-tax">
        <div className="container">
          <p>Get 50% Exemption on your donation under Section 80G of Income Tax Act 1961</p>
        </div>
      </div>
    </section>
  );
}

export default JoinProject;
