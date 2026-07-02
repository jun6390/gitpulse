"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Check, Globe, Moon, Sun } from "lucide-react";
import { translations } from "@/constants/translations";
import { useLanguageStore } from "@/stores/languageStore";
import type { Language } from "@/stores/languageStore";

type HeaderControlsProps = {
  dropdownPosition?: "left" | "right";
  onSelectComplete?: () => void;
};

const HeaderControls = ({
  dropdownPosition = "right",
  onSelectComplete,
}: HeaderControlsProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const { language, toggleLanguage } = useLanguageStore();

  const t = translations[language];

  const [mounted, setMounted] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const isDark = resolvedTheme === "dark";
  const dropdownPositionClass =
    dropdownPosition === "right" ? "right-0" : "left-0";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
        setIsThemeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectLanguage = (nextLanguage: Language) => {
    if (nextLanguage !== language) {
      toggleLanguage();
    }

    setIsLanguageOpen(false);
    onSelectComplete?.();
  };

  const handleSelectTheme = (nextTheme: "light" | "dark") => {
    setTheme(nextTheme);
    setIsThemeOpen(false);
    onSelectComplete?.();
  };

  return (
    <div ref={menuRef} className="flex items-center gap-3">
      {/* 언어 드롭다운 */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setIsLanguageOpen((prev) => !prev);
            setIsThemeOpen(false);
          }}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-sm transition hover:bg-gray-100 dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-white/10"
          aria-label="language menu"
        >
          <Globe size={20} />
        </button>

        {isLanguageOpen && (
          <div
            className={`absolute ${dropdownPositionClass} top-14 z-50 w-44 rounded-3xl border border-gray-200 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-black`}
          >
            <button
              type="button"
              onClick={() => handleSelectLanguage("ko")}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs text-gray-900 transition hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
            >
              <span className="flex w-4 justify-center">
                {language === "ko" && <Check size={14} />}
              </span>
              <span>{t.language.korean}</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectLanguage("en")}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs text-gray-900 transition hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
            >
              <span className="flex w-4 justify-center">
                {language === "en" && <Check size={14} />}
              </span>
              <span className="tracking-[0.18em]">{t.language.english}</span>
            </button>
          </div>
        )}
      </div>

      {/* 테마 드롭다운 */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setIsThemeOpen((prev) => !prev);
            setIsLanguageOpen(false);
          }}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-sm transition hover:bg-gray-100 dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-white/10"
          aria-label="theme menu"
        >
          {mounted && isDark ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {isThemeOpen && (
          <div
            className={`absolute ${dropdownPositionClass} top-14 z-50 w-44 rounded-3xl border border-gray-200 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-black`}
          >
            <button
              type="button"
              onClick={() => handleSelectTheme("light")}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold text-gray-900 transition hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
            >
              <span className="flex w-4 justify-center">
                <Sun size={14} />
              </span>
              <span className="tracking-[0.12em]">{t.theme.lightMode}</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectTheme("dark")}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold text-gray-900 transition hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
            >
              <span className="flex w-4 justify-center">
                <Moon size={14} />
              </span>
              <span className="tracking-[0.12em]">{t.theme.darkMode}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderControls;
