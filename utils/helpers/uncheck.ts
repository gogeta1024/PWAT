import { Locator } from "@playwright/test";
import { waitForReady } from "./waitForReady";

export async function uncheck(
  locator: Locator
): Promise<void> {

  const target = await waitForReady(locator);

  if (await target.isChecked()) {
    await target.uncheck();
  }
}