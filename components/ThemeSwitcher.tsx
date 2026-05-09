"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type ThemeName = "sunrise" | "bloom";

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
};

const STORAGE_KEY = "aura-rise-theme";
const themeOptions: Array<{ key: ThemeName; label: string }> = [
  { key: "sunrise", label: "SUNRISE" },
  { key: "bloom", label: "BLOOM" },
];

export const ThemeContext = createContext<ThemeContextValue | null>(null);

function normalizeTheme(value: string | null): ThemeName {
  return value === "bloom" ? "bloom" : "sunrise";
}

function applyTheme(theme: ThemeName) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.remove("theme-sunrise", "theme-bloom");
  root.classList.add(`theme-${theme}`);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    if (typeof window === "undefined") return "sunrise";
    return normalizeTheme(window.localStorage.getItem(STORAGE_KEY));
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme);
    applyTheme(theme);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: setThemeState,
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}

function SwatchIcon({ theme }: { theme: ThemeName }) {
  return (
    <span className="theme-swatch" data-swatch={theme} aria-hidden="true">
      <span className="theme-swatch-half theme-swatch-a" />
      <span className="theme-swatch-half theme-swatch-b" />
    </span>
  );
}

export default function ThemeSwitcher({ mobile = false }: { mobile?: boolean }) {
  const { theme, setTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`theme-switcher${mobile ? " theme-switcher-mobile" : ""}`}
      initial={shouldReduceMotion ? false : { opacity: 0, y: -4 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.35, ease: "easeOut" }}
    >
      {themeOptions.map((option) => {
        const active = theme === option.key;

        return (
          <button
            key={option.key}
            type="button"
            className={`theme-option${active ? " active" : ""}`}
            aria-pressed={active}
            onClick={() => setTheme(option.key)}
          >
            <SwatchIcon theme={option.key} />
            <span>{option.label}</span>
          </button>
        );
      })}
    </motion.div>
  );
}
