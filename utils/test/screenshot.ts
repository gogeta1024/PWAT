import fs from "fs";
import path from "path";
import type { Page } from "@playwright/test";
import { logger } from "../logging/logger";
import { state } from "./state";

function toSafeName(input: string) {
  return (input || "Unknown")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\\/\\:*?\"<>|]/g, "_")
    .replace(/[ \t\r\n]+/g, " ")
    .trim();
}

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export class ScreenCapture {
  private static stepCount = new Map<string, number>();

  constructor(readonly page: Page) {}

  async takeScreenshot() {
    const pages = this.page.context().pages();

    for (let i = 0; i < pages.length; i++) {
      const currentPage = pages[i];
      try {
        if (currentPage.isClosed()) continue;
        if (currentPage.url().includes("about:blank")) continue;
        await currentPage.waitForLoadState("domcontentloaded");
        try {
          await currentPage.waitForLoadState("networkidle", { timeout: 2000 });
        } catch {
          // ignore network idle timeout for screenshot
        }
        await sleep(500);

        const testName = toSafeName(state.shortTestName);
        const stepName = toSafeName(state.currentStepName);
        const countKey = `${testName}::${stepName}`;

        if (i === 0) {
          const count = (ScreenCapture.stepCount.get(countKey) || 0) + 1;
          ScreenCapture.stepCount.set(countKey, count);
        }
        const currentCount = ScreenCapture.stepCount.get(countKey) || 1;

        const dir = path.join(process.cwd(), "test-results", "screenshot", `${testName}`);
        fs.mkdirSync(dir, { recursive: true });

        const filePath = path.join(dir, `${stepName}_screenshot${currentCount}_tab${i + 1}.png`);
        await currentPage.screenshot({ path: filePath, fullPage: true });

        logger.info("saved screenshot");
      } catch {
        logger.warn("can not screenshot");
      }
    }
  }
}
