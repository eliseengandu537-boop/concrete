"use client";

import { createContext, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { agency, services } from "@/lib/content";
import { Arrow, Mark } from "./ui";

const ProjectContext = createContext<() => void>(() => {});
export function ProjectButton({ children = "Start a project", className = "button button-lime", arrow = true }: { children?: ReactNode; className?: string; arrow?: boolean }) {
  const open = useContext(ProjectContext);
  return <button className={className} onClick={open}>{children}{arrow && <span className="button-icon"><Arrow diagonal /></span>}</button>;
}

function ProjectDialog({ dialogRef }: { dialogRef: React.RefObject<HTMLDialogElement | null> }) {
  const [prepared, setPrepared] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const selected = data.getAll("services").join(", ") || "I'd like your guidance";
    const body = `Hello Concrete Agency,\n\nI'd love to discuss a project.\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nCompany: ${data.get("company") || "Not specified"}\nServices: ${selected}\nBudget: ${data.get("budget")}\n\nProject details:\n${data.get("message")}\n\nLooking forward to connecting!`;
    window.location.href = `mailto:${agency.email}?subject=${encodeURIComponent(`New project enquiry — ${data.get("name")}`)}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
  }
  return <dialog ref={dialogRef} className="project-dialog" aria-labelledby="project-title" onClose={() => { document.body.style.overflow = ""; setPrepared(false); }} onClick={event => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
    <div className="dialog-inner"><button className="close-button" aria-label="Close project form" onClick={() => dialogRef.current?.close()}>×</button>
      <div className="eyebrow">GOOD THINGS START WITH A CONVERSATION</div>
      <h2 id="project-title">Make it<br /><span>concrete.</span></h2>
      <p className="dialog-description">Tell us what you have in mind. Big ideas, small details — we’re all ears.</p>
      <form onSubmit={submit}>
        <div className="form-grid"><label>Your name <span>*</span><input name="name" autoComplete="name" required placeholder="Alex Smith" maxLength={100} /></label><label>Email address <span>*</span><input name="email" type="email" autoComplete="email" required placeholder="alex@company.com" maxLength={254} /></label></div>
        <label>Company<input name="company" autoComplete="organization" placeholder="Your company or brand" maxLength={150} /></label>
        <fieldset><legend>What can we help with?</legend><div className="service-options">{services.map(service => <label key={service.short}><input type="checkbox" name="services" value={service.short} /><span>{service.short}</span></label>)}</div></fieldset>
        <label>Project budget<select name="budget" defaultValue="Let's discuss"><option>Let&apos;s discuss</option><option>Under R15,000</option><option>R15,000–R30,000</option><option>R30,000–R60,000</option><option>R60,000+</option></select></label>
        <label>A little about your project <span>*</span><textarea name="message" required rows={3} placeholder="The idea, the ambition, the thing keeping you up at night…" maxLength={3000} /></label>
        <p className="form-note">This opens a draft in your email app, ready for you to review and send to {agency.email}. <Link href="/privacy/" onClick={() => dialogRef.current?.close()}>Privacy notice</Link>.</p>
        <button type="submit" className="button button-lime">Prepare my enquiry<span className="button-icon"><Arrow diagonal /></span></button>
        {prepared && <p className="form-status" role="status">Your email draft is ready. Send it from your email app to finish your enquiry. If your app didn’t open, email <a href={`mailto:${agency.email}`}>{agency.email}</a> directly.</p>}
      </form>
    </div>
  </dialog>;
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); } };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  const links = [["Work", "work"], ["About", "about"], ["Services", "services"], ["Journal", "journal"]];
  return <header className="site-header"><div className="nav-wrap">
    <Link href="/" className="wordmark" aria-label="Concrete Agency home" onClick={() => setOpen(false)}><Mark /><span>concrete<span className="wordmark-sub">AGENCY</span></span></Link>
    <nav aria-label="Main navigation" className="desktop-nav">{links.map(([label, anchor]) => <a key={anchor} href={`${pathname === "/" ? "" : "/"}#${anchor}`}>{label}<span className="nav-dot" /></a>)}</nav>
    <div className="nav-actions"><ProjectButton className="button button-nav" /><button ref={menuButton} className={`menu-toggle ${open ? "is-open" : ""}`} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}><span /><span /></button></div>
  </div><nav id="mobile-navigation" aria-label="Mobile navigation" className={`mobile-nav ${open ? "is-open" : ""}`} inert={!open}>{links.map(([label, anchor], index) => <Link href={`/#${anchor}`} key={anchor} onClick={() => setOpen(false)}><small>0{index + 1}</small>{label}<Arrow diagonal /></Link>)}<Link href="/#contact" onClick={() => setOpen(false)}><small>05</small>Get in touch<Arrow diagonal /></Link></nav></header>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const open = () => { dialog.current?.showModal(); document.body.style.overflow = "hidden"; };
  return <ProjectContext.Provider value={open}><a href="#main" className="skip-link">Skip to content</a><Navigation />{children}<Footer /><ProjectDialog dialogRef={dialog} /></ProjectContext.Provider>;
}

function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-top"><Link href="/" className="wordmark" aria-label="Concrete Agency home"><Mark /><span>concrete<span className="wordmark-sub">AGENCY</span></span></Link><p>Independent minds.<br />Extraordinary possibilities.</p><div className="footer-links"><Link href="/#work">Work</Link><Link href="/#about">About</Link><Link href="/#services">Services</Link><Link href="/#contact">Contact</Link></div><a className="footer-email" href={`mailto:${agency.email}`}>{agency.email}<Arrow diagonal /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Concrete Agency</span><span className="footer-crafted">Built with intention. Down to the last pixel.</span><Link href="/privacy/">Privacy</Link><a href="#top">Back to top ↑</a></div></div></footer>;
}
