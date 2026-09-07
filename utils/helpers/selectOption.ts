import { Locator } from "@playwright/test";
import { waitForReady } from "./waitForReady";

type OptionArg = string | { value?: string; label?: string; index?: number };

export async function selectOption(locator: Locator, option: OptionArg): Promise<void> {
  const target = await waitForReady(locator);

  const tag = await target.evaluate(el => el.tagName.toLowerCase());
  if (tag !== "select") throw new Error(`selectOption() only supports <select>, got <${tag}>`);

  const opts = await target.evaluate(sel =>
    Array.from((sel as HTMLSelectElement).options).map(o => ({
      value: o.value,
      label: (o.label || o.textContent || "").trim(),
      disabled: o.disabled,
    }))
  );

  const ok =
    typeof option === "string"
      ? opts.some(o => !o.disabled && o.value === option)
      : option.index != null
        ? !!opts[option.index] && !opts[option.index].disabled
        : option.value != null
          ? opts.some(o => !o.disabled && o.value === option.value)
          : opts.some(o => !o.disabled && o.label === (option.label ?? "").trim());

  if (!ok)
    throw new Error(
      `Option not found/disabled: ${JSON.stringify(option)}. Options: ${JSON.stringify(opts)}`
    );

  await target.selectOption(option);
}