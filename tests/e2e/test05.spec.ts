import { test } from "../../fixtures/test-fixture";
import { GeolocationPage } from "../../pages/GeolocationPage";
import { MenuPage } from "../../pages/MenuPage";
import { ShadowPage } from "../../pages/ShadowPage";

for (let i = 1; i <= 1; i++) {
  test(`caseID:test05,scenarioID:M${i},@pc`, async ({ ctx, context }) => {
    await ctx.step("Shadow Dom Page", async () => {
      const shadowPage = new ShadowPage(ctx);
      await shadowPage.shadowTest();
    });

    await ctx.step("Allow Geolocation", async () => {
      // grant + mock location trên context fixture
      await context.grantPermissions(["geolocation"]);
      await context.setGeolocation({ latitude: 10.7769, longitude: 106.7009 });

      const geo = new GeolocationPage(ctx); // dùng ctx.page fixture
      await geo.allowTest();
    });

    await ctx.step("Deny Geolocation", async () => {
      // clear để trở về trạng thái deny (không cấp quyền)
      await context.clearPermissions();

      const geo = new GeolocationPage(ctx);
      await geo.denyTest();
    });

    await ctx.step("Menu Page", async () => {
      const menuPage = new MenuPage(ctx);
      await menuPage.menuSelect();
    });
  });
}
