"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { useFavorites } from "@/components/favorite-provider";

export default function ProfilePage() {
  const { favoriteIds } = useFavorites();

  return (
    <>
      <Navbar />
      <main className="profile-page">
        <div className="profile-heading">
          <p className="eyebrow eyebrow-dark"><span className="eyebrow-dot" /> TU ESPACIO</p>
          <h1>Tu próxima historia toma forma.</h1>
        </div>

        <div className="profile-layout">
          <section className="profile-identity" aria-labelledby="profile-name">
            <div className="profile-avatar" aria-hidden="true">AM</div>
            <p className="profile-kicker">PERFIL DE VIAJERO</p>
            <h2 id="profile-name">Alex Morgan</h2>
            <p className="profile-description">Viajero explorador</p>
            <Link className="text-link" href="/experiences">Descubrir experiencias <span aria-hidden="true">→</span></Link>
          </section>

          <section className="profile-saved" aria-labelledby="saved-count-title">
            <div className="profile-saved-top">
              <div>
                <p className="profile-kicker">TU COLECCIÓN</p>
                <h2 id="saved-count-title">Experiencias guardadas</h2>
              </div>
              <span className="profile-count" aria-live="polite">{favoriteIds.length}</span>
            </div>
            <p className="profile-saved-copy">
              {favoriteIds.length === 0
                ? "Todavía no has guardado experiencias. Explora el catálogo y crea tu propia lista."
                : `${favoriteIds.length} ${favoriteIds.length === 1 ? "idea guardada" : "ideas guardadas"} para tu próximo viaje.`}
            </p>
            <Link className="button button-primary" href="/favorites">
              Ver favoritos <span aria-hidden="true">→</span>
            </Link>
          </section>
        </div>
        <footer className="experiences-footer"><span>Wanderlust Explorer</span><span>Tu viaje, a tu manera</span></footer>
      </main>
    </>
  );
}