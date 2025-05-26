import { Sentiment } from '@/types';
import { responseTemplates } from '@/data/responses';

export const generateResponse = (
  sentiment: Sentiment, 
  hasContext: boolean, 
  keywords: string[]
): string => {
  let responsePool: string[];
  
  if (sentiment === 'positive') {
    responsePool = hasContext ? responseTemplates.positive.followUp : responseTemplates.positive.generic;
  } else if (sentiment === 'negative') {
    responsePool = hasContext ? responseTemplates.negative.followUp : responseTemplates.negative.generic;
  } else {
    responsePool = responseTemplates.neutral.generic;
  }

  return responsePool[Math.floor(Math.random() * responsePool.length)];
};