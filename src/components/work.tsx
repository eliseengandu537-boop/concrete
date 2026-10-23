"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { projects } from "@/lib/content";
import { Arrow, Reveal, SectionLabel } from "./ui";
import { ProjectButton } from "./site-shell";

export function Work() {
  const [selected, setSelected] = useState(projects[0]);
  const dialog = useRef<HTMLDialogElement>(null);
  const [filter, setFilter] = useState("All work");
  const filters = ["All work", "Business", "Lifestyle"];
  const visible = projects.filter(project => filter === "All work" || (filter === "Business" ? ["routed", "10-four"].includes(project.id) : ["rage", "nutriflow"].includes(project.id)));
  return <section id="work" className="work-section light-section section-space" aria-labelledby="work-heading"><div className="container">
    <Reveal><SectionLabel number="01">SELECTED WORK</SectionLabel><div className="section-heading-row"><h2 id="work-heading">Less ordinary.<br /><span className="muted-heading">More memorable.</span></h2><div className="section-intro"><p>Different ambitions. One shared standard.<br />Work that looks good — and means something.</p><span className="small-note">A SELECTION OF DIGITAL EXPERIENCES</span></div></div></Reveal>
    <div className="work-toolbar"><div className="work-filters" role="group" aria-label="Filter projects">{filters.map(item => <button key={item} aria-pressed={filter === item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}{item === "All work" && <sup>04</sup>}</button>)}</div><span className="work-count" aria-live="polite">{String(visible.length).padStart(2, "0")} PROJECTS</span></div>
    <div className="work-grid">{visible.map((project, index) => <Reveal key={project.id} delay={index % 2 * 0.08}><button className="project-card" aria-label={`View ${project.name} project`} onClick={() => { setSelected(project); dialog.current?.showModal(); document.body.style.overflow = "hidden"; }}><div className="project-image" style={{ backgroundColor: project.color }}><Image src={project.image} alt={`${project.name} website shown across desktop and mobile devices`} width={1000} height={750} sizes="(max-width: 700px) 92vw, 46vw" loading="lazy" /><span className="project-category">{project.category}</span><span className="project-view">View project<Arrow diagonal /></span></div><div className="project-info"><div><h3>{project.name}</h3><p>{project.services}</p></div><span className="project-arrow"><Arrow diagonal /></span></div></button></Reveal>)}</div>
    <Reveal className="work-end"><span>Have something different in mind?</span><ProjectButton className="text-button dark-text">Let’s make it happen</ProjectButton></Reveal>
    <dialog ref={dialog} className="case-dialog" aria-labelledby="case-title" onClose={() => { document.body.style.overflow = ""; }} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}><div className="case-inner"><button className="close-button" aria-label="Close project details" onClick={() => dialog.current?.close()}>×</button><Image src={selected.image} alt={`${selected.name} website design`} width={1000} height={750} /><div className="case-content"><div className="eyebrow">{selected.category}</div><h2 id="case-title">{selected.name}</h2><p>{selected.description}</p><div className="case-tags">{selected.focus.map(item => <span key={item}>{item}</span>)}</div><a className="button button-lime" href="#contact" onClick={() => dialog.current?.close()}>Let’s build your next chapter<Arrow diagonal /></a></div></div></dialog>
  </div></section>;
}
