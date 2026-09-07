import { BasePage } from "./component/BasePage";
import { expect } from "@playwright/test";
import { click } from "../utils/helpers/click";

export class ContextMenuPage extends BasePage {
  private get contextLocator() { return this.page.locator("#hot-spot"); }

  async contextSelect() {
    await this.openPage("context");
    let msg = "";

    this.page.once("dialog", async (d) => {
      msg = d.message();
      await d.accept();
    });

    await click(this.contextLocator,{ button: "right" });

    expect(msg).toContain("You selected a context menu");
  }
}