import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type Theme = "light" | "dark";
const THEME_KEY = "keleo-theme";

const LIGHT_COLOR = "#ffffff";
const DARK_COLOR = "#020617";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(THEME_KEY) as Theme;
    if (storedTheme) return storedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
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

    const newColor = theme === "dark" ? DARK_COLOR : LIGHT_COLOR;
    metaThemeColor.setAttribute("content", newColor);

    const metaApple = document.querySelector(
      "meta[name='apple-mobile-web-app-status-bar-style']",
    );
    if (metaApple) {
      metaApple.setAttribute(
        "content",
        theme === "dark" ? "black-translucent" : "default",
      );
    }
  }, [theme]);

  // Sync theme across different tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === THEME_KEY && (e.newValue === "light" || e.newValue === "dark")) {
        setThemeState(e.newValue);
      }
    };
    
    // Sync with system preferences if no theme is strictly set yet (or follow if user wants system default)
    const handleMediaChange = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem(THEME_KEY)) {
            setThemeState(e.matches ? "dark" : "light");
        }
    };

    window.addEventListener("storage", handleStorageChange);
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
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
