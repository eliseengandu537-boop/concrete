"use client";

import { useState } from "react";
import { services } from "@/lib/content";
import { Arrow, Reveal, SectionLabel } from "./ui";
import { ProjectButton } from "./site-shell";

export function Services() {
  const [active, setActive] = useState<number | null>(1);
  return <section id="services" className="services-section light-section section-space" aria-labelledby="services-heading"><div className="container"><Reveal><SectionLabel number="03">WHAT WE DO</SectionLabel><div className="section-heading-row"><h2 id="services-heading">From first thought<br />to <span className="serif-word">full potential.</span></h2><div className="section-intro"><p>The big picture and the finer details.<br />Everything your brand needs to move forward.</p></div></div></Reveal><div className="service-list">{services.map((service, index) => <Reveal key={service.name}><div className={`service-item ${active === index ? "is-active" : ""}`}><h3><button aria-expanded={active === index} aria-controls={`service-panel-${index}`} id={`service-trigger-${index}`} onClick={() => setActive(active === index ? null : index)}><span className="service-number">0{index + 1}</span><span className="service-title">{service.name}</span><span className="service-toggle">{active === index ? "−" : "+"}</span></button></h3><div id={`service-panel-${index}`} role="region" aria-labelledby={`service-trigger-${index}`} className="service-panel" hidden={active !== index}><div className="service-panel-inner"><div className="service-art" aria-hidden="true"><span /><span /><span /></div><div><p>{service.description}</p><div className="service-tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div><ProjectButton className="text-button dark-text" arrow={false}>Let’s talk {service.short.toLowerCase()}<Arrow diagonal /></ProjectButton></div></div></div></div></Reveal>)}</div></div></section>;
}
