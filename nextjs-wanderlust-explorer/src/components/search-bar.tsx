interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="filter-field filter-search" htmlFor="experience-search">
      <span>Buscar por título</span>
      <input
        autoComplete="off"
        id="experience-search"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ej. cocina local, globo, yoga..."
        type="search"
        value={value}
      />
    </label>
  );
}