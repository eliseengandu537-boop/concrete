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

Browser checks use an installed Google Chrome. They cover responsive rendering, WebGL initialization, working image assets, project filtering, modal focus return, the service accordion, form validation, journal navigation, reduced motion, and automated accessibility checks.

## Structure

- `src/app`: home, journal articles, privacy notice, 404, global styles and metadata.
- `src/components`: reusable page sections, navigation, dialogs, motion, and the dynamically loaded Three.js sculpture.
- `src/lib/content.ts`: agency contact information, service descriptions, projects, and journal content.
- `public/images`: locally served portfolio images retained from the reference.
- `.openai/hosting.json`: private Sites project identity and static deployment configuration.

## Design and behaviour

Graphite and warm white with an acid-yellow accent; self-hosted Manrope and DM Sans; glass navigation; a real-time reflective metal sculpture; scroll reveals; filterable portfolio cards; expandable services; and responsive project enquiry and portfolio dialogs.

The sculpture pauses when off-screen or the tab is hidden, reduces resolution on mobile, respects reduced motion, and falls back to a CSS illustration if WebGL is unavailable. Fonts and imagery are self-hosted, and no third-party analytics are installed.

The enquiry form validates the visitor's details and opens an email draft addressed to `eliseeweb@gmail.com`. The visitor reviews and sends the draft in their email application. The site does not claim to send or store enquiries itself.

## Reference assets

The following project names and images were retained from the user-supplied reference at https://digitalfold.co.za/ as part of the requested rebuild/rebrand: Routed, Rage Festival, 10-Four, and NutriFlow. The site introduces no invented client testimonials or performance statistics. The journal articles and general agency copy were written for this build. The geometric brand mark and journal illustrations are original SVG/CSS assets.

The parent directory's `demo.html` and `AGENTS.md` have been preserved.
