import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Message } from '@/types';

interface ChatMessageProps {
  message: Message;
}

const getSentimentColor = (sentiment?: string) => {
  switch (sentiment) {
    case 'positive': return 'bg-green-100 text-green-800';
    case 'negative': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          message.sender === 'user'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs opacity-70">
            {message.timestamp.toLocaleTimeString()}
          </span>
          {message.sentiment && (
            <Badge className={`text-xs ${getSentimentColor(message.sentiment)}`}>
              {message.sentiment}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};