# Concrete Agency

A complete agency website rebuilt from the supplied DigitalFold reference, with Concrete Agency branding and enquiries addressed to **eliseeweb@gmail.com**.

## Run locally

```powershell
npm install
npm run dev
```

For the production version:

```powershell
npm run build
npm start
```

The production preview serves at `http://127.0.0.1:3030`. The app now requires the Next.js server for its email endpoint; `out/` from an older static build must not be deployed. Vercel uses the framework and `.next` output configured in `vercel.json`.

## Checks

```powershell
npm run lint
npm run typecheck
$env:PREVIEW_URL = 'http://127.0.0.1:3030'
npm run test:e2e
```

Browser checks use an installed Google Chrome. They cover responsive rendering, showcase imagery and links, hero enquiries, off-screen animation pausing, project filtering, modal focus return, the service accordion, form validation, journal navigation, reduced motion, and automated accessibility checks.

## Structure

- `src/app`: home, journal articles, privacy notice, 404, global styles and metadata.
- `src/components`: reusable page sections, navigation, dialogs, word motion, the SVG light horizon, and glass showcase previews.
- `src/app/editorial-theme.css`: the shared ocean-blue, cyan, and icy-glass design system.
- `public/fonts`: self-hosted Cormorant Garamond normal/italic and its SIL Open Font License.
- `src/lib/content.ts`: agency contact information, service descriptions, projects, and journal content.
- `public/images/projects`: compressed homepage previews of the eight supplied portfolio websites.
- `.openai/hosting.json`: retained identity for the earlier static Sites preview; production uses Vercel, not this legacy static configuration.
- `src/app/api/enquiry/route.ts`: server-only email endpoint, backed by `src/lib/enquiry-server.ts` and `src/lib/gmail-delivery.ts`.

## Design and behaviour

The latest supplied visual reference guides an ocean-blue and luminous-cyan design with a fluted-glass background. A centered Cormorant Garamond headline sits over moving blue light, fine vertical glass lines, and three linked glass previews. Compact glass navigation, a circular project enquiry button, editorial section headings, and a coordinated blue palette carry the direction through the full site. Portfolio filters, expandable services, and responsive enquiry dialogs retain their original functionality.

The What We Do content adapts the customer-facing service information from the supplied `Concrete Agency - What We Do.pdf` team guide. It presents ten services, an outbound/inbound-to-dashboard workflow, and the Website Build, AI Integration, and Full AI Integration packages. The included-website offer is explicitly tied to Full AI Integration. Internal team assignments, sales scripts, and unverified legal assertions are not published. The original PDF and extraction tools remain outside the public website.

The business growth section presents eight additional offerings: landing pages, smart enquiry forms, WhatsApp and booking integrations, AI enquiry assistants, lead dashboards / CRM, automatic follow-ups, email outreach integrations, and results dashboards. These are services offered to clients. Clicking an offering preselects it in the enquiry form. The section uses a sticky text sequence on desktop and a compact reveal on mobile, with a static reduced-motion experience.

Headings now use the motion style requested from FedPump: words rise from clipped masks with a slight rotation, a 48 ms stagger, and a soft 850 ms settle when they enter the viewport. Hero, work, services, business growth, journal, and contact headings share the reusable `WordReveal` component. Native scrolling, readable server-rendered text, and instant reduced-motion rendering are preserved. The studio statement retains its scroll-linked colour fill.

The horizon uses CSS and SVG, pauses when off-screen or the tab is hidden, and becomes static with reduced motion. Small screens and touch devices use a static blue glass background without full-height blur layers. Their header and dialog backdrops also avoid live blur while scrolling. It requires no WebGL or extra animation dependency. Fonts and imagery are self-hosted, and no third-party analytics are installed.

The enquiry form submits to the same-origin `/api/enquiry/` endpoint while the visitor stays on the website. The server sends the name, email, company, package, selected services, budget, and message to **eliseeweb@gmail.com** through Gmail SMTP over TLS. The visitor's email is used for Reply-To; visitors cannot set the sender or destination. A thank-you screen appears only after Gmail accepts the message for that recipient. Pending requests disable duplicate submissions, and unsuccessful requests preserve the visitor's details for retry.

