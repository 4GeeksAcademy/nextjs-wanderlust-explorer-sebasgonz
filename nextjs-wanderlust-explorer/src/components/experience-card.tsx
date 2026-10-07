"use client";

import Image from "next/image";
import Link from "next/link";
import type { Experience } from "@/data/experiences";
import { experienceCategoryLabels } from "@/data/experience-categories";
import { FavoriteButton } from "@/components/favorite-button";

const euroPrice = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

interface ExperienceCardProps {
  experience: Experience;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function ExperienceCard({
  experience,
  isFavorite,
  onToggleFavorite,
}: ExperienceCardProps) {
  return (
    <article className="experience-card">
      <div className="experience-photo">
        <Image
          alt={`${experience.title}, ${experience.destination}`}
          height={600}
          src={experience.imageUrl}
          unoptimized
          width={800}
        />
        <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
      </div>
      <Link className="experience-card-link" href={`/experiences/${experience.id}`}>
        <div className="experience-card-body">
          <div className="experience-card-meta">
            <span>{experienceCategoryLabels[experience.category]}</span>
            <span className="experience-rating">
              <span aria-hidden="true">★</span> {experience.rating.toFixed(1)}
            </span>
          </div>
          <h3>{experience.title}</h3>
          <p className="experience-description">{experience.description}</p>
          <p className="experience-destination">{experience.destination}</p>
          <p className="experience-price">
            {euroPrice.format(experience.price)} <span>/ persona</span>
          </p>
        </div>
      </Link>
    </article>
  );
}