import { agency } from "./content";

export async function sendEnquiry(data: FormData, signal: AbortSignal) {
  const field = (name: string) => String(data.get(name) || "").trim();
  if (!field("name") || !field("email") || !field("message")) throw new Error("Please enter your name, email address, and project details.");
  if (data.get("botcheck")) throw new Error("We couldn’t send this enquiry. Please try again.");

  const response = await fetch(`https://formsubmit.co/ajax/${agency.email}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    signal,
    body: JSON.stringify({
      _subject: "New project enquiry | Concrete Agency", _template: "table",
      name: field("name"), email: field("email"),
      company: field("company") || "Not provided", package: field("package"),
      services: data.getAll("services").map(String).join(", ") || "I’d like your guidance",
      budget: field("budget"), message: field("message"),
      _url: `${window.location.origin}${window.location.pathname}`, _honey: "", _captcha: "false",
    }),
  });
  if (response.status === 429) throw new Error("Please wait a moment before trying again. Your details are still here.");
  const result: unknown = await response.json();
  const accepted = response.ok && typeof result === "object" && result !== null && "success" in result && (result.success === true || result.success === "true");
  const needsActivation = typeof result === "object" && result !== null && "message" in result && typeof result.message === "string" && /activat|verify your email|confirm your email/i.test(result.message);
  if (!accepted || needsActivation) {
    throw new Error("Your message wasn’t sent. Please try again shortly. Your details are still here.");
  }
}
