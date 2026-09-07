import { BasePage } from "./component/BasePage";
import { selectOption } from "../utils/helpers/selectOption";
import type { StrictObject } from "../utils/data/strictData";

export class DropdownPage extends BasePage {
  private get dropdownLocator() { return this.page.locator("select#dropdown"); }

  async dropdownSelect(option: StrictObject) {
    await this.openPage("dropdown");
    await selectOption(this.dropdownLocator, { value: option.pick("dropdown").get("value", String) });
    await selectOption(this.dropdownLocator, { label: option.pick("dropdown").get("label", String) });
  }
}
