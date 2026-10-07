"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ExperienceGrid } from "@/components/experience-grid";
import { FilterBar } from "@/components/filter-bar";
import { SearchBar } from "@/components/search-bar";
import { experienceCategories } from "@/data/experience-categories";
import { experiences, type ExperienceCategory } from "@/data/experiences";
import { useExperiences, type ExperienceFilters } from "@/hooks/use-experiences";

function readFilters(params: URLSearchParams): ExperienceFilters {
  const category = params.get("category") ?? "";
  return {
    q: params.get("q") ?? "",
    category: experienceCategories.includes(category as ExperienceCategory)
      ? (category as ExperienceCategory)
      : "",
    destination: params.get("destination") ?? "",
  };
}

export function ExperienceExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState(() =>
    readFilters(new URLSearchParams(searchParams.toString())),
  );

  const destinations = [
    ...new Set(
      experiences.flatMap(({ destination }) => [
        destination,
        ...destination.split(",").map((part) => part.trim()),
      ]),
    ),
  ].sort((a, b) => a.localeCompare(b, "es"));

  useEffect(() => {
    function restoreFiltersFromUrl() {
      setFilters(readFilters(new URLSearchParams(window.location.search)));
    }

    window.addEventListener("popstate", restoreFiltersFromUrl);
    return () => window.removeEventListener("popstate", restoreFiltersFromUrl);
  }, []);

  function updateFilters(nextFilters: ExperienceFilters) {
    setFilters(nextFilters);
    const params = new URLSearchParams();
    if (nextFilters.q) params.set("q", nextFilters.q);
    if (nextFilters.category) params.set("category", nextFilters.category);
    if (nextFilters.destination) params.set("destination", nextFilters.destination);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  const filteredExperiences = useExperiences(filters);

  const hasFilters = Boolean(filters.q || filters.category || filters.destination);

  return (
    <main className="experiences-page">
      <div className="experiences-heading">
        <p className="eyebrow eyebrow-dark"><span className="eyebrow-dot" /> IDEAS PARA TU PRÓXIMO VIAJE</p>
        <h1>Experiencias que se quedan contigo.</h1>
        <p>Busca entre propuestas locales de aventura, cultura, gastronomía, bienestar y naturaleza.</p>
        <div className="experiences-count">
          <strong>{experiences.length}</strong> experiencias <span>·</span> 5 formas de viajar
        </div>
      </div>

      <section className="explorer-controls" aria-label="Buscar y filtrar experiencias">
        <SearchBar
          onChange={(q) => updateFilters({ ...filters, q })}
          value={filters.q}
        />
        <FilterBar
          category={filters.category}
          destination={filters.destination}
          destinations={destinations}
          onCategoryChange={(category) => updateFilters({ ...filters, category })}
          onDestinationChange={(destination) => updateFilters({ ...filters, destination })}
        />
      </section>

      <div className="results-bar">
        <p aria-live="polite">
          <strong>{filteredExperiences.length}</strong> {filteredExperiences.length === 1 ? "experiencia" : "experiencias"}
          {hasFilters ? " encontradas" : " para descubrir"}
        </p>
        {hasFilters && (
          <button className="clear-filters" onClick={() => updateFilters({ q: "", category: "", destination: "" })} type="button">
            Limpiar filtros <span aria-hidden="true">×</span>
          </button>
        )}
      </div>

      {filteredExperiences.length > 0 ? (
        <ExperienceGrid items={filteredExperiences} />
      ) : (
        <div className="empty-state">
          <span className="empty-state-mark" aria-hidden="true">⌕</span>
          <h2>No se encontraron resultados</h2>
          <p>Prueba con otro destino o una búsqueda más amplia.</p>
          <button className="button button-primary" onClick={() => updateFilters({ q: "", category: "", destination: "" })} type="button">
            Ver todas las experiencias
          </button>
        </div>
      )}
      <footer className="experiences-footer"><span>Wanderlust Explorer</span><span>100 maneras de vivir el mundo</span></footer>
    </main>
  );
}