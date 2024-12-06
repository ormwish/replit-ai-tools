import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConfigErrorProps {
  error: Error;
}

export const ConfigError: React.FC<ConfigErrorProps> = ({ error }) => {
  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
      <div>
        <h3 className="text-yellow-800 font-medium">Configuration Error</h3>
        <p className="text-yellow-700 text-sm mt-1">{error.message}</p>
      </div>
    </div>
  );
};