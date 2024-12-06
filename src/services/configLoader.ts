import { parse } from 'yaml';
import { Config, ConfigSchema } from '../types/config';

export class ConfigLoader {
  private static instance: ConfigLoader;
  private configCache: Map<string, Config> = new Map();

  private constructor() {}

  static getInstance(): ConfigLoader {
    if (!ConfigLoader.instance) {
      ConfigLoader.instance = new ConfigLoader();
    }
    return ConfigLoader.instance;
  }

  async loadConfig(path: string): Promise<Config> {
    if (this.configCache.has(path)) {
      return this.configCache.get(path)!;
    }

    try {
      const response = await fetch(path);
      const yamlContent = await response.text();
      const parsedConfig = parse(yamlContent);
      const validatedConfig = ConfigSchema.parse(parsedConfig);
      
      this.configCache.set(path, validatedConfig);
      return validatedConfig;
    } catch (error) {
      console.error('Error loading config:', error);
      throw error;
    }
  }

  clearCache() {
    this.configCache.clear();
  }
}