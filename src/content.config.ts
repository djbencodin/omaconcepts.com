import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const apps = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/apps' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    description: z.string(),
    icon: z.string(),
    status: z.enum(['coming-soon', 'in-development', 'live']),
    platforms: z.array(z.string()),
    clickable: z.boolean().default(false),
    hasDetailPage: z.boolean().default(false),
    order: z.number().default(99),
    /** Number of leading characters of the name to render in amber on the detail-page wordmark (e.g. "Ph" of PhoodScout). */
    wordmarkAccent: z.number().default(0),
  }),
});

export const collections = { apps };
