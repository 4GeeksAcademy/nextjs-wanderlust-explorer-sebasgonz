import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { experiences } from "@/data/experiences";

const categories = [
  { name: "Aventura", category: "Adventure", detail: "Muévete" },
  { name: "Cultura", category: "Culture", detail: "Conecta" },
  { name: "Gastronomía", category: "Food", detail: "Saborea" },
  { name: "Bienestar", category: "Wellness", detail: "Desconecta" },
  { name: "Naturaleza", category: "Nature", detail: "Respira" },
];

export default function Home() {
  const averageRating = (
    experiences.reduce((total, experience) => total + experience.rating, 0) /
    experiences.length
  ).toFixed(1);

  return (
    <>
      <Navbar />

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow"><span className="eyebrow-dot" /> VIAJAR, SENTIR, DESCUBRIR</p>
            <h1 id="hero-title">El mundo se descubre mejor de cerca.</h1>
            <p className="hero-copy">
              Encuentra experiencias creadas por personas locales y vive cada
              destino más allá de lo esperado.
            </p>
            <Link className="button button-primary" href="/experiences">
              Explorar experiencias <span aria-hidden="true">→</span>
            </Link>
            <p className="hero-note">Tu próxima historia empieza aquí.</p>
          </div>
          <div className="hero-caption">
            <span className="caption-line" />
            <span>Una pausa frente al Mediterráneo</span>
          </div>
          <a className="hero-scroll" href="#formas-de-viajar" aria-label="Descubrir formas de viajar">
            <span aria-hidden="true">↓</span>
          </a>
        </section>

        <section className="discovery-strip" id="formas-de-viajar" aria-label="Explora por categoría">
          <div className="discovery-intro">
            <span className="strip-label">ENCUENTRA TU RITMO</span>
            <span className="strip-count">{experiences.length} experiencias para vivir</span>
          </div>
          <div className="category-links">
            {categories.map((category, index) => (
              <Link className="category-link" href={`/experiences?category=${category.category}`} key={category.category}>
                <span className="category-number">0{index + 1}</span>
                <span className="category-name">{category.name}</span>
                <span className="category-detail">{category.detail}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="home-signoff" aria-label="La selección de Wanderlust">
          <p>Pequeños momentos. Grandes recuerdos.</p>
          <span>Valoración media de viajeros: {averageRating} / 5</span>
        </section>
      </main>
    </>
  );
}