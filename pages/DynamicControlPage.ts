import { Locator } from "@playwright/test";
import type { StrictObject } from "../utils/data/strictData";
import { BasePage } from "./component/BasePage";
import * as E from "../utils/helpers/expects"
import { click } from "../utils/helpers/click";
import { fill } from "../utils/helpers/fill";

export class DynamicControlPage extends BasePage {
  private get locator() {
    return {
      checkboxButton: this.page.locator('#checkbox-example button').nth(0),
      loading1: this.page.locator('#checkbox-example').locator('#loading'),
      message: this.page.locator('#message'),
      checkbox: this.page.locator('#checkbox'),

      input: this.page.locator('#input-example input').nth(0),
      inputButton: this.page.locator('#input-example button').nth(0),
      loading2: this.page.locator('#input-example').locator('#loading'),
    } as const satisfies Record<string, Locator>;
  }

  async removeAdd() {
    await click(this.locator.checkboxButton);
    await E.expectHidden(this.locator.loading1);
    await E.expectText(this.locator.checkboxButton, "Add")
    await E.expectContainsText(this.locator.message, "gone");

    await click(this.locator.checkboxButton);
    await E.expectText(this.locator.checkboxButton, "Remove")
    await E.expectContainsText(this.locator.message, "back");
  }

  async enableDisable() {
    await this.page.reload();
    await E.expectDisabled(this.locator.input);
    await click(this.locator.inputButton);
    await E.expectHidden(this.locator.loading2);
    await E.expectText(this.locator.inputButton, "Disable")
    await E.expectContainsText(this.locator.message, "enabled");
    await E.expectEnabled(this.locator.input);
    await fill(this.locator.input,"hello");

    await click(this.locator.inputButton);
    await E.expectContainsText(this.locator.message, "disabled");

  }


  async dynamicControl() {
    await this.openPage("dynamicControl");
    await this.removeAdd();
    await this.enableDisable();
  }



}