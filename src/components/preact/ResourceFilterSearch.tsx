import type { CollectionEntry } from "astro:content";
import { useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";

import ResourceCard from "@/components/preact/ResourceCard.tsx";

interface Props {
  resources: CollectionEntry<"resources">[];
  tags: string[];
}

export default function ResourceFilterSearch(props: Props) {
  const currentResources = useSignal<CollectionEntry<"resources">[]>(
    props.resources,
  );

  const searchInputRef = useRef<HTMLInputElement>(null);
  const tagsSelectRef = useRef<HTMLSelectElement>(null);

  const handleClearFilters = (_event: Event) => {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }

    if (tagsSelectRef.current) {
      tagsSelectRef.current.selectedIndex = -1;
    }

    currentResources.value = props.resources;
  };

  const handlerFilterSearch = () => {
    const searchTerm = searchInputRef.current?.value.toLowerCase() || "";
    const selectedTags = Array.from(
      tagsSelectRef.current?.selectedOptions || [],
    ).map((option) => option.value);

    currentResources.value = props.resources.filter((resource) => {
      const matchesTitle = resource.data.title
        ? resource.data.title.toLowerCase().includes(searchTerm)
        : false;

      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every((tag) => resource.data.tags.includes(tag));

      return matchesTitle && matchesTags;
    });
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
          onInput={handlerFilterSearch}
        />

        <label>
          Filtrar por etiquetas (mantén Ctrl/Cmd para seleccionar varias):
          <select
            id="tagsSelect"
            multiple
            ref={tagsSelectRef}
            onChange={handlerFilterSearch}
          >
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
        {currentResources.value.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </>
  );
}
