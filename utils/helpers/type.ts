//gõ từng ký tự
import { Locator } from "@playwright/test";
import { waitForReady } from "./waitForReady";

export async function type(
  locator: Locator,
  text: string,
  delay = 50
): Promise<void> {

  const target = await waitForReady(locator);

  await target.clear();

  await target.pressSequentially(text, {
    delay,
  });
}