"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { featuredProjects, projects } from "@/lib/content";
import { Arrow, Reveal, SectionLabel } from "./ui";
import { ProjectDetails } from "./project-details";
import { WordReveal } from "./word-reveal";
import { LaptopPreview } from "./laptop-preview";

export function Work() {
  const [selected, setSelected] = useState(projects[0]);
  const dialog = useRef<HTMLDialogElement>(null);
  return <section id="work" className="work-section portfolio-section light-section section-space work-featured" aria-labelledby="work-heading"><div className="container">
    <div><SectionLabel number="01">SELECTED WORK</SectionLabel><div className="section-heading-row"><WordReveal id="work-heading">Less ordinary.<br /><span className="muted-heading">More memorable.</span></WordReveal><div className="section-intro"><p>Different ambitions. One shared standard.<br />Work that looks good — and means something.</p><span className="small-note">A SELECTION OF DIGITAL EXPERIENCES</span></div></div></div>
    <div className="work-toolbar work-featured-toolbar"><span className="small-note">TWO PROJECTS TO GET YOU STARTED</span><span className="work-count">{String(projects.length).padStart(2, "0")} PROJECTS IN OUR PORTFOLIO</span></div>
    <div className="work-grid">{featuredProjects.map((project, index) => <Reveal key={project.id} className="project-reveal" delay={index % 2 * 0.08}>
      <article className="portfolio-entry">
        <button className="project-card" aria-label={`View ${project.name} project`} onClick={() => { setSelected(project); dialog.current?.showModal(); document.body.style.overflow = "hidden"; }}>
          <LaptopPreview {...project} />
          <div className="project-info"><div><h3>{project.name}</h3><p>{project.category}</p></div><span className="project-arrow"><Arrow diagonal /></span></div>
        </button>
        <a className="project-site-link" href={project.url} target="_blank" rel="noopener noreferrer">Visit website <Arrow diagonal /><span className="sr-only"> — {project.name} (opens in a new tab)</span></a>
      </article>
    </Reveal>)}</div>
    <Reveal className="work-end work-more"><div><span className="eyebrow">THERE’S MORE TO EXPLORE</span><p>More perspectives.<br /><span>Same attention to detail.</span></p></div><Link href="/work/" className="button button-lime">See more work<span className="button-icon"><Arrow diagonal /></span></Link></Reveal>
    <ProjectDetails dialogRef={dialog} project={selected} />
  </div></section>;
}
