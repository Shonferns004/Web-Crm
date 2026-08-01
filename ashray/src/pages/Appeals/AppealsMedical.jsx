import { Link } from "react-router-dom";
import "./AppealsMedical.css";

const cases = [
  {
    name: "Master Arsh Akash Shah",
    cost: "₹20,00,000",
    desc: "Critical cardiac surgery required urgently for survival.",
  },
  {
    name: "Miss Joanna Rokde",
    cost: "₹6,50,000",
    desc: "Requires specialized medical treatment and hospitalization.",
  },
  {
    name: "Master Jayvardhan Bhosale",
    cost: "₹19,50,000",
    desc: "Life-saving surgery needed for severe health condition.",
  },
  {
    name: "Master Abhay Amar Singh",
    cost: "₹2,00,000",
    desc: "Urgent treatment support required for recovery.",
  },
];

const MedicalSupport = () => {
  return (
    <div className="medical-page">
      <section className="bsct-home-hero-section">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/banner-mobile5.png" />
          <img src="/images/banner.jpg" alt="Medical Appeals" />
        </picture>
      </section>

      {/* HERO SECTION */}
      <section className="medical-hero">
        <div className="overlay">
          {/* <h4>Medical Support</h4>
          <h1>Project LIFE-LINE – Saving Lives</h1>
          <p>
            Every heartbeat matters. Through Project LIFE-LINE, we support
            children and individuals who need urgent, life-saving medical care
            but cannot afford it.
          </p> */}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="medical-about">
        <h2>About Project LIFE-LINE</h2>
        <p>
          Ashray for Life Foundation (AFLF)
          is committed to ensuring that no life is lost due to lack of medical
          funds. We step in for critical surgeries, emergency treatments, and
          hospitalization support for underprivileged families.
        </p>
      </section>

      {/* MISSION */}
      <section className="medical-mission">
        <h2>Our Mission</h2>

        <div className="mission-grid">
          <div className="mission-box">
            <h3>Saving Children’s Lives</h3>
            <p>
              Providing urgent surgeries and treatments for children suffering
              from life-threatening conditions.
            </p>
          </div>

          <div className="mission-box">
            <h3>Critical Care Support</h3>
            <p>
              Helping families who cannot afford expensive medical procedures
              and hospitalization.
            </p>
          </div>

          <div className="mission-box">
            <h3>Compassion in Action</h3>
            <p>
              Building a community-driven support system to save lives through
              collective donations.
            </p>
          </div>
        </div>
      </section>

      {/* APPEAL / CASES SECTION */}
      <section className="appeal-section">
        <h2>Active Medical Appeals</h2>

        <div className="card-grid">
          {cases.map((item, index) => (
            <div className="card" key={index}>
              <div className="card-header">
                <h3>{item.name}</h3>
              </div>

              <p className="cost">Treatment Cost: {item.cost}</p>
              <p className="desc">{item.desc}</p>

              <Link to="/donate" className="donate-btn">Donate Now</Link>
            </div>
          ))}
        </div>
      </section>

   

    </div>
  );
};

export default MedicalSupport;