import { expect } from "@playwright/test";
import { downloadFile } from "../utils/helpers/downloadFile";
import { hover } from "../utils/helpers/hover";
import { BasePage } from "./component/BasePage";
import path from "path"
import { click } from "../utils/helpers/click";

export class MenuPage extends BasePage {
  locator(name: string) {
    return this.page.getByRole('link', { name, exact: true })
  }

  async menuSelect() {
    await this.openPage("menu");
    const saveAsPath = path.resolve(process.cwd(), "test-download");
    const cases = [
      { name: "PDF", ext: /\.pdf$/i },
      { name: "CSV", ext: /\.csv$/i },
      { name: "Excel", ext: /\.(xls|xlsx)$/i }]
    for (const c of cases) {
      await hover(this.locator("Enabled"));
      await click(this.locator("Downloads"));
      const download = await downloadFile(this.locator(c.name), saveAsPath);
      expect(download.suggestedFilename()).toContain("menu");
      expect(download.suggestedFilename()).toMatch(c.ext);
    }
  }
}

