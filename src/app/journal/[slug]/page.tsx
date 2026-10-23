import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { articles } from "@/lib/content";
import { Contact } from "@/components/contact";

export function generateStaticParams() { return articles.map(article => ({ slug: article.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find(item => item.slug === slug);
  return { title: article?.title ?? "Journal", description: article?.description };
}

export default async function JournalArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find(item => item.slug === slug);
  if (!article) notFound();
  return <main id="main"><article className="article-page light-section"><div className="article-container"><Link href="/#journal" className="article-back">← Back to the journal</Link><div className="eyebrow">{article.category} <span> / </span> {article.readTime}</div><h1>{article.title}</h1><p className="article-standfirst">{article.description}</p><div className="article-byline">Words by Concrete Agency · Studio notes</div><div className="article-body">{article.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div><Link href="/#journal" className="text-button dark-text">More from the studio ↗</Link></div></article><Contact /></main>;
}
