"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import { Mark, Reveal, SectionLabel } from "./ui";
import { ProjectButton } from "./site-shell";

function Word({ children, progress, start, end }: { children: string; progress: MotionValue<number>; start: number; end: number }) {
  const opacity = useTransform(progress, [start, end], [0.38, 1]);
  const reduced = useReducedMotion();
  return <motion.span style={{ opacity: reduced ? 1 : opacity }}>{children} </motion.span>;
}

export function About() {
  const paragraph = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: paragraph, offset: ["start 90%", "end 55%"] });
  const words = "Great things happen when bold thinking meets solid craft. We’re here to turn your next big idea into something that matters.".split(" ");
  return <section id="about" className="about-section section-space" aria-labelledby="about-heading"><div className="container"><Reveal><SectionLabel number="02" light>THE STUDIO</SectionLabel></Reveal><div className="about-grid"><div className="about-left"><div className="studio-symbol" aria-hidden="true"><div className="symbol-ring" /><Mark /><span className="symbol-plus">+</span></div><div className="studio-caption">INDEPENDENT BY DESIGN.<br />COLLABORATIVE BY NATURE.</div></div><div className="about-content"><h2 id="about-heading" className="sr-only">A little about Concrete Agency</h2><p ref={paragraph} className="manifesto">{words.map((word, index) => <Word key={index} progress={scrollYProgress} start={index / words.length * 0.8} end={index / words.length * 0.8 + 0.2}>{word}</Word>)}</p><div className="about-detail"><p>We’re a creative partner for ambitious businesses. A meeting of strategic minds, curious designers, and hands-on developers. Close collaboration. Honest conversations. Care in every detail.</p><ProjectButton className="text-button">Meet your next creative partner</ProjectButton></div></div></div><div className="studio-values"><div><span>01</span><h3>Think with purpose.</h3><p>Start with the right questions.</p></div><div><span>02</span><h3>Make with care.</h3><p>Every detail earns its place.</p></div><div><span>03</span><h3>Build for what’s next.</h3><p>Solid foundations. Room to grow.</p></div></div></div></section>;
}
