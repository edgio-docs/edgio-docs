import React, {createContext, useContext, useState, useEffect} from 'react';

import useHydrationIsLoaded from 'utils/hooks/useHydrationIsLoaded';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
  themedValue: (lightValue: any, darkValue: any) => lightValue,
  renderThemedElement: (
    lightElement: React.ReactElement,
    darkElement: React.ReactElement
  ) => <></>,
  renderThemedImage: (
    image: React.ReactElement,
    lightSource: string,
    darkSource: string
  ) => <></>,

  isClient: false,
});

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const isLoaded = useHydrationIsLoaded();

  // Initial state is 'light' as a default
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      let savedTheme = systemTheme; // Use system theme as a default

      try {
        // Attempt to override with saved theme, if it exists
        const localStorageTheme = localStorage.getItem('theme');
        if (localStorageTheme) {
          savedTheme = localStorageTheme;
        }
      } catch (err) {
        console.error('LocalStorage access is restricted:', err);
        // If localStorage is not accessible, we stick with the system theme
      }

      setTheme(savedTheme); // Apply the determined theme
    }
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    // Apply the theme class to document element
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      try {
        localStorage.setItem('theme', theme);
      } catch (err) {
        console.error('LocalStorage access is restricted:', err);
        // If localStorage is not accessible, we silently fail or handle accordingly
      }
    }
  }, [theme, isLoaded]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themedValue = (lightValue: any, darkValue: any) => {
    return theme === 'light' ? lightValue : darkValue;
  };

  const renderThemedElement = (
    lightElement: React.ReactElement,
    darkElement: React.ReactElement
  ) => {
    return (
      <>
        <div hidden={theme !== 'light'}>{lightElement}</div>
        <div hidden={theme !== 'dark'}>{darkElement}</div>
      </>
    );
  };

  const renderThemedImage = (
    image: React.ReactElement,
    lightSource: string,
    darkSource: string
  ) => {
    return (
      <>
        <div hidden={theme !== 'light'}>
          {React.cloneElement(image, {
            src: lightSource,
          })}
        </div>
        <div hidden={theme !== 'dark'}>
          {React.cloneElement(image, {
            src: darkSource,
          })}
        </div>
      </>
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        themedValue,
        renderThemedElement,
        renderThemedImage,
        isClient: isLoaded,
      }}>
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