### Email connection

1. Sign in as `eliseeweb@gmail.com` at [Google App Passwords](https://myaccount.google.com/apppasswords). Enable 2-Step Verification if Google requires it, then create an app password named **Concrete Agency**.
2. In Vercel → **concrete** → **Settings** → **Environment Variables**, add **GMAIL_APP_PASSWORD** with that value for Production and Preview. Store it as sensitive when available. This is a dedicated app password, not the normal Google account password.
3. Deploy the updated code after adding the variable. Variable changes need a new deployment. Send one labelled test using the production form and confirm receipt in Gmail before treating delivery as verified.

For local email testing, copy `.env.example` to `.env.local` and set the value there; `.env.local` is ignored by Git. Never use a `NEXT_PUBLIC_` prefix or put the password in frontend code, screenshots, commits, or chat. The endpoint returns a controlled failure when the value is missing; it never substitutes a fake success or opens an email client.

Gmail credentials stay on the server. The endpoint validates origin, payload size, field types and lengths, email format, and the honeypot. Email HTML is escaped; file/URL attachment access is disabled. A bounded in-memory limit permits five attempts per IP per ten minutes per server instance. This is best-effort protection, not a distributed quota; Vercel Firewall can enforce shared limits if needed. Diagnostic logs contain only configuration status or a bounded error code, never enquiry contents or passwords. SMTP acceptance is not proof of inbox placement. Gmail account policies or sending limits may reject a message; check the Vercel function logs and the receiving inbox when troubleshooting.

The enquiry browser tests intercept the website endpoint and never send real email. Coverage includes complete payloads, duplicate prevention, confirmation focus, mobile accessibility, and retries after server, configuration, rate-limit, network, and malformed-response failures. Server tests cover validation, fixed recipients, escaped email content, delivery rejection, missing credentials, and throttling. A passing mocked test does not verify real email delivery.

## Reference assets

The demo projects have been replaced with the eight websites supplied for the Work section: [DG Property](https://dg-property.co.za/), [MicroLogistics](https://micrologistics.co.za/), [Newlife United](https://newlifeunited.co.za/), [Thunder Brothers](https://thunderbrothers.co.za/), [CTCPM Data Warehouse](https://www.datawarehouse.ctcpm.cd/), [Lens Photo Studio](https://lensphotostudio.co.za/), [DCB Spares](https://www.dcbspares.co.za/), and [Fedpump CC](https://www.fedpump.com/). Previews are locally served WebP screenshots of their public homepages, captured on 6 November 2026. Descriptions explain the websites’ visible subjects and features without inventing results, testimonials, or project responsibilities. Each card and project dialog offers a direct link to the relevant website. Hero previews use the same portfolio data.

The Work cards and project dialogs display each website in a layered laptop, tablet, and phone composition. Tablet and phone screens use separate captures at 820 × 1100 and 390 × 844 rather than crops of the desktop screenshot. The CSS device frames use graphite edges, a metallic laptop base, soft shadows, and restrained hover motion. The composition scales to small screens and respects reduced-motion preferences.

At widths up to 800px or with a coarse pointer, each mockup is a single locally served `*-devices.webp` composition. The live device layers are hidden, the cards remain still, and the separate screen images are lazy-loaded only when visible. This avoids the filtered, rotated surfaces implicated in Android scrolling artifacts. The eight composed images total about 363 kB, compared with 1.17 MB for the 24 separate screenshots; hero images remain separate. Heading and scroll-text motion is preserved.

After changing screenshots or device styling, run `node scripts/capture-project-mockups.mjs` against the built local preview, then rebuild to include the refreshed compositions. The helper renders the actual desktop markup at 800px wide and encodes WebP in Chrome; it requires no extra image library. `PREVIEW_URL` may point to another local preview. The touch-rendering regression check covers phone and landscape tablet layouts, image requests, touch scrolling with CPU throttling, and project links with reduced motion turned off.

The journal articles and general agency copy were written for this build. The geometric brand mark and journal illustrations are original SVG/CSS assets.

The parent directory's `demo.html` and `AGENTS.md` have been preserved.
