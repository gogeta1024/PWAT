import { test } from "../../fixtures/test-fixture";
import { DragAndDropPage } from "../../pages/DragAndDropPage";
import { InputPage } from "../../pages/InputPage";
import { DynamicPage } from "../../pages/DynamicPage";
import { JavaScriptAlertPage } from "../../pages/JavaScriptAlertPage";
import { FramePage } from "../../pages/FramePage";


for (let i = 1; i <= 1; i++) {
  test(`caseID:test03,scenarioID:M${i},@dev,@pc`, async ({ ctx }) => {
    const data = ctx.data("data3.json");
    await ctx.step("DragAndDrop", async () => {
      const dragAndDropPage = new DragAndDropPage(ctx);
      await dragAndDropPage.dragAndDrop();
    });

    await ctx.step("Input number", async () => {
      const inputPage = new InputPage(ctx);
      await inputPage.inputNumber();
    });

    await ctx.step("Dynamic Loading", async () => {
      const dynamicPage = new DynamicPage(ctx);
      await dynamicPage.dynamic1(data);
      await dynamicPage.dynamic2(data);
    });

    await ctx.step("JavaScript Alert", async () => {
      const jsaPage = new JavaScriptAlertPage(ctx);
      await jsaPage.jsaSelect();
    });

    await ctx.step("Frame", async () => {
      const framePage = new FramePage(ctx);
      await framePage.frameTest();
    });

  });
}
