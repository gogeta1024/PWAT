import { BasePage } from "./component/BasePage";
import { downloadFile } from "../utils/helpers/downloadFile";
import type { StrictObject } from "../utils/data/strictData";
import path from "path"

export class DownloadPage extends BasePage {
  async downloadByLink(data: StrictObject) {
    const linkName = this.page.getByRole('link', { name: data.get("link", String) });
    const saveAsPath = path.resolve(process.cwd(), "test-download", data.get("saveAs", String));
    return await downloadFile(linkName, saveAsPath)
  }

  async download(data:StrictObject) {
    await this.openPage("download");
    return await this.downloadByLink(data)
  }
}