import { io, Socket } from 'socket.io-client';

export class SearchService {
  private perplexitySocket: Socket | null = null;
  private apiKey: string | null = null;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async connectToPerplexity() {
    if (!this.perplexitySocket) {
      this.perplexitySocket = io('https://api.perplexity.ai', {
        auth: {
          token: this.apiKey
        }
      });

      this.perplexitySocket.on('connect', () => {
        console.log('Connected to Perplexity.AI');
      });
    }
  }

  async searchPerplexity(query: string): Promise<any> {
    if (!this.perplexitySocket?.connected) {
      await this.connectToPerplexity();
    }

    return new Promise((resolve, reject) => {
      this.perplexitySocket?.emit('query', { text: query }, (response: any) => {
        resolve(response);
      });
    });
  }

  async searchPhind(query: string): Promise<any> {
    try {
      const response = await fetch('https://api.phind.com/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({ query })
      });

      return await response.json();
    } catch (error) {
      console.error('Error searching Phind:', error);
      throw error;
    }
  }
}