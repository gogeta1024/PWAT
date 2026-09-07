import { Locator, Page } from "@playwright/test";
import { waitForReady } from "./waitForReady";

const TIMEOUT = 10000;

export async function clickAndWaitUrl(
    locator: Locator,
    expected:
        | string
        | RegExp
        | ((url: URL) => boolean)
): Promise<Page> {

    const target = await waitForReady(locator);
    const page = target.page();

    await Promise.all([
        page.waitForURL(expected, {
            timeout: TIMEOUT,
            waitUntil: "domcontentloaded",
        }),
        target.click(),
    ]);

    return page;
}