import { click } from "../utils/helpers/click";
import { expectText } from "../utils/helpers/expects";
import { expect } from "@playwright/test";
import { BasePage } from "./component/BasePage";

export class FramePage extends BasePage {
  private async getFrameOrThrow(name: string) {
    await expect.poll(
      () => this.page.frames().some((frame) => frame.name() === name),
      { timeout: 10_000, message: `Frame "${name}" was not attached` }
    ).toBe(true);

    const fr = this.page.frame({ name });
    if (!fr) throw new Error(`Frame "${name}" not found`);
    return fr;
  }

  async frameTest() {
    await this.openPage("frame");
    await click(this.page.getByRole("link", { name: "Nested Frames" }));

    await expectText((await this.getFrameOrThrow("frame-left")).locator("body"), "LEFT");
    await expectText((await this.getFrameOrThrow("frame-middle")).locator("#content"), "MIDDLE");
    await expectText((await this.getFrameOrThrow("frame-right")).locator("body"), "RIGHT");
    await expectText((await this.getFrameOrThrow("frame-bottom")).locator("body"), "BOTTOM");
  }
}