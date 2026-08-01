import { useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

// ============ GSAP CURVE SWIPE PAGE TRANSITION ============
// On any internal link click we play the cover sweep over the CURRENT page,
// then navigate, then reveal the new page (no flash of the next page).
const HIDDEN = "M 0 100 V 100 Q 50 100 100 100 V 100 z";
const CURVE = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
const FULL = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

// Route path -> word shown in the transition
const ROUTE_LABELS = {
  "/": "MANN CARE.",
  "/about/our-story": "Our Story",
  "/about/our-team": "Our Team",
  "/about/legal-certificate": "Legal Certificate",
  "/projects/poshan": "Project Poshan",
  "/projects/gyaan": "Project Gyaan",
  "/projects/sakhi": "Project Sakhi",
  "/projects/swasth": "Project Swasth",
  "/projects/pashu": "Project Pashu",
  "/projects/paryavaran": "Project Paryavaran",
  "/get-involved/individual-support": "Individual Support",
  "/get-involved/corporate-partnership": "Corporate Partnership",
  "/get-involved/donate-online": "Donate Online",
  "/get-involved/career": "Career",
  "/media": "Media",
  "/contact/get-in-touch": "Get In Touch",
  "/contact/privacy-policy": "Privacy Policy",
  "/payment-success": "Payment Success",
};

function routeLabel(pathname) {
  if (ROUTE_LABELS[pathname]) return ROUTE_LABELS[pathname];
  const slug = pathname.replace(/^\/projects\//, "");
  if (slug !== pathname) {
    return "Project " + slug.replace(/^./, (c) => c.toUpperCase());
  }
  return "MANN CARE.";
}

export default function PageTransition() {
  const pathRef = useRef(null);
  const wordRef = useRef(null);
  const navigate = useNavigate();
  const busyRef = useRef(false);

  const cover = useCallback((to) => {
    return new Promise((resolve) => {
      const path = pathRef.current;
      const word = wordRef.current;
      word.textContent = routeLabel(to);
      gsap.set(path, { morphSVG: HIDDEN });
      gsap.set(word, { opacity: 0 });
      const tl = gsap.timeline({ onComplete: resolve });
      tl.to(path, { morphSVG: CURVE, duration: 0.5, ease: "power2.in" })
        .to(word, { opacity: 1, duration: 0.25 }, "-=0.2")
        .to(path, { morphSVG: FULL, duration: 0.45, ease: "power2.out" }, "-=0.1");
    });
  }, []);

  const reveal = useCallback(() => {
    return new Promise((resolve) => {
      const path = pathRef.current;
      const word = wordRef.current;
      const tl = gsap.timeline({ onComplete: resolve });
      tl.to(word, { opacity: 0, duration: 0.25 })
        .to(path, { morphSVG: HIDDEN, duration: 0.6, ease: "power2.inOut" }, "-=0.1");
    });
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = e.target.closest("a");
      if (!anchor) return;
      if (anchor.target === "_blank") return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      if (busyRef.current) return;

      e.preventDefault();

      if (reduced) {
        navigate(href);
        return;
      }

      busyRef.current = true;
      cover(href).then(() => {
        navigate(href);
        reveal().then(() => {
          busyRef.current = false;
        });
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [cover, reveal, navigate]);

  return (
    <div className="page-transition-overlay" aria-hidden="true">
      <svg
        className="page-transition-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="page-transition-grad"
            x1="0"
            y1="0"
            x2="99"
            y2="99"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.2" stopColor="#8a0048" />
            <stop offset="0.7" stopColor="#b50061" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          className="page-transition-path"
          stroke="url(#page-transition-grad)"
          fill="url(#page-transition-grad)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          d={HIDDEN}
        />
      </svg>
      <span ref={wordRef} className="page-transition-word">
        MANN CARE.
      </span>
    </div>
  );
}
