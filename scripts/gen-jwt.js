function base64UrlEncode(input) {
  return Buffer.from(input, "utf8")
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

const value = process.argv[2] ?? "";
const payload = base64UrlEncode(value);

console.log(payload);

//lenh run:   node ./scripts/gen-jwt.js "tomsmith"