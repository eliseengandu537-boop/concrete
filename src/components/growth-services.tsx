"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { growthServices } from "@/lib/content";
import { ProjectButton } from "./site-shell";
import { WordReveal } from "./word-reveal";
import { Arrow, Reveal, SectionLabel } from "./ui";

export function GrowthServices() {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start 65%", "end 95%"] });
  const railX = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return <section ref={section} id="growth-services" className="growth-section section-space" aria-labelledby="growth-heading">
    <div className="container">
      <Reveal><div className="growth-section-top"><SectionLabel number="03.1" light>WHAT WE DO / BUSINESS GROWTH</SectionLabel><span className="growth-edition">08 WAYS TO MOVE FORWARD</span></div></Reveal>
      <div className="growth-layout">
        <div className="growth-intro">
          <div className="eyebrow"><span className="status-dot" /> MORE THAN A WEBSITE</div>
          <WordReveal id="growth-heading" className="growth-heading">Turn attention into enquiries. And enquiries into <span className="lime">your next opportunity.</span></WordReveal>
          <p className="growth-description">We connect the pages, conversations, and tools that help your business grow. Start with what you need. Build from there.</p>
          <div className="growth-journey" aria-label="Attract, capture, connect, grow"><div className="growth-progress-track" aria-hidden="true"><motion.div className="growth-progress" style={{ scaleX: scrollYProgress }} /></div><div className="growth-journey-labels"><span>Attract</span><span>Capture</span><span>Connect</span><span>Grow</span></div></div>
          <ProjectButton className="button button-lime">Build your next step</ProjectButton>
        </div>
        <ol className="growth-list">
          {growthServices.map((service, index) => <li key={service.short}>
            <Reveal><article className="growth-item" aria-labelledby={`growth-service-${index}`}>
              <div className="growth-item-meta"><span>{String(index + 1).padStart(2, "0")}</span><span className="growth-phase">{service.phase}<span aria-hidden="true"> ↗</span></span></div>
              <WordReveal as="h3" id={`growth-service-${index}`}>{service.name}</WordReveal>
              <p className="growth-benefit">{service.description}</p>
              <p className="growth-detail">{service.detail}</p>
              <div className="growth-item-bottom"><ul className="growth-tags" aria-label="Includes">{service.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><ProjectButton className="growth-enquire" arrow={false} service={service.short}><span className="sr-only">Discuss {service.name}</span><Arrow diagonal /></ProjectButton></div>
            </article></Reveal>
          </li>)}
        </ol>
      </div>
    </div>
    <div className="growth-type-rail" aria-hidden="true"><motion.div className="growth-type-track" style={{ x: railX }}><span>Good design.</span><span className="rail-star">✳</span><span>Better connections.</span><span className="rail-star">✳</span><span>Concrete impact.</span></motion.div></div>
  </section>;
}
