import { useRef, useEffect, Children } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// PINNED SLIDES – full-screen sections pinned with ScrollTrigger
// Inspired by: https://codepen.io/BrianCross/pen/qBJoLxJ
//
// Each section pins as it fills the viewport. Sections taller than
// the viewport "fake scroll" internally first, then the whole panel
// shrinks & fades as the next section slides in. The last section is
// left in normal flow so the page ends naturally (footer visible).
//
// REMOVAL: flip PINNED_HOME to false in Home.jsx (the page then
// renders as a normal scrolling page), or delete this component,
// its CSS and the <PinnedSections> wrapper in Home.jsx.
// ============================================================

function isReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function PinnedSections({ children }) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    const root = rootRef.current;
    if (!root) return;

    const panels = gsap.utils.toArray(".pinned-section", root);
    if (!panels.length) return;

    panels.forEach((panel) => {
      const inner = panel.querySelector(".pinned-inner");
      if (!inner) return;

      const panelHeight = inner.offsetHeight;
      const windowHeight = window.innerHeight;
      const difference = panelHeight - windowHeight;

      // 0..1 fraction of the animation devoted to fake-scrolling
      const fakeScrollRatio = difference > 0 ? difference / (difference + windowHeight) : 0;

      // give the tall panel room so the next section arrives at the right time
      if (fakeScrollRatio) {
        panel.style.marginBottom = panelHeight * fakeScrollRatio + "px";
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: "bottom bottom",
          end: () => (fakeScrollRatio ? `+=${inner.offsetHeight}` : "bottom top"),
          pinSpacing: false,
          pin: true,
          scrub: true,
        },
      });

      // fake-scroll the content up by the overflow before shrinking the panel
      if (fakeScrollRatio) {
        tl.to(inner, {
          yPercent: -100,
          y: windowHeight,
          duration: 1 / (1 - fakeScrollRatio) - 1,
          ease: "none",
        });
      }
      tl.fromTo(panel, { scale: 1, opacity: 1 }, { scale: 0.7, opacity: 0.5, duration: 0.9 }).to(
        panel,
        { opacity: 0, duration: 0.1 }
      );
    });

    // re-measure once everything (fonts/images) has settled
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // Reduced-motion users get a plain scrolling page
  if (isReducedMotion()) return <>{children}</>;

  const total = Children.count(children);
  return (
    <div ref={rootRef} className="pinned-sections">
      {Children.map(children, (child, i) => {
        // last section stays in normal flow (page end + footer)
        if (i === total - 1) {
          return <div key={i} className="pinned-last">{child}</div>;
        }
        return (
          <section key={i} className="pinned-section" data-index={i}>
            <div className="pinned-inner">{child}</div>
          </section>
        );
      })}
    </div>
  );
}
