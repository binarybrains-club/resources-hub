import { getCollection } from 'astro:content';

export async function GET() {
  const allResources = await getCollection('resources');
  const tags = [...new Set(allResources.flatMap(resource => resource.data.tags))];
  
  return new Response(JSON.stringify(tags), {
    headers: { 'Content-Type': 'application/json' }
  });
}