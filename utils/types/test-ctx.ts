import type { Page } from "@playwright/test";
import type { StrictObject } from "../data/strictData";
export type TestCtx = {
  page: Page;
  envName: "dev" | "qa";
  baseURL: string;
  shortTestName: string;
  data: (fileName: string, baseDir?: string) => StrictObject;
  step: (
    title: string,
    action: (stepInfo: { shortTestName: string; stepName: string }) => Promise<void>
  ) => Promise<void>;
};