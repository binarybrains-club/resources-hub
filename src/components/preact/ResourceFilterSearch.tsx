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

  const handlerFilterSearch = async () => {
    const url = new URL("/api/resources.json", globalThis.location.origin);
    if (searchInputRef.current?.value) {
      url.searchParams.append("title", searchInputRef.current.value.trim());
    }

    if (tagsSelectRef.current) {
      const selectedTags = Array.from(tagsSelectRef.current.selectedOptions)
        .map(
          (option) => option.value,
        );
      selectedTags.forEach((tag) => url.searchParams.append("tags", tag));
    }

    console.log("Fetching filtered resources with URL:", url.toString());

    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();

    if (response.ok) {
      currentResources.value = data.data;
    } else {
      console.error("Error fetching filtered resources:", data.message);
    }
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
