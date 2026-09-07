import fs from "fs";
import path from "path";

const cache = new Map<string, unknown>();

function pick(title: string, key: "caseID" | "scenarioID") {
  const re = new RegExp(String.raw`\b${key}\s*:\s*([^,\s]+)`, "i");
  const m = title.match(re);
  if (!m?.[1]) throw new Error(`Cannot find "${key}:..." in title: "${title}"`);
  return m[1].trim();
}

export function loadData<T>(title: string, fileName: string, baseDir = "test-data"): T {
  const caseId = pick(title, "caseID");
  const scenarioId = pick(title, "scenarioID");

  const fullPath = path.resolve(baseDir, caseId, scenarioId, fileName);

  if (cache.has(fullPath)) return cache.get(fullPath) as T;
  if (!fs.existsSync(fullPath)) throw new Error(`Test data not found: ${fullPath}`);

  const data = JSON.parse(fs.readFileSync(fullPath, "utf-8")) as T;
  cache.set(fullPath, data);
  return data;
}
