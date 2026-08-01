import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Icon from "./Icon";

gsap.registerPlugin(ScrollTrigger);

function Tag({ children }) {
  return (
    <span className="inline-block px-3 py-1 bg-primary text-white font-label-bold text-xs uppercase tracking-[0.2em]">
      {children}
    </span>
  );
}

// ============================================================
// THE WORK. – GSAP pinned horizontal scroll
// Pinned track = intro + project cards only. The "In The Field"
// grid and outro ("More On The Way") render as standalone
// vertical sections below.
// ============================================================
export default function WorksSection({ projects, activities }) {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const progressBarRef = useRef(null);
  const countRef = useRef(null);
  const shaderBlob1Ref = useRef(null);
  const shaderBlob2Ref = useRef(null);
  const loopRef = useRef(null);
  const introRef = useRef(null);
  const outroRef = useRef(null);

  const cardRefs = useRef([]);
  const imgRefs = useRef([]);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const viewportW = () => window.innerWidth;
      const endX = () => Math.max(track.scrollWidth - viewportW(), 0);
      const panels = Array.from(track.children);

      // ---------- LATERAL PIN INDICATOR (snap positions) ----------
      const snapPositions = () => {
        let cum = 0;
        const list = panels.map((panel) => {
          const pos = cum;
          cum += panel.offsetWidth;
          return pos;
        });
        list.push(1);
        const total = endX();
        return list.map((p) => (total ? Math.min(1, Math.max(0, p / total)) : 0));
      };

      // ---------- MASTER: pinned horizontal tween ----------
      let master = null;
      if (!reduceMotion) {
        master = gsap.to(track, {
          x: () => -endX(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + endX(),
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: (value) => {
                const positions = snapPositions();
                let best = positions[0];
                let bestD = Infinity;
                positions.forEach((p) => {
                  const d = Math.abs(p - value);
                  if (d < bestD) { bestD = d; best = p; }
                });
                return best;
              },
              duration: { min: 0.15, max: 0.5 },
              ease: "power1.inOut",
              delay: 0.05,
            },
            onUpdate: (self) => {
              if (progressBarRef.current) {
                progressBarRef.current.style.transform = `scaleX(${self.progress})`;
              }
              if (countRef.current) {
                const idx = Math.min(projects.length, Math.floor(self.progress * projects.length) + 1);
                countRef.current.textContent = `${String(idx).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
              }
            },
          },
        });
      }

      // ---------- TRIGGER ON SCROLL (intro reveal, reverses on scroll up) ----------
      gsap.from(introRef.current, {
        opacity: 0,
        y: 60,
        ease: "power2.out",
        duration: 0.9,
        scrollTrigger: { trigger: introRef.current, start: "top 80%" },
      });

      // ---------- PINNED PANELS W/ OVERSCALE + IMAGE MASK ON SCROLL ----------
      if (!reduceMotion && master) {
        panels.forEach((panel, i) => {
          if (i === 0) return;
          const card = cardRefs.current[i];
          const img = imgRefs.current[i];
          if (!card) return;

          const tl = gsap.timeline({
            scrollTrigger: { trigger: panel, containerAnimation: master, start: "left 85%", end: "left 15%", scrub: true },
          });
          tl.fromTo(
            card,
            { scale: 0.8, rotate: i % 2 === 0 ? -4 : 4, opacity: 0 },
            { scale: 1.06, rotate: 0, opacity: 1, duration: 0.35, ease: "power1.out" }
          ).to(card, { scale: 1, duration: 0.65, ease: "power1.out" });

          if (img) {
            gsap.fromTo(
              img,
              { clipPath: "inset(0% 100% 0% 0%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                ease: "none",
                scrollTrigger: { trigger: panel, containerAnimation: master, start: "left 70%", end: "left 35%", scrub: true },
              }
            );
          }
        });

        // ---------- SHADER ON SCROLL ----------
        gsap.fromTo(
          shaderBlob1Ref.current,
          { opacity: 0, scale: 0.6 },
          {
            opacity: 1, scale: 1.6, ease: "none",
            scrollTrigger: { trigger: section, start: "top top", end: () => "+=" + endX(), scrub: true },
          }
        );
        gsap.fromTo(
          shaderBlob2Ref.current,
          { opacity: 0, scale: 1.8 },
          {
            opacity: 0.9, scale: 1, ease: "none",
            scrollTrigger: { trigger: section, start: "top top", end: () => "+=" + endX(), scrub: true },
          }
        );

        // ---------- INFINITE LOOPED PANELS ----------
        if (loopRef.current) {
          gsap.to(loopRef.current, { xPercent: -50, ease: "none", duration: 26, repeat: -1 });
        }
      }

      // ---------- OUTRO REVEAL (standalone section, reverses on scroll up) ----------
      gsap.from(outroRef.current, {
        opacity: 0,
        y: 50,
        ease: "power2.out",
        duration: 0.8,
        scrollTrigger: { trigger: outroRef.current, start: "top 85%" },
      });
    }, section);

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [projects.length]);

  const setCardRef = (i) => (el) => { cardRefs.current[i] = el; };
  const setImgRef = (i) => (el) => { imgRefs.current[i] = el; };

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className={`works-section ${reduceMotionClass}`}
      >
        {/* Shader on scroll */}
        <div className="works-shader" aria-hidden="true">
          <div className="works-shader-blob works-shader-blob-1" ref={shaderBlob1Ref}></div>
          <div className="works-shader-blob works-shader-blob-2" ref={shaderBlob2Ref}></div>
        </div>

        {/* Pinned horizontal track – intro + project cards only */}
        <div className="works-pin" ref={pinRef}>
          <div className="works-track" ref={trackRef}>
            {/* PANEL 0 – INTRO */}
            <div className="works-panel works-panel-intro">
              <div ref={introRef} className="max-w-container-max mx-auto px-6 lg:px-8 w-full">
                <Tag>Our Works</Tag>
                <h2 className="font-display-lg text-6xl md:text-8xl text-stroke-primary leading-[0.85] tracking-tighter mt-8 mb-5">
                  THE
                  <br />
                  WORK.
                </h2>
                <p className="font-body-lg text-2xl md:text-3xl text-primary max-w-xl leading-tight mb-6">
                  Six missions. One resolve. Keep scrolling sideways through everything we do —
                  one project at a time.
                </p>
                <div className="flex items-center gap-6 brutal-border bg-white px-6 py-4 brutal-shadow-sm w-max">
                  <Icon name="arrow_forward" className="text-3xl text-primary works-hint" />
                  <span className="font-label-bold text-sm uppercase tracking-[0.2em] text-primary">
                    Scroll sideways
                  </span>
                </div>
              </div>
            </div>

            {/* PANELS 1..6 – PROJECT CARDS */}
            {projects.map((p, i) => {
              const idx = i + 1;
              return (
                <div className="works-panel works-card-panel" key={p.slug}>
                  <Link
                    ref={setCardRef(idx)}
                    to={`/projects/${p.slug}`}
                    className="works-card brutal-border-heavy bg-white brutal-shadow group"
                  >
                    <div className="flex items-baseline justify-between mb-6">
                      <span className="font-display-lg text-3xl md:text-4xl text-primary tracking-tight">
                        {p.num} /
                      </span>
                      <span className="font-label-bold text-xs uppercase tracking-[0.2em] text-primary bg-primary-fixed px-3 py-1 brutal-border">
                        {p.slug}
                      </span>
                    </div>
                    <div className="works-card-img-wrap brutal-border-heavy mb-5">
                      <img
                        ref={setImgRef(idx)}
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="works-card-img group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <h3 className="font-display-lg text-4xl md:text-5xl mb-5 text-primary tracking-tight uppercase">
                      {p.name}
                    </h3>
                    <p className="text-xl md:text-2xl max-w-md text-primary leading-snug mb-5">
                      {p.text}
                    </p>
                    <span className="font-label-bold text-primary flex items-center gap-4 uppercase tracking-[0.15em] text-sm group-hover:translate-x-2 transition-transform">
                      View Project
                      <Icon name="arrow_forward" className="text-xl" />
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lateral pin indicator */}
        <div className="works-progress">
          <span className="works-progress-fill" ref={progressBarRef}></span>
        </div>
        <div className="works-progress-count" ref={countRef}>
          01 / 06
        </div>
      </section>

      {/* MORE ON THE WAY – outro (standalone section) */}
      <section
        ref={outroRef}
        className="py-14 md:py-24 bg-surface border-t-4 border-primary"
      >
        <div className="max-w-container-max mx-auto px-6 lg:px-8 w-full">
          <Tag>More On The Way</Tag>
          <h2 className="font-display-lg text-6xl md:text-8xl text-primary leading-[0.85] tracking-tighter mt-8 mb-6">
            MORE
            <br />
            <span className="italic">ON THE WAY.</span>
          </h2>
          <p className="font-body-lg text-2xl md:text-3xl text-primary max-w-xl leading-tight mb-6">
            Every project you just saw is a live mission. The page will never end — because the
            work never ends.
          </p>
          <Link
            to="/get-involved/donate-online"
            className="inline-flex items-center gap-4 bg-primary text-white font-label-bold text-base uppercase tracking-[0.15em] px-8 py-4 brutal-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            <Icon name="favorite" />
            Support The Work
          </Link>
        </div>
      </section>

      {/* Infinite looped panels */}
      <div className="works-loop" aria-hidden="true">
        <div className="works-loop-track" ref={loopRef}>
          {[...projects, ...projects].map((p, i) => (
            <div key={i} className="works-loop-panel">
              <span className="font-display-lg text-4xl md:text-5xl text-primary uppercase tracking-tight">
                {p.name}
              </span>
              <Icon name={p.icon} className="text-5xl text-primary" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Reduced-motion helper: decides the fallback class once
const reduceMotionClass =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "works-reduced"
    : "";
