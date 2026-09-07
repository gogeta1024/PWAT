import { BasePage } from "./component/BasePage";
import * as E from "../utils/helpers/expects"
import { click } from "../utils/helpers/click";
import type { TestCtx } from "../utils/types/test-ctx";

export class GeolocationPage extends BasePage {
    private get locator() {
        return {
            demo: this.page.locator('#demo'),
            geolocation: this.page.getByRole('button', { name: 'Where am I?' }),
            lat: this.page.locator('#lat-value'),
            long: this.page.locator('#long-value'),
            mapLink: this.page.locator('#map-link'),
            link: this.page.getByRole('link',{name:"See it on Google"})
        }
    }

    async allowTest() {
        await this.openPage("geolocation");
        await click(this.locator.geolocation);
        await E.expectText(this.locator.lat, '10.7769');
        await E.expectText(this.locator.long, '106.7009');
        await E.expectVisible(this.locator.mapLink);
        await click(this.locator.link);
        await this.takeScreenshot();
    }

    async denyTest() {
        await this.openPage("geolocation");
        await click(this.locator.geolocation);
        await E.expectCount(this.locator.lat,0);
        await E.expectCount(this.locator.long,0);
        await E.expectCount(this.locator.mapLink,0);
        await E.expectText(this.locator.demo,'Click the button to get your current latitude and longitude'
);
    }


}