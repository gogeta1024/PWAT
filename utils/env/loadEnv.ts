import dotenv from "dotenv";
import fs from "fs";
import path from "path";

export type EnvConfig = {
  ENV_NAME: "dev" | "qa";
  BASE_URL: string;
};

export function loadEnv(env: "dev" | "qa"): EnvConfig {
  const envFile = path.resolve(process.cwd(), `env/.env.${env}`);
  if (!fs.existsSync(envFile)) {
    throw new Error(`Environment file not found: ${envFile}`);
  }

  const values = dotenv.parse(fs.readFileSync(envFile, "utf-8"));

  if (!values.BASE_URL) {
    throw new Error(`Missing BASE_URL in ${envFile}`);
  }

  return {
    ENV_NAME: env,
    BASE_URL: values.BASE_URL,
  };
}
