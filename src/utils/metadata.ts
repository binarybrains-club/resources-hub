/**
 * Extracts metadata (title and thumbnail) from a given URL by fetching and parsing its HTML.
 * @param url - The URL to extract metadata from
 * @returns Promise resolving to an object containing optional title and thumbnail
 */
export async function extractMetadata(url: string): Promise<{
  title?: string;
  thumbnail?: string;
}> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ResourceHub/1.0)",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    const title = extractTitle(html);
    const thumbnail = extractThumbnail(html);

    return { title, thumbnail };
  } catch (error) {
    console.error(`Failed to extract metadata from ${url}:`, error);
    return {};
  }
}

/**
 * Extracts the title from HTML content.
 * Checks in order: <title> tag, og:title meta property, twitter:title meta name.
 * @param html - The HTML string to parse
 * @returns The extracted title or undefined if not found
 */
function extractTitle(html: string): string | undefined {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    return titleMatch[1].trim();
  }

  const ogTitleMatch = html.match(
    /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i,
  );
  if (ogTitleMatch) {
    return ogTitleMatch[1].trim();
  }

  const twitterTitleMatch = html.match(
    /<meta[^>]*name=["']twitter:title["'][^>]*content=["']([^"']+)["']/i,
  );
  if (twitterTitleMatch) {
    return twitterTitleMatch[1].trim();
  }

  return undefined;
}

/**
 * Extracts the thumbnail/image URL from HTML content.
 * Checks in order: og:image meta property, twitter:image meta name, favicon link.
 * @param html - The HTML string to parse
 * @returns The extracted thumbnail URL or undefined if not found
 */
function extractThumbnail(html: string): string | undefined {
  const ogImageMatch = html.match(
    /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i,
  );
  if (ogImageMatch) {
    return ogImageMatch[1].trim();
  }

  const twitterImageMatch = html.match(
    /<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i,
  );
  if (twitterImageMatch) {
    return twitterImageMatch[1].trim();
  }

  const faviconMatch = html.match(
    /<link[^>]*rel=["'](?:icon|shortcut icon)["'][^>]*href=["']([^"']+)["']/i,
  );
  if (faviconMatch) {
    return faviconMatch[1].trim();
  }

  return undefined;
}
