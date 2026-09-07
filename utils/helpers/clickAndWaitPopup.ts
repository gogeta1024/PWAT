//chỉ dùng cho browser popup (tab hoặc window mới), không phải modal trong trang
import { Locator, Page } from "@playwright/test";
import { waitForReady } from "./waitForReady";

const TIMEOUT = 10_000;

export async function clickAndWaitPopup(
    locator: Locator
): Promise<Page> {

    const target = await waitForReady(locator);

    const context = target.page().context();

    const [popup] = await Promise.all([
        context.waitForEvent("page", {
            timeout: TIMEOUT,
        }),
        target.click(),
    ]);

    await popup.waitForLoadState("domcontentloaded");

    return popup;
}