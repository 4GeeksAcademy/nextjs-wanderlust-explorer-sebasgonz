"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface FavoriteContextValue {
  favoriteIds: number[];
  isFavorite: (experienceId: number) => boolean;
  toggleFavorite: (experienceId: number) => void;
}

const FavoriteContext = createContext<FavoriteContextValue | null>(null);
const storageKey = "wanderlust-favorite-experiences";

function readSavedFavorites(): number[] {
  try {
    const saved = window.localStorage.getItem(storageKey);
    const parsed: unknown = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed)
      ? [...new Set(parsed.filter((id): id is number => Number.isSafeInteger(id) && id > 0))]
      : [];
  } catch {
    return [];
  }
}

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setFavoriteIds(readSavedFavorites());
      setIsHydrated(true);
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(favoriteIds));
    } catch {
      return;
    }
  }, [favoriteIds, isHydrated]);

  function toggleFavorite(experienceId: number) {
    setFavoriteIds((current) =>
      current.includes(experienceId)
        ? current.filter((id) => id !== experienceId)
        : [...current, experienceId],
    );
  }

  const value: FavoriteContextValue = {
    favoriteIds,
    isFavorite: (experienceId) => favoriteIds.includes(experienceId),
    toggleFavorite,
  };

  return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoriteProvider");
  }
  return context;
}