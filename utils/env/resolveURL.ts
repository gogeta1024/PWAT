import { URLS } from "../../constants/url"; 

export type EnvName = "dev" | "qa";

export function resolveURL(env: EnvName, key: string): string {
  const envConfig = URLS[env];
  if (!envConfig) throw new Error(`URL config for env "${env}" not found!`);

  const value = (envConfig as any)[key];
  if (!value) throw new Error(`URL key "${key}" for env "${env}" not found!`);

  return value;
}