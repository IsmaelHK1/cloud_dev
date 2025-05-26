import { useState, useCallback } from 'react';
import { Message, Question, ConversationEntry } from '@/types';
import { questionsDB } from '@/data/questions';
import { analyzeSentiment, extractKeywords, checkForPreviousContext, getDetailedSentiment } from '@/utils/sentiment';
import { generateResponse } from '@/utils/responseGenerator';

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [conversationHistory, setConversationHistory] = useState<ConversationEntry[]>([]);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  const getRandomQuestion = useCallback((): Question => {
    return questionsDB[Math.floor(Math.random() * questionsDB.length)];
  }, []);

  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now() + Math.random(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  const startNewConversation = useCallback(() => {
    const randomQuestion = getRandomQuestion();
    setCurrentQuestion(randomQuestion);
    setMessages([]);
    setConversationHistory([]);
    
    addMessage({
      text: randomQuestion.question,
      sender: 'bot',
      questionId: randomQuestion.id
    });
    
    setIsWaitingForResponse(true);
  }, [addMessage, getRandomQuestion]);

  const processUserResponse = useCallback((userInput: string) => {
    if (!currentQuestion || !isWaitingForResponse) return;

    // Immediately disable response waiting to prevent double submission
    setIsWaitingForResponse(false);

    // Add user message
    addMessage({
      text: userInput,
      sender: 'user'
    });

    // Analyze the response with detailed sentiment analysis
    const sentiment = analyzeSentiment(userInput, currentQuestion);
    const detailedAnalysis = getDetailedSentiment(userInput, currentQuestion);
    const keywords = extractKeywords(userInput);
    const hasContext = checkForPreviousContext(keywords, sentiment, conversationHistory);

    // Store in conversation history with detailed analysis
    const historyEntry: ConversationEntry = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      response: userInput,
      sentiment,
      keywords,
      timestamp: new Date(),
      sentimentScore: detailedAnalysis.score,
      sentimentDetails: detailedAnalysis
    };

    setConversationHistory(prev => [...prev, historyEntry]);

    // Log detailed analysis for debugging (remove in production)
    console.log('Sentiment Analysis:', {
      text: userInput,
      sentiment,
      score: detailedAnalysis.score,
      comparative: detailedAnalysis.comparative,
      positiveWords: detailedAnalysis.positive,
      negativeWords: detailedAnalysis.negative
    });

    // Generate bot response
    const responseText = generateResponse(sentiment, hasContext, keywords);
    
    // Use a single timeout chain to avoid race conditions
    setTimeout(() => {
      // Add bot response
      addMessage({
        text: responseText,
        sender: 'bot',
        sentiment: sentiment
      });

      // Wait a bit more, then ask next question
      setTimeout(() => {
        const nextQuestion = getRandomQuestion();
        setCurrentQuestion(nextQuestion);
        
        addMessage({
          text: nextQuestion.question,
          sender: 'bot',
          questionId: nextQuestion.id
        });
        
        // Re-enable response waiting
        setIsWaitingForResponse(true);
      }, 1500);
    }, 1000);
  }, [currentQuestion, conversationHistory, addMessage, getRandomQuestion, isWaitingForResponse]);

  return {
    messages,
    currentQuestion,
    conversationHistory,
    isWaitingForResponse,
    startNewConversation,
    processUserResponse
  };
};