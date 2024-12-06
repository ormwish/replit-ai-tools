import { z } from 'zod';

export const MessageSchema = z.object({
  id: z.string(),
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
  createdAt: z.date(),
});

export type Message = z.infer<typeof MessageSchema>;

export interface AIProvider {
  id: string;
  name: string;
  generateResponse(prompt: string, context?: string): Promise<Message>;
  streamResponse(prompt: string, context?: string): AsyncIterableIterator<string>;
}

export interface AIProviderConfig {
  apiKey?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}