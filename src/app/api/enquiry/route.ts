import { createEnquiryHandler } from "@/lib/enquiry-server";
import { deliverEnquiry } from "@/lib/gmail-delivery";

export const runtime = "nodejs";
export const maxDuration = 30;
export const POST = createEnquiryHandler(deliverEnquiry);
