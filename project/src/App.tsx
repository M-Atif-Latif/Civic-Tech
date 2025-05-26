import React, { useState, useEffect } from 'react';
import AppLayout from './components/Layout/AppLayout';
import { ChatMessage, SafetyRoute, Hazard } from './types';
import { mockChatMessages, mockRoutes, mockHazards } from './utils/mockData';

function App() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [routes, setRoutes] = useState<SafetyRoute[]>(mockRoutes);
  const [hazards, setHazards] = useState<Hazard[]>(mockHazards);
  const [isLoading, setIsLoading] = useState(false);

  // Handle sending a new message
  const handleSendMessage = (messageText: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };
    
    setChatMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      // This is where you would integrate with Gemini API
      // For now, we'll just provide mock responses
      handleMockResponse(messageText);
    }, 1500);
  };
  
  // Process mock responses based on user input
  const handleMockResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    let responseMessage: ChatMessage;
    
    if (lowerInput.includes('route') || lowerInput.includes('get to') || lowerInput.includes('go to')) {
      // Route request response
      responseMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: 'I found 3 possible routes to your destination. The safest route is highlighted, but there are faster alternatives available.',
        timestamp: new Date(),
        attachments: [
          {
            type: 'route',
            data: routes[0]
          }
        ]
      };
    } else if (lowerInput.includes('hazard') || lowerInput.includes('danger') || lowerInput.includes('report')) {
      // Hazard report response
      responseMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: 'Thank you for reporting this hazard. I\'ve added it to our system and alerted other users in the area.',
        timestamp: new Date(),
        attachments: [
          {
            type: 'hazard',
            data: {
              ...mockHazards[0],
              description: userInput,
              reportedAt: new Date()
            }
          }
        ]
      };
      
      // Add the new hazard to our mock data
      setHazards(prev => [
        {
          ...mockHazards[0],
          id: `h-${Date.now()}`,
          description: userInput,
          reportedAt: new Date()
        },
        ...prev
      ]);
    } else if (lowerInput.includes('help') || lowerInput.includes('emergency') || lowerInput.includes('unsafe')) {
      // Emergency response
      responseMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: 'I understand you need emergency assistance. Here are some resources and immediate actions you can take:',
        timestamp: new Date(),
        attachments: [
          {
            type: 'emergency',
            data: {
              type: 'general',
              contacts: ['911', '317-555-1234 (Non-emergency Police)'],
              instructions: [
                'Stay calm and find a safe location',
                'Call 911 for immediate emergencies',
                'Share your exact location with responders'
              ],
              nearbyServices: [
                {
                  name: 'Downtown Police Station',
                  address: '50 N Alabama St, Indianapolis, IN 46204',
                  lat: 39.768,
                  lng: -86.153
                },
                {
                  name: 'City Hospital ER',
                  address: '1701 N Senate Blvd, Indianapolis, IN 46202',
                  lat: 39.791,
                  lng: -86.170
                }
              ]
            }
          }
        ]
      };
    } else {
      // Default response
      responseMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: 'How can I help you navigate safely today? You can ask me for safe routes, report hazards, or get emergency assistance.',
        timestamp: new Date(),
      };
    }
    
    setChatMessages(prevMessages => [...prevMessages, responseMessage]);
    setIsLoading(false);
  };

  return (
    <AppLayout 
      routes={routes}
      hazards={hazards}
      chatMessages={chatMessages}
      onSendMessage={handleSendMessage}
      isLoading={isLoading}
    />
  );
}

export default App;