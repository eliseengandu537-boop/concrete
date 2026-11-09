import { Hero, DisciplineStrip } from "@/components/hero";
import { Work } from "@/components/work";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Journal } from "@/components/journal";
import { Contact } from "@/components/contact";
import { GrowthServices } from "@/components/growth-services";
import { JsonLd } from "@/components/json-ld";
import { agency } from "@/lib/content";
import { absoluteUrl, organizationId, pageMetadata, websiteId } from "@/lib/seo";

export const metadata = pageMetadata("Websites, SEO & AI Automation", agency.description, "/");

export default function Home() {
  return <main id="main"><JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", "@id": websiteId, name: agency.name, url: absoluteUrl(), description: agency.description, inLanguage: "en-ZA", publisher: { "@id": organizationId } }} /><Hero /><DisciplineStrip /><Work /><About /><Services /><GrowthServices /><Journal /><Contact /></main>;
}
