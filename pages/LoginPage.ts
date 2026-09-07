import type { Locator } from "@playwright/test";
import { BasePage } from "./component/BasePage";
import { logger } from "../utils/logging/logger";
import { decodeString } from "../utils/JWT"
import { fill } from "../utils/helpers/fill";
import { clickAndWaitUrl } from "../utils/helpers/clickAndWaitUrl";
import type { StrictObject } from "../utils/data/strictData";

export class LoginPage extends BasePage {
  private get path() {
    return {
      login: this.getURL("login"),
      logged: this.getURL("logged"),
    } as const;
  }

  private get locator() {
    return {
      user: this.page.getByRole("textbox", { name: "username" }),
      password: this.page.getByRole("textbox", { name: "password" }),
      login: this.page.getByRole("button", { name: "login" }),
    } as const satisfies Record<string, Locator>;
  }

  async login(data:StrictObject) {
    try {
      await this.gotoPage(this.path.login);
      await this.savePageLocators("export", "login-page.csv");
      await fill(this.locator.user, decodeString(data.pick("login").get("user",String)));
      await fill(this.locator.password, decodeString(data.pick("login").get("password",String)));
      await this.takeScreenshot();
      await clickAndWaitUrl(this.locator.login, this.path.logged);
    }
    catch (err) {
      logger.error(`Login Failed`);
      throw err;
    }
  }
}
