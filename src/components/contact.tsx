import { agency } from "@/lib/content";
import { Arrow, FoundationAccent, SectionLabel } from "./ui";
import { ProjectButton } from "./site-shell";
import { WordReveal } from "./word-reveal";

export function Contact() {
  return <section id="contact" className="contact-section" aria-labelledby="contact-heading"><div className="contact-aura" aria-hidden="true" /><div className="container"><SectionLabel number="05" light>YOUR NEXT CHAPTER</SectionLabel><div className="contact-topline"><span className="contact-pretitle"><span className="status-dot" /> GOOD IDEAS DESERVE GREAT COMPANY.</span><FoundationAccent className="contact-accent-mark" /></div><WordReveal id="contact-heading">Let’s make<br />something <span className="contact-accent">matter.</span></WordReveal><div className="contact-bottom"><p>A new brand. A better website. A bigger ambition.<br />Tell us what’s next. We’ll help you get there.</p><ProjectButton className="button button-lime button-large">Start a conversation</ProjectButton></div><a className="contact-email" href={`mailto:${agency.email}`}>Or say hello at {agency.email}<Arrow diagonal /></a></div></section>;
}
