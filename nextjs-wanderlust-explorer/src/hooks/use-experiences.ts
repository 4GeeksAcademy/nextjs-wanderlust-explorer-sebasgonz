import { experiences, type ExperienceCategory } from "@/data/experiences";

export interface ExperienceFilters {
  q: string;
  category: ExperienceCategory | "";
  destination: string;
}

function escapeRegExp(term: string) {
  return term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function useExperiences(filters: ExperienceFilters) {
  const titlePattern = filters.q.trim()
    ? new RegExp(escapeRegExp(filters.q.trim()), "i")
    : null;
  const normalizedDestination = filters.destination.trim().toLocaleLowerCase("es");

  return experiences.filter((experience) => {
    const matchesCategory = !filters.category || experience.category === filters.category;
    const matchesDestination = !normalizedDestination ||
      experience.destination.toLocaleLowerCase("es").includes(normalizedDestination);
    const matchesTitle = !titlePattern || titlePattern.test(experience.title);
    return matchesCategory && matchesDestination && matchesTitle;
  });
}