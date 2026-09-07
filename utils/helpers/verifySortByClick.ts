import { expect, type Locator } from '@playwright/test';

type SortDir = 'asc' | 'desc';

function tryParseNumber(raw: string): number | null {
  const cleaned = raw.trim().replace(/\$/g, '').replace(/,/g, '');
  if (/^-?\d+(\.\d+)?$/.test(cleaned)) return Number(cleaned);
  return null;
}

function compareAuto(a: string, b: string, dir: SortDir) {
  const na = tryParseNumber(a);
  const nb = tryParseNumber(b);

  let cmp: number;
  if (na !== null && nb !== null) {
    cmp = na - nb; // numeric
  } else {
    cmp = a.trim().localeCompare(b.trim(), undefined, { sensitivity: 'base' }); // text
  }

  return dir === 'asc' ? cmp : -cmp;
}

export async function verifySortByClick(table: Locator, headerName: string, dir: SortDir) {
  // 1) Locate the header to sort
  const header = table.getByRole('columnheader', { name: headerName });

  // 2) Resolve the column index (0-based) before clicking the header
  const idx0 = await header.evaluate((th) => {
    const row = th.parentElement; // thead tr
    if (!row) return -1;
    return Array.from(row.children).indexOf(th);
  });

  expect(idx0, `Cannot resolve index for header "${headerName}"`).toBeGreaterThan(-1);
  const colIndex1Based = idx0 + 1;

  // 3) Capture the current column values before sorting
  const getValues = () => table.locator(`tbody tr td:nth-child(${colIndex1Based})`).allTextContents();
  const beforeClick = (await getValues())
    .map(t => t.trim());

  // 4) Click the header and wait for the table to finish sorting
  await header.click();

  // 5) Compare the sorted values with the expected order
  const expected = [...beforeClick].sort((a, b) => compareAuto(a, b, dir));
  await expect.poll(
    async () => (await getValues()).map(t => t.trim()),
    { timeout: 5000, message: `Column "${headerName}" is not sorted ${dir}` }
  ).toEqual(expected);
}