import { BaseAIProvider } from './baseProvider';
import { Message } from '../../types/ai';
import { createParser } from '@vercel/ai-core';

export class PhindProvider extends BaseAIProvider {
  get id() {
    return 'phind';
  }

  get name() {
    return 'Phind';
  }

  async generateResponse(prompt: string, context?: string): Promise<Message> {
    const response = await fetch('https://api.phind.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        messages: [
          ...(context ? [{ role: 'system', content: context }] : []),
          { role: 'user', content: prompt },
        ],
      }),
    });

    const data = await response.json();
    return this.createMessage(data.choices[0].message.content);
  }

  async *streamResponse(prompt: string, context?: string): AsyncIterableIterator<string> {
    const response = await fetch('https://api.phind.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        messages: [
          ...(context ? [{ role: 'system', content: context }] : []),
          { role: 'user', content: prompt },
        ],
        stream: true,
      }),
    });

    const parser = createParser(chunk => chunk);
    for await (const chunk of parser.parse(response)) {
      if (chunk) {
        yield chunk;
      }
    }
  }
}