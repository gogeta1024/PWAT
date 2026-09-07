import { expect, Locator, Page } from "@playwright/test";

type Opts = { timeout?: number; message?: string };

/* =========================
 * Locator assertions
 * ========================= */

export const expectVisible = (l: Locator, o: Opts = {}) =>
  expect(l, o.message).toBeVisible({ timeout: o.timeout });

export const expectHidden = (l: Locator, o: Opts = {}) =>
  expect(l, o.message).toBeHidden({ timeout: o.timeout });

export const expectText = (l: Locator, text: string | RegExp, o: Opts = {}) =>
  expect(l, o.message).toHaveText(text, { timeout: o.timeout });

export const expectContainsText = (l: Locator, text: string | RegExp, o: Opts = {}) =>
  expect(l, o.message).toContainText(text, { timeout: o.timeout });

export const expectValue = (l: Locator, value: string | RegExp, o: Opts = {}) =>
  expect(l, o.message).toHaveValue(value, { timeout: o.timeout });

export const expectEnabled = (l: Locator, o: Opts = {}) =>
  expect(l, o.message).toBeEnabled({ timeout: o.timeout });

export const expectDisabled = (l: Locator, o: Opts = {}) =>
  expect(l, o.message).toBeDisabled({ timeout: o.timeout });

export const expectChecked = (l: Locator, o: Opts = {}) =>
  expect(l, o.message).toBeChecked({ timeout: o.timeout });

export const expectNotChecked = (l: Locator, o: Opts = {}) =>
  expect(l, o.message).not.toBeChecked({ timeout: o.timeout });

export const expectFocused = (l: Locator, o: Opts = {}) =>
  expect(l, o.message).toBeFocused({ timeout: o.timeout });

export const expectCount = (l: Locator, count: number, o: Opts = {}) =>
  expect(l, o.message).toHaveCount(count, { timeout: o.timeout });

export const expectAttribute = (
  l: Locator,
  name: string,
  value: string | RegExp,
  o: Opts = {}
) => expect(l, o.message).toHaveAttribute(name, value, { timeout: o.timeout });

export const expectId = (l: Locator, id: string | RegExp, o: Opts = {}) =>
  expect(l, o.message).toHaveId(id, { timeout: o.timeout });

export const expectClass = (l: Locator, cls: string | RegExp, o: Opts = {}) =>
  expect(l, o.message).toHaveClass(cls, { timeout: o.timeout });

export const expectCSS = (l: Locator, prop: string, value: string, o: Opts = {}) =>
  expect(l, o.message).toHaveCSS(prop, value, { timeout: o.timeout });

export const expectJSProperty = (l: Locator, prop: string, value: unknown, o: Opts = {}) =>
  expect(l, o.message).toHaveJSProperty(prop, value, { timeout: o.timeout });

export const expectValues = (l: Locator, values: (string | RegExp)[], o: Opts = {}) =>
  expect(l, o.message).toHaveValues(values, { timeout: o.timeout });

export const expectNotVisible = (l: Locator, o: Opts = {}) =>
  expect(l, o.message).not.toBeVisible({ timeout: o.timeout });

export const expectNotContainsText = (l: Locator, text: string | RegExp, o: Opts = {}) =>
  expect(l, o.message).not.toContainText(text, { timeout: o.timeout });

/**
 * List helpers (nhiều phần tử)
 * - toHaveText([...]) / toContainText([...]) sẽ match theo thứ tự phần tử
 */
export const expectAllText = (l: Locator, texts: (string | RegExp)[], o: Opts = {}) =>
  expect(l, o.message).toHaveText(texts, { timeout: o.timeout });

export const expectAllContainText = (l: Locator, texts: (string | RegExp)[], o: Opts = {}) =>
  expect(l, o.message).toContainText(texts, { timeout: o.timeout });

/* =========================
 * Page assertions
 * ========================= */

export const expectURL = (page: Page, url: string | RegExp, o: Opts = {}) =>
  expect(page, o.message).toHaveURL(url, { timeout: o.timeout });

export const expectTitle = (page: Page, title: string | RegExp, o: Opts = {}) =>
  expect(page, o.message).toHaveTitle(title, { timeout: o.timeout });