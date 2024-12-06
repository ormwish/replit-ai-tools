import { Config } from '../types/config';

export const defaultConfig: Config = {
  contexts: [],
  global: {
    defaultPrompt: 'How can I help you?',
    enabledProviders: ['perplexity', 'phind']
  }
};