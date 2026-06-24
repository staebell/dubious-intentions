"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { generatedCatalog } from "@/data/catalog.generated";

type ThemeKey =
  | "known-offenders"
  | "tequila-sunday"
  | "the-usual-suspects"
  | "adult-swim"
  | "cool-runnings"
  | string;

type AvailabilityKey =
  | "mint"
  | "egg_white"
  | "jalapeno"
  | "serrano"
  | "champagne";

type Drink = {
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

type Theme = {
  key: string;
  name: string;
  intro: string;
  order?: number;
};

type Quote = {
  text: string;
  source: string;
  location?: string;
  order?: number;
};

type InstallStep = {
  text: string;
  image?: string;
  alt?: string;
};

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const ADMIN_PASSWORD = "0519";
const SLOT_ITEM_HEIGHT = 88;
const SLOT_REPEATS = 180;
const SLOT_WINDOW_TOP = SLOT_ITEM_HEIGHT;
const SLOT_SPIN_DURATION_MS = 6400;
const SETTINGS_CACHE_KEY = "dubious-intentions-admin-state";

function randomIndex(length: number) {
  return Math.floor(Math.random() * length);
}

const fallbackQuotes: Quote[] = [
  {
    text: "So let's sink another drink, 'Cause it'll give me time to think",
    source: "Billy Idol",
    location: "cover",
  },
  {
    text: "I feel sorry for people who do not drink. When they wake up in the morning, that is as good as they are going to feel all day.",
    source: "Ernest Hemingway",
    location: "cover",
  },
];

const trackedIngredients = [
  { key: "mint", label: "Mint" },
  { key: "egg_white", label: "Egg White" },
  { key: "jalapeno", label: "Jalapeno" },
  { key: "serrano", label: "Serrano" },
  { key: "champagne", label: "Champagne" },
] as const;

const fallbackThemes: Theme[] = [
  {
    key: "known-offenders",
    name: "Known Offenders",
    intro: "The drinks with the longest rap sheet and the strongest case for a second round.",
  },
  {
    key: "tequila-sunday",
    name: "Tequila Sunday",
    intro: "Agave drinks with a backstory, a tan line, and no interest in behaving modestly.",
  },
  {
    key: "the-usual-suspects",
    name: "The Usual Suspects",
    intro: "Reliable regulars, frequently requested, and somehow never a bad idea in the moment.",
  },
  {
    key: "adult-swim",
    name: "Adult Swim",
    intro: "Poolside judgment may be impaired. Hydration remains more of a theory than a plan.",
  },
  {
    key: "cool-runnings",
    name: "Cool Runnings",
    intro: "Frozen format, warm reception. Slushies, milkshakes, and good decisions postponed.",
  },
];

const fallbackDrinks: Drink[] = [
  {
    id: "pisco-sour",
    name: "Pisco Sour",
    description: "Silky, citrusy, and a strong argument for making one more.",
    themes: ["known-offenders"],
    ingredients: "2 oz pisco | 1 oz lime | 0.75 oz simple | 1 egg white",
    availability: ["egg_white"],
    sort: 1,
  },
  {
    id: "velvet-verdict",
    name: "Velvet Verdict",
    description: "House signature with enough charm to become a repeat offense.",
    themes: ["known-offenders"],
    ingredients: "1.5 oz bourbon | 0.5 oz amaro | 0.75 oz lemon | 0.5 oz honey",
    availability: [],
    sort: 2,
  },
  {
    id: "saturday-witness",
    name: "Saturday Witness",
    description: "Tropical smoke, bright citrus, and suspiciously fast second rounds.",
    themes: ["known-offenders", "adult-swim"],
    ingredients: "1 oz rum | 1 oz mezcal | 0.75 oz lime | 0.75 oz pineapple",
    availability: [],
    sort: 3,
  },
  {
    id: "classic-margarita",
    name: "Classic Margarita",
    description: "The dependable cornerstone of Tequila Sunday.",
    themes: ["tequila-sunday", "the-usual-suspects"],
    ingredients: "2 oz tequila | 1 oz lime | 0.75 oz orange liqueur | 0.25 oz agave",
    availability: [],
    sort: 1,
  },
  {
    id: "smoked-paloma",
    name: "Smoked Paloma",
    description: "Grapefruit brightness with a mezcal edge that lingers.",
    themes: ["tequila-sunday"],
    ingredients: "1 oz tequila | 1 oz mezcal | grapefruit soda | 0.5 oz lime",
    availability: [],
    sort: 2,
  },
  {
    id: "agavero-sunset",
    name: "Agavero Sunset",
    description: "Trip-memory energy in a glass, fueled by Agavero and citrus.",
    themes: ["tequila-sunday"],
    ingredients: "1.5 oz tequila | 0.5 oz Agavero | 0.75 oz lime | 0.5 oz orange",
    availability: [],
    sort: 3,
    variations: [{ name: "Spicy lane", change: "Add 2 serrano slices to shake." }],
  },
  {
    id: "moscow-mule",
    name: "Moscow Mule",
    description: "Reliable, crisp, and always requested before the second game starts.",
    themes: ["the-usual-suspects"],
    ingredients: "2 oz vodka | 0.5 oz lime | top ginger beer",
    availability: [],
    sort: 1,
    variations: [{ name: "Kentucky lane", change: "Swap vodka for bourbon." }],
  },
  {
    id: "french-75",
    name: "French 75",
    description: "Bright, bubbly, and deceptively polished for how fast it disappears.",
    themes: ["the-usual-suspects"],
    ingredients: "1 oz gin | 0.5 oz lemon | 0.5 oz simple | top champagne",
    availability: ["champagne"],
    sort: 2,
  },
  {
    id: "aperol-spritz",
    name: "Aperol Spritz",
    description: "Low-stakes sun energy and universally accepted patio behavior.",
    themes: ["the-usual-suspects", "adult-swim"],
    ingredients: "3 oz prosecco | 2 oz Aperol | 1 oz soda",
    availability: [],
    sort: 3,
  },
  {
    id: "pina-colada",
    name: "Pina Colada",
    description: "Poolside nostalgia and blender confidence.",
    themes: ["adult-swim", "cool-runnings"],
    ingredients: "2 oz rum | 1.5 oz coconut cream | 2 oz pineapple | ice",
    availability: [],
    sort: 1,
  },
  {
    id: "summer-brew",
    name: "Summer Brew",
    description: "Beer-based refreshment that quietly takes over long afternoons.",
    themes: ["adult-swim"],
    ingredients: "Lager | lemonade concentrate | splash orange liqueur",
    availability: [],
    sort: 2,
  },
  {
    id: "strawberry-frose",
    name: "Strawberry Frose",
    description: "Slushy rose chaos with main-character pool energy.",
    themes: ["adult-swim", "cool-runnings"],
    ingredients: "Rose | frozen strawberries | lemon | simple",
    availability: [],
    sort: 3,
  },
  {
    id: "mint-lime-slush",
    name: "Mint Lime Slush",
    description: "Icy citrus reset button that can go NA or rum-ready.",
    themes: ["cool-runnings"],
    ingredients: "Mint | lime | simple | ice",
    availability: ["mint"],
    sort: 4,
  },
  {
    id: "jalapeno-ice-smash",
    name: "Jalapeno Ice Smash",
    description: "Cold, bright, and a little irresponsible in the best way.",
    themes: ["cool-runnings", "tequila-sunday"],
    ingredients: "Tequila | lime | jalapeno | agave | crushed ice",
    availability: ["jalapeno"],
    sort: 5,
  },
];

type Settings = {
  availability: Record<AvailabilityKey, boolean>;
  tonightMenu: {
    enabled: boolean;
    title: string;
    tagline: string;
    drinkIds: string[];
  };
};

const defaultSettings: Settings = {
  availability: {
    mint: true,
    egg_white: true,
    jalapeno: true,
    serrano: true,
    champagne: true,
  },
  tonightMenu: {
    enabled: false,
    title: "Tonight's Damage",
    tagline: "Handpicked and suspiciously good.",
    drinkIds: [],
  },
};

function hydrateThemes(): Theme[] {
  return generatedCatalog.themes.map((theme) => ({
    key: theme.key,
    name: theme.name,
    intro: theme.intro,
    order: theme.order,
  }));
}

function hydrateDrinks(): Drink[] {
  return generatedCatalog.drinks.map((drink) => ({
    id: drink.id,
    name: drink.name,
    description: drink.description,
    themes: [...drink.themes],
    ingredients: drink.ingredients,
    availability: [...drink.availability],
    sort: drink.sort,
    imageFile: drink.imageFile,
    variations: "variations" in drink && drink.variations
      ? drink.variations.map((variation) => ({
          name: variation.name,
          change: variation.change,
        }))
      : undefined,
    isShot: drink.isShot,
    themeSortOverrides: drink.themeSortOverrides
      ? { ...drink.themeSortOverrides }
      : undefined,
  }));
}

function hydrateQuotes(): Quote[] {
  return generatedCatalog.quotes.map((quote) => ({
    text: quote.text,
    source: quote.source,
    location: quote.location,
    order: quote.order,
  }));
}

function normalizeSettings(input: Partial<Settings> | null | undefined): Settings {
  return {
    availability: {
      mint: input?.availability?.mint ?? defaultSettings.availability.mint,
      egg_white: input?.availability?.egg_white ?? defaultSettings.availability.egg_white,
      jalapeno: input?.availability?.jalapeno ?? defaultSettings.availability.jalapeno,
      serrano: input?.availability?.serrano ?? defaultSettings.availability.serrano,
      champagne: input?.availability?.champagne ?? defaultSettings.availability.champagne,
    },
    tonightMenu: {
      enabled: input?.tonightMenu?.enabled ?? defaultSettings.tonightMenu.enabled,
      title: input?.tonightMenu?.title || defaultSettings.tonightMenu.title,
      tagline: input?.tonightMenu?.tagline || defaultSettings.tonightMenu.tagline,
      drinkIds: Array.isArray(input?.tonightMenu?.drinkIds) ? input.tonightMenu.drinkIds : [],
    },
  };
}

const FEATURED_THEME_KEYS = [
  "known-offenders",
  "tequila-sunday",
  "the-usual-suspects",
  "adult-swim",
  "cool-runnings",
  "off-the-beaten-path",
] as const;

const SPIRIT_THEME_OPTIONS = [
  { key: "spirit-rum", label: "Rum" },
  { key: "spirit-whiskey", label: "Whiskey" },
  { key: "spirit-gin", label: "Gin" },
  { key: "spirit-vodka", label: "Vodka" },
  { key: "spirit-smoke", label: "Smoked Cocktails" },
  { key: "spirit-martinis", label: "Martinis" },
  { key: "spirit-spritz", label: "Spritz" },
  { key: "spirit-liqueurs", label: "Unique Liqueurs" },
] as const;

function sortByName(items: Drink[]) {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}

export default function HomePage() {
  const [catalogThemes] = useState<Theme[]>(hydrateThemes);
  const [catalogDrinks] = useState<Drink[]>(hydrateDrinks);
  const [catalogQuotes] = useState<Quote[]>(hydrateQuotes);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [settingsHydrated, setSettingsHydrated] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [toast, setToast] = useState("");
  const [selectedDrinkId, setSelectedDrinkId] = useState<string | null>(null);
  const [selectedThemeKey, setSelectedThemeKey] = useState<ThemeKey | null>(null);
  const [showRecipe, setShowRecipe] = useState(false);
  const [drawerClosing, setDrawerClosing] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [filterText, setFilterText] = useState("");
  const quotePointerRef = useRef<{ x: number; y: number } | null>(null);
  const pointerStartRef = useRef<{ id: string; x: number; y: number; moved: boolean } | null>(
    null
  );
  const audioCtxRef = useRef<AudioContext | null>(null);
  const tickTimersRef = useRef<number[]>([]);
  const slotAudioIntervalRef = useRef<number | null>(null);
  const slotSpinTimerRef = useRef<number | null>(null);
  const slotOffsetRef = useRef(SLOT_WINDOW_TOP);
  const pendingSlotWinnerRef = useRef<{ drink: Drink; index: number } | null>(null);

  const coverQuotes = useMemo(() => {
    const filtered = catalogQuotes.filter((quote) => {
      const location = (quote.location || "").toLowerCase();
      return location === "cover" || location === "global" || location === "";
    });
    return filtered.length > 0 ? filtered : fallbackQuotes;
  }, [catalogQuotes]);

  useEffect(() => {
    let active = true;
    async function loadSharedSettings() {
      try {
        const cached = window.localStorage.getItem(SETTINGS_CACHE_KEY);
        if (cached && active) {
          setSettings(normalizeSettings(JSON.parse(cached) as Partial<Settings>));
        }
      } catch {
        // Ignore broken cached state
      }

      try {
        const response = await fetch("/api/admin-state", { cache: "no-store" });
        if (!response.ok) {
          if (active) setSettingsHydrated(true);
          return;
        }
        const data = (await response.json()) as Partial<Settings>;
        if (!active) return;
        setSettings(normalizeSettings(data));
      } catch {
        // Keep defaults if request fails
      } finally {
        if (active) setSettingsHydrated(true);
      }
    }
    loadSharedSettings();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(SETTINGS_CACHE_KEY, JSON.stringify(settings));
    } catch {
      // Ignore local cache failures
    }
  }, [settings]);

  useEffect(() => {
    if (!settingsHydrated) return;
    const id = window.setTimeout(async () => {
      try {
        await fetch("/api/admin-state", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
          body: JSON.stringify(settings),
        });
      } catch {
        // best-effort sync
      }
    }, 250);
    return () => window.clearTimeout(id);
  }, [settings, settingsHydrated]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setQuoteIndex((current) =>
        coverQuotes.length > 0 ? (current + 1) % coverQuotes.length : 0
      );
    }, 8000);
    return () => window.clearInterval(id);
  }, [coverQuotes.length]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    return () => {
      tickTimersRef.current.forEach((id) => window.clearTimeout(id));
      tickTimersRef.current = [];
      if (slotSpinTimerRef.current) {
        window.clearTimeout(slotSpinTimerRef.current);
      }
      if (slotAudioIntervalRef.current) {
        window.clearInterval(slotAudioIntervalRef.current);
      }
    };
  }, []);

  const selectedDrink = useMemo(
    () => catalogDrinks.find((drink) => drink.id === selectedDrinkId) ?? null,
    [catalogDrinks, selectedDrinkId]
  );

  const selectedTheme = useMemo(
    () => catalogThemes.find((theme) => theme.key === selectedThemeKey) ?? null,
    [catalogThemes, selectedThemeKey]
  );

  const selectedThemeDrinks = useMemo<Drink[]>(() => {
    if (!selectedTheme) return [];
    return catalogDrinks
      .filter((drink) => drink.themes.includes(selectedTheme.key) && !drink.isShot)
      .sort((a, b) => getThemeSort(a, selectedTheme.key) - getThemeSort(b, selectedTheme.key));
  }, [catalogDrinks, selectedTheme]);

  const tonightDrinks = useMemo(() => {
    return settings.tonightMenu.drinkIds
      .map((id) => catalogDrinks.find((drink) => drink.id === id))
      .filter((drink): drink is Drink => Boolean(drink));
  }, [catalogDrinks, settings.tonightMenu.drinkIds]);

  function isUnavailable(drink: Drink) {
    return drink.availability.some((key) => settings.availability[key as AvailabilityKey] === false);
  }

  function openDrink(id: string, returnThemeKey?: string) {
    setShotListOpen(false);
    setShotRewardOpen(false);
    setShotWheelOpen(false);
    setSpiritHubOpen(false);
    if (returnThemeKey) setSelectedThemeKey(returnThemeKey);
    else setSelectedThemeKey(null);
    setSelectedDrinkId(id);
    setShowRecipe(false);
  }

  function openTheme(themeKey: ThemeKey) {
    const hasAnyDrinks = catalogDrinks.some((drink) => drink.themes.includes(themeKey));
    if (!hasAnyDrinks) {
      const name = catalogThemes.find((theme) => theme.key === themeKey)?.name ?? "Theme";
      setToast(`No curated drinks in ${name} yet.`);
      return;
    }
    setSelectedDrinkId(null);
    setSelectedThemeKey(themeKey);
  }

  function closeDrawer() {
    if (selectedDrinkId && selectedThemeKey) {
      setDrawerClosing(true);
      window.setTimeout(() => {
        setSelectedDrinkId(null);
        setShowRecipe(false);
        setDrawerClosing(false);
      }, 150);
      return;
    }
    setDrawerClosing(true);
    window.setTimeout(() => {
      setSelectedDrinkId(null);
      setSelectedThemeKey(null);
      setDrawerClosing(false);
    }, 150);
  }

  function chooseRandom(list: Drink[]) {
    if (list.length === 0) return null;
    const availableFirst = list.filter((drink) => !isUnavailable(drink));
    const pool = availableFirst.length > 0 ? availableFirst : list;
    return pool[randomIndex(pool.length)];
  }

  function runThemeSurprise(themeKey: ThemeKey) {
    const pool = catalogDrinks
      .filter((drink) => drink.themes.includes(themeKey) && !drink.isShot)
      .sort((a, b) => getThemeSort(a, themeKey) - getThemeSort(b, themeKey));
    const chosen = chooseRandom(pool);
    if (!chosen) {
      setToast("No drinks found for this theme.");
      return;
    }
    const name = catalogThemes.find((theme) => theme.key === themeKey)?.name ?? "Theme";
    setToast(`From ${name}: ${chosen.name}`);
    openDrink(chosen.id);
  }

  function runGlobalSurprise() {
    const chosen = chooseRandom(catalogDrinks);
    if (!chosen) return;
    setToast(`Tonight suggests: ${chosen.name}`);
    openDrink(chosen.id);
  }

  function toggleTonightDrink(drinkId: string, selected: boolean) {
    setSettings((prev) => {
      const current = new Set(prev.tonightMenu.drinkIds);
      if (selected) current.add(drinkId);
      else current.delete(drinkId);
      return {
        ...prev,
        tonightMenu: { ...prev.tonightMenu, drinkIds: Array.from(current) },
      };
    });
  }

  function rotateQuote(direction: 1 | -1) {
    setQuoteIndex((current) => {
      if (coverQuotes.length === 0) return 0;
      return (current + direction + coverQuotes.length) % coverQuotes.length;
    });
  }

  const filteredAdminDrinks = useMemo(() => {
    const needle = filterText.trim().toLowerCase();
    const sorted = sortByName(catalogDrinks);
    if (!needle) return sorted;
    return sorted.filter((drink) => drink.name.toLowerCase().includes(needle));
  }, [catalogDrinks, filterText]);

  function renderCard(drink: Drink, contextThemeKey?: string) {
    const open = () => openDrink(drink.id, contextThemeKey);
    const onPointerDown: React.PointerEventHandler<HTMLElement> = (event) => {
      pointerStartRef.current = {
        id: drink.id,
        x: event.clientX,
        y: event.clientY,
        moved: false,
      };
    };
    const onPointerMove: React.PointerEventHandler<HTMLElement> = (event) => {
      const current = pointerStartRef.current;
      if (!current || current.id !== drink.id) return;
      const dx = Math.abs(event.clientX - current.x);
      const dy = Math.abs(event.clientY - current.y);
      if (dx > 10 || dy > 10) {
        current.moved = true;
      }
    };
    const onPointerUp: React.PointerEventHandler<HTMLElement> = () => {
      const current = pointerStartRef.current;
      if (!current || current.id !== drink.id) return;
      if (!current.moved) {
        open();
      }
      pointerStartRef.current = null;
    };
    return (
      <article
        key={drink.id}
        className="drink-card"
        role="button"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            open();
          }
        }}
      >
        <div
          className="drink-art"
          style={
            drink.imageFile
              ? {
                  backgroundImage: `url(/images/drinks/${drink.imageFile})`,
                  ...getDrinkArtStyle(drink.imageFile),
                }
              : undefined
          }
        />
        <div className="card-head card-title-only">
          <strong>{drink.name}</strong>
        </div>
        <p className="card-copy">{drink.description}</p>
        {isUnavailable(drink) ? <p className="unavailable-inline">Currently Unavailable</p> : null}
      </article>
    );
  }

  const activeQuote = coverQuotes[quoteIndex % coverQuotes.length];
  const shotDrinks = useMemo(
    () => catalogDrinks.filter((drink) => drink.isShot).sort((a, b) => a.sort - b.sort),
    [catalogDrinks]
  );
  const featuredThemes = catalogThemes.filter((theme) =>
    FEATURED_THEME_KEYS.includes(theme.key as (typeof FEATURED_THEME_KEYS)[number])
  );
  const leadThemes = featuredThemes.slice(0, 2);
  const trailingThemes = featuredThemes.slice(2);
  const shotThemeIntro = "Some people end with shots, but why not start with them?";
  const slotItems = useMemo(
    () =>
      Array.from({ length: SLOT_REPEATS }, (_, repeat) =>
        shotDrinks.map((drink, shotIndex) => ({
          id: `${drink.id}-${repeat}-${shotIndex}`,
          drink,
          shotIndex,
        }))
      ).flat(),
    [shotDrinks]
  );
  const [spinningShots, setSpinningShots] = useState(false);
  const [shotWheelOpen, setShotWheelOpen] = useState(false);
  const [slotOffset, setSlotOffset] = useState(SLOT_WINDOW_TOP);
  const [shotWheelWinnerName, setShotWheelWinnerName] = useState<string | null>(null);
  const [shotWheelWinnerId, setShotWheelWinnerId] = useState<string | null>(null);
  const [slotWinnerIndex, setSlotWinnerIndex] = useState<number | null>(null);
  const [slotHighlight, setSlotHighlight] = useState(false);
  const [shotRewardOpen, setShotRewardOpen] = useState(false);
  const [leverPulled, setLeverPulled] = useState(false);
  const [shotListOpen, setShotListOpen] = useState(false);
  const [spiritHubOpen, setSpiritHubOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(
    null
  );
  const [installHelpOpen, setInstallHelpOpen] = useState(false);
  const [isStandaloneApp, setIsStandaloneApp] = useState(false);

  useEffect(() => {
    slotOffsetRef.current = slotOffset;
  }, [slotOffset]);

  useEffect(() => {
    const historyApi = window.history as History & { scrollRestoration?: "auto" | "manual" };
    const previousRestoration = historyApi.scrollRestoration;
    if ("scrollRestoration" in historyApi) {
      historyApi.scrollRestoration = "manual";
    }
    if (window.location.hash === "#hub") {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };
    resetScroll();
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(resetScroll);
    });
    return () => {
      if ("scrollRestoration" in historyApi && previousRestoration) {
        historyApi.scrollRestoration = previousRestoration;
      }
    };
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // best-effort registration
      });
    }

    const media = window.matchMedia("(display-mode: standalone)");
    const legacyMedia = media as MediaQueryList & {
      addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
      removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
    };
    const checkStandalone = () => {
      const standalone =
        media.matches ||
        Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
      setIsStandaloneApp(standalone);
    };

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPromptEvent(event as BeforeInstallPromptEvent);
    };

    const onInstalled = () => {
      setIsStandaloneApp(true);
      setInstallPromptEvent(null);
      setInstallHelpOpen(false);
      setToast("Added to your home screen.");
    };

    checkStandalone();
    if ("addEventListener" in media) {
      media.addEventListener("change", checkStandalone);
    } else {
      legacyMedia.addListener?.(checkStandalone);
    }
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      if ("removeEventListener" in media) {
        media.removeEventListener("change", checkStandalone);
      } else {
        legacyMedia.removeListener?.(checkStandalone);
      }
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const shotWheelWinnerDrink = useMemo(
    () => catalogDrinks.find((drink) => drink.id === shotWheelWinnerId) ?? null,
    [catalogDrinks, shotWheelWinnerId]
  );

  const installCopy = useMemo<{ title: string; steps: InstallStep[] }>(() => {
    if (typeof navigator === "undefined") {
      return {
        title: "Add to Phone",
        steps: [
          { text: "Open your browser menu." },
          { text: "Choose Add to Home Screen or Install App." },
        ],
      };
    }
    const ua = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);
    if (isIOS) {
      return {
        title: "Add to iPhone",
        steps: [
          {
            text: "Tap View More.",
            image: "/install-step-view-more.jpg",
            alt: "iPhone share menu with View More highlighted",
          },
          {
            text: "Tap Add to Home Screen.",
            image: "/install-step-home-screen.png",
            alt: "iPhone browser menu with Add to Home Screen highlighted",
          },
        ],
      };
    }
    return {
      title: "Add to Phone",
      steps: [
        { text: "Open your browser menu." },
        { text: "Choose Install App or Add to Home Screen." },
      ],
    };
  }, []);

  function scrollToHub() {
    document.getElementById("hub")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function openInstallFlow() {
    if (isStandaloneApp) {
      setToast("It is already living on this phone.");
      return;
    }
    if (installPromptEvent) {
      await installPromptEvent.prompt();
      const result = await installPromptEvent.userChoice;
      if (result.outcome === "accepted") {
        setToast("Nice. Added to your phone.");
      }
      setInstallPromptEvent(null);
      return;
    }
    setInstallHelpOpen(true);
  }

  function openAdminFromMenu() {
    setMenuOpen(false);
    if (!adminUnlocked) {
      const attempt = window.prompt("Enter admin password");
      if (attempt !== ADMIN_PASSWORD) {
        setToast("Nope. Wrong password.");
        return;
      }
      setAdminUnlocked(true);
    }
    setAdminOpen(true);
  }

  function getThemeSort(drink: Drink, themeKey: string) {
    const override = drink.themeSortOverrides?.[themeKey];
    return typeof override === "number" ? override : drink.sort;
  }

  function getShotMachineImageUrl(drink: Drink) {
    if (!drink.imageFile) return "";
    return drink.isShot ? `/images/slot-machine/${drink.imageFile}` : `/images/drinks/${drink.imageFile}`;
  }

  function getShotMachineArtStyle(imageFile?: string) {
    if (!imageFile) return undefined;
    const slotOverrides: Record<string, { backgroundSize?: string; backgroundPosition?: string }> = {
      "shot-red-headed-slut.webp": { backgroundSize: "cover", backgroundPosition: "center" },
      "shot-washington-apple.webp": { backgroundSize: "114% auto", backgroundPosition: "center" },
      "shot-red-snapper.webp": { backgroundSize: "120% auto", backgroundPosition: "center" },
      "shot-stop-light.webp": { backgroundSize: "118% auto", backgroundPosition: "center" },
      "shot-tequila-slammer.webp": { backgroundSize: "116% auto", backgroundPosition: "center" },
      "shot-irish-car-bomb.webp": { backgroundSize: "114% auto", backgroundPosition: "center" },
      "shot-jager-bomb.webp": { backgroundSize: "114% auto", backgroundPosition: "center" },
      "shot-vegas-bomb.webp": { backgroundSize: "auto 124%", backgroundPosition: "center 24%" },
      "shot-nac-bomb.webp": { backgroundSize: "114% auto", backgroundPosition: "center" },
      "shot-flaming-dr-pepper.webp": { backgroundSize: "118% auto", backgroundPosition: "center" },
      "shot-kamikaze.png": { backgroundSize: "116% auto", backgroundPosition: "center" },
      "shot-water-moccasin.png": { backgroundSize: "118% auto", backgroundPosition: "center" },
      "shot-melon-ball.png": { backgroundSize: "118% auto", backgroundPosition: "center" },
      "shot-lemon-drop.png": { backgroundSize: "118% auto", backgroundPosition: "center" },
      "shot-pineapple-upside-down.png": {
        backgroundSize: "114% auto",
        backgroundPosition: "center 16%",
      },
      "shot-coconut-pineapple.png": { backgroundSize: "cover", backgroundPosition: "center" },
      "shot-fire-up-my-pussy.png": { backgroundSize: "cover", backgroundPosition: "center 58%" },
      "shot-double-trouble-tropical-tequila.png": {
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
    };
    return slotOverrides[imageFile];
  }

  function getDrinkArtStyle(imageFile?: string) {
    if (!imageFile) return undefined;
    const cropOverrides: Record<
      string,
      { backgroundSize?: string; backgroundPosition?: string }
    > = {
      "shot-red-headed-slut.webp": { backgroundSize: "cover", backgroundPosition: "center" },
      "moscow-mule.webp": { backgroundSize: "cover", backgroundPosition: "center 28%" },
      "old-fashioned.webp": { backgroundSize: "contain", backgroundPosition: "center top" },
      "manhattan.png": { backgroundSize: "contain", backgroundPosition: "center top" },
      "boulevardier.webp": { backgroundSize: "114% auto", backgroundPosition: "center 78%" },
      "whiskey-sour.webp": { backgroundSize: "106% auto", backgroundPosition: "center 18%" },
      "whiskey-smash.webp": { backgroundSize: "110% auto", backgroundPosition: "center 54%" },
      "french-connection.png": { backgroundSize: "contain", backgroundPosition: "center top" },
      "between-the-sheets.png": { backgroundSize: "contain", backgroundPosition: "center top" },
      "fontainebleau-sidecar-cocktail.png": {
        backgroundSize: "contain",
        backgroundPosition: "center top",
      },
      "clover-club.png": { backgroundSize: "contain", backgroundPosition: "center 20%" },
      "pre-siesta.png": { backgroundSize: "cover", backgroundPosition: "center 34%" },
      "two-one-two.png": { backgroundSize: "cover", backgroundPosition: "center 36%" },
      "cantarito.png": { backgroundSize: "cover", backgroundPosition: "center 32%" },
      "siesta-cocktail.png": { backgroundSize: "cover", backgroundPosition: "center 34%" },
      "howlapeno.png": { backgroundSize: "cover", backgroundPosition: "center 34%" },
      "sour-cherry-margarita.png": { backgroundSize: "cover", backgroundPosition: "center 38%" },
      "dark-n-stormy.png": { backgroundSize: "contain", backgroundPosition: "center 18%" },
      "pineapple-daiquiri.png": { backgroundSize: "cover", backgroundPosition: "center 32%" },
      "mai-tai.png": { backgroundSize: "cover", backgroundPosition: "center 30%" },
      "coconut-pineapple-sour.webp": {
        backgroundSize: "108% auto",
        backgroundPosition: "center 74%",
      },
      "negroni.webp": { backgroundSize: "108% auto", backgroundPosition: "center 66%" },
      "aperol-spritz.webp": { backgroundSize: "contain", backgroundPosition: "center 10%" },
      "hugo-spritz.webp": { backgroundSize: "contain", backgroundPosition: "center 10%" },
      "limoncello-spritz.webp": { backgroundSize: "contain", backgroundPosition: "center 10%" },
      "campari-spritz.webp": { backgroundSize: "contain", backgroundPosition: "center 10%" },
      "cherry-spritz.webp": { backgroundSize: "contain", backgroundPosition: "center 10%" },
      "chambord-spritz.webp": { backgroundSize: "cover", backgroundPosition: "center 34%" },
      "shot-coconut-pineapple.png": { backgroundSize: "cover", backgroundPosition: "center" },
      "shot-fire-up-my-pussy.png": { backgroundSize: "cover", backgroundPosition: "center 60%" },
      "shot-double-trouble-tropical-tequila.png": {
        backgroundSize: "cover",
        backgroundPosition: "center 28%",
      },
      "blueberry-pineapple-tequila-sour.png": {
        backgroundSize: "cover",
        backgroundPosition: "center 28%",
      },
      "lavender-spritz.png": { backgroundSize: "cover", backgroundPosition: "center 24%" },
      "smoke-on-the-water.png": { backgroundSize: "cover", backgroundPosition: "center 56%" },
      "mezcalita.png": { backgroundSize: "cover", backgroundPosition: "center 52%" },
      "pineapple-bourbon-lemonade.png": { backgroundSize: "cover", backgroundPosition: "center 54%" },
      "blue-hawaiian.png": { backgroundSize: "cover", backgroundPosition: "center 44%" },
    };
    if (imageFile.startsWith("shot-")) {
      return {
        backgroundSize: "contain",
        backgroundPosition: "center",
        ...cropOverrides[imageFile],
      };
    }
    return cropOverrides[imageFile];
  }

  function openShotWheel() {
    tickTimersRef.current.forEach((id) => window.clearTimeout(id));
    tickTimersRef.current = [];
    if (slotAudioIntervalRef.current) {
      window.clearInterval(slotAudioIntervalRef.current);
      slotAudioIntervalRef.current = null;
    }
    if (slotSpinTimerRef.current) {
      window.clearTimeout(slotSpinTimerRef.current);
      slotSpinTimerRef.current = null;
    }
    pendingSlotWinnerRef.current = null;
    setSpinningShots(false);
    setSlotHighlight(false);
    setSlotWinnerIndex(null);
    setShotWheelWinnerName(null);
    setShotWheelWinnerId(null);
    setShotRewardOpen(false);
    slotOffsetRef.current = SLOT_WINDOW_TOP;
    setSlotOffset(SLOT_WINDOW_TOP);
    setLeverPulled(false);
    setShotWheelOpen(true);
  }

  function playSlotWin() {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(660, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.24);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.26);
    osc.start();
    osc.stop(ctx.currentTime + 0.28);
  }

  function finishShotSpin() {
    const pendingWinner = pendingSlotWinnerRef.current;
    if (!pendingWinner) return;
    pendingSlotWinnerRef.current = null;
    if (slotSpinTimerRef.current) {
      window.clearTimeout(slotSpinTimerRef.current);
      slotSpinTimerRef.current = null;
    }
    if (slotAudioIntervalRef.current) {
      window.clearInterval(slotAudioIntervalRef.current);
      slotAudioIntervalRef.current = null;
    }
    playSlotWin();
    const winnerShotIndex = ((pendingWinner.index % shotDrinks.length) + shotDrinks.length) % shotDrinks.length;
    const settledIndex = shotDrinks.length * 8 + winnerShotIndex;
    const settledOffset = settledIndex * SLOT_ITEM_HEIGHT;
    slotOffsetRef.current = settledOffset;
    setSpinningShots(false);
    setSlotOffset(settledOffset);
    setSlotWinnerIndex(settledIndex);
    setSlotHighlight(true);
    setShotWheelWinnerName(pendingWinner.drink.name);
    setShotWheelWinnerId(pendingWinner.drink.id);
    setLeverPulled(false);
    const revealTimer = window.setTimeout(() => {
      setShotRewardOpen(true);
    }, 240);
    tickTimersRef.current.push(revealTimer);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate([22, 26, 44]);
    }
  }

  function runShotWheel() {
    if (shotDrinks.length === 0 || spinningShots) return;
    if (slotSpinTimerRef.current) {
      window.clearTimeout(slotSpinTimerRef.current);
      slotSpinTimerRef.current = null;
    }
    setShotWheelOpen(true);
    setSpinningShots(true);
    setLeverPulled(true);
    setSlotHighlight(false);
    setSlotWinnerIndex(null);
    setShotWheelWinnerName(null);
    setShotWheelWinnerId(null);
    setShotRewardOpen(false);
    const winnerIndex = randomIndex(shotDrinks.length);
    const currentCenterIndex = Math.max(1, Math.round(slotOffsetRef.current / SLOT_ITEM_HEIGHT));
    const currentShotIndex = ((currentCenterIndex % shotDrinks.length) + shotDrinks.length) % shotDrinks.length;
    const winner = shotDrinks[winnerIndex];
    const cellsToWinner = (winnerIndex - currentShotIndex + shotDrinks.length) % shotDrinks.length;
    const targetCenterIndex = currentCenterIndex + shotDrinks.length * 8 + cellsToWinner;
    const nextOffset = targetCenterIndex * SLOT_ITEM_HEIGHT;
    pendingSlotWinnerRef.current = { drink: winner, index: targetCenterIndex };
    slotOffsetRef.current = nextOffset;
    setSlotOffset(nextOffset);

    if (!audioCtxRef.current) {
      const Ctx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (Ctx) audioCtxRef.current = new Ctx();
    }
    const playSlotTick = () => {
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = 1180;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;
      gain.gain.linearRampToValueAtTime(0.1, now + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
      osc.start(now);
      osc.stop(now + 0.04);
    };
    const startSlotAudio = () => {
      if (slotAudioIntervalRef.current) {
        window.clearInterval(slotAudioIntervalRef.current);
      }
      slotAudioIntervalRef.current = window.setInterval(() => {
        playSlotTick();
      }, 82);
    };

    if (audioCtxRef.current?.state === "suspended") {
      audioCtxRef.current.resume().then(startSlotAudio).catch(() => {
        // ignore
      });
    } else {
      startSlotAudio();
    }

    slotSpinTimerRef.current = window.setTimeout(finishShotSpin, SLOT_SPIN_DURATION_MS + 300);
  }

  return (
    <div className="page-shell">
      <button
        type="button"
        className="menu-fab"
        aria-label="Open menu"
        onClick={() => setMenuOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>
      {menuOpen ? (
        <div className="menu-pop">
          {settings.tonightMenu.enabled ? (
            <button
              type="button"
              className="ghost-button"
              onClick={() => {
                setMenuOpen(false);
                document.getElementById("tonight-menu")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Tonight&apos;s Damage
            </button>
          ) : null}
          <button
            type="button"
            className="ghost-button"
            onClick={() => {
              setMenuOpen(false);
              document.getElementById("themes-root")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Featured Themes
          </button>
          <button
            type="button"
            className="ghost-button"
            onClick={() => {
              setMenuOpen(false);
              setSpiritHubOpen(true);
            }}
          >
            Drinks by Spirit
          </button>
          <button
            type="button"
            className="ghost-button"
            onClick={() => {
              setMenuOpen(false);
              openShotWheel();
            }}
          >
            Shot Machine
          </button>
          {!isStandaloneApp ? (
            <button
              type="button"
              className="ghost-button"
              onClick={() => {
                setMenuOpen(false);
                void openInstallFlow();
              }}
            >
              Add to Phone
            </button>
          ) : null}
          <button
            type="button"
            className="ghost-button"
            onClick={openAdminFromMenu}
          >
            Admin
          </button>
        </div>
      ) : null}
      <section className="cover" id="cover">
        <div className="cover-copy">
          <h1>Dubious Intentions</h1>
          <p className="tagline">Inebriation Awaits</p>
          <div className="cover-actions">
            <button type="button" className="enter-button" onClick={scrollToHub}>
              Enter the Menu
            </button>
            <button type="button" className="pill" onClick={runGlobalSurprise}>
              Surprise Me
            </button>
          </div>
          <div className="cover-quote">
            <div
              className="quote-row"
              onPointerDown={(event) => {
                quotePointerRef.current = { x: event.clientX, y: event.clientY };
              }}
              onPointerUp={(event) => {
                const start = quotePointerRef.current;
                quotePointerRef.current = null;
                if (!start) return;
                const dx = event.clientX - start.x;
                const dy = event.clientY - start.y;
                if (Math.abs(dx) < 36 || Math.abs(dx) < Math.abs(dy)) return;
                rotateQuote(dx < 0 ? 1 : -1);
              }}
              onPointerCancel={() => {
                quotePointerRef.current = null;
              }}
            >
              <button
                type="button"
                className="quote-arrow"
                onClick={() => rotateQuote(-1)}
                aria-label="Previous quote"
              >
                ‹
              </button>
              <div className="quote-swipe-zone">
                <p className="quote-line">{`"${activeQuote.text}"`}</p>
              </div>
              <button
                type="button"
                className="quote-arrow"
                onClick={() => rotateQuote(1)}
                aria-label="Next quote"
              >
                ›
              </button>
            </div>
            <p className="quote-source">{`- ${activeQuote.source}`}</p>
          </div>
        </div>
      </section>

      <main className="hub" id="hub">
        {settings.tonightMenu.enabled && tonightDrinks.length > 0 ? (
          <section className="tonight-panel" id="tonight-menu">
            <div className="tonight-header">
              <div>
                <p className="eyebrow">Tonight&apos;s Damage</p>
                <h3>{settings.tonightMenu.title}</h3>
                <p id="tonight-tagline">{settings.tonightMenu.tagline}</p>
              </div>
            </div>
            <div className="drink-grid">{tonightDrinks.map((drink) => renderCard(drink))}</div>
          </section>
        ) : null}

        <section id="themes-root" className="theme-stack">
          {leadThemes.map((theme) => {
            const themeDrinks = catalogDrinks
              .filter((drink) => drink.themes.includes(theme.key) && !drink.isShot)
              .sort((a, b) => a.sort - b.sort);
            return (
              <section key={theme.key} className="theme-block">
                <div className="theme-header">
                  <div>
                    <h3>{theme.name}</h3>
                  </div>
                  <div className="theme-actions">
                    <button
                      type="button"
                      className="pill"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        openTheme(theme.key);
                      }}
                    >
                      View All
                    </button>
                  </div>
                </div>
                <p className="theme-intro">{theme.intro}</p>
                <div className="drink-grid">
                  {themeDrinks
                    .sort((a, b) => getThemeSort(a, theme.key) - getThemeSort(b, theme.key))
                    .map((drink) => renderCard(drink))}
                </div>
              </section>
            );
          })}
          {shotDrinks.length > 0 ? (
            <section className="theme-block shot-block">
              <div className="theme-header">
                <div>
                  <p className="eyebrow">Shots</p>
                  <h3>That Escalated Quickly</h3>
                </div>
                <div className="theme-actions">
                  <button type="button" className="pill" onClick={() => setShotListOpen(true)}>
                    View All
                  </button>
                </div>
              </div>
              <p className="theme-intro">{shotThemeIntro}</p>
              <div className="helper-row">
                <p className="helper-line">Not sure what to choose? Let the wheel decide your fate.</p>
                <button type="button" className="pill" onClick={openShotWheel}>
                  Shot Machine
                </button>
              </div>
              <div className="drink-grid">
                {shotDrinks.map((drink) => renderCard(drink))}
              </div>
            </section>
          ) : null}
          {trailingThemes.map((theme) => {
            const themeDrinks = catalogDrinks
              .filter((drink) => drink.themes.includes(theme.key) && !drink.isShot)
              .sort((a, b) => a.sort - b.sort);
            return (
              <section key={theme.key} className="theme-block">
                <div className="theme-header">
                  <div>
                    <h3>{theme.name}</h3>
                  </div>
                  <div className="theme-actions">
                    <button
                      type="button"
                      className="pill"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        openTheme(theme.key);
                      }}
                    >
                      View All
                    </button>
                  </div>
                </div>
                <p className="theme-intro">{theme.intro}</p>
                <div className="drink-grid">
                  {themeDrinks
                    .sort((a, b) => getThemeSort(a, theme.key) - getThemeSort(b, theme.key))
                    .map((drink) => renderCard(drink))}
                </div>
              </section>
            );
          })}
        </section>
      </main>

      {selectedDrink || selectedTheme ? (
        <aside className="drawer">
          <div className="drawer-backdrop" onClick={closeDrawer} />
          <article className={`drawer-panel ${drawerClosing ? "drawer-closing" : ""}`}>
            {selectedDrink ? (
              <>
                <div className="drawer-head">
                  <div>
                    <p className="eyebrow">Drink Detail</p>
                    <h3>{selectedDrink.name}</h3>
                  </div>
                  <button className="ghost-button" onClick={closeDrawer} type="button">
                    Close
                  </button>
                </div>
                {selectedDrink.imageFile ? (
                  <div
                    className="drawer-drink-art"
                    style={{
                      backgroundImage: `url(/images/drinks/${selectedDrink.imageFile})`,
                      ...getDrinkArtStyle(selectedDrink.imageFile),
                    }}
                  />
                ) : null}
                <p className="admin-copy">{selectedDrink.description}</p>
                {isUnavailable(selectedDrink) ? (
                  <p className="unavailable-inline">Currently Unavailable</p>
                ) : null}
                <button
                  type="button"
                  className="recipe-toggle"
                  onClick={() => setShowRecipe((value) => !value)}
                >
                  {showRecipe ? "Hide Recipe" : "Show Recipe"}
                </button>
                {showRecipe ? (
                  <div className="recipe-block">
                    <p className="eyebrow">Ingredients & Measurements</p>
                    <div className="recipe-copy">
                      {selectedDrink.ingredients
                        .split("|")
                        .map((item) => item.trim())
                        .filter(Boolean)
                        .join("\n")}
                    </div>
                  </div>
                ) : null}
                {selectedDrink.variations?.length ? (
                  <div className="recipe-block">
                    <p className="eyebrow">Variations</p>
                    <div className="variation-list">
                      {selectedDrink.variations.map((variation) => (
                        <div className="variation-item" key={`${selectedDrink.id}-${variation.name}`}>
                          <strong>{variation.name}</strong>
                          <span>{variation.change}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </>
            ) : null}

            {selectedTheme && !selectedDrink ? (
              <>
                <div className="drawer-head">
                  <div>
                    <p className="eyebrow">Theme</p>
                    <h3>{selectedTheme.name}</h3>
                  </div>
                  <button className="ghost-button" onClick={closeDrawer} type="button">
                    Close
                  </button>
                </div>
                <p className="admin-copy">{selectedTheme.intro}</p>
                {selectedTheme.key === "cool-runnings" ? (
                  <p className="quote-line">
                    &quot;Feel the rhythm, feel the rhyme, get on up, it&apos;s bobsled time!&quot;
                  </p>
                ) : null}
                <div className="theme-actions recipe-block">
                  <p className="helper-line">Not sure what to choose? We can choose for you.</p>
                  <button
                    type="button"
                    className="pill"
                    onClick={() => runThemeSurprise(selectedTheme.key)}
                  >
                    Surprise Me
                  </button>
                </div>
                <div className="recipe-block">
                  <div className="drawer-theme-grid">
                    {selectedThemeDrinks.map((drink) => renderCard(drink, selectedTheme.key))}
                  </div>
                </div>
              </>
            ) : null}
          </article>
        </aside>
      ) : null}

      {adminOpen ? (
        <aside className="drawer">
          <div className="drawer-backdrop" onClick={() => setAdminOpen(false)} />
          <article className="drawer-panel admin-panel">
            <div className="drawer-head">
              <div>
                <p className="eyebrow">Admin</p>
                <h3>Night Controls</h3>
              </div>
              <button className="ghost-button" onClick={() => setAdminOpen(false)} type="button">
                Close
              </button>
            </div>
            <p className="admin-copy">
              This panel is for live toggles only. Catalog editing stays in the spreadsheet flow.
            </p>

            <div className="admin-block">
              <p className="eyebrow">Ingredient Availability</p>
              <div className="checkbox-list">
                {trackedIngredients.map((ingredient) => (
                  <label key={ingredient.key} className="switch-row">
                    <span>{ingredient.label}</span>
                    <input
                      type="checkbox"
                      checked={settings.availability[ingredient.key]}
                      onChange={(event) =>
                        setSettings((prev) => ({
                          ...prev,
                          availability: {
                            ...prev.availability,
                            [ingredient.key]: event.target.checked,
                          },
                        }))
                      }
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="admin-block">
              <p className="eyebrow">Tonight&apos;s Menu</p>
              <label className="switch-row">
                <span>Enable Tonight&apos;s Menu</span>
                <input
                  type="checkbox"
                  checked={settings.tonightMenu.enabled}
                  onChange={(event) =>
                    setSettings((prev) => ({
                      ...prev,
                      tonightMenu: { ...prev.tonightMenu, enabled: event.target.checked },
                    }))
                  }
                />
              </label>
              <div className="form-row">
                <input
                  className="input"
                  placeholder="Title"
                  value={settings.tonightMenu.title}
                  onChange={(event) =>
                    setSettings((prev) => ({
                      ...prev,
                      tonightMenu: { ...prev.tonightMenu, title: event.target.value },
                    }))
                  }
                />
              </div>
              <div className="form-row">
                <input
                  className="input"
                  placeholder="Tagline"
                  value={settings.tonightMenu.tagline}
                  onChange={(event) =>
                    setSettings((prev) => ({
                      ...prev,
                      tonightMenu: { ...prev.tonightMenu, tagline: event.target.value },
                    }))
                  }
                />
              </div>
              <div className="form-row">
                <input
                  className="input"
                  placeholder="Filter drinks..."
                  value={filterText}
                  onChange={(event) => setFilterText(event.target.value)}
                />
              </div>
              <div className="checkbox-list">
                {filteredAdminDrinks.map((drink) => (
                  <label key={drink.id} className="switch-row">
                    <span>{drink.name}</span>
                    <input
                      type="checkbox"
                      checked={settings.tonightMenu.drinkIds.includes(drink.id)}
                      onChange={(event) => toggleTonightDrink(drink.id, event.target.checked)}
                    />
                  </label>
                ))}
              </div>
            </div>
          </article>
        </aside>
      ) : null}

      {toast ? <div className="toast visible">{toast}</div> : null}

      {shotListOpen ? (
        <aside className="drawer">
          <div className="drawer-backdrop" onClick={() => setShotListOpen(false)} />
          <article className={`drawer-panel ${drawerClosing ? "drawer-closing" : ""}`}>
            <div className="drawer-head">
              <div>
                <p className="eyebrow">Shots Theme</p>
                <h3>That Escalated Quickly</h3>
              </div>
              <button className="ghost-button" onClick={() => setShotListOpen(false)} type="button">
                Close
              </button>
            </div>
            <div className="helper-row recipe-block">
              <p className="helper-line">{shotThemeIntro}</p>
              <button type="button" className="pill" onClick={openShotWheel}>
                Shot Machine
              </button>
            </div>
            <div className="recipe-block">
              <div className="drawer-theme-grid">{shotDrinks.map((drink) => renderCard(drink))}</div>
            </div>
          </article>
        </aside>
      ) : null}

      {shotWheelOpen ? (
        <aside className="drawer">
          <div className="drawer-backdrop" onClick={() => !spinningShots && setShotWheelOpen(false)} />
          <article className="drawer-panel slot-panel">
            <div className="drawer-head">
              <div>
                <p className="slot-kicker">Put your fate in the hands of</p>
                <h3 className="slot-title">Shot Machine</h3>
                <p className="slot-subtitle">Pull the handle if you dare</p>
              </div>
              <button
                className="ghost-button"
                type="button"
                onClick={() => setShotWheelOpen(false)}
                disabled={spinningShots}
              >
                Close
              </button>
            </div>
            <div className="slot-machine">
              <div className={`slot-machine-shell ${spinningShots ? "spinning" : ""}`}>
                <div className="slot-window">
                  <div
                    className="slot-reel-track"
                    onTransitionEnd={(event) => {
                      if (event.propertyName === "transform") finishShotSpin();
                    }}
                    style={{
                      transform: `translateY(-${slotOffset - SLOT_WINDOW_TOP}px)`,
                      transitionDuration: spinningShots ? `${SLOT_SPIN_DURATION_MS}ms` : "0ms",
                    }}
                  >
                    {slotItems.map(({ id, drink }, idx) => {
                      const isSelected = idx === slotWinnerIndex && slotHighlight;
                      return (
                        <div key={id} className={`slot-cell ${isSelected ? "is-selected" : ""}`}>
                          <div className={`slot-tile ${isSelected ? "is-selected" : ""}`}>
                            <div
                              className={`slot-thumb ${isSelected ? "zoom-in" : ""}`}
                              style={{
                                backgroundImage: `url(${getShotMachineImageUrl(drink)})`,
                                ...getShotMachineArtStyle(drink.imageFile),
                              }}
                            />
                            <p className="slot-name">{drink.name}</p>
                            <div
                              className={`slot-thumb ${isSelected ? "zoom-in" : ""}`}
                              style={{
                                backgroundImage: `url(${getShotMachineImageUrl(drink)})`,
                                ...getShotMachineArtStyle(drink.imageFile),
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="slot-window-gloss" />
                  <div className={`slot-highlight-frame ${slotHighlight ? "show" : ""}`} />
                </div>
                <button
                  type="button"
                  className={`slot-lever ${leverPulled ? "pulled" : ""}`}
                  onClick={runShotWheel}
                  disabled={spinningShots}
                  aria-label="Pull handle"
                >
                  <span className="slot-lever-image" aria-hidden="true" />
                </button>
              </div>
            </div>
            {shotRewardOpen && shotWheelWinnerDrink ? (
              <div className="reveal-overlay">
                <div className="drawer-backdrop" onClick={() => setShotRewardOpen(false)} />
                <div className="reveal-panel slot-win-panel">
                  <div className="drawer-head">
                    <div>
                      <h3 className="slot-win-title">You Win</h3>
                      <p className="slot-win-copy">
                        Or maybe you lose, shots can really go either way
                      </p>
                    </div>
                    <button
                      className="ghost-button"
                      type="button"
                      onClick={() => setShotRewardOpen(false)}
                    >
                      Back
                    </button>
                  </div>
                  <button
                    type="button"
                    className="slot-win-image"
                    onClick={() => openDrink(shotWheelWinnerDrink.id)}
                    style={{
                      backgroundImage: `url(/images/drinks/${shotWheelWinnerDrink.imageFile ?? ""})`,
                      ...getDrinkArtStyle(shotWheelWinnerDrink.imageFile),
                    }}
                  />
                  <button
                    type="button"
                    className="slot-win-name"
                    onClick={() => openDrink(shotWheelWinnerDrink.id)}
                  >
                    {shotWheelWinnerDrink.name}
                  </button>
                </div>
              </div>
            ) : null}
          </article>
        </aside>
      ) : null}

      {spiritHubOpen ? (
        <aside className="drawer">
          <div className="drawer-backdrop" onClick={() => setSpiritHubOpen(false)} />
          <article className="drawer-panel">
            <div className="drawer-head">
              <div>
                <p className="eyebrow">Browse</p>
                <h3>Drinks by Spirit</h3>
              </div>
              <button className="ghost-button" onClick={() => setSpiritHubOpen(false)} type="button">
                Close
              </button>
            </div>
            <p className="admin-copy">Pick a spirit category and jump into the full list.</p>
            <div className="recipe-block spirit-grid">
              {SPIRIT_THEME_OPTIONS.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  className="spirit-card"
                  onClick={() => {
                    setSpiritHubOpen(false);
                    openTheme(option.key);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </article>
        </aside>
      ) : null}

      {installHelpOpen ? (
        <aside className="drawer">
          <div className="drawer-backdrop" onClick={() => setInstallHelpOpen(false)} />
          <article className="drawer-panel install-panel">
            <div className="drawer-head">
              <div>
                <p className="eyebrow">Web App</p>
                <h3>{installCopy.title}</h3>
              </div>
              <button className="ghost-button" onClick={() => setInstallHelpOpen(false)} type="button">
                Close
              </button>
            </div>
            <p className="admin-copy">A quick shortcut so this opens more like an app from the home screen.</p>
            <div className="recipe-block install-steps">
              {installCopy.steps.map((step, index) => (
                <div key={`${installCopy.title}-${index}`} className="install-step">
                  <span className="install-step-number">{index + 1}</span>
                  <div className="install-step-body">
                    <p>{step.text}</p>
                    {step.image ? (
                      <div className="install-step-image-wrap">
                        <Image
                          src={step.image}
                          alt={step.alt || step.text}
                          width={1200}
                          height={1600}
                          className="install-step-image"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </article>
        </aside>
      ) : null}
    </div>
  );
}
