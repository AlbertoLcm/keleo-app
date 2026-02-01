import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';
const THEME_KEY = 'keleo-theme';

// COLORES EXACTOS (Asegúrate que coincidan con tu CSS)
const LIGHT_COLOR = '#ffffff'; 
const DARK_COLOR = '#020617'; // Ejemplo Slate-950. Cámbialo por tu color real.

export default function useDarkMode() {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(THEME_KEY) as Theme;
    if (storedTheme) return storedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // 1. Aplicar clase al HTML
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // 2. Gestionar la etiqueta meta theme-color dinámicamente
    let metaThemeColor = document.querySelector("meta[name='theme-color']");
    
    // Si no existe, la creamos al vuelo (esto soluciona el problema de que no la encuentre)
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }

    // 3. Establecer el color
    const newColor = theme === 'dark' ? DARK_COLOR : LIGHT_COLOR;
    metaThemeColor.setAttribute('content', newColor);

    // 4. Hack para Safari/iOS (opcional pero recomendado)
    // Cambia el estilo de la barra de estado en iOS
    const metaApple = document.querySelector("meta[name='apple-mobile-web-app-status-bar-style']");
    if (metaApple) {
        metaApple.setAttribute('content', theme === 'dark' ? 'black-translucent' : 'default');
    }

    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
};