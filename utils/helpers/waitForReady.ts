import { expect, Locator } from "@playwright/test";

const DEFAULT_TIMEOUT = 15_000;

export async function waitForReady(
    locator: Locator
): Promise<Locator> {
    //console.log(locator.page().url());
    //console.log(locator.page().isClosed());
    await expect(locator).toBeVisible({
        timeout: DEFAULT_TIMEOUT,
    });

    return locator;
}
