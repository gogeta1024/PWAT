import { defineConfig } from "@playwright/test";
import * as fs from "fs";

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],
  outputDir: "test-results/",
  timeout: 50_000,

  use: {
    baseURL: process.env.BASE_URL, // env dev/qa set từ command
    trace: "on-first-retry",
    screenshot: "on",
    headless: process.env.PW_HEADLESS === "true" ? true : false,
    launchOptions: process.env.CI ? undefined : { slowMo: 300 },
  },

  projects: [
    {
      name: "globalSetup",
      testDir: "./auth",
      testMatch: "global-setup.ts",
    },
    {
      name: "demo",
      testDir: "./tests",
      use: {
        storageState: fs.existsSync(`playwright/.auth/${process.env.ENV_NAME}.json`)
          ? `playwright/.auth/${process.env.ENV_NAME}.json`
          : { cookies: [], origins: [] },
      },

      // dependencies: ["globalSetup"], // nếu bạn muốn bắt buộc chạy setup trước
    },
  ],
});