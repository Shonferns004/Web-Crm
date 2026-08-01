import "./Partners.css";

const logos = [

  { id: 3, src: "/images/partnerslogos/q23.jpg" },
  { id: 4, src: "/images/partnerslogos/q24.jpg" },
  { id: 5, src: "/images/partnerslogos/q25.jpg" },
  { id: 6, src: "/images/partnerslogos/q26.jpg" },
  { id: 7, src: "/images/partnerslogos/q27.jpg" },
  { id: 8, src: "/images/partnerslogos/q28.jpg" },
  { id: 9, src: "/images/partnerslogos/q29.jpg" },
  { id: 10, src: "/images/partnerslogos/q30.jpg" },
  { id: 11, src: "/images/partnerslogos/q31.jpg" },
  { id: 12, src: "/images/partnerslogos/q32.jpg" },
  { id: 13, src: "/images/partnerslogos/q33.jpg" },
  { id: 14, src: "/images/partnerslogos/q34.jpg" },
  { id: 15, src: "/images/partnerslogos/q35.jpg" },
];

export default function Partners() {
  return (
    <section className="partners-section">
      <div className="container">
        <h2>Our Partners</h2>
        <p className="partners-subtitle">
          Trusted by organizations that believe in our mission.
        </p>
      </div>

      <div className="partners-track-wrapper">
        <div className="partners-track">
          <div className="partners-track-inner">
            {logos.map((logo) => (
              <div key={logo.id} className="partner-logo">
                <img src={logo.src} alt={`Partner ${logo.id}`} />
              </div>
            ))}

            {logos.map((logo) => (
              <div key={`dup-${logo.id}`} className="partner-logo">
                <img src={logo.src} alt={`Partner ${logo.id}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}