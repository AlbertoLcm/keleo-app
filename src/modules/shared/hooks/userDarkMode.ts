import { useTheme } from "../contexts/ThemeContext";

export default function useDarkMode() {
  const { theme, toggleTheme } = useTheme();
  return { theme, toggleTheme };
}

