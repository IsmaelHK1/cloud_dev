import { ConversationEntry } from '@/types';
import { addSentimentData } from '@/utils/mongoDB';

export const useMongo = () => {

    const handleDone = (conversationHistory: ConversationEntry[]) => {
        let sentiment = '';

        // Calculate average sentimentScore from the conversationHistory array
        const avgSentimentScore =
            conversationHistory.length > 0
                ? conversationHistory.reduce((sum, entry) => sum + (entry.sentimentScore ?? 0), 0) / conversationHistory.length
                : 0;

        if (avgSentimentScore > 0.5) {
            sentiment = 'positive';
        } else if (avgSentimentScore < -0.5) {
            sentiment = 'negative';
        } else {
            sentiment = 'neutral';
        }

        addSentimentData(sentiment);
    };

    return { handleDone };
}
