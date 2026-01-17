import { extractMetadata } from '../../utils/metadata';

export async function POST({ request }: { request: Request }) {
  try {
    const { url } = await request.json();
    
    if (!url || typeof url !== 'string') {
      return new Response(JSON.stringify({ error: 'URL is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const metadata = await extractMetadata(url);
    
    return new Response(JSON.stringify(metadata), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to extract metadata' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}