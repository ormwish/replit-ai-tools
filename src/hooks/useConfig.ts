import { useState, useEffect } from 'react';
import { Config } from '../types/config';
import { ConfigLoader } from '../services/configLoader';
import { defaultConfig } from '../config/defaultConfig';
import { handleError } from '../utils/error';

export const useConfig = (configPath: string) => {
  const [config, setConfig] = useState<Config>(defaultConfig);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const configLoader = ConfigLoader.getInstance();
        const loadedConfig = await configLoader.loadConfig(configPath);
        setConfig(loadedConfig);
      } catch (err) {
        setError(handleError(err));
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
  }, [configPath]);

  return { config, error, isLoading };
};