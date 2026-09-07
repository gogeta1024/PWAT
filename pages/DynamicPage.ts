import { click } from "../utils/helpers/click";
import type { StrictObject } from "../utils/data/strictData";
import { BasePage } from "./component/BasePage";
import { expectText } from "../utils/helpers/expects"

export class DynamicPage extends BasePage {
  async selectLink(link: string) {
    return this.page.locator(`a[href="${link}"]`);
  }

  async dynamic1(data: StrictObject) {
    await this.openPage("dynamic");
    await click(await this.selectLink(data.get("link1", String)));
    await click(this.page.getByRole('button', { name: "Start" }));
    await expectText(this.page.locator('#finish'), "Hello World!");
  }

  async dynamic2(data: StrictObject) {
    await this.openPage("dynamic");
    await click(await this.selectLink(data.get("link2", String)));
    await click(this.page.getByRole('button', { name: "Start" }));
    await expectText(this.page.locator('#finish'), "Hello World!");
  }

}