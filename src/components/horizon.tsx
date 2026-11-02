"use client";

import { useEffect, useRef, type CSSProperties } from "react";

// Deterministic artwork keeps the server and browser render identical.
const stars = Array.from({ length: 58 }, (_, index) => ({
  left: `${(index * 67.37 + 9) % 100}%`,
  top: `${(index * 31.71 + 3) % 87}%`,
  opacity: .13 + (index % 4) * .13,
  width: index % 7 === 0 ? 2 : 1,
  height: index % 7 === 0 ? 2 : 1,
}));

export function Horizon() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let inView = true;
    const update = () => { element.dataset.active = String(inView && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);

  return <div className="hero-landscape" ref={ref} aria-hidden="true" data-active="true">
    <div className="horizon-nebula" />
    <div className="horizon-stars">{stars.map((style, index) => <i key={index} style={style as CSSProperties} />)}</div>
    <div className="horizon-lightfield">
      <div className="horizon-blue-glow" /><div className="horizon-coral-glow" />
      <svg className="horizon-filaments" viewBox="0 0 1440 720" preserveAspectRatio="none">
        <defs>
          <linearGradient id="filament-blue" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="80" y2="720"><stop stopColor="#159edb" stopOpacity="0" /><stop offset=".48" stopColor="#4dcfff" stopOpacity=".65" /><stop offset="1" stopColor="#ceeaff" stopOpacity=".05" /></linearGradient>
          <linearGradient id="filament-coral" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="80" y2="720"><stop stopColor="#ffa98e" stopOpacity="0" /><stop offset=".58" stopColor="#ffe5cc" stopOpacity=".8" /><stop offset="1" stopColor="#ff7554" stopOpacity=".12" /></linearGradient>
        </defs>
        {Array.from({ length: 181 }, (_, index) => {
          const x = index * 8;
          const y = 145 + Math.cos(x / 190) * 80 + Math.sin(x / 77) * 18;
          return <path key={index} d={`M${x} ${y.toFixed(2)}V720`} stroke={`url(#filament-${x > 460 && x < 1010 ? "coral" : "blue"})`} strokeWidth={index % 5 === 0 ? 1 : .6} opacity={.25 + (index % 5) * .12} />;
        })}
      </svg>
      <div className="horizon-core" />
    </div>
    <div className="horizon-grain" />
  </div>;
}
