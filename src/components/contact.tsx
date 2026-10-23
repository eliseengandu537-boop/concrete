import { agency } from "@/lib/content";
import { Arrow, Reveal, SectionLabel } from "./ui";
import { ProjectButton } from "./site-shell";

export function Contact() {
  return <section id="contact" className="contact-section" aria-labelledby="contact-heading"><div className="contact-aura" aria-hidden="true" /><div className="container"><Reveal><SectionLabel number="05" light>YOUR NEXT CHAPTER</SectionLabel><div className="contact-topline"><span className="contact-pretitle"><span className="status-dot" /> GOOD IDEAS DESERVE GREAT COMPANY.</span><span className="contact-star" aria-hidden="true">✳</span></div><h2 id="contact-heading">Let’s make<br />something <span>matter.</span></h2><div className="contact-bottom"><p>A new brand. A better website. A bigger ambition.<br />Tell us what’s next. We’ll help you get there.</p><ProjectButton className="button button-lime button-large">Start a conversation</ProjectButton></div><a className="contact-email" href={`mailto:${agency.email}`}>Or say hello at {agency.email}<Arrow diagonal /></a></Reveal></div></section>;
}
