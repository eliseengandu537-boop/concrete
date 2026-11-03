import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("PDF services and package enquiries remain usable on small screens", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#services");
  await expect(page.getByRole("heading", { name: "What we do.", exact: true })).toBeVisible();
  await expect(page.locator("#services .service-item")).toHaveCount(10);
  const outreach = page.locator("#service-trigger-2");
  await outreach.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#service-panel-2")).toBeVisible();
  await expect(page.locator("#service-panel-0")).not.toBeVisible();
  await expect(page.locator("#service-panel-2")).toContainText("a no or no response ends outreach");
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".service-system").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "test-results/services-system-mobile.png" });
  await page.getByRole("button", { name: "Discuss Full AI Integration", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: /Make it/ });
  await expect(dialog.getByRole("combobox", { name: "Package", exact: true })).toHaveValue("Full AI Integration");
  await expect(dialog.getByLabel("Sales dashboard", { exact: true })).toBeChecked();
  await dialog.getByLabel("Your name").fill("Casey Client");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Discuss Full AI Integration", exact: true })).toBeFocused();
  await page.getByRole("button", { name: "Discuss Website Build", exact: true }).click();
  await expect(dialog.getByRole("combobox", { name: "Package", exact: true })).toHaveValue("Website Build");
  await expect(dialog.getByLabel("Website build", { exact: true })).toBeChecked();
  await expect(dialog.getByLabel("Your name")).toHaveValue("Casey Client");
  await page.keyboard.press("Escape");
  const accessibility = await new AxeBuilder({ page }).include("#services").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(accessibility.violations).toEqual([]);
});
