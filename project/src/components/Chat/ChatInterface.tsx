import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, AlertTriangle } from 'lucide-react';
import { ChatMessage } from '../../types';
import ChatMessageItem from './ChatMessageItem';
import EmergencyButton from '../Emergency/EmergencyButton';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isListening?: boolean;
  onToggleVoice?: () => void;
  className?: string;
  isLoading?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  isListening = false,
  onToggleVoice,
  className = '',
  isLoading = false
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input field on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = () => {
    if (inputText.trim() === '') return;
    
    onSendMessage(inputText);
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className={`flex flex-col bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between bg-primary-500 text-white p-3">
        <h2 className="text-lg font-semibold">SafeRoute AI Assistant</h2>
        <EmergencyButton />
      </div>
      
      {/* Messages Container */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 max-h-[70vh]">
        {messages.map((message) => (
          <ChatMessageItem key={message.id} message={message} />
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-start max-w-[80%] bg-neutral-50 rounded-lg p-3 ml-4">
            <div className="flex space-x-1">
              <div className="h-2 w-2 bg-primary-400 rounded-full animate-bounce [animation-delay:0ms]"></div>
              <div className="h-2 w-2 bg-primary-400 rounded-full animate-bounce [animation-delay:150ms]"></div>
              <div className="h-2 w-2 bg-primary-400 rounded-full animate-bounce [animation-delay:300ms]"></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="border-t border-neutral-200 p-3">
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about safe routes or report a hazard..."
            className="flex-grow bg-neutral-100 border border-neutral-200 rounded-full py-2 pl-4 pr-24 focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
          
          <div className="absolute right-2 flex space-x-1">
            {onToggleVoice && (
              <button 
                onClick={onToggleVoice}
                className={`p-2 rounded-full ${isListening ? 'bg-alert-500 text-white' : 'bg-neutral-200 text-neutral-600'} hover:opacity-80 transition-colors`}
                aria-label={isListening ? "Stop voice input" : "Start voice input"}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
            )}
            
            <button 
              onClick={handleSend}
              disabled={inputText.trim() === ''}
              className="p-2 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
        
        <div className="mt-2 text-xs text-neutral-500 flex justify-between items-center">
          <span>Voice commands available</span>
          <button 
            className="flex items-center text-xs text-danger-600 hover:text-danger-700"
            aria-label="Report emergency"
          >
            <AlertTriangle size={14} className="mr-1" /> Report Emergency
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;