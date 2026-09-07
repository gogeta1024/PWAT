import { BasePage } from "./component/BasePage";
import * as E from "../utils/helpers/expects"
import { clickAndWaitPopup } from "../utils/helpers/clickAndWaitPopup";

export class WindowPage extends BasePage {
  private get windowLocator() { return this.page.getByRole('link', { name: "Click Here" }); }

  async openMultipleWindows() {
    await this.openPage("window");
    const tab1 = await clickAndWaitPopup(this.windowLocator);
    await E.expectURL(tab1, "windows/new");

    // const tab2 = await clickAndWaitPopup(this.windowLocator);
    // await E.expectVisible(tab2.getByRole('heading', { name: 'New Window' }));

    // const tab3 = await this.page.context().newPage();
    // await tab3.goto(`${this.windowPath}/new`);

    await tab1.close();
    await this.takeScreenshot();
  }
}
