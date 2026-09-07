import { Locator} from "@playwright/test";
import { waitForReady } from "./waitForReady";

const POST_CLICK_DELAY = 150;

type ClickOptions = {
  button?: "left" | "right" | "middle"
  delay?: number;
};

export async function click(locator: Locator, options: ClickOptions = {}) {
  const target = await waitForReady(locator);

  const { button = "left", delay = POST_CLICK_DELAY } = options;

  await target.click({ button });

  await target.page().waitForTimeout(delay);
}