// Brutalist section heading: pink tag + big uppercase display title
export default function SectionHead({ tag, title, sub, align = "center", outline = false }) {
  const alignCls = align === "left" ? "text-left items-start" : "text-center items-center";
  return (
    <div className={`flex flex-col gap-6 mb-5 ${alignCls}`}>
      {tag && (
        <span className="inline-block px-3 py-1 bg-primary text-white font-label-bold text-xs uppercase tracking-[0.2em]">
          {tag}
        </span>
      )}
      {title && (
        <h2
          className={`font-display-lg text-5xl md:text-7xl text-primary uppercase tracking-tighter leading-[0.9] ${
            outline ? "text-stroke-primary" : ""
          }`}
        >
          {title}
        </h2>
      )}
      {sub && (
        <p className="font-body-lg text-lg md:text-xl text-primary opacity-80 max-w-2xl leading-snug">
          {sub}
        </p>
      )}
    </div>
  );
}
