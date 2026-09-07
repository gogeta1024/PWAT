import type { Locator } from "@playwright/test";
import path from "path";
import { BasePage } from "./component/BasePage";
import { click } from "../utils/helpers/click";
import { uploadFile } from "../utils/helpers/uploadFile";
import type { StrictObject } from "../utils/data/strictData";

export class UploadPage extends BasePage {
  private readonly locator = {
    fileInput: this.page.locator("#file-upload"),
    uploadBtn: this.page.locator("#file-submit"),
    dropZone: this.page.locator('input.dz-hidden-input'),
    uploadedFileName: this.page.locator("#uploaded-files"),
  } as const satisfies Record<string, Locator>;

  async goto() {
    await this.openPage("upload");
  }

  /** Upload 1 file và return tên file hiển thị */
  async upload(filePath: string) {
    await this.goto();
    await uploadFile(this.locator.fileInput,filePath)
    await click(this.locator.uploadBtn);
    await this.takeScreenshot();
  }

  uploadedFileName() {
    return this.locator.uploadedFileName
  }

  /** Helper: upload file nằm trong thư mục test-data */
  async uploadFromTestData(fileName: StrictObject) {
    const filePath = path.resolve(process.cwd(), "test-data", fileName.get("link",String));
    return this.upload(filePath);
  }

  /** (Optional) Playwright có thể set files lên drop zone */
  async dragDropFile(filePath: string) {
    await this.goto();
    await this.locator.dropZone.setInputFiles(filePath);
    await this.takeScreenshot();
  }
}