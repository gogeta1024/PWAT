import { BasePage } from "./component/BasePage";
import * as E from "../utils/helpers/expects"

export class ShadowPage extends BasePage {
  private get paragraphs() {
    return this.page.locator("my-paragraph");
  }

  async shadowTest() {
    await this.openPage("shadow");
    await E.expectVisible(this.page.getByRole("heading", { name: "Simple template" }));
    await E.expectCount(this.paragraphs, 2);

    await E.expectContainsText(this.paragraphs.nth(0), "Let's have some different text!");
    await E.expectContainsText(this.paragraphs.nth(1), "Let's have some different text!");
    await E.expectContainsText(this.paragraphs.nth(1), "In a list!");
  }
}
