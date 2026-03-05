/**
 * Content collection configuration for the resources hub.
 * Defines the schema and collection types for Astro content.
 */
import { defineCollection, z } from 'astro:content';

/**
 * Collection definition for resources.
 * Contains URL, thumbnail, contributors, dates, and tags.
 */
const resources = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    url: z.string().url(),
    thumbnail: z.string().url().optional(),
    contributors: z.array(z.string()).default([]),
    addedDate: z.date().default(new Date()),
    tags: z.array(z.string()).default([]),
    extractedTitle: z.string().optional(),
    extractedThumbnail: z.string().url().optional(),
  })
});

export const collections = {
  resources,
};
