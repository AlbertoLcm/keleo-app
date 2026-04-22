import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type Theme = "light" | "dark" | "system";
const THEME_KEY = "keleo-theme";

const LIGHT_COLOR = "#ffffff";
const DARK_COLOR = "#020617";

interface ThemeContextType {
  theme: Theme;
  actualTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(THEME_KEY) as Theme;
    if (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system") {
        return storedTheme;
    }
    return "system";
  });

  const [actualTheme, setActualTheme] = useState<"light" | "dark">("light");

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    const isDarkOS = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const resolvedTheme = theme === "system" ? (isDarkOS ? "dark" : "light") : theme as "light" | "dark";
    setActualTheme(resolvedTheme);

    if (resolvedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    let metaThemeColor = document.querySelector("meta[name='theme-color']");

    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.setAttribute("name", "theme-color");
      document.head.appendChild(metaThemeColor);
    }

    const newColor = resolvedTheme === "dark" ? DARK_COLOR : LIGHT_COLOR;
    metaThemeColor.setAttribute("content", newColor);

    const metaApple = document.querySelector(
      "meta[name='apple-mobile-web-app-status-bar-style']",
    );
    if (metaApple) {
      metaApple.setAttribute(
        "content",
        resolvedTheme === "dark" ? "black-translucent" : "default",
      );
    }
  }, [theme]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === THEME_KEY && (e.newValue === "light" || e.newValue === "dark" || e.newValue === "system")) {
        setThemeState(e.newValue);
      }
    };
    
    const handleMediaChange = () => {
      if (theme === "system") {
        // Trigger a re-render to recalculate the actual theme
        setThemeState("system"); 
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, actualTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
