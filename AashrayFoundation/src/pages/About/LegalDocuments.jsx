import { useState, useEffect } from "react";
import "./LegalDocuments.css";

const documents = [
  {
    id: 1,
    title: "Registration Certificate",
    file: "/documents/Registration-certificate-Ashray-for-Life-Foundation.pdf",
    type: "Certificate",
    desc: "Official trust registration under the Indian Trusts Act.",
  },
  {
    id: 2,
    title: "PAN Card",
    file: "/documents/pancard.pdf",
    type: "Tax",
    desc: "Permanent Account Number issued by Income Tax Department.",
  },
  {
    id: 3,
    title: "80G Certificate",
    file: "/documents/80G-CERTIFICATE-1.pdf",
    type: "Tax Exemption",
    desc: "Enables donors to claim 50% tax exemption under Section 80G.",
  },
  {
    id: 4,
    title: "Niti Aayog Registration",
    file: "/documents/ASHRAY-NITI-AAYOG.pdf",
    type: "Government",
    desc: "Registered with NITI Aayog — unique ID for transparency.",
  },
  {
    id: 5,
    title: "12A Certificate",
    file: "/documents/PROVISIONAL-ORDER-OF-12A-1.pdf",
    type: "Tax Exemption",
    desc: "Exempts trust income from taxation under Section 12A.",
  },
];

const iconMap = {
  Certificate: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16v16H4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  Tax: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  ),
  "Tax Exemption": (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
  Government: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  ),
};

const typeColors = {
  Certificate: { bg: "#dce6f5", border: "#4a6fa5", text: "#2e5077" },
  Tax: { bg: "#fef3e2", border: "#f5a623", text: "#b87a10" },
  "Tax Exemption": { bg: "#e8e5f5", border: "#2e2c8a", text: "#1f1d66" },
  Government: { bg: "#e0e8f0", border: "#0f3460", text: "#0a243f" },
};

function LegalDocuments() {
  const [modalDoc, setModalDoc] = useState(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (modalDoc) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [modalDoc]);

  useEffect(() => {
    setLoadError(false);
  }, [modalDoc]);

  return (
    <main className="legal-page">
      {/* <section className="bsct-home-hero-section">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/banner-mobile3.png" />
          <img src="/images/banner.jpg" alt="Legal Documents" />
        </picture>
      </section> */}
      {/* HERO */}
      {/* <section className="legal-hero">
        <div className="legal-hero-shape legal-hero-shape--1" />
        <div className="legal-hero-shape legal-hero-shape--2" />
        <div className="section-container">
          <div className="legal-hero-content">
            <span className="legal-hero-badge glass">Legal Compliance</span>
            <h1>Legal Documents</h1>
            <p>Official registrations, tax exemptions, and government accreditations of Ashray for Life Foundation.</p>
          </div>
        </div>
      </section> */}

      {/* DOCUMENTS */}
      <section className="legal-docs">
        <div className="section-container">
          <h2>Certificates & Registrations</h2>
          <p className="legal-subtitle">
            All our legal documents are publicly available for transparency. Click any document to view or download.
          </p>
          <div className="legal-grid">
            {documents.map((doc) => {
              const colors = typeColors[doc.type] || typeColors.Certificate;
              return (
                <div
                  key={doc.id}
                  className="legal-card glass"
                  style={{ "--card-accent": colors.border }}
                  onClick={() => setModalDoc(doc)}
                >
                  <div className="legal-card-icon" style={{ background: colors.bg, color: colors.text }}>
                    {iconMap[doc.type]}
                  </div>
                  <div className="legal-card-body">
                    <span className="legal-card-type" style={{ background: colors.bg, color: colors.text }}>{doc.type}</span>
                    <h3>{doc.title}</h3>
                    <p>{doc.desc}</p>
                    <span className="legal-card-link">
                      View Document
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {modalDoc && (
        <div className="legal-modal-overlay" onClick={() => setModalDoc(null)}>
          <div className="legal-modal glass" onClick={(e) => e.stopPropagation()}>
            <div className="legal-modal-header">
              <div className="legal-modal-header-left">
                <div className="legal-modal-icon" style={{ background: typeColors[modalDoc.type]?.bg || "#e8f4fd", color: typeColors[modalDoc.type]?.text || "#1565C0" }}>
                  {iconMap[modalDoc.type]}
                </div>
                <div>
                  <h3>{modalDoc.title}</h3>
                  <span className="legal-modal-type" style={{ background: typeColors[modalDoc.type]?.bg || "#e8f4fd", color: typeColors[modalDoc.type]?.text || "#1565C0" }}>{modalDoc.type}</span>
                </div>
              </div>
              <div className="legal-modal-actions">
                <a href={modalDoc.file} download className="legal-modal-download">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download
                </a>
                <button className="legal-modal-close" onClick={() => setModalDoc(null)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="legal-modal-body">
              {!loadError ? (
                <iframe
                  src={modalDoc.file}
                  title={modalDoc.title}
                  className="legal-iframe"
                  onError={() => setLoadError(true)}
                />
              ) : null}
              <div className="legal-fallback" style={{ display: loadError ? "flex" : "none" }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="15" x2="15" y2="15" /></svg>
                <p>Preview not available. Click download to view the document.</p>
                <a href={modalDoc.file} download className="legal-modal-download">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download {modalDoc.title}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default LegalDocuments;
