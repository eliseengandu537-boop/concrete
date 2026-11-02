"use client";

import { Arrow } from "./ui";
import { ProjectButton } from "./site-shell";
import { WordReveal } from "./word-reveal";
import { Horizon } from "./horizon";
import { HeroShowcase } from "./hero-showcase";

export function Hero() {
  return <section className="hero cinematic-hero" aria-labelledby="hero-heading">
    <Horizon />
    <div className="container hero-inner">
      <div className="hero-copy">
        <div className="eyebrow hero-enter"><span className="status-dot" />INDEPENDENT MINDS. EXTRAORDINARY POSSIBILITIES.</div>
        <WordReveal as="h1" id="hero-heading" delay={100}>Bold ideas.<br />Solid <span className="hero-italic">impact.</span></WordReveal>
        <p className="hero-description hero-enter delay-2">A creative agency for what comes next.<br />Brands that connect. Websites that move you.<br className="mobile-break" /> Digital experiences that mean business.</p>
        <div className="hero-buttons hero-enter delay-3"><ProjectButton className="hero-orb" arrow={false}><Arrow diagonal /><span>Let’s make<br /><strong>it concrete.</strong></span></ProjectButton></div>
      </div>
      <div className="hero-margin-note hero-note-left hero-enter delay-3"><span className="margin-note-number">01 — 03</span><p>Strategy.<br />Design.<br /><em>Possibility.</em></p><span className="margin-note-rule" /><span>THOUGHTFUL BY NATURE.</span></div>
      <div className="hero-margin-note hero-note-right hero-enter delay-3"><span className="margin-note-number">FROM IDEA<br />TO IMPACT.</span><p>One partner.<br /><em>Every possibility.</em></p><a href="#work">Discover our work <Arrow diagonal /></a></div>
      <HeroShowcase />
      <div className="hero-bottom"><span>STRATEGY + DESIGN + TECHNOLOGY</span><span className="hero-bottom-mid">A good feeling. A solid foundation.</span><a href="#work">SCROLL TO EXPLORE <span>↓</span></a></div>
    </div>
  </section>;
}

export function DisciplineStrip() {
  return <div className="discipline-strip" aria-label="Brand strategy, digital experiences, creative thinking, solid execution"><div className="discipline-track">{[0, 1].map(copy => <div className="discipline-group" key={copy} aria-hidden={copy === 1}>{["Brand strategy", "Digital experiences", "Creative thinking", "Solid execution"].map(word => <span key={word}>{word}<span className="strip-star">✳</span></span>)}</div>)}</div></div>;
}
