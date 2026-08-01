import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Terms = () => {
  return (
    <>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        :root{--navy:#03163E;--mid:#315371;--cyan:#00A2D9;--cyan-light:#33bce8;--green:#2eb85c;--white:#fff;--light-bg:#f4f7fb;--text-dark:#1a1a2e;--text-mid:#4a5568;--gold:#D4AF37;--border:#d0eaf5;}
        body{font-family:'Open Sans',sans-serif;color:var(--text-dark);background:var(--light-bg);line-height:1.7;}
        .page-banner{width:100%;height:70px;display:flex;justify-content:center;align-items:center;text-align:center;background:linear-gradient(to right, #009BD4 0%, #0285C3 25%, #046FB1 50%, #074D97 75%, #083D8B 100%);color:#fff;border-radius:0px;margin:20px 0;padding:10px;box-shadow:0 15px 40px rgba(0,0,0,0.15);position:relative;overflow:hidden;transition:0.4s ease;}
        .page-banner h1{font-family:'Montserrat',sans-serif;font-weight:900;font-size:2.2rem;letter-spacing:2px;text-transform:uppercase;}
        .page-banner .breadcrumb{font-size:0.85rem;color:rgba(255,255,255,0.7);margin-top:10px;}
        .page-banner .breadcrumb a{color:rgba(255,255,255,0.7);text-decoration:none;}
        .page-banner .breadcrumb a:hover{color:var(--cyan);}
        .content-wrap{max-width:860px;margin:0 auto;padding:50px 28px;}
        .section-block{background:#fff;border-radius:16px;padding:32px 36px;margin-bottom:30px;box-shadow:0 4px 20px rgba(0,0,0,0.05);}
        .section-block h2{font-family:'Montserrat',sans-serif;font-size:1.4rem;font-weight:800;color:var(--navy);margin-bottom:16px;padding-bottom:10px;border-bottom:3px solid var(--cyan);}
        .section-block h3{font-family:'Montserrat',sans-serif;font-size:1.1rem;font-weight:700;color:var(--mid);margin:20px 0 10px;}
        .section-block p{margin-bottom:14px;color:var(--text-mid);font-size:0.92rem;}
        .section-block ul{padding-left:24px;margin-bottom:14px;}
        .section-block ul li{margin-bottom:6px;color:var(--text-mid);font-size:0.9rem;}
        .section-block hr{border:none;border-top:1px solid #e2e8f0;margin:24px 0;}
        .contact-details{background:#f0f8ff;border-radius:12px;padding:20px 24px;}
        .contact-details p{margin-bottom:6px;font-size:0.9rem;}
        .contact-details i{color:var(--cyan);width:24px;}
        @media(max-width:600px){.content-wrap{padding:30px 16px;}.section-block{padding:24px 18px;}.page-banner h1{font-size:1.5rem;}}
      `}</style>

      <section className="page-banner">
        <h1>Terms &amp; Conditions</h1>
      </section>

      <div className="content-wrap">
        <div className="section-block">
          <h2>Privacy Statement</h2>
          <p>Being Sevak Charitable Trust is committed to protecting the privacy of all users and donors visiting this website. Any information received from users is kept strictly confidential and is disclosed to third parties only when necessary for processing donations or fulfilling legal obligations. We ensure responsible handling of your personal information and maintain appropriate safeguards to protect your privacy.</p>
        </div>

        <div className="section-block">
          <h2>Terms and Conditions</h2>
          <p>Being Sevak Charitable Trust respects and protects your privacy rights and personal information. Any details provided by you through this website will not be shared with external parties except where required to process donations, comply with legal requirements, or improve our services.</p>
          <p>By accessing this website and/or making a donation, you agree to comply with and be bound by these Terms and Conditions. Being Sevak Charitable Trust reserves the right to modify or update these terms at any time without prior notice. Continued use of the website after changes are posted constitutes your acceptance of those changes.</p>
          <p>These Terms and Conditions shall be governed and interpreted in accordance with the laws of India.</p>
          <hr />
          <h3>Content Ownership</h3>
          <p>All content published on this website, including but not limited to graphics, blogs, articles, write-ups, photographs, videos, logos, images, designs, and software, is the exclusive property of Being Sevak Charitable Trust and is protected under applicable intellectual property laws.</p>
          <p>Unauthorised copying, reproduction, distribution, or use of any content without prior written permission from Being Sevak Charitable Trust may result in legal action.</p>
          <hr />
          <h3>Privacy Policy</h3>
          <p>Being Sevak Charitable Trust is dedicated to protecting your privacy and ensuring transparency in the collection and use of personal data.</p>
          <p>We may collect information such as:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Donation amount</li>
            <li>Address and payment details</li>
          </ul>
          <p>This information is used solely for:</p>
          <ul>
            <li>Processing donations</li>
            <li>Sending donation receipts</li>
            <li>Providing updates regarding our initiatives</li>
            <li>Sharing newsletters or important communications</li>
          </ul>
          <p>We implement secure methods and industry-standard security practices to store and protect your personal information. Users may opt out of promotional communications at any time.</p>
          <hr />
          <h3>Disclaimer of Liability</h3>
          <p>Being Sevak Charitable Trust shall not be held responsible for any direct, indirect, incidental, or consequential damages arising from the misuse, unauthorised access, or disclosure of personal information by third parties through this website or external links.</p>
          <p>Users are advised to exercise caution while sharing personal information online.</p>
          <hr />
          <h3>Cancellation and Refund Policy</h3>
          <p>Being Sevak Charitable Trust does not generally entertain cancellation or refund requests due to internal policies.</p>
          <p>Refund requests may only be considered in the following situations:</p>
          <ul>
            <li>Duplicate donation transactions</li>
            <li>Incorrect donation amount entered by mistake</li>
          </ul>
          <p>Any refund request must be submitted within 15 days from the date of donation along with valid transaction details.</p>
          <p>The decision of Being Sevak Charitable Trust regarding refunds shall be final.</p>
          <hr />
          <h3>Security Measures</h3>
          <p>Being Sevak Charitable Trust employs robust security measures to safeguard your personal data against unauthorised access, misuse, loss, or disclosure. This includes:</p>
          <ul>
            <li>Secure servers</li>
            <li>Encrypted payment gateways</li>
            <li>Restricted access to sensitive information</li>
            <li>Regular monitoring of website security practices</li>
          </ul>
        </div>

        <div className="section-block">
          <h2>Contact Details</h2>
          <div className="contact-details">
            <p><i className="fas fa-building"></i> Being Sevak Charitable Trust</p>
            <p><i className="fas fa-phone"></i> +91 8879035035 / +91 8879034034</p>
            <p><i className="fas fa-globe"></i> www.beingsevak.org</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
