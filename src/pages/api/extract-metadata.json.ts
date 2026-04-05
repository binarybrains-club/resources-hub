import { extractMetadata } from '@/utils/metadata.ts';
import type { APIContext } from 'astro';

/**
 * API endpoint for extracting metadata from a URL.
 * Accepts POST request with a URL and returns extracted title and thumbnail.
 * @returns JSON response with metadata or error message
 */
export async function POST({ request }: APIContext) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return new Response(JSON.stringify({ error: 'URL is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const metadata = await extractMetadata(url);

    return new Response(JSON.stringify(metadata), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (_error) {
    return new Response(
      JSON.stringify({ error: 'Failed to extract metadata' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
