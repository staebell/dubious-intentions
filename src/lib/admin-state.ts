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
    title: "Tonight's Damage",
    tagline: "Handpicked and suspiciously good.",
    drinkIds: [],
  },
};

type PartialAdminState = {
  availability?: Partial<AdminState["availability"]>;
  tonightMenu?: Partial<AdminState["tonightMenu"]>;
};

export function sanitizeAdminState(input: PartialAdminState | null | undefined): AdminState {
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

export function serializeAdminState(state: AdminState) {
  return `${JSON.stringify(state, null, 2)}\n`;
}
