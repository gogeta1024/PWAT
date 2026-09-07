import {
    APIResponse,
    Locator,
    Response,
} from "@playwright/test";
import { waitForReady } from "./waitForReady";

const TIMEOUT = 10000;

export async function clickAndWaitApi(
    locator: Locator,
    url: string | RegExp
): Promise<Response> {

    const target = await waitForReady(locator);

    const page = target.page();

    const [response] = await Promise.all([
        page.waitForResponse(
            r =>
                typeof url === "string"
                    ? r.url().includes(url)
                    : url.test(r.url()),
            {
                timeout: TIMEOUT,
            }
        ),
        target.click(),
    ]);

    return response;
}