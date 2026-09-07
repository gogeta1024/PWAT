import { BasePage } from "./component/BasePage";
import { check } from "../utils/helpers/check"
import { uncheck } from "../utils/helpers/uncheck";
import type { StrictObject } from "../utils/data/strictData";

export class CheckboxPage extends BasePage {
  checkboxLocator(index: number) {
    return this.page.locator('#checkboxes input[type="checkbox"]').nth(index)
  }

  async checkSelect(data: StrictObject) {
    await this.openPage("checkbox");
    await check(this.checkboxLocator(data.pick("checkbox").get("checkbox1", Number)));
    await uncheck(this.checkboxLocator(data.pick("checkbox").get("checkbox2", Number)));
    await this.takeScreenshot();
  }
}

