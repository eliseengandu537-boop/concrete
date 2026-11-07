import nodemailer from "nodemailer";
import { agency } from "./content";
import { enquiryMail, type Enquiry } from "./enquiry-server";

export async function deliverEnquiry(enquiry: Enquiry, password: string) {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com", port: 465, secure: true,
    auth: { user: agency.email, pass: password },
    connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 15000, dnsTimeout: 5000,
    disableFileAccess: true, disableUrlAccess: true,
    logger: false, debug: false,
  });
  try {
    const result = await transport.sendMail(enquiryMail(enquiry));
    const accepted = result.accepted.some(recipient => recipient.toLowerCase() === agency.email.toLowerCase());
    if (!accepted) throw new Error("Recipient was not accepted.");
  } finally { transport.close(); }
}
