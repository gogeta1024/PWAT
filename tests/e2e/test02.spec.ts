import { test, expect } from "../../fixtures/test-fixture";
import { CheckboxPage } from "../../pages/CheckboxPage";
import { ContextMenuPage } from "../../pages/ContextMenuPage";
import { DropdownPage } from "../../pages/DropdownPage";
import { resolveURL } from "../../utils/env/resolveURL"

for (let i = 1; i <= 1; i++) {
  test(`caseID:test02,scenarioID:M${i},@dev,@pc`, async ({ ctx, browser }) => {
    const data = ctx.data("data2.json");

    await ctx.step("Dropdown", async () => {
      const dropdownPage = new DropdownPage(ctx);
      await dropdownPage.dropdownSelect(data);
      //await dropdownPage.dropdownSelect("Option 2", "label");
    });

    await ctx.step("Checkbox", async () => {
      const checkboxPage = new CheckboxPage(ctx);
      await checkboxPage.checkSelect(data)
    });

    await ctx.step("ContextMenu", async () => {
      const contextPage = new ContextMenuPage(ctx);
      await contextPage.contextSelect();
    });

    await ctx.step("Digest Auth", async () => {
      const context = await browser.newContext({
        baseURL: ctx.baseURL,
        httpCredentials: {
          username: data.get("username", String),
          password: data.get("password", String),
        },
      });

      try {
        const page = await context.newPage();
        // test logic
        const digestUrl = resolveURL(ctx.envName, "digest");
        await page.goto(digestUrl);
        await expect(page.locator("h3")).toHaveText("Digest Auth");
      } finally {
        await context.close();
      }
    });
  });
}
