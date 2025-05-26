import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || disabled || isSending) return;
    
    setIsSending(true);
    const message = input.trim();
    setInput('');
    
    try {
      await onSendMessage(message);
    } finally {
      // Add a small delay to prevent rapid fire submissions
      setTimeout(() => {
        setIsSending(false);
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isSending) {
      e.preventDefault();
      handleSend();
    }
  };

  const isInputDisabled = disabled || isSending;

  return (
    <div className="flex space-x-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={isSending ? "Envoi en cours..." : "Tapez votre réponse..."}
        disabled={isInputDisabled}
        className="flex-1"
      />
      <Button 
        onClick={handleSend}
        disabled={!input.trim() || isInputDisabled}
        className="flex items-center space-x-1"
      >
        <Send className="h-4 w-4" />
        {isSending && <span className="text-xs">...</span>}
      </Button>
    </div>
  );
};
