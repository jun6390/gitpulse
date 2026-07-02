// 한국어 / 영어

import { create } from "zustand";

export type Language = "ko" | "en";

interface LanguageStore {
  language: Language;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: "ko",
  toggleLanguage: () =>
    set((state) => ({
      language: state.language === "ko" ? "en" : "ko",
    })),
}));
