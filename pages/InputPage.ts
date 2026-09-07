import { fill } from "../utils/helpers/fill";
import { BasePage } from "./component/BasePage";
import { expect } from "@playwright/test";


export class InputPage extends BasePage {
  private get inputLocator() { return this.page.getByRole('spinbutton'); }

  async inputNumber() {
    await this.openPage("input");
    await fill(this.inputLocator, "10");
    
    await this.inputLocator.press("ArrowUp");
    await expect(this.inputLocator).toHaveValue("11");

    await this.inputLocator.press("ArrowDown");
    await expect(this.inputLocator).toHaveValue("10");
  }
}