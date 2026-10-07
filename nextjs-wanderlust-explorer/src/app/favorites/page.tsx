"use client";

import Link from "next/link";
import { ExperienceGrid } from "@/components/experience-grid";
import { Navbar } from "@/components/navbar";
import { useFavorites } from "@/components/favorite-provider";
import { experiences } from "@/data/experiences";

export default function FavoritesPage() {
  const { favoriteIds } = useFavorites();
  const savedExperiences = experiences.filter((experience) => favoriteIds.includes(experience.id));

  return (
    <>
      <Navbar />
      <main className="experiences-page collection-page">
        <div className="experiences-heading">
          <p className="eyebrow eyebrow-dark"><span className="eyebrow-dot" /> TU CUADERNO DE VIAJE</p>
          <h1>Experiencias para volver a encontrar.</h1>
          <p>Guarda aquí las ideas que te gustaría vivir en tu próximo viaje.</p>
          <div className="experiences-count"><strong>{savedExperiences.length}</strong> guardadas</div>
        </div>

        {savedExperiences.length > 0 ? (
          <ExperienceGrid items={savedExperiences} />
        ) : (
          <section className="empty-state" aria-labelledby="favorites-empty-title">
            <span className="empty-state-mark heart-mark" aria-hidden="true">♡</span>
            <h2 id="favorites-empty-title">Tu lista empieza con una idea.</h2>
            <p>Marca el corazón en cualquier experiencia para guardarla aquí.</p>
            <Link className="button button-primary" href="/experiences">Explorar experiencias <span aria-hidden="true">→</span></Link>
          </section>
        )}
        <footer className="experiences-footer"><Link href="/experiences">Descubrir más experiencias →</Link></footer>
      </main>
    </>
  );
}