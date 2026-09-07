import { test } from "../../fixtures/test-fixture";
import { CategoryPage } from "../../pages/CategoryPage";
import { logger } from "../../utils/logging/logger";

for (let i = 1; i <= 2; i++) {
  test(`caseID:uniqlo, scenarioID:M${i},@qa`, async ({ ctx }) => {
    const data = ctx.data("uniqlo.json");

    await ctx.step("Category", async () => {
      const categoryPage = new CategoryPage(ctx);
      await categoryPage.selectCategory(data);
      logger.info(`Select Category Successful`);
    })
  });
}
