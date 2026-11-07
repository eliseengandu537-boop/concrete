"use client";

import { useRef, useState } from "react";
import { projects } from "@/lib/content";
import { Arrow, Reveal, SectionLabel } from "./ui";
import { ProjectButton } from "./site-shell";
import { WordReveal } from "./word-reveal";
import { LaptopPreview } from "./laptop-preview";

export function Work() {
  const [selected, setSelected] = useState(projects[0]);
  const dialog = useRef<HTMLDialogElement>(null);
  const [filter, setFilter] = useState("All work");
  const filters = ["All work", ...new Set(projects.map(project => project.group))];
  const visible = projects.filter(project => filter === "All work" || project.group === filter);
  return <section id="work" className="work-section portfolio-section light-section section-space" aria-labelledby="work-heading"><div className="container">
    <div><SectionLabel number="01">SELECTED WORK</SectionLabel><div className="section-heading-row"><WordReveal id="work-heading">Less ordinary.<br /><span className="muted-heading">More memorable.</span></WordReveal><div className="section-intro"><p>Different ambitions. One shared standard.<br />Work that looks good — and means something.</p><span className="small-note">A SELECTION OF DIGITAL EXPERIENCES</span></div></div></div>
    <div className="work-toolbar"><div className="work-filters" role="group" aria-label="Filter projects">{filters.map(item => <button key={item} aria-pressed={filter === item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}{item === "All work" && <sup>{String(projects.length).padStart(2, "0")}</sup>}</button>)}</div><span className="work-count" aria-live="polite">{String(visible.length).padStart(2, "0")} PROJECTS</span></div>
    <div className="work-grid">{visible.map((project, index) => <Reveal key={project.id} className="project-reveal" delay={index % 2 * 0.08}>
      <article className="portfolio-entry">
        <button className="project-card" aria-label={`View ${project.name} project`} onClick={() => { setSelected(project); dialog.current?.showModal(); document.body.style.overflow = "hidden"; }}>
          <LaptopPreview {...project} />
          <div className="project-info"><div><h3>{project.name}</h3><p>{project.category}</p></div><span className="project-arrow"><Arrow diagonal /></span></div>
        </button>
        <a className="project-site-link" href={project.url} target="_blank" rel="noopener noreferrer">Visit website <Arrow diagonal /><span className="sr-only"> — {project.name} (opens in a new tab)</span></a>
      </article>
    </Reveal>)}</div>
    <Reveal className="work-end"><span>Have something different in mind?</span><ProjectButton className="text-button dark-text">Let’s make it happen</ProjectButton></Reveal>
    <dialog ref={dialog} className="case-dialog" aria-labelledby="case-title" onClose={() => { document.body.style.overflow = ""; }} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}><div className="case-inner"><button className="close-button" aria-label="Close project details" onClick={() => dialog.current?.close()}>×</button><LaptopPreview {...selected} /><div className="case-content"><div className="eyebrow">{selected.category}</div><h2 id="case-title">{selected.name}</h2><p>{selected.description}</p><div className="case-tags">{selected.focus.map(item => <span key={item}>{item}</span>)}</div><a className="button button-lime" href={selected.url} target="_blank" rel="noopener noreferrer">Visit website<Arrow diagonal /><span className="sr-only"> (opens in a new tab)</span></a></div></div></dialog>
  </div></section>;
}
