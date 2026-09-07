import { test, expect } from "../../fixtures/test-fixture";
import { LoginPage } from "../../pages/LoginPage";
import { ElementPage } from "../../pages/ElementPage";
import { UploadPage } from "../../pages/UploadPage";
import { DownloadPage } from "../../pages/DownloadPage";
import { logger } from "../../utils/logging/logger";
import path from "path";
import os from "os";
import { HoverPage } from "../../pages/HoverPage";

for (let i = 1; i <= 1; i++) {
  test(`caseID:test01, scenarioID:M${i},@dev,@pc`, async ({ ctx }) => {
    const data = ctx.data("data1.json")

    await ctx.step("Login", async () => {
      const loginPage = new LoginPage(ctx);
      await loginPage.login(data);
      logger.info(`Login Successful`);
    });

    await ctx.step("Add/Remove Elements", async () => {
      const elementPage = new ElementPage(ctx);
      await elementPage.clickElement();
    });

    await ctx.step("Upload File", async () => {
      const uploadPage = new UploadPage(ctx);
      await uploadPage.uploadFromTestData(data);
      expect(uploadPage.uploadedFileName()).toContainText("20260805test.txt");

      //const filePath = path.join(os.homedir(), "Pictures", "Screenshots", "sample.png");
      const filePath = path.resolve(process.cwd(), "test-data", "sample.png");
      await uploadPage.dragDropFile(filePath)
    });

    await ctx.step("Download File", async () => {
      const downloadPage = new DownloadPage(ctx);
      const download = await downloadPage.download(data);
      expect(download.suggestedFilename()).toBe("20260805test.txt");
    });

    await ctx.step("Hover", async () => {
      const hoverPage = new HoverPage(ctx);
      await hoverPage.hoverTest();

    });
  });
}
