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
        <div className="eyebrow hero-enter"><span className="status-dot" />CONCRETE AGENCY · SOUTH AFRICA</div>
        <WordReveal as="h1" id="hero-heading" delay={100}>Bold ideas.<br />Solid <span className="hero-italic">impact.</span></WordReveal>
        <p className="hero-description hero-enter delay-2">Websites, SEO, AI automation and lead generation.<br />Built to connect your enquiries and your sales team.</p>
        <a className="hero-offer hero-enter delay-2" href="#service-packages">Website included with Full AI Integration <Arrow diagonal /></a>
        <div className="hero-buttons hero-enter delay-3"><ProjectButton className="hero-orb" arrow={false}><Arrow diagonal /><span>Let’s make<br /><strong>it concrete.</strong></span></ProjectButton></div>
      </div>
      <div className="hero-margin-note hero-note-left hero-enter delay-3"><span className="margin-note-number">01 — 03</span><p>Find.<br />Connect.<br /><em>Grow.</em></p><span className="margin-note-rule" /><span>BUILT AROUND YOUR BUSINESS.</span></div>
      <div className="hero-margin-note hero-note-right hero-enter delay-3"><span className="margin-note-number">FROM ENQUIRY<br />TO OPPORTUNITY.</span><p>One system.<br /><em>A clear next step.</em></p><a href="#services">Explore what we do <Arrow diagonal /></a></div>
      <HeroShowcase />
      <div className="hero-bottom"><span>WEBSITES + OUTREACH + SALES SYSTEMS</span><span className="hero-bottom-mid">Good conversations. Concrete possibilities.</span><a href="#services">SCROLL TO EXPLORE <span>↓</span></a></div>
    </div>
  </section>;
}

export function DisciplineStrip() {
  return <div className="discipline-strip" aria-label="Buyer research, permission-first outreach, SEO and AEO, content and social, sales systems"><div className="discipline-track">{[0, 1].map(copy => <div className="discipline-group" key={copy} aria-hidden={copy === 1}>{["Buyer research", "Permission-first outreach", "SEO + AEO", "Content + social", "Sales systems"].map(word => <span key={word}>{word}<span className="strip-star">✳</span></span>)}</div>)}</div></div>;
}
