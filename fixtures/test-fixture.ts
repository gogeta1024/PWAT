import { test as base, devices, type BrowserContext, type Page } from "@playwright/test";
import { loadEnv } from "../utils/env/loadEnv";
import { loadData } from "../utils/data/loadData";
import { setLoggerPrefix, clearLoggerPrefix } from "../utils/logging/logger";
import type { TestCtx } from "../utils/types/test-ctx";
import { state } from "../utils/test/state";
import { strictData } from "../utils/data/strictData";

const INVALID_FS_CHARS = /[:\\/*?"<>|]/g;

const getShortName = (title: string) => {
  const m = title.match(/caseID:([^,]+),\s*scenarioID:([^,@]+)/);
  if (m) return `${m[1]}_${m[2]}`.trim();
  return title.replace(INVALID_FS_CHARS, "_");
};

type EnvName = "dev" | "qa";

const normalizeEnv = (v?: string): EnvName | undefined => {
  const s = (v ?? "").toLowerCase().trim();
  if (s === "dev" || s === "qa") return s;
  return undefined;
};

const getEnv = (title: string): EnvName => {
  if (title.includes("@qa")) return "qa";
  if (title.includes("@dev")) return "dev";
  return normalizeEnv(process.env.ENV_NAME) ?? "dev";
};

export const test = base.extend<{ context: BrowserContext; page: Page; ctx: TestCtx }>({
  context: async ({ browser }, use, testInfo) => {
    const isPC = testInfo.title.includes("@pc");

    const envName = getEnv(testInfo.title);
    const { BASE_URL: baseURL } = loadEnv(envName);

    const context = await browser.newContext({
      ...(isPC ? devices["Desktop Chrome"] : devices["iPhone 14"]),
      baseURL,
    });

    try {
      await use(context);
    } finally {
      await context.close();
    }
  },

  page: async ({ context }, use) => {
    const page = await context.newPage();
    try {
      await use(page);
    } finally {
      if (!page.isClosed()) await page.close();
    }
  },

  ctx: async ({ page }, use, testInfo) => {
    const shortTestName = getShortName(testInfo.title);
    state.shortTestName = shortTestName;

    const updateLog = (step?: string) =>
      setLoggerPrefix(
        `[W${testInfo.workerIndex}] [${shortTestName}]${step ? ` -> [${step}]` : ""}`
      );

    updateLog();

    try {
      await use({
        page,
        envName: getEnv(testInfo.title),
          baseURL: loadEnv(getEnv(testInfo.title)).BASE_URL,
        shortTestName,
        data: (f, d = "test-data") => strictData(loadData(testInfo.title, f, d), f),
        step: async (name, action) => {
          state.currentStepName = name;
          updateLog(name);
          try {
            await test.step(name, async () => {
              await action({ shortTestName, stepName: name });
            }, { box: true });
          }
          catch (error) { throw error }
          finally {
            state.currentStepName = "Outside_Step";
            updateLog();
          }
        },
      });
    } finally {
      // đảm bảo dọn prefix trong mọi trường hợp
      clearLoggerPrefix();
    }
  },
});

test.beforeEach(async ({ }, testInfo) => {
  setLoggerPrefix(`[W${testInfo.workerIndex}] [${getShortName(testInfo.title)}]`);
});

test.afterEach(async () => {
  clearLoggerPrefix();
});

export { expect } from "@playwright/test";
