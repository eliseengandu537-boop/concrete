"use client";

import { useEffect, type RefObject } from "react";
import type { Project } from "@/lib/content";
import { LaptopPreview } from "./laptop-preview";
import { Arrow } from "./ui";

export function ProjectDetails({ dialogRef, project }: { dialogRef: RefObject<HTMLDialogElement | null>; project: Project }) {
  useEffect(() => {
    const dialog = dialogRef.current;
    return () => { if (dialog?.open) document.body.style.overflow = ""; };
  }, [dialogRef]);

  return <dialog ref={dialogRef} className="case-dialog" aria-labelledby="case-title"
    onClose={() => { document.body.style.overflow = ""; }}
    onClick={event => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
    <div className="case-inner">
      <button className="close-button" aria-label="Close project details" onClick={() => dialogRef.current?.close()}>×</button>
      <LaptopPreview {...project} />
      <div className="case-content">
        <div className="eyebrow">{project.category}</div>
        <h2 id="case-title">{project.name}</h2>
        <p>{project.description}</p>
        <div className="case-tags">{project.focus.map(item => <span key={item}>{item}</span>)}</div>
        <a className="button button-lime" href={project.url} target="_blank" rel="noopener noreferrer">Visit website<Arrow diagonal /><span className="sr-only"> (opens in a new tab)</span></a>
      </div>
    </div>
  </dialog>;
}
