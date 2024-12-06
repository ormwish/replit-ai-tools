import React from 'react';
import { Code2, Search, Zap } from 'lucide-react';

interface ContextIndicatorProps {
  context: string;
  isActive: boolean;
  hasSearch: boolean;
}

export const ContextIndicator: React.FC<ContextIndicatorProps> = ({
  context,
  isActive,
  hasSearch
}) => {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-md ${
      isActive ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'
    }`}>
      <Zap className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
      <span className="text-sm font-medium">{context}</span>
      {hasSearch && (
        <Search className="w-4 h-4 text-gray-400" />
      )}
      <Code2 className="w-4 h-4 text-gray-400" />
    </div>
  );
}