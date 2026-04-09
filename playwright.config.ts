import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 120000,
  expect: { timeout: 15000 },
  fullyParallel: false,
  retries: 0,
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
    screenshot: "only-on-failure",
    navigationTimeout: 30000,
  },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
  ],
});
