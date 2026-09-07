import type { Locator, Download } from "@playwright/test";
import fs from "fs";
import path from "path";
import { waitForReady } from "./waitForReady";

export const downloadFile = async (locator: Locator, saveAsPath?: string): Promise<Download> => {
  const t = await waitForReady(locator);
  const [d] = await Promise.all([t.page().waitForEvent("download"), t.click()]);

  if (saveAsPath) {
    const isDir = fs.existsSync(saveAsPath) && fs.statSync(saveAsPath).isDirectory();
    const p = isDir || saveAsPath.endsWith(path.sep)
      ? path.join(saveAsPath, d.suggestedFilename())
      : saveAsPath;

    fs.mkdirSync(path.dirname(p), { recursive: true });
    await d.saveAs(p);
  }
  return d;
};