import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [desktopDropdown, setDesktopDropdown] = useState(null);
  const location = useLocation();
  const isAnnapurna = location.pathname.includes('annapurna');

  const closeAll = () => {
    setDesktopDropdown(null);
    setOpenDropdown(null);
    setMobileOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    closeAll();
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('.nav-item.dropdown, .mobile-menu, .hamburger')) {
        setDesktopDropdown(null);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
    document.body.style.overflow = mobileOpen ? '' : 'hidden';
  };

  const closeMobile = () => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };
  const closeDesktopDropdown = () => { setDesktopDropdown(null); };

  return (
    <>
      <header className="navbar" style={{ background: isAnnapurna ? 'linear-gradient(to right, #009BD4 0%, #0285C3 25%, #046FB1 50%, #074D97 75%, #083D8B 100%)' : undefined, boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,0.3)' }}>
        <div className="navbar-inner">
          <Link to="/" className="nav-logo">
            <div className="logo-circle">
              <img src="/logo11.png" alt="MATW Logo" style={{width:'100%',height:'100%',objectFit:'contain'}} />
            </div>
            <img src="/images/bs.png" alt="Text Logo" className="BS-text-logo" />
          </Link>

          <div className="nav-quick">
            <div className="zakat-circle-wrap">
              <div className="zakat-pulse-ring"></div>
              <div className="zakat-pulse-ring ring2"></div>
              <Link to="/anndaan">
                <button className="zakat-circle-btn">
                  <img src="https://matwproject.org.uk/static/media/zakat.4b8e5d8777306e3a7621.png" alt="Anndaan" />
                </button>
              </Link>
              <span className="zakat-label">Ann&#x0926;&#x093E;&#x0928;</span>
            </div>
          </div>

          <div className="nav-quick">
            <div className="zakat-circle-wrap">
              <div className="zakat-pulse-ring"></div>
              <div className="zakat-pulse-ring ring2"></div>
              <Link to="/sevak-nivash">
                <button className="zakat-circle-btn">
                  <img src="https://matwproject.org.uk/static/media/zakat.4b8e5d8777306e3a7621.png" alt="Sevak Nivas" />
                </button>
              </Link>
              <span className="zakat-label">Sevak&#x0928;&#x093F;&#x0935;&#x093E;&#x0938;</span>
            </div>
          </div>

          <nav className="nav-links">
            <div className={`nav-item dropdown ${desktopDropdown === 'about' ? 'open' : ''}`}
              onMouseEnter={() => setDesktopDropdown('about')}
              onMouseLeave={closeDesktopDropdown}>
              <a href="#" onClick={e => { e.preventDefault(); setDesktopDropdown(desktopDropdown === 'about' ? null : 'about'); }}>ABOUT US <i className="fas fa-chevron-down"></i></a>
              <div className="dropdown-menu">
                <Link to="/about" onClick={closeAll}>About BSCT</Link>
                <Link to="/management" onClick={closeAll}>Management</Link>
                <Link to="/trust-documents" onClick={closeAll}>Trust Documents</Link>
                <Link to="/where-we-work" onClick={closeAll}>Where We Work</Link>
              </div>
            </div>
            <div className={`nav-item dropdown ${desktopDropdown === 'what' ? 'open' : ''}`}
              onMouseEnter={() => setDesktopDropdown('what')}
              onMouseLeave={closeDesktopDropdown}>
              <a href="#" onClick={e => { e.preventDefault(); setDesktopDropdown(desktopDropdown === 'what' ? null : 'what'); }}>WHAT WE DO <i className="fas fa-chevron-down"></i></a>
              <div className="dropdown-menu">
                <Link to="/mission-annapurna" onClick={closeAll}>Mission Annapurna</Link>
                <Link to="/mission-vidhya" onClick={closeAll}>Mission Vidhya</Link>
                <Link to="/mission-aurat" onClick={closeAll}>Mission Aurat</Link>
                <Link to="/mission-bezubaan" onClick={closeAll}>Mission Bezubaan</Link>
                <Link to="/mission-atmanirbhar" onClick={closeAll}>Mission Atmanirbhar</Link>
                <Link to="/mission-wellness" onClick={closeAll}>Mission Arogya</Link>
                <Link to="/sevak-seva-kendra" onClick={closeAll}>Sevak Seva Kendra</Link>
                {/* <Link to="/mission-beach" onClick={closeAll}>Mission Beach Sevak</Link> */}
                <Link to="/mission-eco" onClick={closeAll}>Mission Eco-Warriors</Link>
              </div>
            </div>
            <div className={`nav-item dropdown ${desktopDropdown === 'news' ? 'open' : ''}`}
              onMouseEnter={() => setDesktopDropdown('news')}
              onMouseLeave={closeDesktopDropdown}>
              <a href="#" onClick={e => { e.preventDefault(); setDesktopDropdown(desktopDropdown === 'news' ? null : 'news'); }}>NEWS & STORIES<i className="fas fa-chevron-down"></i></a>
              <div className="dropdown-menu">
                <Link to="/awards" onClick={closeAll}>Awards/Achievements</Link>
                <Link to="/press" onClick={closeAll}>Press Release</Link>
                <Link to="/newspaper" onClick={closeAll}>In News Paper</Link>
              </div>
            </div>
            <div className="nav-item">
              <Link to="/contact">CONTACT US</Link>
            </div>
            <div className={`nav-item dropdown ${desktopDropdown === 'involved' ? 'open' : ''}`}
              onMouseEnter={() => setDesktopDropdown('involved')}
              onMouseLeave={closeDesktopDropdown}>
              <a href="#" onClick={e => { e.preventDefault(); setDesktopDropdown(desktopDropdown === 'involved' ? null : 'involved'); }}>GET INVOLVED<i className="fas fa-chevron-down"></i></a>
              <div className="dropdown-menu">
                <Link to="/individual-donation" onClick={closeAll}>Individual Donation</Link>
                <Link to="/careers" onClick={closeAll}>Volunteers(SEVAK BANO)</Link>
                <Link to="/csr" onClick={closeAll}>CSR</Link>
                <Link to="/school-collaboration" onClick={closeAll}>School/Institute Collaboration</Link>
                <Link to="/ngo-collaboration" onClick={closeAll}>NGO Collaboration</Link>
              </div>
            </div>
          </nav>

          <div className="nav-right">
            <div className="yt-avatar">
              <a href="https://www.youtube.com/@BeingSevak" target="_blank" rel="noopener noreferrer">
                <div className="yt-icon">
                  <i className="fab fa-youtube"></i>
                </div>
              </a>
              <img className="avatar-img" src="/images/host.png" alt="host" onError={e => e.target.style.display='none'} />
            </div>
            <Link to="/donate" className="donate-btn">DONATE</Link>
          </div>

          <Link to="/donate" className="mob-donate-btn">DONATE</Link>
          <button className="hamburger" onClick={toggleMobile} aria-label="Menu">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`} id="mobileMenu">
        <button className="close-menu" onClick={closeMobile}><i className="fas fa-times"></i></button>
        <nav className="mobile-nav">
          <div className={`mnav-item has-sub ${openDropdown === 'about' ? 'open' : ''}`}>
            <a href="#" className="mnav-link" onClick={e => { e.preventDefault(); toggleDropdown('about'); }}>ABOUT US <i className="fas fa-chevron-down"></i></a>
            <div className="mnav-sub">
              <Link to="/about" onClick={closeAll}>About BSCT</Link>
              <Link to="/management" onClick={closeAll}>Management</Link>
              <Link to="/trust-documents" onClick={closeAll}>Trust Documents</Link>
              <Link to="/where-we-work" onClick={closeAll}>Where We Work</Link>
            </div>
          </div>
          <div className={`mnav-item has-sub ${openDropdown === 'what' ? 'open' : ''}`}>
            <a href="#" className="mnav-link" onClick={e => { e.preventDefault(); toggleDropdown('what'); }}>WHAT WE DO <i className="fas fa-chevron-down"></i></a>
            <div className="mnav-sub">
              <Link to="/mission-annapurna" onClick={closeAll}>Mission Annapurna</Link>
              <Link to="/mission-vidhya" onClick={closeAll}>Mission Vidhya</Link>
              <Link to="/mission-aurat" onClick={closeAll}>Mission Aurat</Link>
              <Link to="/mission-bezubaan" onClick={closeAll}>Mission Bezubaan</Link>
              <Link to="/mission-atmanirbhar" onClick={closeAll}>Mission Atmanirbhar</Link>
              <Link to="/mission-wellness" onClick={closeAll}>Mission Arogya</Link>
              <Link to="/sevak-seva-kendra" onClick={closeAll}>Sevak Seva Kendra</Link>
              {/* <Link to="/mission-beach" onClick={closeAll}>Mission Beach Sevak</Link> */}
              <Link to="/mission-eco" onClick={closeAll}>Mission Eco-Warriors</Link>
            </div>
          </div>
          <div className={`mnav-item has-sub ${openDropdown === 'news' ? 'open' : ''}`}>
            <a href="#" className="mnav-link" onClick={e => { e.preventDefault(); toggleDropdown('news'); }}>NEWS & STORIES <i className="fas fa-chevron-down"></i></a>
            <div className="mnav-sub">
              <Link to="/awards" onClick={closeAll}>Awards/Achievements</Link>
              <Link to="/press" onClick={closeAll}>Press Release</Link>
              <Link to="/newspaper" onClick={closeAll}>In News Paper</Link>
            </div>
          </div>
          <div className="mnav-item">
            <Link to="/contact" className="mnav-link">CONTACT US</Link>
          </div>
          <div className={`mnav-item has-sub ${openDropdown === 'involved' ? 'open' : ''}`}>
            <a href="#" className="mnav-link" onClick={e => { e.preventDefault(); toggleDropdown('involved'); }}>GET INVOLVED <i className="fas fa-chevron-down"></i></a>
            <div className="mnav-sub">
              <Link to="/individual-donation" onClick={closeAll}>Individual Donation</Link>
              <Link to="/careers" onClick={closeAll}>Volunteers(SEVAK BANO)</Link>
              <Link to="/csr" onClick={closeAll}>CSR</Link>
              <Link to="/school-collaboration" onClick={closeAll}>School/Institute Collaboration</Link>
              <Link to="/ngo-collaboration" onClick={closeAll}>NGO Collaboration</Link>
            </div>
          </div>
          <Link to="/donate" className="mobile-donate-btn">DONATE</Link>
        </nav>
      </div>
    </>
  );
}
