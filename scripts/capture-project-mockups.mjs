import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Run against the locally built preview after changing project screenshots or frames.
// Example: PREVIEW_URL=http://127.0.0.1:3030 node scripts/capture-project-mockups.mjs
const preview = new URL(process.env.PREVIEW_URL || 'http://127.0.0.1:3030');
if (!['http:', 'https:'].includes(preview.protocol)
  || !['localhost', '127.0.0.1', '[::1]'].includes(preview.hostname)
  || preview.username || preview.password) {
  throw new Error('PREVIEW_URL must point to a local preview without credentials.');
}

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const outputDirectory = resolve(projectRoot, 'public/images/projects');
await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });

try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });
  await context.route('**/*', route => {
    const requestUrl = new URL(route.request().url());
    return requestUrl.origin === preview.origin ? route.continue() : route.abort();
  });
  const page = await context.newPage();
  const response = await page.goto(new URL('/work/', preview).href, { waitUntil: 'networkidle' });
  if (!response?.ok()) throw new Error(`Local preview returned HTTP ${response?.status()}.`);
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: `
    *, *::before, *::after { animation: none !important; transition: none !important; }
    html { scroll-behavior: auto !important; }
    .site-header { visibility: hidden !important; }
    .work-grid { grid-template-columns: 800px !important; width: 800px !important; }
    .work-grid > div { opacity: 1 !important; transform: none !important; padding-top: 0 !important; }
    .work-grid .project-card { width: 800px !important; }
    .work-grid .project-image { width: 800px !important; height: auto !important; aspect-ratio: 1.27 !important; perspective: none !important; }
    .device-live { display: contents !important; }
    .device-flat { display: none !important; }
  ` });
  await page.mouse.move(0, 0);

  const projectId = process.argv[2];
  if (projectId && !/^[a-z0-9-]+$/.test(projectId)) throw new Error('Project ID must contain only lowercase letters, numbers and hyphens.');
  const stages = projectId
    ? page.locator('.work-grid .project-image').filter({ has: page.locator(`.laptop-screen img[src="/images/projects/${projectId}.webp"]`) })
    : page.locator('.work-grid .project-image');
  const count = await stages.count();
  if (!count) throw new Error('No portfolio device compositions found in the local preview.');
  const captured = new Set();

  for (const stage of await stages.all()) {
    const laptopImage = stage.locator('.laptop-screen img');
    const src = await laptopImage.getAttribute('src');
    if (!src) throw new Error('A laptop preview has no screenshot source.');
    const sourceName = basename(new URL(src, preview).pathname);
    if (!/^[a-z0-9-]+\.webp$/.test(sourceName)) {
      throw new Error(`Unexpected screenshot filename: ${sourceName}`);
    }
    const outputName = sourceName.replace(/\.webp$/, '-devices.webp');
    if (captured.has(outputName)) throw new Error(`Duplicate project composition: ${outputName}`);
    await stage.scrollIntoViewIfNeeded();
    await stage.locator('.laptop-screen img, .tablet-screen img, .phone-screen img').evaluateAll(async images => {
      await Promise.all(images.map(image => image.decode()));
      if (images.length !== 3 || images.some(image => !image.naturalWidth)) {
        throw new Error('Each project must have three fully loaded device screenshots.');
      }
    });
    const png = await stage.screenshot({ type: 'png', animations: 'disabled' });
    const webp = await page.evaluate(async pngSource => {
      const image = new Image();
      image.src = pngSource;
      await image.decode();
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const drawing = canvas.getContext('2d');
      if (!drawing) throw new Error('Canvas is unavailable for preview encoding.');
      drawing.drawImage(image, 0, 0);
      return canvas.toDataURL('image/webp', 0.86);
    }, `data:image/png;base64,${png.toString('base64')}`);
    const prefix = 'data:image/webp;base64,';
    if (!webp.startsWith(prefix)) throw new Error('The browser could not encode WebP.');
    const bytes = Buffer.from(webp.slice(prefix.length), 'base64');
    await writeFile(resolve(outputDirectory, outputName), bytes);
    captured.add(outputName);
    console.log(`${outputName}: ${bytes.length} bytes`);
  }
  console.log(`Captured ${captured.size} local project compositions at 800px wide.`);
} finally {
  await browser.close();
}
