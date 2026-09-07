import { click } from "../utils/helpers/click";
import { BasePage } from "./component/BasePage";
import { expect } from "@playwright/test"
import { expectText } from "../utils/helpers/expects";


export class JavaScriptAlertPage extends BasePage {
  private get resultLocator() { return this.page.locator("#result"); }

  async clickAlert() {
    this.page.once("dialog", async (d) => {
      expect(d.type()).toBe("alert");
      expect(d.message()).toContain("I am a JS Alert");
      await d.accept();
    });
    await click(this.page.getByRole('button', { name: "Click for JS Alert" }));
    await expectText(this.resultLocator, "You successfully clicked an alert");
  }

  async clickConfirm() {
    this.page.once("dialog", async (d) => {
      expect(d.type()).toBe("confirm");
      expect(d.message()).toContain("I am a JS Confirm");
      await d.dismiss();
    });
    await click(this.page.getByRole('button', { name: "Click for JS Confirm" }));
    await expectText(this.resultLocator, "You clicked: Cancel");
  }

  async clickPrompt() {
    this.page.once("dialog", async (d) => {
      expect(d.type()).toBe("prompt");
      await d.accept("hello");
    });
    await click(this.page.getByRole('button', { name: "Click for JS Prompt" }));
    await expectText(this.resultLocator, "You entered: hello");
  }

  async jsaSelect() {
    await this.openPage("jsa");
    await this.clickAlert();
    await this.clickConfirm();
    await this.clickPrompt();
  }
}
