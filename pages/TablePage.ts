import { BasePage } from "./component/BasePage";
import * as E from "../utils/helpers/expects"
import { verifySortByClick } from "../utils/helpers/verifySortByClick";
import type { StrictObject } from "../utils/data/strictData";

export class TablePage extends BasePage {
  async table(data: StrictObject) {
    const table1 = this.page.locator('#table1');
    const table1Header = table1.locator('.header');
    const table2 = this.page.locator('#table2');

    await this.openPage("table");

    await E.expectAllContainText(table1Header, ['Last Name', 'First Name', 'Email', 'Due', 'Web Site', 'Action']);
    await E.expectCount(table1.locator('tbody tr'), 4);

    await verifySortByClick(table1, "Last Name", "asc");
    await verifySortByClick(table1, "Last Name", "desc");
    await verifySortByClick(table1, 'Due', 'asc');
    await verifySortByClick(table2, "Email", "asc");

    const email = data.pick("value").get("Email", String);
    const row = table2.locator(
      `xpath=.//tbody//tr[.//td[normalize-space(.)="${email}"]]`
    );
    await E.expectVisible(row);
    await E.expectContainsText(row, data.pick("value").get("Last Name", String));
    await E.expectContainsText(row, data.pick("value").get("First Name", String));
    await E.expectContainsText(row, data.pick("value").get("Due", String));
    await E.expectContainsText(row, data.pick("value").get("Web Site", String));
    await this.takeScreenshot();
  }
}
