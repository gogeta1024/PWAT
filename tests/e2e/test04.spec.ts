import { test } from "../../fixtures/test-fixture";
import { DynamicControlPage } from "../../pages/DynamicControlPage";
import { WindowPage } from "../../pages/WindowPage";
import { TablePage } from "../../pages/TablePage";
import { NotificationPage } from "../../pages/NotificationPage";
import { BrokenPage } from "../../pages/BrokenPage";

for (let i = 1; i <= 1; i++) {
  test(`caseID:test04,scenarioID:M${i},@pc`, async ({ ctx }) => {
    const data = ctx.data("data4.json");
    await ctx.step("Dynamic Control", async () => {
      const dynamicControlPage = new DynamicControlPage(ctx);
      await dynamicControlPage.dynamicControl();
    });

    await ctx.step("Multiple Page", async () => {
      const windowPage = new WindowPage(ctx);
      await windowPage.openMultipleWindows();
    });

    await ctx.step("Table Page", async () => {
      const tablePage = new TablePage(ctx);
      await tablePage.table(data);
    });

    await ctx.step("Notification Page", async () => {
      const notificationPage = new NotificationPage(ctx);
      await notificationPage.notificationTest();
    });

    await ctx.step("Broken Image Page", async () => {
      const brokenPage = new BrokenPage(ctx);
      await brokenPage.brokenTest();
    });
  });
}
