import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// Staggered on-scroll grid – ScrollTrigger.batch()
// Items fade in, staggered, as they enter the viewport.
// ============================================================
export default function StaggerGrid({ items = [], className = "" }) {
  const wrapRef = useRef(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".batch-image", { autoAlpha: 1 });
        return;
      }
      ScrollTrigger.batch(".batch-image", {
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, stagger: 0.2, duration: 1, ease: "sine.out" }),
        onLeave: (batch) =>
          gsap.to(batch, { autoAlpha: 0, stagger: 0.2, duration: 1, ease: "sine.out" }),
        onEnterBack: (batch) =>
          gsap.to(batch, { autoAlpha: 1, stagger: 0.2, duration: 1, ease: "sine.out" }),
        onLeaveBack: (batch) =>
          gsap.to(batch, { autoAlpha: 0, stagger: 0.2, duration: 1, ease: "sine.out" }),
      });
    }, wrap);

    return () => ctx.revert();
  }, [items.length]);

  return (
    <div ref={wrapRef} className={className}>
      {items.map((item, i) => (
        <div
          key={i}
          className="batch-image aspect-square brutal-border-heavy bg-white overflow-hidden brutal-shadow-sm group"
        >
          <img
            src={item.src ?? item.image}
            alt={item.caption}
            loading="lazy"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
      ))}
    </div>
  );
}
