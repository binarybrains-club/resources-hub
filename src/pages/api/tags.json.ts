import { getCollection } from "astro:content";
import type { APIContext } from "astro";

/**
 * API endpoint for retrieving all unique tags from resources.
 * @returns JSON array of all unique tag strings
 */
export async function GET({ params }: APIContext) {
  const allResources = await getCollection("resources");

  const tags = [
    ...new Set(allResources.flatMap((resource) => resource.data.tags)),
  ];

  return new Response(JSON.stringify(tags), {
    headers: { "Content-Type": "application/json" },
  });
}
