import {useState, useEffect} from 'react';

// Hydration issues: client v. Server.
export default function useHydrationIsLoaded() {
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  return isLoaded;
}
