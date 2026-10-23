import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("desktop renders, images load, WebGL starts, and layout stays within viewport", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Bold ideas.Solid impact.");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".sculpture.is-rendered")).toBeVisible({ timeout: 20000 });
  await expect(page.locator(".project-card")).toHaveCount(4);
  await page.locator("#work").scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator(".project-image img").evaluateAll(images => images.every(img => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0))).toBeTruthy();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "test-results/desktop-hero.png" });
  await page.screenshot({ path: "test-results/desktop.png", fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  expect(errors).toEqual([]);
});

test("portfolio filtering and keyboard-accessible project details", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Business", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(2);
  await page.getByRole("button", { name: "View Routed project" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog").getByRole("heading", { name: "Routed", exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.getByRole("button", { name: "View Routed project" })).toBeFocused();
  await page.getByRole("button", { name: "Lifestyle", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(2);
  await expect(page.getByRole("button", { name: "View NutriFlow project" })).toBeVisible();
});

test("services expose their content and form validates required fields", async ({ page }) => {
  await page.goto("/");
  const branding = page.getByRole("button", { name: /01 Brand strategy & identity/ });
  await branding.click();
  await expect(branding).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#service-panel-0")).toBeVisible();
  await page.locator(".button-nav").click();
  await expect(page.getByRole("dialog", { name: /Make it/ })).toBeVisible();
  await page.getByRole("button", { name: "Prepare my enquiry" }).click();
  await expect(page.getByLabel("Your name")).toBeFocused();
  await page.getByLabel("Your name").fill("Alex Example");
  await page.getByLabel("Email address").fill("alex@example.com");
  await page.getByLabel("A little about your project").fill("A new brand website for our studio.");
  await page.getByLabel("Web design", { exact: true }).check();
  await expect(page.getByLabel("Web design", { exact: true })).toBeChecked();
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
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: /Services/ }).click();
  await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/#services/);
  expect(await page.locator(".discipline-track").evaluate(element => getComputedStyle(element).animationName)).toBe("none");
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
