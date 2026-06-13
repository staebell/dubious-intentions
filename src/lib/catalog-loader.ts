import { promises as fs } from "node:fs";
import path from "node:path";
import { parseCsv, splitCsvList } from "./csv";

export type LoadedTheme = {
  key: string;
  name: string;
  intro: string;
  order: number;
};

export type LoadedDrink = {
  id: string;
  name: string;
  description: string;
  themes: string[];
  ingredients: string;
  availability: string[];
  sort: number;
  imageFile?: string;
  variations?: { name: string; change: string }[];
  isShot?: boolean;
  themeSortOverrides?: Record<string, number>;
};

export type LoadedQuote = {
  text: string;
  source: string;
  location: string;
  order: number;
};

export type LoadedCatalog = {
  themes: LoadedTheme[];
  drinks: LoadedDrink[];
  quotes: LoadedQuote[];
};

async function readCsv(fileName: string) {
  const fullPath = path.join(process.cwd(), "content", fileName);
  const raw = await fs.readFile(fullPath, "utf8");
  return parseCsv(raw);
}

function parseThemeSortOverrides(value: string): Record<string, number> {
  const result: Record<string, number> = {};
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

export async function loadCatalogFromCsv(): Promise<LoadedCatalog> {
  const [drinkRows, themeRows, variationRows, quoteRows] = await Promise.all([
    readCsv("drinks-template.csv"),
    readCsv("themes-template.csv"),
    readCsv("variations-template.csv"),
    readCsv("quotes-template.csv"),
  ]);

  const variationMap = new Map<string, { name: string; change: string }[]>();
  for (const row of variationRows) {
    const parent = row.parent_drink_id?.trim();
    if (!parent) continue;
    const variation = {
      name: row.variation_name?.trim() || "Variation",
      change: row.change_text?.trim() || "",
    };
    const list = variationMap.get(parent) ?? [];
    list.push(variation);
    variationMap.set(parent, list);
  }

  const themes: LoadedTheme[] = themeRows
    .filter((row) => (row.active || "").toLowerCase() !== "no")
    .map((row) => ({
      key: row.theme_key?.trim(),
      name: row.theme_name?.trim(),
      intro: row.theme_intro?.trim(),
      order: Number.parseInt(row.theme_order || "0", 10) || 0,
    }))
    .filter((theme) => theme.key && theme.name)
    .sort((a, b) => a.order - b.order);

  const drinks: LoadedDrink[] = drinkRows
    .filter((row) => (row.is_launch_ready || "").toLowerCase() !== "no")
    .map((row) => {
      const id = row.drink_id?.trim();
      return {
        id,
        name: row.display_name?.trim() || row.base_recipe_name?.trim() || id,
        description: row.short_description?.trim() || "House drink.",
        themes: splitCsvList(row.theme_keys),
        ingredients: row.ingredients_text?.trim() || "",
        availability: splitCsvList(row.availability_dependencies),
        sort: Number.parseInt(row.sort_order || "0", 10) || 0,
        imageFile: row.image_file?.trim() || undefined,
        variations: variationMap.get(id),
        isShot: (row.is_shot || "").toLowerCase() === "yes",
        themeSortOverrides: parseThemeSortOverrides(row.theme_sort_overrides || ""),
      };
    })
    .filter((drink) => drink.id && drink.themes.length > 0);

  const quotes: LoadedQuote[] = quoteRows
    .filter((row) => (row.active || "").toLowerCase() !== "no")
    .map((row) => ({
      text: row.quote_text?.trim(),
      source: row.quote_source?.trim() || "House Quote",
      location: row.location?.trim() || "cover",
      order: Number.parseInt(row.sort_order || "0", 10) || 0,
    }))
    .filter((quote) => quote.text)
    .sort((a, b) => a.order - b.order);

  return { themes, drinks, quotes };
}
