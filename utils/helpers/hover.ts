import { Locator } from "@playwright/test";
import { waitForReady } from "./waitForReady";

export async function hover(
  locator: Locator
): Promise<void> {

  const target = await waitForReady(locator);

  await target.hover();
}