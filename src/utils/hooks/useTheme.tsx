import {useEffect, useState, useCallback} from 'react';
import useHydrationIsLoaded from './useHydrationIsLoaded';

export default function useTheme() {
  const isLoaded = useHydrationIsLoaded();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (!isLoaded) return;

    const savedTheme =
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');
    setTheme(savedTheme);

    document.documentElement.classList.add(savedTheme);
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme, isLoaded]);

  /**
   * Toggles the theme between light and dark
   */
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  /**
   * Returns the element to render based on the current theme
   * @param lightValue The value to render when the theme is light
   * @param darkValue The value to render when the theme is dark
   * @returns The value to render
   */
  const themedValue = (theme: string, lightValue: any, darkValue: any) => {
    console.log('rendering themed value', lightValue, darkValue);
    return theme === 'light' ? lightValue : darkValue;
  };

  return {
    theme,
    toggleTheme,
    themedValue,
  };
}
