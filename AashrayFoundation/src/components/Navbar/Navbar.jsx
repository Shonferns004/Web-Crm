import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Common/Button';
import './Navbar.css';

const navLinks = [
  {
    label: 'About Us',
    path: '/about',
    dropdown: [
      { label: 'Management Team', path: '/about/management-team' },
      { label: 'Legal Documents', path: '/about/legal-documents' },
    ],
  },
  {
    label: 'Our Projects',
    path: '/programs',
    dropdown: [
      { label: 'Vidhyalaya', path: '/programs/education' },
      { label: 'Nari Tarang', path: '/programs/women-empowerment' },
      { label: 'Zero Hunger Drive', path: '/programs/zero-hunger-drive' },
      { label: 'Project JAL', path: '/programs/jal-project' },
      { label: 'Ashray Ka Aashra', path: '/programs/orphanage'},
      
      { label: 'Sahara', path: '/programs/medical' },
      { label: 'Ashray Ka Aashram', path: '/programs/old-age-home' },
      { label: 'Pashu Premi', path: '/programs/pashu-premi' },
      
    ],
  },
  //  { label: 'Appeals', path: '/Appeals',
  //     dropdown: [
  //     { label: 'Medical', path: '/Appeals/Medical' },
  //     { label: 'Education', path: '/Appeals/Appeals-education' },
  //     { label: 'Food Grains', path: '/Appeals/Appeals-food-grains' },
  //   ],
  //  },  

  { label: 'Gallery', path: '/gallery' },
  { label: 'Get Involved', path: '/volunteer' },
  // { label: 'Ways to Give', path: '/donate' },
  { label: 'Contact Us', path: '/ContactUs' },

];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (path) => {
    setOpenDropdown(openDropdown === path ? null : path);
  };

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <div className="header-inner">
          <div className="logo">
            <Link to="/" className="logo-link" onClick={closeMenu}>
              <img
                src="/images/Ashray Foundation logo.png"
                alt="Ashray Foundation"
              />
              <div className="logo-text">
                <span className="logo-title">Ashray for Life Foundation</span>
              </div>
            </Link>
          </div>

          <nav className="nav">
            {navLinks.map((link) => (
              <div className="nav-item" key={link.path}>
                {link.dropdown ? (
                  <>
                    <span className="nav-link nav-link--dropdown">
                      {link.label}
                      <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
                        <path d="M0 0l5 6 5-6z"/>
                      </svg>
                    </span>
                    <div className="dropdown-menu">
                      {link.dropdown.map((item) => (
                        <Link key={item.path} to={item.path} className="dropdown-link">
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link to={link.path} className="nav-link">{link.label}</Link>
                )}
              </div>
            ))}
          </nav>

          <div className="header-ctas">
            {/* <a href="#" className="social-icon social-facebook" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" className="social-icon social-instagram" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="#" className="social-icon social-youtube" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="#" className="social-icon social-linkedin" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a> */}
            <Button className="gButton" href="https://docs.google.com/forms/d/e/1FAIpQLSfhfciakVlI_lXX1m_9QcEcnEoD4SPu97rlPO6p0oGs7xGW0A/viewform?usp=dialog">10B / 80 g</Button>
            <Button variant="donate" href="/donate">Donate Now</Button>
            

          </div>

          <button
            className={`hamburger${menuOpen ? ' hamburger--active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div className={`mobile-nav${menuOpen ? ' mobile-nav--open' : ''}`}>
        <div className="mobile-nav-header">
          <button className="nav-close-btn" onClick={closeMenu} aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {navLinks.map((link) => (
          <div className="mobile-nav-item" key={link.path}>
            {link.dropdown ? (
              <>
                <span
                  className="mobile-nav-link mobile-nav-link--dropdown"
                  onClick={() => toggleDropdown(link.path)}
                >
                  {link.label}
                  <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
                    <path d="M0 0l5 6 5-6z"/>
                  </svg>
                </span>
                <div className={`mobile-dropdown-menu${openDropdown === link.path ? ' mobile-dropdown-menu--open' : ''}`}>
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="mobile-dropdown-link"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link to={link.path} className="mobile-nav-link" onClick={closeMenu}>
                {link.label}
              </Link>
            )}
          </div>
        ))}

        <div className="mobile-nav-ctas">
          <div className="mobile-nav-social">
            <a href="#" className="social-icon social-facebook" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" className="social-icon social-instagram" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="#" className="social-icon social-youtube" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="#" className="social-icon social-linkedin" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
          <Button variant="donate" href="/donate">Donate</Button>
        </div>
      </div>

      {menuOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
    </>
  );
}

export default Navbar;
