import { Locator } from "@playwright/test";
import { waitForReady } from "./waitForReady";

export async function dragAndDrop(
  source: Locator,
  target: Locator
): Promise<void> {

  const src = await waitForReady(source);
  const dst = await waitForReady(target);

  await src.dragTo(dst);
}