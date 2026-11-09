import Link from "next/link";
import { agency } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Privacy notice", "How Concrete Agency handles project enquiries, contact details and email correspondence submitted through this website.", "/privacy/");
export default function Privacy() {
  return <main id="main" className="article-page light-section"><div className="article-container"><Link className="article-back" href="/">← Back to the studio</Link><div className="eyebrow">THE DETAILS</div><h1>Your privacy matters.</h1><div className="article-body">
    <h2>Project enquiries</h2><p>When you select “Send message”, your enquiry is submitted securely to our website’s server for delivery to Concrete Agency’s email inbox. You stay on this website and see a confirmation only after our email provider accepts the message.</p>
    <h2>Information you send</h2><p>We receive your name, email address, company, selected services and package, budget, and project details. We use this information to respond to you and discuss your project. Form entries are not saved in your browser’s local storage.</p>
    <h2>Email delivery</h2><p>Our hosting provider, Vercel, processes the submission and sends it to our Gmail inbox through an encrypted connection. Google processes and stores the message as part of our email correspondence under its <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>. We use brief, temporary request limits to reduce spam. Please avoid including passwords or sensitive account information in your message.</p>
    <h2>Cookies and analytics</h2><p>This website’s application code does not set tracking cookies, use advertising pixels, or run analytics. Fonts and project images are served with the website. The hosting provider may process access logs required to deliver the site.</p>
    <h2>Questions or requests</h2><p>To ask about your enquiry information or request its removal from our correspondence, contact <a href={`mailto:${agency.email}`}>{agency.email}</a>.</p>
  </div></div></main>;
}
