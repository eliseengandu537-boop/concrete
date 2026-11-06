"use client";

import { useEffect, useRef } from "react";

export function Horizon() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let inView = true;
    const update = () => { element.dataset.active = String(inView && !document.hidden); };
    const observer = new IntersectionObserver(entries => {
      // Fast section jumps can queue multiple changes for the same element.
      for (const entry of entries) inView = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);

  return <div className="hero-landscape" ref={ref} aria-hidden="true" data-active="true">
    <div className="horizon-nebula" />
    <div className="horizon-lightfield">
      <div className="horizon-blue-glow" /><div className="horizon-cyan-glow" />
      <svg className="horizon-filaments" viewBox="0 0 1440 720" preserveAspectRatio="none">
        <defs>
          <linearGradient id="filament-blue" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="720"><stop stopColor="#92f3ff" stopOpacity=".25" /><stop offset=".48" stopColor="#8cecff" stopOpacity=".8" /><stop offset="1" stopColor="#a9edff" stopOpacity=".1" /></linearGradient>
          <linearGradient id="filament-cyan" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="720"><stop stopColor="#c4ffff" stopOpacity=".55" /><stop offset=".58" stopColor="#8febf5" stopOpacity=".16" /><stop offset="1" stopColor="#bcf7ff" stopOpacity=".7" /></linearGradient>
        </defs>
        {Array.from({ length: 181 }, (_, index) => {
          const x = index * 8;
          return <path key={index} d={`M${x} 0V720`} stroke={`url(#filament-${index % 3 === 0 ? "cyan" : "blue"})`} strokeWidth={index % 5 === 0 ? 2 : .8} opacity={.2 + (index % 5) * .12} />;
        })}
      </svg>
      <div className="horizon-core" />
    </div>
    <div className="horizon-flutes" />
    <div className="horizon-shade" />
    <div className="horizon-grain" />
  </div>;
}
