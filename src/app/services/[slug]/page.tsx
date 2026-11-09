import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Contact } from "@/components/contact";
import { ProjectButton } from "@/components/site-shell";
import { JsonLd } from "@/components/json-ld";
import { servicePages } from "@/lib/service-pages";
import { absoluteUrl, breadcrumbSchema, organizationId, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() { return servicePages.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = servicePages.find(item => item.slug === slug);
  if (!service) notFound();
  return pageMetadata(service.title, service.description, `/services/${slug}/`);
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicePages.find(item => item.slug === slug);
  if (!service) notFound();
  const path = `/services/${slug}/`;
  return <main id="main">
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      { "@type": "Service", "@id": `${absoluteUrl(path)}#service`, name: service.title, serviceType: service.name, description: service.description, url: absoluteUrl(path), provider: { "@id": organizationId }, areaServed: { "@type": "Country", name: "South Africa" } },
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services/" }, { name: service.name, path }]),
    ] }} />
    <article className="article-page light-section service-detail"><div className="article-container">
      <nav className="service-breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/services/">Services</Link><span aria-hidden="true">/</span><span aria-current="page">{service.name}</span></nav>
      <div className="eyebrow">{service.name.toUpperCase()} · SOUTH AFRICA</div>
      <h1>{service.headline}</h1><p className="article-standfirst">{service.introduction}</p>
      <div className="service-detail-actions"><ProjectButton service={service.service}>Discuss {service.name.toLowerCase()}</ProjectButton><Link className="text-button dark-text" href="/#work">Explore our work ↗</Link></div>
      <section className="service-scope" aria-labelledby="scope-heading"><span className="eyebrow">SHAPED AROUND YOUR BUSINESS</span><h2 id="scope-heading">What we can help with.</h2><ul>{service.deliverables.map(item => <li key={item}>{item}</li>)}</ul></section>
      <div className="article-body">{service.sections.map(section => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}</div>
      <section className="service-faq" aria-labelledby="questions-heading"><span className="eyebrow">A LITTLE MORE CLARITY</span><h2 id="questions-heading">Your questions, answered.</h2>{service.faqs.map(faq => <div key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></div>)}</section>
      <nav className="service-related" aria-label="Related services"><h2>Connect the next part.</h2>{servicePages.filter(item => item.slug !== slug).map(item => <Link href={`/services/${item.slug}/`} key={item.slug}>{item.name}<span aria-hidden="true">↗</span></Link>)}</nav>
    </div></article><Contact />
  </main>;
}
