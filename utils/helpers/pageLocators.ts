import fs from "fs";
import path from "path";
import type { Page } from "@playwright/test";

export type PageLocatorRow = {
    index: number;
    tag: string;
    id: string;
    role: string;
    name: string;
    ariaLabel: string;
    text: string;
    classes: string;
    selector: string;
};

export async function capturePageLocators(
    page: Page,
    saveDir = "test-data",
    fileName = "page-locators.csv"
): Promise<PageLocatorRow[]> {
    const rows = await page.evaluate<PageLocatorRow[]>(() => {
        const normalizeText = (value: string | null | undefined) =>
            (value ?? "").replace(/\s+/g, " ").trim().slice(0, 120);

        const sanitizeSelectorPart = (value: string) => value.replace(/"/g, '\\"');

        const buildSelector = (element: Element) => {
            const tag = (element.tagName || "").toLowerCase();
            if (!tag) return "";

            const parts: string[] = [tag];

            const id = (element as HTMLElement).id?.trim();
            if (id) parts.push(`#${sanitizeSelectorPart(id)}`);

            const role = element.getAttribute("role")?.trim();
            if (role) parts.push(`[role="${sanitizeSelectorPart(role)}"]`);

            const name = element.getAttribute("name")?.trim();
            if (name) parts.push(`[name="${sanitizeSelectorPart(name)}"]`);

            const ariaLabel = element.getAttribute("aria-label")?.trim();
            if (ariaLabel) parts.push(`[aria-label="${sanitizeSelectorPart(ariaLabel)}"]`);

            const classes = Array.from((element as HTMLElement).classList ?? []).slice(0, 5);
            if (classes.length) {
                parts.push(
                    `.${classes
                        .map((cls) => cls.replace(/[^a-zA-Z0-9_-]/g, "_"))
                        .join(".")}`
                );
            }

            return parts.join("");
        };

        const elements = Array.from(document.querySelectorAll("*"));
        const items: PageLocatorRow[] = [];

        for (const element of elements) {
            const tag = (element.tagName || "").toLowerCase();
            if (!tag || ["html", "body", "script", "style", "meta", "link", "svg", "path"].includes(tag)) {
                continue;
            }

            const id = (element as HTMLElement).id?.trim() ?? "";
            const role = element.getAttribute("role") ?? "";
            const name = element.getAttribute("name") ?? "";
            const ariaLabel = element.getAttribute("aria-label") ?? "";
            const classes = Array.from((element as HTMLElement).classList ?? []).join(" ");
            const text = normalizeText(element.textContent);
            const selector = buildSelector(element);

            items.push({
                index: items.length + 1,
                tag,
                id,
                role,
                name,
                ariaLabel,
                text,
                classes,
                selector,
            });
        }

        return items;
    });

    const outputFile = path.resolve(process.cwd(), saveDir, fileName);
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });

    const headers = [
        "index",
        "tag",
        "id",
        "role",
        "name",
        "aria-label",
        "text",
        "classes",
        "selector",
    ];

    const csvRows = [
        headers.join(","),
        ...rows.map((row) => {
            const values = [
                row.index,
                row.tag,
                row.id,
                row.role,
                row.name,
                row.ariaLabel,
                row.text,
                row.classes,
                row.selector,
            ].map((value) => `"${String(value).replace(/"/g, '""')}"`);
            return values.join(",");
        }),
    ];

    fs.writeFileSync(outputFile, csvRows.join("\n"), "utf-8");

    return rows;
}
