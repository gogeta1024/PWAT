import { BasePage } from "./component/BasePage";
import { click } from "../utils/helpers/click";
import { hover } from "../utils/helpers/hover";
import { Pattern, Category } from "../constants/locator";
import type { StrictObject } from "../utils/data/strictData";

export class CategoryPage extends BasePage {
  // async selectCategory(name: Category | RegExp) {
  //   await hover(this.page.getByRole('tab', { name }))
  // }
  // async selectPattern(name: Pattern | RegExp) {
  //   await click(this.page.getByRole('link', { name }))
  // }

  // async openCategory(categoryName: Category, patternName: Pattern) {
  //   await this.gotoPage(this.baseURL);
  //   await this.selectCategory(categoryName);
  //   await this.selectPattern(patternName);
  //   await this.takeScreenshot();
  // }
  
  async selectCategory(data: StrictObject) {
    await this.page.goto(this.baseURL, { waitUntil: "domcontentloaded" });
    await this.page.waitForLoadState("load");
    const category = data.get("category", String);
    const patternKey = data.get("patternKey", String);
    const patternLabel = data.pick("pattern").get(patternKey, String);
    await click(this.page.getByRole('tab', { name: category }));
    await click(this.page.getByRole('link', { name: patternLabel  }));
    await this.takeScreenshot();
  }
}
