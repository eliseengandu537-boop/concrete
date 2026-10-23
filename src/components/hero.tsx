"use client";

import dynamic from "next/dynamic";
import { Arrow } from "./ui";
import { ProjectButton } from "./site-shell";
import { WordReveal } from "./word-reveal";

const Sculpture = dynamic(() => import("./sculpture"), { ssr: false, loading: () => <div className="sculpture-loading" /> });

export function Hero() {
  return <section className="hero" aria-labelledby="hero-heading">
    <div className="hero-aura" aria-hidden="true" />
    <div className="container hero-inner">
      <div className="hero-copy">
        <div className="eyebrow hero-enter"><span className="status-dot" />INDEPENDENT MINDS. CONCRETE IDEAS.</div>
        <WordReveal as="h1" id="hero-heading" delay={100}>Bold ideas.<br />Solid <span className="impact-word">impact<svg viewBox="0 0 420 24" preserveAspectRatio="none" aria-hidden="true"><path d="M4 18Q200 -4 414 10" /></svg></span><span className="lime">.</span></WordReveal>
        <p className="hero-description hero-enter delay-2">We build brands and digital experiences<br className="desktop-break" /> with substance. Thoughtfully designed.<br className="desktop-break" /> Beautifully built. Impossible to ignore.</p>
        <div className="hero-buttons hero-enter delay-3"><a href="#work" className="button button-lime">Explore our work<span className="button-icon"><Arrow diagonal /></span></a><ProjectButton className="text-button" /></div>
      </div>
      <div className="hero-art hero-enter delay-2">
        <div className="art-coordinates"><span>EXPLORATION — 001</span><span>FORM / FUNCTION</span></div>
        <div className="art-halo" /><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
        <Sculpture />
        <span className="art-cross cross-one" aria-hidden="true">+</span><span className="art-cross cross-two" aria-hidden="true">+</span>
        <div className="art-caption"><span className="caption-symbol">↗</span><span>A little bold.<br /><strong>A lot of substance.</strong></span><span className="caption-star" aria-hidden="true">✳</span></div>
        <div className="art-side-label">IDEAS, GIVEN FORM.</div>
      </div>
      <div className="hero-bottom hero-enter delay-3"><span>STRATEGY + DESIGN + TECHNOLOGY</span><span className="hero-bottom-mid">A good feeling. A solid foundation.</span><a href="#work">SCROLL TO EXPLORE <span>↓</span></a></div>
    </div>
  </section>;
}

export function DisciplineStrip() {
  return <div className="discipline-strip" aria-label="Brand strategy, digital experiences, creative thinking, solid execution"><div className="discipline-track">{[0, 1].map(copy => <div className="discipline-group" key={copy} aria-hidden={copy === 1}>{["Brand strategy", "Digital experiences", "Creative thinking", "Solid execution"].map(word => <span key={word}>{word}<span className="strip-star">✳</span></span>)}</div>)}</div></div>;
}
