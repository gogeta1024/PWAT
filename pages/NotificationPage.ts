import { BasePage } from "./component/BasePage";
import * as E from "../utils/helpers/expects"
import { click } from "../utils/helpers/click";
import { expect } from "@playwright/test";

export class NotificationPage extends BasePage {
  private get locator() {
    return {
      link: this.page.getByRole('link', { name: "Click here" }),
      flash: this.page.locator('#flash'),
      close: this.page.locator('.close')
    }
  }
  async notificationTest() {
    await this.openPage("notification");

    for (let i = 1; i <= 5; i++) {
      await click(this.locator.link);

      await E.expectVisible(this.locator.flash);
      const raw = await this.locator.flash.textContent();
      if (raw === null) { throw new Error('Flash text is null') };

      // normalize: bỏ xuống dòng, bỏ nút "×", trim
      const text = raw.replace('×', '').replace(/\s+/g, ' ').trim();

      const allowed = [
        'Action successful',
        'Action unsuccesful, please try again',
      ];

      expect(allowed.some(msg => text.includes(msg))).toBeTruthy();
    }

    await click(this.locator.close);
    await E.expectHidden(this.locator.flash);

  }


}

