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

The production preview serves at `http://127.0.0.1:3030`. The deployable static website is in `out/`.

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
- `.openai/hosting.json`: private Sites project identity and static deployment configuration.

## Design and behaviour

The latest supplied visual reference guides an ocean-blue and luminous-cyan design with a fluted-glass background. A centered Cormorant Garamond headline sits over moving blue light, fine vertical glass lines, and three linked glass previews. Compact glass navigation, a circular project enquiry button, editorial section headings, and a coordinated blue palette carry the direction through the full site. Portfolio filters, expandable services, and responsive enquiry dialogs retain their original functionality.

The What We Do content adapts the customer-facing service information from the supplied `Concrete Agency - What We Do.pdf` team guide. It presents ten services, an outbound/inbound-to-dashboard workflow, and the Website Build, AI Integration, and Full AI Integration packages. The included-website offer is explicitly tied to Full AI Integration. Internal team assignments, sales scripts, and unverified legal assertions are not published. The original PDF and extraction tools remain outside the public website.

The business growth section presents eight additional offerings: landing pages, smart enquiry forms, WhatsApp and booking integrations, AI enquiry assistants, lead dashboards / CRM, automatic follow-ups, email outreach integrations, and results dashboards. These are services offered to clients. Clicking an offering preselects it in the enquiry form. The section uses a sticky text sequence on desktop and a compact reveal on mobile, with a static reduced-motion experience.

Headings now use the motion style requested from FedPump: words rise from clipped masks with a slight rotation, a 48 ms stagger, and a soft 850 ms settle when they enter the viewport. Hero, work, services, business growth, journal, and contact headings share the reusable `WordReveal` component. Native scrolling, readable server-rendered text, and instant reduced-motion rendering are preserved. The studio statement retains its scroll-linked colour fill.

The horizon uses CSS and SVG, pauses when off-screen or the tab is hidden, and becomes static with reduced motion. Small screens and touch devices use a static blue glass background without full-height blur layers. Their header and dialog backdrops also avoid live blur while scrolling. It requires no WebGL or extra animation dependency. Fonts and imagery are self-hosted, and no third-party analytics are installed.

The enquiry form validates the visitor's details and opens an email draft addressed to `eliseeweb@gmail.com`. The visitor reviews and sends the draft in their email application. The site does not claim to send or store enquiries itself.

## Reference assets

The demo projects have been replaced with the eight websites supplied for the Work section: [DG Property](https://dg-property.co.za/), [MicroLogistics](https://micrologistics.co.za/), [Newlife United](https://newlifeunited.co.za/), [Thunder Brothers](https://thunderbrothers.co.za/), [CTCPM Data Warehouse](https://www.datawarehouse.ctcpm.cd/), [Lens Photo Studio](https://lensphotostudio.co.za/), [DCB Spares](https://www.dcbspares.co.za/), and [Fedpump CC](https://www.fedpump.com/). Previews are locally served WebP screenshots of their public homepages, captured on 6 November 2026. Descriptions explain the websites’ visible subjects and features without inventing results, testimonials, or project responsibilities. Each card and project dialog offers a direct link to the relevant website. Hero previews use the same portfolio data.

The Work cards and project dialogs display each website in a layered laptop, tablet, and phone composition. Tablet and phone screens use separate captures at 820 × 1100 and 390 × 844 rather than crops of the desktop screenshot. The CSS device frames use graphite edges, a metallic laptop base, soft shadows, and restrained hover motion. The composition scales to small screens and respects reduced-motion preferences.

At widths up to 800px or with a coarse pointer, each mockup is a single locally served `*-devices.webp` composition. The live device layers are hidden, the cards remain still, and the separate screen images are lazy-loaded only when visible. This avoids the filtered, rotated surfaces implicated in Android scrolling artifacts. The eight composed images total about 363 kB, compared with 1.17 MB for the 24 separate screenshots; hero images remain separate. Heading and scroll-text motion is preserved.

After changing screenshots or device styling, run `node scripts/capture-project-mockups.mjs` against the built local preview, then rebuild so `out/` includes the refreshed compositions. The helper renders the actual desktop markup at 800px wide and encodes WebP in Chrome; it requires no extra image library. `PREVIEW_URL` may point to another local preview. The touch-rendering regression check covers phone and landscape tablet layouts, image requests, touch scrolling with CPU throttling, and project links with reduced motion turned off.

The journal articles and general agency copy were written for this build. The geometric brand mark and journal illustrations are original SVG/CSS assets.

The parent directory's `demo.html` and `AGENTS.md` have been preserved.
