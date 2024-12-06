import { AIProvider, AIProviderConfig } from '../../types/ai';
import { PerplexityProvider } from './perplexityProvider';
import { PhindProvider } from './phindProvider';

export class AIProviderRegistry {
  private static instance: AIProviderRegistry;
  private providers: Map<string, AIProvider> = new Map();

  private constructor() {}

  static getInstance(): AIProviderRegistry {
    if (!AIProviderRegistry.instance) {
      AIProviderRegistry.instance = new AIProviderRegistry();
    }
    return AIProviderRegistry.instance;
  }

  registerProvider(provider: AIProvider): void {
    this.providers.set(provider.id, provider);
  }

  getProvider(id: string): AIProvider | undefined {
    return this.providers.get(id);
  }

  getAllProviders(): AIProvider[] {
    return Array.from(this.providers.values());
  }

  static initializeDefaultProviders(config: AIProviderConfig): AIProviderRegistry {
    const registry = AIProviderRegistry.getInstance();
    registry.registerProvider(new PerplexityProvider(config));
    registry.registerProvider(new PhindProvider(config));
    return registry;
  }
}