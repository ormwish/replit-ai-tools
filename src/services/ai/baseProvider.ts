import { AIProvider, AIProviderConfig, Message } from '../../types/ai';

export abstract class BaseAIProvider implements AIProvider {
  protected config: AIProviderConfig;

  constructor(config: AIProviderConfig) {
    this.config = config;
  }

  abstract get id(): string;
  abstract get name(): string;
  
  abstract generateResponse(prompt: string, context?: string): Promise<Message>;
  abstract streamResponse(prompt: string, context?: string): AsyncIterableIterator<string>;

  protected createMessage(content: string, role: 'user' | 'assistant' | 'system' = 'assistant'): Message {
    return {
      id: crypto.randomUUID(),
      role,
      content,
      createdAt: new Date(),
    };
  }
}