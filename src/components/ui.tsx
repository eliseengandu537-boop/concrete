"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode, SVGProps } from "react";

export function Arrow({ diagonal = false, ...props }: SVGProps<SVGSVGElement> & { diagonal?: boolean }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}><path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function Mark({ className = "" }: { className?: string }) {
  return <svg className={className} width="37" height="37" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M8 4h24v8H16v16h16v8H8V4Z" fill="currentColor" /><path d="M24 16h12v8H24z" fill="currentColor" /></svg>;
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={reduced ? undefined : { opacity: [0.15, 1], y: [24, 0] }} viewport={{ once: true, margin: "0px 0px -40px 0px" }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}>{children}</motion.div>;
}

export function SectionLabel({ number, children, light = false }: { number: string; children: ReactNode; light?: boolean }) {
  return <div className={`section-label ${light ? "label-light" : ""}`}><span className="label-cross" aria-hidden="true">+</span><span>{number} / {children}</span></div>;
}
