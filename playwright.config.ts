import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 45000,
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: process.env.PREVIEW_URL || "http://127.0.0.1:3001",
    channel: "chrome",
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
    screenshot: "only-on-failure",
    launchOptions: { args: ["--disable-features=ExternalProtocolDialog"] },
  },
});
