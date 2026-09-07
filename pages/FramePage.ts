import { click } from "../utils/helpers/click";
import { expectText } from "../utils/helpers/expects";
import { BasePage } from "./component/BasePage";

export class FramePage extends BasePage {
  private getFrameOrThrow(name: string) {
    const fr = this.page.frame({ name });
    if (!fr) throw new Error(`Frame "${name}" not found`);
    return fr;
  }

  async frameTest() {
    await this.openPage("frame");
    await click(this.page.getByRole("link", { name: "Nested Frames" }));

    await expectText(this.getFrameOrThrow("frame-left").locator("body"), "LEFT");
    await expectText(this.getFrameOrThrow("frame-middle").locator("#content"), "MIDDLE");
    await expectText(this.getFrameOrThrow("frame-right").locator("body"), "RIGHT");
    await expectText(this.getFrameOrThrow("frame-bottom").locator("body"), "BOTTOM");
  }
}