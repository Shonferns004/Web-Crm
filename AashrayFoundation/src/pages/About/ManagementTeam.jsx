import { useState } from "react";
import "./ManagementTeam.css";

const teamMembers = [
  { id: 1, name: "Mr. Naresh Bhanushali", role: "President", photo: "/images/team/naresh-bhanushali.jpg" },
  { id: 2, name: "Mr. Mihir Shah", role: "Secretary", photo: "/images/team/mihir-shah.jpg" },
  { id: 4, name: "Mrs. Prachi Dhanawade", role: "Accounts Executive", photo: "/images/team/prachi-dhanawade.jpg" },
  { id: 5, name: "Mr. Deepak Karkera", role: "Team Member", photo: "/images/team/deepak-karkera.jpg" },
  { id: 6, name: "Ms. Deepa Gupta", role: "Team Member", photo: "/images/team/deepa-gupta.jpg" },
  { id: 7, name: "Mrs. Kshitija Jadhav", role: "Team Member", photo: "/images/team/kshitija-jadhav.jpg" },
  { id: 8, name: "Mrs. Varsha Sakhariya", role: "Team Member", photo: "/images/team/varsha-sakhariya.jpg" },
  { id: 9, name: "Mrs. Pooja Pal", role: "Team Member", photo: "/images/team/pooja-pal.jpg" },
  { id: 10, name: "Miss. Hiral Waghela", role: "Team Member", photo: "/images/team/hiral-waghela.jpg" },
];

const initials = (name) => {
  const parts = name.replace(/^(Mr|Mrs|Ms|Miss)\.\s*/, "").split(" ");
  return parts.map((p) => p[0]).join("").slice(0, 2);
};

const stripPrefix = (name) => name.replace(/^(Mr|Mrs|Ms|Miss)\.\s*/, "");

function ManagementTeam() {
  const [imgError, setImgError] = useState({});

  return (
    <main className="management-page">
      {/* <section className="bsct-home-hero-section">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/banner-mobile2.png" />
          <img src="/images/banner.jpg" alt="Management Team" />
        </picture>
      </section> */}
      {/* HERO */}
      {/* <section className="management-hero">
        <div className="management-hero-shape management-hero-shape--1" />
        <div className="management-hero-shape management-hero-shape--2" />
        <div className="section-container">
          <div className="management-hero-content">
            <span className="management-hero-badge glass">Board of Trustees</span>
            <h1>Management Team</h1>
            <p>Meet the dedicated individuals steering Ashray for Life Foundation toward a brighter future.</p>
          </div>
        </div>
      </section> */}

      {/* TEAM */}
      <section className="management-team">
        <div className="section-container">
          <h2>Board of Trustees / Executive Committee</h2>
          <p className="management-subtitle">
            The following individuals constitute the Board of Trustees and Executive Committee, entrusted with the governance, administration, strategic planning, and smooth functioning of the Trust.
          </p>
          <div className="management-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="management-card glass">
                <div className="management-card-photo">
                  {imgError[member.id] ? (
                    <div className="management-card-initials">{initials(member.name)}</div>
                  ) : (
                    <img
                      src={member.photo}
                      alt={stripPrefix(member.name)}
                      onError={() => setImgError((prev) => ({ ...prev, [member.id]: true }))}
                    />
                  )}
                </div>
                <div className="management-card-info">
                  <h3>{stripPrefix(member.name)}</h3>
                  <span className="management-card-role">{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ManagementTeam;
