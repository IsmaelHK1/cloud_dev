export interface Question {
  id: number;
  question: string;
  keywords: string[];
  expectedPositive: string[];
  expectedNegative: string[];
}

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  sentiment?: 'positive' | 'negative' | 'neutral';
  questionId?: number;
}

export interface ConversationEntry {
  questionId: number;
  question: string;
  response: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  keywords: string[];
  timestamp: Date;
  sentimentScore?: number;
  sentimentDetails?: {
    sentiment: 'positive' | 'negative' | 'neutral';
    score: number;
    comparative: number;
    tokens: string[];
    words: string[];
    positive: string[];
    negative: string[];
  };
}

export type Sentiment = 'positive' | 'negative' | 'neutral';