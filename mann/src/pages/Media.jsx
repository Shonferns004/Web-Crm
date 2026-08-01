import { useState, useEffect } from "react";
import SectionHead from "../components/SectionHead";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import { gallerySections } from "../data/projects";

export default function Media() {
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  return (
    <>
      <section className="pt-28 md:pt-40 pb-24 px-6 lg:px-8 bg-surface">
        <div className="max-w-[1150px] mx-auto space-y-24">
          {gallerySections.map((sec) => (
            <section key={sec.title}>
              <SectionHead tag={sec.tag} title={sec.title} sub={sec.desc} />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sec.images.map((src, i) => (
                  <Reveal key={src} delay={(i % 3) * 80}>
                    <figure
                      className="group relative brutal-border-heavy bg-white brutal-shadow-sm gallery-item cursor-pointer hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                      onClick={() => setLightbox(src)}
                    >
                      <img
                        src={src}
                        alt={`${sec.title} ${i + 1}`}
                        loading="lazy"
                        className="h-72 w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-primary text-white font-label-bold text-xs uppercase tracking-[0.2em] px-5 py-3 translate-y-full group-hover:translate-y-0 transition-transform">
                        {sec.title}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[2000] bg-black/90 flex items-center justify-center p-5"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-8 text-white brutal-border-heavy bg-primary w-14 h-14 flex items-center justify-center hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <Icon name="close" className="text-3xl" />
          </button>
          <img
            src={lightbox}
            alt="Preview"
            className="max-h-[85vh] max-w-full brutal-border-heavy bg-white p-2"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
