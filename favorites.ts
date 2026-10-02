import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FavKind = "verse" | "quote" | "story" | "term" | "qawwali" | "ebook";

type FavState = {
  items: Record<FavKind, string[]>;
  toggle: (kind: FavKind, id: string) => void;
  has: (kind: FavKind, id: string) => boolean;
  total: () => number;
};

const empty: Record<FavKind, string[]> = {
  verse: [],
  quote: [],
  story: [],
  term: [],
  qawwali: [],
  ebook: [],
};

export const useFavorites = create<FavState>()(
  persist(
    (set, get) => ({
      items: empty,
      toggle: (kind, id) =>
        set((state) => {
          const current = state.items[kind];
          const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
          return { items: { ...state.items, [kind]: next } };
        }),
      has: (kind, id) => get().items[kind].includes(id),
      total: () => Object.values(get().items).reduce((n, arr) => n + arr.length, 0),
    }),
    { name: "noornama-favorites" },
  ),
);
