import React, {createContext, useContext, useState, useEffect} from 'react';
import useHydrationIsLoaded from 'utils/hooks/useHydrationIsLoaded';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {
    console.log('initial toggle');
  },
  themedValue: (lightValue: any, darkValue: any) => lightValue,
  isClient: false,
});

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const isLoaded = useHydrationIsLoaded();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme =
        localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light');
      setTheme(savedTheme);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    // Apply the theme class to document element and save to localStorage
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme, isLoaded]);

  const toggleTheme = () => {
    console.log('toggling theme');
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Function to return a value based on the current theme
  const themedValue = (lightValue: any, darkValue: any) => {
    return theme === 'light' ? lightValue : darkValue;
  };

  return (
    <ThemeContext.Provider
      value={{theme, toggleTheme, themedValue, isClient: isLoaded}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
