import { experienceCategories, experienceCategoryLabels } from "@/data/experience-categories";
import type { ExperienceCategory } from "@/data/experiences";

interface FilterBarProps {
  category: ExperienceCategory | "";
  destination: string;
  destinations: string[];
  onCategoryChange: (category: ExperienceCategory | "") => void;
  onDestinationChange: (destination: string) => void;
}

export function FilterBar({
  category,
  destination,
  destinations,
  onCategoryChange,
  onDestinationChange,
}: FilterBarProps) {
  return (
    <>
      <label className="filter-field" htmlFor="experience-category">
        <span>Categoría</span>
        <select
          id="experience-category"
          onChange={(event) => onCategoryChange(event.target.value as ExperienceCategory | "")}
          value={category}
        >
          <option value="">Todas las categorías</option>
          {experienceCategories.map((item) => (
            <option key={item} value={item}>{experienceCategoryLabels[item]}</option>
          ))}
        </select>
      </label>
      <label className="filter-field" htmlFor="experience-destination">
        <span>Destino: ciudad o país</span>
        <input
          autoComplete="off"
          id="experience-destination"
          list="experience-destinations"
          onChange={(event) => onDestinationChange(event.target.value)}
          placeholder="Ej. Bolonia o Italia"
          type="search"
          value={destination}
        />
        <datalist id="experience-destinations">
          {destinations.map((item) => <option key={item} value={item} />)}
        </datalist>
      </label>
    </>
  );
}