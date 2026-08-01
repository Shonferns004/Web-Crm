import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { img } from "../utils/images";

// ============ COMMON NAVBAR (har page pe yahi use hota hai) ============

const menu = [
  { label: "Home", to: "/" },
  {
    label: "About us",
    children: [
      { label: "Our Story", to: "/about/our-story" },
      { label: "Our Team", to: "/about/our-team" },
      { label: "Legal Certificate", to: "/about/legal-certificate" },
    ],
  },
  {
    label: "Projects",
    children: [
      { label: "Project Poshan", to: "/projects/poshan" },
      { label: "Project Gyaan", to: "/projects/gyaan" },
      { label: "Project Sakhi", to: "/projects/sakhi" },
      { label: "Project Swasth", to: "/projects/swasth" },
      { label: "Project Pashu", to: "/projects/pashu" },
      { label: "Project Paryavaran", to: "/projects/paryavaran" },
    ],
  },
  {
    label: "Get Involved",
    children: [
      { label: "Individual Support", to: "/get-involved/individual-support" },
      { label: "Corporate Partnership", to: "/get-involved/corporate-partnership" },
      { label: "Donate Online", to: "/get-involved/donate-online" },
      { label: "Career", to: "/get-involved/career" },
    ],
  },
  { label: "Media", to: "/media" },
  {
    label: "Contact",
    children: [
      { label: "Get In Touch", to: "/contact/get-in-touch" },
      { label: "Privacy Policy", to: "/contact/privacy-policy" },
    ],
  },
];

function Logo({ light = false }) {
  return (
    <Link to="/" className="flex items-center gap-3">
      <img
        src={img("/logo.png")}
        alt="MANN CARE FOUNDATION Logo"
        className="h-11 w-auto object-contain shadow-pink-sm"
      />
      <span className="leading-tight">
        <span className={`block font-display font-bold text-lg tracking-wide ${light ? "text-white" : "text-ink"}`}>
          MANN CARE
        </span>
        <span className="block text-xs tracking-[0.25em] text-pink-brand font-semibold">
          FOUNDATION
        </span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenDrop(null);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] nav-gradient backdrop-blur-xl border-b border-border-pink transition-all duration-300 ${
        scrolled ? "py-2 shadow-pink-md" : "py-4"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 flex items-center gap-6">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-6 ml-auto">
          {menu.map((item) => (
            <li key={item.label} className="relative group">
              {item.children ? (
                <>
                  <button className="font-medium text-ink-mid hover:text-pink-brand transition-colors py-2">
                    {item.label} <i className="fas fa-chevron-down text-[10px] ml-1"></i>
                  </button>
                  <ul className="absolute left-0 top-full min-w-[220px] bg-white rounded-xl shadow-pink-lg border border-border-pink py-2 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                    {item.children.map((c) => (
                      <li key={c.to}>
                        <NavLink
                          to={c.to}
                          className="block px-5 py-2.5 text-sm text-ink-mid hover:bg-pink-pale hover:text-pink-brand transition-colors"
                        >
                          {c.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `font-medium py-2 transition-colors ${
                      isActive ? "text-pink-brand" : "text-ink-mid hover:text-pink-brand"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Donate button */}
        <Link
          to="/get-involved/donate-online"
          className="hidden md:inline-flex items-center gap-2 ml-auto lg:ml-0 bg-pink-brand text-white px-5 py-2.5 rounded-full font-semibold shadow-pink-md hover:bg-pink-mid hover:-translate-y-0.5 transition-all"
        >
          <i className="fas fa-heart"></i> Donate Now
        </Link>

        {/* Burger */}
        <button
          className="lg:hidden ml-auto md:ml-3 text-2xl text-pink-brand"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <i className={`fas ${mobileOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-white border-t border-border-pink ${
          mobileOpen ? "max-h-[80vh] overflow-y-auto" : "max-h-0"
        }`}
      >
        <div className="px-5 py-4 flex flex-col gap-1">
          {menu.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  className="w-full flex justify-between items-center py-3 font-medium text-ink-mid"
                  onClick={() => setOpenDrop(openDrop === item.label ? null : item.label)}
                >
                  {item.label}
                  <i
                    className={`fas fa-chevron-down text-xs transition-transform ${
                      openDrop === item.label ? "rotate-180" : ""
                    }`}
                  ></i>
                </button>
                <div
                  className={`overflow-hidden transition-all ${
                    openDrop === item.label ? "max-h-96" : "max-h-0"
                  }`}
                >
                  {item.children.map((c) => (
                    <Link
                      key={c.to}
                      to={c.to}
                      onClick={closeMobile}
                      className="block pl-4 py-2.5 text-sm text-ink-soft hover:text-pink-brand"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                onClick={closeMobile}
                className="py-3 font-medium text-ink-mid hover:text-pink-brand"
              >
                {item.label}
              </Link>
            )
          )}
          <Link
            to="/get-involved/donate-online"
            onClick={closeMobile}
            className="mt-2 text-center bg-pink-brand text-white py-3 rounded-full font-semibold"
          >
            ❤ Donate Now
          </Link>
        </div>
      </div>
    </nav>
  );
}

export { Logo };
