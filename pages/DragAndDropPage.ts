import { BasePage } from "./component/BasePage";
import { Locator } from "@playwright/test";
import { dragAndDrop } from "../utils/helpers/dragAndDrop";

export class DragAndDropPage extends BasePage {
  private get locator() {
      return {
        source: this.page.locator('#column-a'),
        target: this.page.locator('#column-b'),
      } as const satisfies Record<string, Locator>;
    }

  async dragAndDrop() {
    await this.openPage("dragAndDrop");
    await dragAndDrop(this.locator.source,this.locator.target);    
  }
}
