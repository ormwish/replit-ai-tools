import { useState } from 'react';
import { SearchService } from '../services/searchService';
import { ENV } from '../config/env';

export const useSearchService = () => {
  const [searchService] = useState(() => new SearchService(ENV.API_KEY));
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    try {
      const results = await Promise.all([
        searchService.searchPerplexity(query),
        searchService.searchPhind(query)
      ]);
      return results;
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    } finally {
      setIsSearching(false);
    }
  };

  return {
    handleSearch,
    isSearching
  };
};