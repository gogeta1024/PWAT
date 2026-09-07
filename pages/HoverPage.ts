import { BasePage } from "./component/BasePage";
import * as E from "../utils/helpers/expects";
import { hover } from "../utils/helpers/hover";

export class HoverPage extends BasePage {
  async hoverTest() {
    await this.openPage("hover");
    const figures = this.page.locator(".figure");
    await E.expectCount(figures, 3);

    // reset hover state
    await this.page.mouse.move(0, 0);

    // 1) default: captions hidden
    for (let i = 0; i < 3; i++) {
      await E.expectHidden(figures.nth(i).locator(".figcaption"));
    }

    //2) hover each figure -> caption visible + đúng user
    for (let i = 0; i < 3; i++) {
      const figure = figures.nth(i);
      const caption = figure.locator(".figcaption");

      await hover(figure)
      await E.expectVisible(caption);
      await E.expectText(caption.locator("h5"), `name: user${i + 1}`);
      await E.expectVisible(caption.getByRole("link", { name: "View profile" }));

      // 3) move away -> caption hidden again
      await this.page.mouse.move(0, 0);
      await E.expectHidden(caption);
    }

    // 4) click profile của user2 (ví dụ)
    const user2 = figures.nth(1);
    await user2.hover();
    await user2.locator(".figcaption").getByRole("link", { name: "View profile" }).click();
    await E.expectURL(this.page, /\/users\/2$/);
  }
}
