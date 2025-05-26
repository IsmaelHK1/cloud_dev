
// utils/sentiment.ts
import Sentiment from 'sentiment';
import { Question, Sentiment as SentimentType, ConversationEntry } from '@/types';

// Initialize sentiment analyzer
const sentiment = new Sentiment();

// French sentiment words to enhance the analysis
const frenchSentimentWords = {
  // Positive words
  'bien': 2,
  'super': 3,
  'génial': 3,
  'parfait': 3,
  'excellent': 3,
  'formidable': 3,
  'heureux': 2,
  'content': 2,
  'joie': 2,
  'fantastique': 3,
  'merveilleux': 3,
  'magnifique': 3,
  'agréable': 2,
  'plaisant': 2,
  'satisfaisant': 2,
  'réussi': 2,
  'positif': 2,
  'motivé': 2,
  'enthousiaste': 2,
  'optimiste': 2,
  'serein': 2,
  'tranquille': 1,
  'reposé': 2,
  'détendu': 2,
  'épanoui': 3,
  
  // Negative words
  'mal': -2,
  'terrible': -3,
  'horrible': -3,
  'triste': -2,
  'difficile': -2,
  'problème': -2,
  'stress': -2,
  'stressé': -2,
  'fatigué': -2,
  'énervé': -2,
  'inquiet': -2,
  'préoccupé': -2,
  'angoissé': -3,
  'déprimé': -3,
  'découragé': -2,
  'frustré': -2,
  'ennuyé': -1,
  'compliqué': -2,
  'pénible': -2,
  'insomnie': -2,
  'cauchemar': -3,
  'échec': -2,
  'raté': -2,
  'nul': -2,
  'catastrophe': -3,
  'désespéré': -3,
  'malheureux': -3
};

// Register French words with the sentiment analyzer
sentiment.registerLanguage('fr', { labels: frenchSentimentWords });

export const analyzeSentiment = (text: string, question: Question): SentimentType => {
  // Use the sentiment package for base analysis
  const result = sentiment.analyze(text, { language: 'fr' });
  
  // Get base sentiment score
  let sentimentScore = result.score;
  
  // Enhance with question-specific context
  const lowerText = text.toLowerCase();
  let contextBonus = 0;
  
  // Check against expected positive responses for this specific question
  question.expectedPositive.forEach(word => {
    if (lowerText.includes(word.toLowerCase())) {
      contextBonus += 1.5; // Boost positive score for context-relevant words
    }
  });
  
  // Check against expected negative responses for this specific question
  question.expectedNegative.forEach(word => {
    if (lowerText.includes(word.toLowerCase())) {
      contextBonus -= 1.5; // Reduce score for context-relevant negative words
    }
  });
  
  // Apply context bonus
  sentimentScore += contextBonus;
  
  // Additional French-specific patterns
  const frenchPositivePatterns = [
    /\b(très bien|tout va bien|ça va bien|super bien)\b/i,
    /\b(parfaitement|excellemment|formidablement)\b/i,
    /\b(je suis (content|heureux|ravi|enchanté))\b/i,
    /\b(c'est (génial|super|parfait|formidable))\b/i
  ];
  
  const frenchNegativePatterns = [
    /\b(pas bien|ça va mal|très mal|super mal)\b/i,
    /\b(je n'arrive pas|je n'y arrive pas)\b/i,
    /\b(je suis (triste|fatigué|stressé|énervé|déprimé))\b/i,
    /\b(c'est (difficile|compliqué|terrible|horrible))\b/i,
    /\b(pas du tout|absolument pas|certainement pas)\b/i
  ];
  
  // Check patterns
  frenchPositivePatterns.forEach(pattern => {
    if (pattern.test(text)) {
      sentimentScore += 2;
    }
  });
  
  frenchNegativePatterns.forEach(pattern => {
    if (pattern.test(text)) {
      sentimentScore -= 2;
    }
  });
  
  // Determine final sentiment with thresholds
  if (sentimentScore > 0.5) return 'positive';
  if (sentimentScore < -0.5) return 'negative';
  return 'neutral';
};

// Export additional sentiment details for debugging/analytics
export const getDetailedSentiment = (text: string, question: Question) => {
  const result = sentiment.analyze(text, { language: 'fr' });
  const finalSentiment = analyzeSentiment(text, question);
  
  return {
    sentiment: finalSentiment,
    score: result.score,
    comparative: result.comparative,
    tokens: result.tokens,
    words: result.words,
    positive: result.positive,
    negative: result.negative
  };
};

export const extractKeywords = (text: string): string[] => {
  const words = text.toLowerCase().split(/\s+/);
  return words.filter(word => word.length > 3);
};

export const checkForPreviousContext = (
  keywords: string[], 
  sentiment: SentimentType, 
  conversationHistory: ConversationEntry[]
): boolean => {
  return conversationHistory.some(entry => 
    entry.keywords.some(keyword => keywords.includes(keyword)) ||
    entry.sentiment === sentiment
  );
};
