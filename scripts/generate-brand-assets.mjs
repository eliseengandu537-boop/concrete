import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from '@playwright/test';

// Rasterize the existing code-based brand artwork for social crawlers and app icons.
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const regular = (await readFile(resolve('public/fonts/cormorant-garamond-latin.woff2'))).toString('base64');
  const italic = (await readFile(resolve('public/fonts/cormorant-garamond-latin-italic.woff2'))).toString('base64');
  const artwork = (await readFile(resolve('public/social-card.svg'), 'utf8')).replaceAll('Georgia,serif', 'ConcreteEditorial,Georgia,serif');
  await page.setContent(`<style>@font-face{font-family:ConcreteEditorial;src:url(data:font/woff2;base64,${regular}) format('woff2');font-weight:400}@font-face{font-family:ConcreteEditorial;src:url(data:font/woff2;base64,${italic}) format('woff2');font-weight:400;font-style:italic}html,body{margin:0;padding:0}svg{display:block}</style>${artwork}`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: 'public/social-card.png' });
  const mark = await readFile(resolve('public/favicon.svg'), 'utf8');
  for (const [size, file] of [[512, 'logo.png'], [180, 'apple-touch-icon.png']]) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(`<style>html,body{margin:0;padding:0}svg{display:block;width:100vw;height:100vh}</style>${mark}`);
    await page.screenshot({ path: `public/${file}`, omitBackground: true });
  }
  console.log('Generated social-card.png (1200×630), logo.png (512×512), apple-touch-icon.png (180×180).');
} finally { await browser.close(); }
