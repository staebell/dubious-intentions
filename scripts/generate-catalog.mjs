import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

function parseCsv(text) {
  const rows = [];
  let current = "";
  let row = [];
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(current.trim());
      current = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(current.trim());
      current = "";
      if (row.some((cell) => cell.length > 0)) {
        rows.push(row);
      }
      row = [];
      continue;
    }

    current += char;
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current.trim());
    if (row.some((cell) => cell.length > 0)) {
      rows.push(row);
    }
  }

  if (rows.length === 0) {
    return [];
  }

  const headers = rows[0];
  return rows.slice(1).map((cells) => {
    const record = {};
    headers.forEach((header, index) => {
      record[header] = cells[index] ?? "";
    });
    return record;
  });
}

function splitCsvList(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseThemeSortOverrides(value) {
  const result = {};
  const trimmed = (value || "").trim();
  if (!trimmed) return result;

  for (const pair of trimmed.split(";")) {
    const [keyRaw, orderRaw] = pair.split(":");
    const key = (keyRaw || "").trim();
    const order = Number.parseInt((orderRaw || "").trim(), 10);
    if (!key || Number.isNaN(order)) continue;
    result[key] = order;
  }

  return result;
}

async function readCsv(contentDirectory, fileName) {
  const fullPath = path.join(contentDirectory, fileName);
  const raw = await readFile(fullPath, "utf8");
  return parseCsv(raw);
}

async function main() {
  const root = process.cwd();
  const contentDirectory = path.join(root, "content");
  const outputDirectory = path.join(root, "src", "data");
  const outputFile = path.join(outputDirectory, "catalog.generated.ts");

  const [drinkRows, themeRows, variationRows, quoteRows] = await Promise.all([
    readCsv(contentDirectory, "drinks-template.csv"),
    readCsv(contentDirectory, "themes-template.csv"),
    readCsv(contentDirectory, "variations-template.csv"),
    readCsv(contentDirectory, "quotes-template.csv"),
  ]);

  const variationMap = new Map();
  for (const row of variationRows) {
    const parent = row.parent_drink_id?.trim();
    if (!parent) continue;
    const list = variationMap.get(parent) ?? [];
    list.push({
      name: row.variation_name?.trim() || "Variation",
      change: row.change_text?.trim() || "",
      sort: Number.parseInt(row.sort_order || "0", 10) || 0,
    });
    variationMap.set(parent, list);
  }

  const themes = themeRows
    .filter((row) => (row.active || "").toLowerCase() !== "no")
    .map((row) => ({
      key: row.theme_key?.trim(),
      name: row.theme_name?.trim(),
      intro: row.theme_intro?.trim(),
      order: Number.parseInt(row.theme_order || "0", 10) || 0,
    }))
    .filter((theme) => theme.key && theme.name)
    .sort((a, b) => a.order - b.order);

  const drinks = drinkRows
    .filter((row) => (row.is_launch_ready || "").toLowerCase() !== "no")
    .map((row) => {
      const id = row.drink_id?.trim();
      const variations =
        variationMap
          .get(id)
          ?.sort((a, b) => a.sort - b.sort)
          .map(({ sort, ...variation }) => variation) ?? [];

      return {
        id,
        name: row.display_name?.trim() || row.base_recipe_name?.trim() || id,
        description: row.short_description?.trim() || "House drink.",
        themes: splitCsvList(row.theme_keys || ""),
        ingredients: row.ingredients_text?.trim() || "",
        availability: splitCsvList(row.availability_dependencies || ""),
        sort: Number.parseInt(row.sort_order || "0", 10) || 0,
        imageFile: row.image_file?.trim() || undefined,
        variations: variations.length > 0 ? variations : undefined,
        isShot: (row.is_shot || "").toLowerCase() === "yes",
        themeSortOverrides: parseThemeSortOverrides(row.theme_sort_overrides || ""),
      };
    })
    .filter((drink) => drink.id && drink.themes.length > 0);

  const quotes = quoteRows
    .filter((row) => (row.active || "").toLowerCase() !== "no")
    .map((row) => ({
      text: row.quote_text?.trim(),
      source: row.quote_source?.trim() || "House Quote",
      location: row.location?.trim() || "cover",
      order: Number.parseInt(row.sort_order || "0", 10) || 0,
    }))
    .filter((quote) => quote.text)
    .sort((a, b) => a.order - b.order);

  const output = `export const generatedCatalog = ${JSON.stringify(
    { themes, drinks, quotes },
    null,
    2
  )} as const;\n`;

  await mkdir(outputDirectory, { recursive: true });
  await writeFile(outputFile, output, "utf8");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
