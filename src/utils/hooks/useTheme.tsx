import useHydrationIsLoaded from './useHydrationIsLoaded';

// This component does not re-render because the "state", is attached to the window object.
// Technically, Outer scope values like 'window' aren't valid dependencies because mutating them doesn't re-render the
export default function useTheme() {
  const isLoaded = useHydrationIsLoaded();
  const theme = isLoaded ? window.__theme : 'light';
  const setTheme = isLoaded ? window.__setPreferredTheme : () => {};

  return {theme, setTheme};
}
