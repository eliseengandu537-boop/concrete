import type { Metadata } from "next";
import Link from "next/link";
import { agency } from "@/lib/content";

export const metadata: Metadata = { title: "Privacy notice" };
export default function Privacy() {
  return <main id="main" className="article-page light-section"><div className="article-container"><Link className="article-back" href="/">← Back to the studio</Link><div className="eyebrow">THE DETAILS</div><h1>Your privacy matters.</h1><div className="article-body"><h2>Project enquiries</h2><p>The project form prepares an email draft in your own email app. Form entries are not submitted to a website database or stored in your browser. You choose whether to send the prepared email.</p><h2>Information you send</h2><p>If you send an enquiry, Concrete Agency receives the information included in that email, such as your name, email address, company, and project details. We use it to respond to you and discuss your project.</p><h2>Cookies and analytics</h2><p>This website’s application code does not set tracking cookies, use advertising pixels, or run analytics. Fonts and project images are served with the website. The hosting provider may process access logs or authentication information required to deliver the site.</p><h2>Questions or requests</h2><p>To ask about your enquiry information or request its removal from our correspondence, contact <a href={`mailto:${agency.email}`}>{agency.email}</a>.</p></div></div></main>;
}
