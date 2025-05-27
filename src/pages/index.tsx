import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, RotateCcw } from 'lucide-react';
import { useChatbot } from '@/hooks/useChatbot';
import { ChatMessage } from '@/components/ChatMessage';
import { ConversationHistory } from '@/components/ConversationHistory';
import { ChatInput } from '@/components/ChatInput';
import { useMongo  } from '@/hooks/useMongo';

export default function ParadiseChatbot() {
  const {
    messages,
    conversationHistory,
    isWaitingForResponse,
    startNewConversation,
    processUserResponse
  } = useChatbot();

  const { handleDone } = useMongo();

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Initialize conversation on mount
  useEffect(() => {
    startNewConversation();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-6 w-6 text-blue-600" />
            <CardTitle>Small Paradise - Assistant Bien-être</CardTitle>
          </div>
          <div>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => handleDone(conversationHistory)}
              className="flex items-center space-x-1"
            >
              <span>Doned</span>
            </Button>
          <Button 
            size="sm" 
            onClick={startNewConversation}
            className="flex items-center space-x-1"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="h-96 w-full border rounded-lg p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          </ScrollArea>

          <ChatInput
            onSendMessage={processUserResponse}
            disabled={!isWaitingForResponse}
          />

          <ConversationHistory history={conversationHistory} />
        </CardContent>
      </Card>
    </div>
  );
}
