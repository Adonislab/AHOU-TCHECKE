import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'awu-tchecke-theme';

const readInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark';

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;

  // Le sombre reste le defaut quand l'OS n'exprime pas de preference.
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

export default function useTheme() {
  const [theme, setTheme] = useState(readInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    // Aligne les controles natifs (scrollbars, inputs) sur le theme choisi.
    root.style.colorScheme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme };
}
