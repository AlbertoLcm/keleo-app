import { Moon, Sun } from "lucide-react";
import useDarkMode from "../hooks/userDarkMode";

export default function ToggleDarkMode() {
  const { theme, toggleTheme } = useDarkMode();
  const isDarkMode = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="
      transition-transform duration-150 active:scale-90
      cursor-pointer w-10 h-10 rounded-full bg-keleo-50 dark:bg-dark-card text-gray-500 
      dark:text-yellow-400 hover:bg-keleo-100 dark:hover:bg-gray-700 
      flex items-center justify-center outline-none"
    >
      {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
