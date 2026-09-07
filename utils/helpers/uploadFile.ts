import { Locator } from "@playwright/test";
import { waitForReady } from "./waitForReady";

export async function uploadFile(
  locator: Locator,
  file: string | string[]
): Promise<void> {

  const target = await waitForReady(locator);

  await target.setInputFiles(file);
}