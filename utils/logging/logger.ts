let currentPrefix: string | null = null;

export function setLoggerPrefix(prefix: string) {
  currentPrefix = prefix;
}

export function clearLoggerPrefix() {
  currentPrefix = null;
}

function getPrefix() {
  return currentPrefix ?? "[GLOBAL]";
}

export const logger = {
  info: (msg: string) => console.log(`${getPrefix()} ${msg}`),
  warn: (msg: string) => console.warn(`${getPrefix()} ${msg}`),
  error: (msg: string) => console.error(`${getPrefix()} ${msg}`),
  debug: (msg: string) => console.debug(`${getPrefix()} ${msg}`),
};
