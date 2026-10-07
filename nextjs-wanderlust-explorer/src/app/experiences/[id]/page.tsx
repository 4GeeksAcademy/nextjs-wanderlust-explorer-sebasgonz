import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExperienceGrid } from "@/components/experience-grid";
import { FavoriteAction } from "@/components/favorite-action";
import { Navbar } from "@/components/navbar";
import { experienceCategoryLabels } from "@/data/experience-categories";
import { experiences } from "@/data/experiences";

const euroPrice = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function generateStaticParams() {
  return experiences.map(({ id }) => ({ id: String(id) }));
}

export default function ExperienceDetailPage({ params }: PageProps<"/experiences/[id]">) {
  return (
    <Suspense fallback={<main className="detail-page">Cargando experiencia...</main>}>
      <ExperienceDetailContent params={params} />
    </Suspense>
  );
}

async function ExperienceDetailContent({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const experience = experiences.find((item) => item.id === Number(id));

  if (!experience) {
    notFound();
  }

  const relatedExperiences = experiences
    .filter((item) => item.category === experience.category && item.id !== experience.id)
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="detail-page">
        <Link className="detail-back" href="/experiences">← Volver a experiencias</Link>
        <div className="detail-layout">
          <div className="detail-main">
            <div className="detail-image-wrap">
              <Image
                alt={`${experience.title} en ${experience.destination}`}
                className="detail-image"
                height={1000}
                src={experience.imageUrl}
                unoptimized
                width={1400}
                priority
              />
              <FavoriteAction experienceId={experience.id} />
            </div>
            <div className="detail-copy">
              <p className="detail-category">{experienceCategoryLabels[experience.category]}</p>
              <h1>{experience.title}</h1>
              <p className="detail-location">{experience.destination}</p>
              <p className="detail-description">{experience.description}</p>
              <div className="detail-facts" aria-label="Información de la experiencia">
                <div>
                  <span className="detail-fact-label">Valoración</span>
                  <strong><span aria-hidden="true">★</span> {experience.rating.toFixed(1)} / 5</strong>
                </div>
                <div>
                  <span className="detail-fact-label">Categoría</span>
                  <strong>{experienceCategoryLabels[experience.category]}</strong>
                </div>
                <div>
                  <span className="detail-fact-label">Precio por persona</span>
                  <strong>{euroPrice.format(experience.price)}</strong>
                </div>
              </div>
            </div>
          </div>
          <aside className="detail-aside">
            <p className="detail-aside-label">TU PRÓXIMA HISTORIA</p>
            <h2>Un destino, otra forma de vivirlo.</h2>
            <p>Guarda esta experiencia para tenerla a mano cuando planifiques tu viaje.</p>
            <FavoriteAction experienceId={experience.id} />
            <span className="detail-aside-price">{euroPrice.format(experience.price)} <small>/ persona</small></span>
          </aside>
        </div>

        {relatedExperiences.length > 0 && (
          <section className="related-section" aria-labelledby="related-title">
            <div className="experience-section-heading">
              <h2 id="related-title">También te puede gustar</h2>
              <Link href={`/experiences?category=${experience.category}`}>Ver categoría →</Link>
            </div>
            <ExperienceGrid className="related-grid" items={relatedExperiences} />
          </section>
        )}
      </main>
    </>
  );
}