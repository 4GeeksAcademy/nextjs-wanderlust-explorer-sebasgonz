"use client";

import type { Experience } from "@/data/experiences";
import { ExperienceCard } from "@/components/experience-card";
import { useFavorites } from "@/components/favorite-provider";

export function ExperienceGrid({
  items,
  className = "",
}: {
  items: Experience[];
  className?: string;
}) {
  const { favoriteIds, toggleFavorite } = useFavorites();

  return (
    <div className={`experience-grid ${className}`.trim()}>
      {items.map((experience) => (
        <ExperienceCard
          experience={experience}
          isFavorite={favoriteIds.includes(experience.id)}
          key={experience.id}
          onToggleFavorite={() => toggleFavorite(experience.id)}
        />
      ))}
    </div>
  );
}