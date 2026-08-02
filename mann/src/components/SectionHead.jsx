// Soft-modern section heading: pill tag + big uppercase display title
export default function SectionHead({ tag, title, sub, align = "center", outline = false }) {
  const alignCls = align === "left" ? "text-left items-start" : "text-center items-center";
  return (
    <div className={`flex flex-col gap-6 mb-10 ${alignCls}`}>
      {tag && (
        <span className="inline-block px-4 py-1.5 bg-secondary-fixed text-primary font-label-bold text-xs uppercase tracking-widest rounded-full">
          {tag}
        </span>
      )}
      {title && (
        <h2
          className={`font-display-lg font-extrabold text-4xl md:text-7xl text-on-surface uppercase tracking-tighter leading-[0.9] ${
            outline ? "text-stroke-primary" : ""
          }`}
        >
          {title}
        </h2>
      )}
      {sub && (
        <p className="font-body-lg text-lg md:text-xl text-on-surface-variant max-w-2xl leading-snug">
          {sub}
        </p>
      )}
    </div>
  );
}
