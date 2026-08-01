import { img } from "../utils/images";

export default function PageHero({ desktop, mobile, alt = "", title, className = "" }) {
  return (
    <section className="relative w-full overflow-hidden">
      <picture>
        {mobile && <source media="(max-width:768px)" srcSet={img(mobile)} />}
        <img
          src={img(desktop)}
          alt={alt}
          className={`w-full h-[60vh] md:h-[80vh] object-cover ${className}`}
        />
      </picture>
      {title && (
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 bg-gradient-to-t from-black/60 via-black/25 to-transparent">
          <div className="max-w-container-max mx-auto">
            <h1 className="font-display-lg font-extrabold text-5xl md:text-8xl text-white uppercase tracking-tighter leading-[0.9] drop-shadow-lg">
              {title}
            </h1>
          </div>
        </div>
      )}
    </section>
  );
}
