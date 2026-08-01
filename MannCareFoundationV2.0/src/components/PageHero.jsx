// Har inner page ke top pe full-width hero image (desktop/mobile alag)
import { img } from "../utils/images";
export default function PageHero({ desktop, mobile, alt = "", className = "" }) {
  return (
    <section className="w-full">
      <picture>
        {mobile && <source media="(max-width:768px)" srcSet={mobile} />}
        <img src={desktop} alt={alt} className={`w-full h-auto object-cover ${className}`} />
      </picture>
    </section>
  );
}
