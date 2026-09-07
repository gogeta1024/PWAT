import { Locator } from "@playwright/test";
import { waitForReady } from "./waitForReady";

export async function fill(
  locator: Locator,
  value: string
): Promise<void> {
  const target = await waitForReady(locator);

  await target.clear();
  await target.fill(value);
}