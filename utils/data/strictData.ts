type Kind = NumberConstructor | StringConstructor | BooleanConstructor | ArrayConstructor | ObjectConstructor | "null";

type KindToType<T extends Kind> =
  T extends NumberConstructor ? number :
  T extends StringConstructor ? string :
  T extends BooleanConstructor ? boolean :
  T extends ArrayConstructor ? unknown[] :
  T extends ObjectConstructor ? Record<string, unknown> :
  T extends "null" ? null : never;

export type StrictObject = {
  get<T extends Kind>(k: string, t: T): KindToType<T>;
  pick(k: string): StrictObject;
};

const isObj = (v: unknown): v is Record<string, unknown> =>
  v !== null && typeof v === "object" && !Array.isArray(v);

const toNumber = (v: unknown) => {
  const n = typeof v === "number" ? v : Number(typeof v === "string" ? v.trim() : (v as any));
  return Number.isFinite(n) ? n : null;
};

const toBoolean = (v: unknown) => {
  if (v === true || v === false) return v;
  if (v === 1) return true;
  if (v === 0) return false;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (s === "true" || s === "1") return true;
    if (s === "false" || s === "0") return false;
  }
  return null;
};

export const strictData = (raw: unknown, label = "test-data"): StrictObject => {
  if (!isObj(raw)) throw new Error(`${label}: JSON root must be an object`);
  const o = raw;

  const fail = (path: string, msg: string): never => { throw new Error(`${path}: ${msg}`); };

  const get = <T extends Kind>(k: string, ty: T): KindToType<T> => {
    if (!(k in o)) throw new Error(`${label}: missing field "${k}"`);
    const v = o[k];
    const path = `${label}.${k}`;

    if (ty === "null") return (v === null ? null : fail(path, "not null")) as KindToType<T>;
    if (ty === Number) return ((toNumber(v) ?? fail(path, "not a number")) as any);
    if (ty === Boolean) return ((toBoolean(v) ?? fail(path, "not boolean")) as any);
    if (ty === String) return (typeof v === "string" ? v : fail(path, "not string")) as any;
    if (ty === Array) return (Array.isArray(v) ? v : fail(path, "not an array")) as any;
    return (isObj(v) ? v : fail(path, "not an object")) as any;
  };

  const pick = (k: string): StrictObject => strictData(get(k, Object), `${label}.${k}`);

  return { get, pick };
};
