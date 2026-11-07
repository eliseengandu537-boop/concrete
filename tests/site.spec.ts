import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("desktop renders the glass showcases, images load, and layout stays within viewport", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Bold ideas.Solid impact.");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".hero-showcase .showcase-item")).toHaveCount(3);
  await expect(page.locator(".showcase-growth")).toContainText("From first click to enquiry.");
  await expect.poll(() => page.locator(".hero-showcase img").evaluateAll(images => images.length > 0 && images.every(img => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0))).toBeTruthy();
  await expect(page.locator(".project-card")).toHaveCount(8);
  for (const preview of await page.locator(".work-grid .project-image img:visible").all()) {
    await preview.scrollIntoViewIfNeeded();
    await expect.poll(() => preview.evaluate(img => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0)).toBeTruthy();
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "test-results/desktop-hero.png" });
  await page.screenshot({ path: "test-results/desktop.png", fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  expect(errors).toEqual([]);
});

test("hero enquiries and preview links work while background motion pauses offscreen", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.addStyleTag({ content: "html { scroll-behavior: auto !important; }" });
  const landscape = page.locator(".hero-landscape");
  const lightfield = page.locator(".horizon-lightfield");
  await expect(landscape).toHaveAttribute("data-active", "true");
  await expect(lightfield).toHaveCSS("animation-name", "horizon-breathe");
  await expect(lightfield).toHaveCSS("animation-play-state", "running");

  await page.locator(".hero-orb").click();
  await expect(page.getByRole("dialog", { name: /Make it/ })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: /Make it/ })).not.toBeVisible();
  await expect(page.locator(".hero-orb")).toBeFocused();

  const previews = [
    { name: "Explore our selected website projects", target: "#work" },
    { name: "Explore our enquiry and business growth services", target: "#growth-services" },
    { name: "Explore our web design and development services", target: "#services" },
  ];
  for (const preview of previews) {
    await page.getByRole("link", { name: preview.name, exact: true }).click();
    await expect.poll(() => new URL(page.url()).hash).toBe(preview.target);
    await expect(page.locator(preview.target)).toBeInViewport();
  }
  await expect(landscape).toHaveAttribute("data-active", "false");
  await expect(lightfield).toHaveCSS("animation-play-state", "paused");
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(landscape).toHaveAttribute("data-active", "true");
  await expect(lightfield).toHaveCSS("animation-play-state", "running");
});

test("portfolio filtering and keyboard-accessible project details", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Business", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(6);
  await page.getByRole("button", { name: "View DG Property project" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog").getByRole("heading", { name: "DG Property", exact: true })).toBeVisible();
  await expect(page.getByRole("dialog").getByRole("link", { name: /Visit website/ })).toHaveAttribute("href", "https://dg-property.co.za/");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.getByRole("button", { name: "View DG Property project" })).toBeFocused();
  await page.getByRole("button", { name: "Community & creative", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(2);
  await expect(page.getByRole("button", { name: "View Lens Photo Studio project" })).toBeVisible();
  await page.getByRole("button", { name: /All work/ }).click();
  await expect(page.locator(".work-count")).toHaveText("08 PROJECTS");
  const destinations = await page.locator(".project-site-link").evaluateAll(links => links.map(link => ({ href: link.getAttribute("href"), target: link.getAttribute("target"), rel: link.getAttribute("rel") })));
  expect(destinations.map(link => link.href)).toEqual([
    "https://dg-property.co.za/", "https://micrologistics.co.za/", "https://newlifeunited.co.za/", "https://thunderbrothers.co.za/",
    "https://www.datawarehouse.ctcpm.cd/", "https://lensphotostudio.co.za/", "https://www.dcbspares.co.za/", "https://www.fedpump.com/",
  ]);
  expect(destinations.every(link => link.target === "_blank" && link.rel?.includes("noopener"))).toBeTruthy();
  await expect(page.locator("#work")).not.toContainText(/Routed|Rage Festival|10-Four|NutriFlow/);
});

test("services expose their content and form validates required fields", async ({ page }) => {
  await page.goto("/");
  const website = page.locator("#service-trigger-0");
  await expect(website).toContainText("Website, included");
  if (await website.getAttribute("aria-expanded") === "false") await website.click();
  await expect(website).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#service-panel-0")).toBeVisible();
  await page.locator(".button-nav").click();
  await expect(page.getByRole("dialog", { name: /Make it/ })).toBeVisible();
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.getByLabel("Your name")).toBeFocused();
  await page.getByLabel("Your name").fill("Alex Example");
  await page.getByLabel("Email address").fill("alex@example.com");
  await page.getByLabel("A little about your project").fill("A new brand website for our studio.");
  await page.getByLabel("Website build", { exact: true }).check();
  await expect(page.getByLabel("Website build", { exact: true })).toBeChecked();
  const accessibility = await new AxeBuilder({ page }).include("dialog[open]").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(accessibility.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(page.locator(".button-nav")).toBeFocused();
});

test("journal and privacy routes work", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Good websites start with better questions/ }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Good websites start with better questions.");
  await expect(page).toHaveTitle(/Good websites.*Concrete Agency/);
  await page.getByRole("link", { name: "Privacy", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Your privacy matters.");
  await expect(page.locator(".article-body").getByRole("link", { name: "eliseeweb@gmail.com" })).toHaveAttribute("href", "mailto:eliseeweb@gmail.com");
});

test("mobile navigation, small-screen layout, and reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const menuButton = page.getByRole("button", { name: "Open menu" });
  await menuButton.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menuButton).toBeFocused();
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("Enter");
  const servicesLink = page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: /What we do/ });
  await servicesLink.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/#services/);
  expect(await page.locator(".discipline-track").evaluate(element => getComputedStyle(element).animationName)).toBe("none");
  await expect(page.locator(".horizon-lightfield")).toHaveCSS("animation-name", "none");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "test-results/mobile-hero.png" });
  await page.screenshot({ path: "test-results/mobile.png", fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await page.setViewportSize({ width: 320, height: 700 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
});

test("home meets automated WCAG AA checks", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const accessibility = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(accessibility.violations).toEqual([]);
});
