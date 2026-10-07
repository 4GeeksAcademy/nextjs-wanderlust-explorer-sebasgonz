"use client";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  const label = isFavorite ? "Quitar de favoritos" : "Añadir a favoritos";

  return (
    <button
      aria-label={label}
      aria-pressed={isFavorite}
      className={isFavorite ? "favorite-button is-favorite" : "favorite-button"}
      onClick={onToggle}
      title={label}
      type="button"
    >
      <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>
    </button>
  );
}