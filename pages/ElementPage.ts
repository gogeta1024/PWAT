import type { Locator } from "@playwright/test";
import { BasePage } from "./component/BasePage";
import { click } from "../utils/helpers/click";

export class ElementPage extends BasePage {
  private get locator() {
    return {
      add: this.page.getByRole("button", { name: "Add Element" }),
      remove: this.page.getByRole("button", { name: "Delete" }).first(),
    } as const satisfies Record<string, Locator>;
  }

  async clickElement(addCount = 10, removeCount = 9) {
    await this.openPage("element");

    for (let i = 0; i < addCount; i++) await click(this.locator.add);
    for (let i = 0; i < removeCount; i++) await click(this.locator.remove);

    await this.takeScreenshot();
  }
}