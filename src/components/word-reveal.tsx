"use client";

import { Children, cloneElement, isValidElement, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";

type TextElementProps = { children?: ReactNode };

function readableText(children: ReactNode): string {
  return Children.toArray(children).map(child => {
    if (typeof child === "string" || typeof child === "number") return String(child);
    if (!isValidElement<TextElementProps>(child)) return "";
    if (child.type === "br") return " ";
    if (child.type === "svg") return "";
    return readableText(child.props.children);
  }).join("");
}

/** Preserve explicit line breaks, accent spans, and spaces while masking individual words. */
function splitWords(children: ReactNode, sequence: { index: number }, delay: number): ReactNode {
  return Children.map(children, child => {
    if (typeof child === "string" || typeof child === "number") {
      return String(child).split(/(\s+)/).map((token, index) => {
        if (!token || /^\s+$/.test(token)) return token;
        const wordDelay = delay + Math.min(sequence.index++ * 48, 480);
        return <span className="heading-word-mask" key={index}><span className="heading-word" style={{ "--word-delay": `${wordDelay}ms` } as CSSProperties}>{token}</span></span>;
      });
    }
    if (!isValidElement<TextElementProps>(child) || child.type === "svg" || child.type === "br") return child;
    return cloneElement(child, {}, splitWords(child.props.children, sequence, delay));
  });
}

export function WordReveal({ children, as: Tag = "h2", className = "", id, delay = 0 }: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "span";
  className?: string;
  id?: string;
  delay?: number;
}) {
  const root = useRef<HTMLHeadingElement & HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    let finished = false;
    const reveal = () => {
      finished = true;
      element.dataset.revealState = "visible";
      observer?.disconnect();
    };
    const configure = () => {
      observer?.disconnect();
      if (finished || preference.matches || !("IntersectionObserver" in window)) { reveal(); return; }
      element.dataset.revealState = "waiting";
      observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) reveal();
      }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
      observer.observe(element);
    };
    configure();
    preference.addEventListener("change", configure);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", configure);
      delete element.dataset.revealState;
    };
  }, []);

  return <Tag ref={root} id={id} className={`word-reveal ${className}`} aria-label={Tag === "span" ? undefined : readableText(children).replace(/\s+/g, " ").trim()}>
    {splitWords(children, { index: 0 }, delay)}
  </Tag>;
}
