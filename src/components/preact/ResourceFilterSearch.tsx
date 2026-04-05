import type { CollectionEntry } from "astro:content";
import { useRef } from "preact/hooks";

import ResourceCard from "@/components/preact/ResourceCard.tsx";

interface Props {
  resources: CollectionEntry<"resources">[];
  tags: string[];
}
export default function ResourceFilterSearch(props: Props) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const tagsSelectRef = useRef<HTMLSelectElement>(null);

  const handleClearFilters = (event: Event) => {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }

    if (tagsSelectRef.current) {
      tagsSelectRef.current.selectedIndex = -1;
    }
  };

  const handlerFilterSearch = async () => {
  };

  return (
    <>
      <div>
        <label for="searchInput">
          Buscar por titulo:
        </label>
        <input
          ref={searchInputRef}
          id="searchInput"
          type="text"
          placeholder="Escribe el titulo del recurso"
        />

        <label>
          Filtrar por etiquetas (mantén Ctrl/Cmd para seleccionar varias):
          <select id="tagsSelect" multiple ref={tagsSelectRef}>
            {props.tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>
        <button type="button" onClick={handleClearFilters}>
          Limpiar filtros
        </button>
      </div>

      <div>
        {props.resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </>
  );
}
