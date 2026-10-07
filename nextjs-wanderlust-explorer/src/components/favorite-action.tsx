"use client";

import { FavoriteButton } from "@/components/favorite-button";
import { useFavorites } from "@/components/favorite-provider";

export function FavoriteAction({ experienceId }: { experienceId: number }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <FavoriteButton
      isFavorite={isFavorite(experienceId)}
      onToggle={() => toggleFavorite(experienceId)}
    />
  );
}