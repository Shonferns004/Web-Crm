import { useMemo } from "react";

// Floating pink particles (original main.js se convert)
export default function Particles() {
  const particles = useMemo(() => {
    const colors = ["#f9a8d4", "#fbcfe8", "#fda4af", "#f472b6", "#fce7f3"];
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      size: Math.random() * 18 + 6,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 14 + 10,
      delay: Math.random() * -20,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
