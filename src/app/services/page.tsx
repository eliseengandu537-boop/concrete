import Link from "next/link";
import { Arrow } from "@/components/ui";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { servicePages } from "@/lib/service-pages";
import { absoluteUrl, breadcrumbSchema, organizationId, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Web Design, SEO & AI Services", "Explore Concrete Agency’s website design, SEO, AI automation and B2B lead generation services for South African businesses.", "/services/");

export default function ServiceIndex() {
  return <main id="main"><JsonLd data={{ "@context": "https://schema.org", "@graph": [
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services/" }]),
    { "@type": "OfferCatalog", "@id": `${absoluteUrl("/services/")}#catalog`, name: "Concrete Agency services", itemListElement: servicePages.map(item => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: item.name, url: absoluteUrl(`/services/${item.slug}/`), provider: { "@id": organizationId } } })) },
  ] }} />
    <section className="article-page light-section service-detail"><div className="article-container"><Link className="article-back" href="/"><Arrow direction="left" />Back to the studio</Link><div className="eyebrow">WHAT WE DO · SOUTH AFRICA</div><h1>Good ideas.<br />Connected services.</h1><p className="article-standfirst">Website design, SEO, AI automation and lead generation for South African businesses. Start with the part you need today, then connect the next step as your business grows.</p>
      <div className="service-directory">{servicePages.map((service, index) => <article key={service.slug}><span className="eyebrow">0{index + 1}</span><h2><Link href={`/services/${service.slug}/`}>{service.name}<span><Arrow diagonal /></span></Link></h2><p>{service.summary}</p></article>)}</div>
      <Link className="text-button dark-text" href="/#service-packages">Compare our three packages <Arrow diagonal /></Link>
    </div></section><Contact /></main>;
}
