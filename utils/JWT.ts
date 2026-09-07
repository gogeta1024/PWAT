export type PayloadLite = Record<string, unknown>;

function base64UrlDecode(input: string): string {
  let b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4;
  if (pad) b64 += "=".repeat(4 - pad);
  return Buffer.from(b64, "base64").toString("utf8");
}

export function decodeString(encoded: unknown): string {
  if (encoded === null || encoded === undefined) {
    throw new Error("decodeString: encoded is null/undefined");
  }
  if (typeof encoded === "object") {
    throw new Error("decodeString: expected primitive (string/number/boolean)");
  }
  return base64UrlDecode(String(encoded));
}