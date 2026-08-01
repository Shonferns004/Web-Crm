import { useState, useEffect } from "react";
import Reveal from "../components/Reveal";
import { gallerySections } from "../data/projects";

export default function Media() {
  const [lightbox, setLightbox] = useState(null);

  // Lightbox open ho to background scroll lock + Esc se close
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
      <main className="py-16 px-5">
        <div className="max-w-[1150px] mx-auto space-y-20">
          {gallerySections.map((sec) => (
            <section key={sec.title}>
              <div className="text-center mb-10">
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-brand bg-pink-light rounded-full px-4 py-1.5 mb-4">
                  {sec.tag}
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">{sec.title}</h2>
                <p className="text-ink-soft max-w-xl mx-auto">{sec.desc}</p>
                <div className="h-1 w-16 bg-pink-brand rounded-full mx-auto mt-5"></div>
              </div>

              {sec.title === "Litchi Distribution" ? (
                <div className="grid grid-cols-2 gap-5">
                  {sec.images.map((src, i) => (
                    <Reveal key={src} delay={i * 60}>
                      <figure className="group relative overflow-hidden rounded-2xl shadow-pink-sm cursor-pointer" onClick={() => setLightbox(src)}>
                        <img src={src} alt={`${sec.title} ${i + 1}`} loading="lazy" className="h-72 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pink-brand/80 to-transparent text-white text-sm font-medium px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity">{sec.title}</figcaption>
                      </figure>
                    </Reveal>
                  ))}
                </div>
              ) : sec.title === "Watermelon Distribution" ? (
                <div className="grid grid-cols-3 gap-5">
                  <div className="space-y-5">
                    {[0, 2].map((i) => (
                      <Reveal key={sec.images[i]} delay={i * 60}>
                        <figure className="group relative overflow-hidden rounded-2xl shadow-pink-sm cursor-pointer" onClick={() => setLightbox(sec.images[i])}>
                          <img src={sec.images[i]} alt={`${sec.title} ${i + 1}`} loading="lazy" className="h-72 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pink-brand/80 to-transparent text-white text-sm font-medium px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity">{sec.title}</figcaption>
                        </figure>
                      </Reveal>
                    ))}
                  </div>
                  <Reveal delay={2 * 60}>
                    <figure className="group relative overflow-hidden rounded-2xl shadow-pink-sm cursor-pointer h-full" onClick={() => setLightbox(sec.images[4])}>
                      <img src={sec.images[4]} alt={`${sec.title} 5`} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pink-brand/80 to-transparent text-white text-sm font-medium px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity">{sec.title}</figcaption>
                    </figure>
                  </Reveal>
                  <div className="space-y-5">
                    {[1, 3].map((i) => (
                      <Reveal key={sec.images[i]} delay={i * 60}>
                        <figure className="group relative overflow-hidden rounded-2xl shadow-pink-sm cursor-pointer" onClick={() => setLightbox(sec.images[i])}>
                          <img src={sec.images[i]} alt={`${sec.title} ${i + 1}`} loading="lazy" className="h-72 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pink-brand/80 to-transparent text-white text-sm font-medium px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity">{sec.title}</figcaption>
                        </figure>
                      </Reveal>
                    ))}
                  </div>
                </div>
              ) : sec.title === "Snack Distribution" ? (
                <div className="grid grid-cols-3 gap-5">
                  <div className="space-y-5">
                    {[0, 2].map((i) => (
                      <Reveal key={sec.images[i]} delay={i * 60}>
                        <figure className="group relative overflow-hidden rounded-2xl shadow-pink-sm cursor-pointer" onClick={() => setLightbox(sec.images[i])}>
                          <img src={sec.images[i]} alt={`${sec.title} ${i + 1}`} loading="lazy" className="h-72 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pink-brand/80 to-transparent text-white text-sm font-medium px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity">{sec.title}</figcaption>
                        </figure>
                      </Reveal>
                    ))}
                  </div>
                  <Reveal delay={2 * 60}>
                    <figure className="group relative overflow-hidden rounded-2xl shadow-pink-sm cursor-pointer" onClick={() => setLightbox(sec.images[4])}>
                      <img src={sec.images[4]} alt={`${sec.title} 5`} loading="lazy" className="h-[600px] w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pink-brand/80 to-transparent text-white text-sm font-medium px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity">{sec.title}</figcaption>
                    </figure>
                  </Reveal>
                  <div className="space-y-5">
                    {[1, 3].map((i) => (
                      <Reveal key={sec.images[i]} delay={i * 60}>
                        <figure className="group relative overflow-hidden rounded-2xl shadow-pink-sm cursor-pointer" onClick={() => setLightbox(sec.images[i])}>
                          <img src={sec.images[i]} alt={`${sec.title} ${i + 1}`} loading="lazy" className="h-72 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pink-brand/80 to-transparent text-white text-sm font-medium px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity">{sec.title}</figcaption>
                        </figure>
                      </Reveal>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  {sec.images.map((src, i) => (
                    <Reveal key={src} delay={i * 60}>
                      <figure className="group relative overflow-hidden rounded-2xl shadow-pink-sm cursor-pointer" onClick={() => setLightbox(src)}>
                        <img src={src} alt={`${sec.title} ${i + 1}`} loading="lazy" className="h-72 md:h-80 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pink-brand/80 to-transparent text-white text-sm font-medium px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity">{sec.title}</figcaption>
                      </figure>
                    </Reveal>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </main>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[2000] bg-black/85 flex items-center justify-center p-5"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-6 text-white text-4xl hover:text-pink-brand"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            &times;
          </button>
          <img
            src={lightbox}
            alt="Preview"
            className="max-h-[85vh] max-w-full rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
