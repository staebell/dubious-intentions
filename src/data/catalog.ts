export type ThemeKey =
  | "known-offenders"
  | "tequila-sunday"
  | "the-usual-suspects"
  | "adult-swim"
  | "cool-runnings";

export type AvailabilityKey =
  | "mint"
  | "egg_white"
  | "jalapeno"
  | "serrano"
  | "champagne";

export type DrinkVariation = {
  id: string;
  name: string;
  changeText: string;
  ingredientsText?: string;
};

export type Drink = {
  id: string;
  displayName: string;
  baseRecipeName?: string;
  description: string;
  themes: ThemeKey[];
  imageStyle: string;
  ingredientsText: string;
  recipeNotes?: string;
  availabilityDependencies: AvailabilityKey[];
  isFeatured?: boolean;
  sortOrder: number;
  variations?: DrinkVariation[];
};

export type Theme = {
  key: ThemeKey;
  name: string;
  intro: string;
  quote?: string;
  palette: {
    accent: string;
    border: string;
    glow: string;
    chip: string;
  };
  style: string;
};

export type Quote = {
  id: string;
  text: string;
  source: string;
  location: "cover" | "global" | ThemeKey;
};
