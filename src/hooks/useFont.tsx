import { useState, useLayoutEffect } from 'react';

export function useFont(fontFamily: string) {
  const [isLoaded, setIsLoaded] = useState(false);

  useLayoutEffect(() => {
    // Check if already loaded
    if (document.fonts.check(`12px "${fontFamily}"`)) {
      setIsLoaded(true);
      return;
    }

    // Load specifically
    document.fonts.load(`12px "${fontFamily}"`).then(() => {
      setIsLoaded(true);
    });
  }, [fontFamily]);

  return isLoaded;
}
