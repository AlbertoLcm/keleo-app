import { useTheme } from "../contexts/ThemeContext";

export default function useDarkMode() {
  const { theme, setTheme } = useTheme();
  return { theme, setTheme };
}

