import { BasePage } from "./component/BasePage";
import { expect } from "@playwright/test";

export class BrokenPage extends BasePage {
  async brokenTest() {
    await this.openPage("broken");

    const imgs = this.page.locator(".example img");

    // Đợi các img trong phạm vi .example complete
    await this.page.waitForFunction(async () => {
      const imgs = Array.from(document.querySelectorAll(".example img")) as HTMLImageElement[];
      return imgs.every(img => img.complete);
    });

    const status = await imgs.evaluateAll(elements =>
      elements.map(el => {
        const img = el as HTMLImageElement;
        return {
          src: img.currentSrc || img.src,
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          broken: img.complete && img.naturalWidth === 0 && img.naturalHeight === 0,
        };
      })
    );

    const broken = status.filter(s => s.broken);
    expect(broken).toHaveLength(2);
  }

}

