import { Locator, expect } from "@playwright/test";

export async function clickAndWaitModal(
    modal: Locator,
    trigger: Locator
) {
    await Promise.all([
        expect(modal).toBeVisible(),
        trigger.click(),
    ]);
}