import type { Project } from "@/lib/content";
import { LaptopPreview } from "./laptop-preview";
import { Arrow } from "./ui";

export function PortfolioCard({ project, number, spotlight = false, onOpen }: {
  project: Project;
  number: number;
  spotlight?: boolean;
  onOpen: (project: Project) => void;
}) {
  return <article className={`portfolio-entry portfolio-tile ${spotlight ? "portfolio-spotlight" : ""}`}>
    <button className="project-card portfolio-preview" aria-label={`View ${project.name} project`} onClick={() => onOpen(project)}>
      <LaptopPreview {...project} />
      <span className="portfolio-project-number" aria-hidden="true">{String(number).padStart(2, "0")}</span>
      <span className="portfolio-preview-hint" aria-hidden="true">View project <Arrow diagonal /></span>
    </button>
    <div className="portfolio-caption">
      {spotlight && <span className="portfolio-feature-label"><span /> PROJECT IN FOCUS</span>}
      <p className="portfolio-category">{project.category}</p>
      <h2>{project.name}</h2>
      <p className="portfolio-description">{project.description}</p>
      <div className="portfolio-card-footer">
        <span className="portfolio-domain">{new URL(project.url).hostname.replace(/^www\./, "")}</span>
        <a className="project-site-link" href={project.url} target="_blank" rel="noopener noreferrer">Visit website <Arrow diagonal /><span className="sr-only"> — {project.name} (opens in a new tab)</span></a>
      </div>
    </div>
  </article>;
}
