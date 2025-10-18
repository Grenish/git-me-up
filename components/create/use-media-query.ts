"use client";

import { useEffect, useState } from "react";

// Responsive media query hook (Safari-safe)
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();

    if (m.addEventListener) {
      m.addEventListener("change", onChange);
      return () => m.removeEventListener("change", onChange);
    } else {
      // Legacy Safari fallback
      m.addListener(onChange);
      return () => m.removeListener(onChange);
    }
  }, [query]);

  return matches;
}
