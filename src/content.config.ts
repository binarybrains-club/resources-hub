import { defineCollection } from "astro:content";
import { z } from "astro/zod";

/**
 * Collection definition for resources.
 * Contains URL, thumbnail, contributors, dates, and tags.
 */
const resources = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().optional(),
    url: z.url(),
    thumbnail: z.url().optional(),
    contributors: z.array(z.string()).default([]),
    addedDate: z.date().default(new Date()),
    tags: z.array(z.string()).default([]),
    extractedTitle: z.string().optional(),
    extractedThumbnail: z.url().optional(),
  }),
});

export const collections = {
  resources,
};
