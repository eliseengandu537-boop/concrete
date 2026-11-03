"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const desktopQuery = "(min-width: 901px)";
const desktopSnapshot = () => window.matchMedia(desktopQuery).matches;
const serverSnapshot = () => false;
function subscribeDesktop(onChange: () => void) {
  const query = window.matchMedia(desktopQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function ScrollWord({ word, index, total, progress, highlight }: {
  word: string; index: number; total: number; progress: MotionValue<number>; highlight: boolean;
}) {
  const start = index / total * 0.82;
  const end = Math.min(1, start + 0.18);
  const opacity = useTransform(progress, [start, end], [0.58, 1]);
  const y = useTransform(progress, [start, end], ["0.18em", "0em"]);
  const color = useTransform(progress, [start, end], ["#b6d7e4", highlight ? "#8deafa" : "#f3fbff"]);
  return <span className="scroll-word-mask"><motion.span className={`scroll-word ${highlight ? "scroll-word-accent" : ""}`} style={{ opacity, y, color }}>{word}</motion.span>{" "}</span>;
}

/** Scroll position drives each word; the plain copy preserves screen-reader phrasing. */
export function ScrollText({ text, as: Tag = "p", className = "", id, progress, highlightFrom = Infinity }: {
  text: string; as?: "h2" | "p"; className?: string; id?: string;
  progress?: MotionValue<number>; highlightFrom?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useSyncExternalStore(subscribeDesktop, desktopSnapshot, serverSnapshot);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "end 42%"] });
  const words = text.split(" ");
  return <div ref={ref} className="scroll-text-wrap"><Tag id={id} className={`scroll-text ${className}`}>
    <span className="sr-only">{text}</span>
    <span aria-hidden="true">{words.map((word, index) => <ScrollWord key={`${index}-${word}`} word={word} index={index} total={words.length} progress={desktop && progress ? progress : scrollYProgress} highlight={index >= highlightFrom} />)}</span>
  </Tag></div>;
}
