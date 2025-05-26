import React from 'react';
import { User, Bot } from 'lucide-react';
import { ChatMessage } from '../../types';
import RouteCard from '../Routes/RouteCard';
import HazardCard from '../Hazards/HazardCard';
import EmergencyCard from '../Emergency/EmergencyCard';

interface ChatMessageItemProps {
  message: ChatMessage;
}

const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`
        flex max-w-[80%] rounded-lg p-3 
        ${isUser ? 
          'bg-primary-100 text-primary-900 ml-auto' : 
          'bg-neutral-50 text-neutral-900 mr-auto'
        }
      `}>
        {/* Avatar */}
        <div className={`mr-2 flex-shrink-0 ${isUser ? 'order-1 ml-2 mr-0' : ''}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center 
            ${isUser ? 'bg-primary-500' : 'bg-neutral-200'}`}>
            {isUser ? (
              <User size={18} className="text-white" />
            ) : (
              <Bot size={18} className="text-primary-500" />
            )}
          </div>
        </div>
        
        {/* Message content */}
        <div className={`flex flex-col ${isUser ? 'items-end text-right' : 'items-start'}`}>
          <div className="text-sm mb-1">
            {message.content}
          </div>
          
          {/* Attachments */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 w-full">
              {message.attachments.map((attachment, index) => (
                <div key={index} className="my-2">
                  {attachment.type === 'route' && (
                    <RouteCard route={attachment.data as any} />
                  )}
                  {attachment.type === 'hazard' && (
                    <HazardCard hazard={attachment.data as any} />
                  )}
                  {attachment.type === 'emergency' && (
                    <EmergencyCard emergencyInfo={attachment.data as any} />
                  )}
                </div>
              ))}
            </div>
          )}
          
          <div className="text-xs text-neutral-500 mt-1">
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessageItem;