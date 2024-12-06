import React from 'react';
import { Settings } from 'lucide-react';
import { ContextIndicator } from './components/ContextIndicator';
import { SearchPanel } from './components/SearchPanel';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ConfigError } from './components/ConfigError';
import { useSearchService } from './hooks/useSearchService';
import { useConfig } from './hooks/useConfig';

function App() {
  const { config, error, isLoading } = useConfig('.llm.yaml');
  const { handleSearch, isSearching } = useSearchService();

  if (error) {
    return <ConfigError error={error} />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <header className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">AI Context Navigator</h1>
          <button className="p-2 hover:bg-gray-100 rounded-md">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </header>

        <main className="p-4">
          <div className="space-y-4">
            <ContextIndicator
              context="Global Context"
              isActive={true}
              hasSearch={config.global?.enabledProviders?.length > 0}
            />
            {config.contexts.map((context) => (
              <ContextIndicator
                key={context.name}
                context={context.name}
                isActive={false}
                hasSearch={context.searchProviders?.length > 0}
              />
            ))}
          </div>

          <SearchPanel
            onSearch={handleSearch}
            isLoading={isSearching}
          />
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;