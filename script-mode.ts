import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ScriptMode = "all" | "original" | "hindi" | "roman" | "english";

type ScriptState = {
  mode: ScriptMode;
  setMode: (mode: ScriptMode) => void;
};

export const SCRIPT_OPTIONS: { id: ScriptMode; label: string }[] = [
  { id: "all", label: "All" },
  { id: "original", label: "Original" },
  { id: "hindi", label: "हिन्दी" },
  { id: "roman", label: "Roman" },
  { id: "english", label: "English" },
];

export const useScriptMode = create<ScriptState>()(
  persist(
    (set) => ({
      mode: "all",
      setMode: (mode) => set({ mode }),
    }),
    { name: "noornama-script" },
  ),
);
