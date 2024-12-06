import { z } from 'zod';

export const ConfigSchema = z.object({
  contexts: z.array(z.object({
    name: z.string(),
    pattern: z.string(),
    prompt: z.string(),
    triggers: z.array(z.string()).optional(),
    searchProviders: z.array(z.enum(['perplexity', 'phind'])).optional()
  })),
  global: z.object({
    defaultPrompt: z.string().optional(),
    enabledProviders: z.array(z.enum(['perplexity', 'phind'])).optional()
  }).optional()
});

export type Config = z.infer<typeof ConfigSchema>;