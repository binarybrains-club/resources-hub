import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Collection definition for resources.
 * Contains URL, thumbnail, contributors, dates, and tags.
 */
const resources = defineCollection({
  loader: glob({ base: "./src/content/resources", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string().optional(),
    url: z.url(),
    contributor: z.string().optional(),
    addedDate: z.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  resources,
};
