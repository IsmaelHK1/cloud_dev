import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ConversationEntry } from '@/types';

interface ConversationHistoryProps {
  history: ConversationEntry[];
}

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case 'positive': return 'bg-green-100 text-green-800';
    case 'negative': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const ConversationHistory: React.FC<ConversationHistoryProps> = ({ history }) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Historique des sentiments:</h3>
      <div className="flex flex-wrap gap-2">
        {history.slice(-5).map((entry, index) => (
          <Badge
            key={index}
            className={getSentimentColor(entry.sentiment)}
          >
            {entry.sentiment} • {entry.keywords.slice(0, 2).join(', ')}
          </Badge>
        ))}
      </div>
    </div>
  );
};