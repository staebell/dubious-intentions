import { promises as fs } from "node:fs";
import path from "node:path";

export type AdminState = {
  availability: {
    mint: boolean;
    egg_white: boolean;
    jalapeno: boolean;
    serrano: boolean;
    champagne: boolean;
  };
  tonightMenu: {
    enabled: boolean;
    title: string;
    tagline: string;
    drinkIds: string[];
  };
};

export const defaultAdminState: AdminState = {
  availability: {
    mint: true,
    egg_white: true,
    jalapeno: true,
    serrano: true,
    champagne: true,
  },
  tonightMenu: {
    enabled: false,
    title: "Tonight's Menu",
    tagline: "Handpicked and suspiciously good.",
    drinkIds: [],
  },
};

type PartialAdminState = {
  availability?: Partial<AdminState["availability"]>;
  tonightMenu?: Partial<AdminState["tonightMenu"]>;
};

function stateFilePath() {
  return path.join(process.cwd(), "content", "admin-state.json");
}

function sanitize(input: PartialAdminState | null | undefined): AdminState {
  const availability: Partial<AdminState["availability"]> = input?.availability ?? {};
  const tonightMenu: Partial<AdminState["tonightMenu"]> = input?.tonightMenu ?? {};
  return {
    availability: {
      mint: availability.mint ?? defaultAdminState.availability.mint,
      egg_white: availability.egg_white ?? defaultAdminState.availability.egg_white,
      jalapeno: availability.jalapeno ?? defaultAdminState.availability.jalapeno,
      serrano: availability.serrano ?? defaultAdminState.availability.serrano,
      champagne: availability.champagne ?? defaultAdminState.availability.champagne,
    },
    tonightMenu: {
      enabled: tonightMenu.enabled ?? defaultAdminState.tonightMenu.enabled,
      title: (tonightMenu.title || defaultAdminState.tonightMenu.title).toString(),
      tagline: (tonightMenu.tagline || defaultAdminState.tonightMenu.tagline).toString(),
      drinkIds: Array.isArray(tonightMenu.drinkIds)
        ? tonightMenu.drinkIds.filter((value: unknown): value is string => typeof value === "string")
        : [],
    },
  };
}

export async function readAdminState(): Promise<AdminState> {
  try {
    const raw = await fs.readFile(stateFilePath(), "utf8");
    return sanitize(JSON.parse(raw) as PartialAdminState);
  } catch {
    return defaultAdminState;
  }
}

export async function writeAdminState(input: PartialAdminState): Promise<AdminState> {
  const sanitized = sanitize(input);
  await fs.mkdir(path.join(process.cwd(), "content"), { recursive: true });
  await fs.writeFile(stateFilePath(), `${JSON.stringify(sanitized, null, 2)}\n`, "utf8");
  return sanitized;
}
