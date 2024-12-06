import { useState, useCallback } from 'react';
import { AIProviderRegistry } from '../services/ai/providerRegistry';
import { Message } from '../types/ai';
import { ENV } from '../config/env';

export const useAI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const registry = AIProviderRegistry.getInstance();

  const generateResponse = useCallback(async (
    prompt: string,
    providerId: string,
    context?: string
  ) => {
    const provider = registry.getProvider(providerId);
    if (!provider) {
      throw new Error(`Provider ${providerId} not found`);
    }

    setIsGenerating(true);
    try {
      const response = await provider.generateResponse(prompt, context);
      setMessages(prev => [...prev, response]);
      return response;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const streamResponse = useCallback(async function* (
    prompt: string,
    providerId: string,
    context?: string
  ) {
    const provider = registry.getProvider(providerId);
    if (!provider) {
      throw new Error(`Provider ${providerId} not found`);
    }

    setIsGenerating(true);
    try {
      for await (const chunk of provider.streamResponse(prompt, context)) {
        yield chunk;
      }
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return {
    messages,
    isGenerating,
    generateResponse,
    streamResponse,
  };
};