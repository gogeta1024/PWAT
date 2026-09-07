import type { Page } from "@playwright/test";
import type { TestCtx } from "../../utils/types/test-ctx";
import { expect } from "@playwright/test";
import { logger } from "../../utils/logging/logger";
import { ScreenCapture } from "../../utils/test/screenshot";
import { capturePageLocators } from "../../utils/helpers/pageLocators";
import { URLS } from "../../constants/url";
import { resolveURL } from "../../utils/env/resolveURL";

export type PageKey = keyof (typeof URLS)[string] & string;

export class BasePage {
  protected page: Page;
  protected envName: TestCtx["envName"];
  protected baseURL: string;
  protected sc: ScreenCapture;

  constructor(protected ctx: TestCtx) {
    this.page = ctx.page;
    this.envName = ctx.envName;
    this.baseURL = ctx.baseURL;
    this.sc = new ScreenCapture(this.page);
  }

  async takeScreenshot() {
    await this.sc.takeScreenshot();
  }

  async savePageLocators(saveDir = "test-data", fileName = "page-locators.csv") {
    const rows = await capturePageLocators(this.page, saveDir, fileName);
    logger.info(`Saved ${rows.length} page locators to ${saveDir}/${fileName}`);
    return rows;
  }

  async verifyPageTitle(expectedTitle: string) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async gotoPage(path: string) {
    await this.page.goto(path, { waitUntil: "domcontentloaded" });
    await this.page.waitForLoadState("load");
  }

  protected async openPage(key: PageKey) {
    await this.gotoPage(this.getURL(key));
  }

  protected getURL(key: PageKey): string {
    const env = this.ctx.envName;
    const url = resolveURL(env, key);
    logger.info(`>>> used url of env: ${env}, key: ${key}`);
    return url;
  }
}