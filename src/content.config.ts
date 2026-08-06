import { defineCollection, z } from 'astro:content';

const links = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    domain: z.string(),
    raindrop_id: z.union([z.string(), z.number()]).optional(),
    captured_at: z.string().datetime().optional(),
    proposed_at: z.string().datetime(),
    published_at: z.string().nullable().optional(),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    status: z.enum(['proposed', 'published']).default('proposed'),
    source: z.enum(['raindrop', 'obsidian-vault-raindrop', 'manual']).default('raindrop')
  })
});

export const collections = { links };
