import type { CollectionEntry } from 'astro:content';

interface Props {
  resource: CollectionEntry<'resources'>;
}

export default function ResourceCard({ resource }: Props) {
  return (
    <div>
      <h3>
        <a href={resource.data.url} target='_blank' rel='noopener noreferrer'>
          {resource.data.title || resource.data.url}
        </a>
      </h3>
      {resource.data.contributor && (
        <p>
          Contributor:
          <a
            href={`https://github.com/${resource.data.contributor}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src={`https://github.com/${resource.data.contributor}.png`}
              alt={`${resource.data.contributor}'s avatar`}
            />

            {resource.data.contributor}
          </a>
        </p>
      )}

      {resource.data.tags.length > 0 && (
        <p>
          Tags: {resource.data.tags.map((tag: string) => (
            <a
              href={`/resources-hub/tags/${encodeURIComponent(tag)}`}
              key={tag}
            >
              {tag}
            </a>
          ))}
        </p>
      )}

      <p>Added on: {new Date(resource.data.addedDate).toLocaleDateString()}</p>
    </div>
  );
}
