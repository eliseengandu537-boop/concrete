"use client";

import { useState } from "react";
import { services } from "@/lib/content";
import { Arrow, Reveal, SectionLabel } from "./ui";
import { ProjectButton } from "./site-shell";
import { WordReveal } from "./word-reveal";

export function Services() {
  const [active, setActive] = useState<number | null>(1);
  return <section id="services" className="services-section light-section section-space" aria-labelledby="services-heading">
    <div className="container">
      <div>
        <SectionLabel number="03">WHAT WE DO</SectionLabel>
        <div className="section-heading-row">
          <WordReveal id="services-heading">From first thought<br />to <span className="serif-word">full potential.</span></WordReveal>
          <div className="section-intro"><p>Brand, digital, and the tools behind your next enquiry.<br />Everything your business needs to move forward.</p><a className="growth-jump" href="#growth-services">Explore our business growth services <Arrow diagonal /></a></div>
        </div>
      </div>
      <div className="service-list">{services.map((service, index) => <Reveal key={service.name}>
        <div className={`service-item ${active === index ? "is-active" : ""}`}>
          <h3><button aria-expanded={active === index} aria-controls={`service-panel-${index}`} id={`service-trigger-${index}`} onClick={() => setActive(active === index ? null : index)}><span className="service-number">0{index + 1}</span><span className="service-title">{service.name}</span><span className="service-toggle">{active === index ? "−" : "+"}</span></button></h3>
          <div id={`service-panel-${index}`} role="region" aria-labelledby={`service-trigger-${index}`} className="service-panel" hidden={active !== index}>
            <div className="service-panel-inner"><div className="service-art" aria-hidden="true"><span /><span /><span /></div><div><p>{service.description}</p><div className="service-tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div><ProjectButton className="text-button dark-text" arrow={false} service={service.short}>Let’s talk {service.short.toLowerCase()}<Arrow diagonal /></ProjectButton></div></div>
          </div>
        </div>
      </Reveal>)}</div>
    </div>
  </section>;
}
