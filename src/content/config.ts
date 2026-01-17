import { defineCollection, z } from 'astro:content';

const resources = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    url: z.string().url(),
    thumbnail: z.string().url().optional(),
    contributors: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    addedDate: z.date().default(new Date()),
    extractedTitle: z.string().optional(),
    extractedThumbnail: z.string().url().optional(),
  })
});

export const collections = {
  resources,
};