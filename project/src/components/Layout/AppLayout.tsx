import React, { useState } from 'react';
import { Menu, X, MapPin, MessageSquare, Shield, BellRing, Settings } from 'lucide-react';
import { SafetyRoute, Hazard, ChatMessage } from '../../types';
import MapView from '../Map/MapView';
import ChatInterface from '../Chat/ChatInterface';

interface AppLayoutProps {
  routes: SafetyRoute[];
  hazards: Hazard[];
  chatMessages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  routes = [],
  hazards = [],
  chatMessages = [],
  onSendMessage,
  isLoading = false,
  children 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState<string | undefined>(
    routes.length > 0 ? routes[0].id : undefined
  );
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
    if (isMapFullscreen && !isChatVisible) {
      setIsMapFullscreen(false);
    }
  };

  const toggleMapFullscreen = () => {
    setIsMapFullscreen(!isMapFullscreen);
    if (!isMapFullscreen) {
      setIsChatVisible(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-primary-500 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Shield size={24} className="mr-2" />
            <h1 className="text-xl font-bold">SafeRoute AI</h1>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-1 rounded hover:bg-primary-600 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            <button className="flex items-center p-2 hover:bg-primary-600 rounded transition-colors">
              <MapPin size={18} className="mr-1" />
              <span>Map</span>
            </button>
            <button 
              className="flex items-center p-2 hover:bg-primary-600 rounded transition-colors"
              onClick={toggleChatVisibility}
            >
              <MessageSquare size={18} className="mr-1" />
              <span>Chat</span>
            </button>
            <button className="flex items-center p-2 hover:bg-primary-600 rounded transition-colors">
              <BellRing size={18} className="mr-1" />
              <span>Alerts</span>
            </button>
            <button className="flex items-center p-2 hover:bg-primary-600 rounded transition-colors">
              <Settings size={18} className="mr-1" />
              <span>Settings</span>
            </button>
          </nav>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <nav className="mt-4 lg:hidden">
            <div className="flex flex-col space-y-2">
              <button className="flex items-center p-2 hover:bg-primary-600 rounded transition-colors">
                <MapPin size={18} className="mr-2" />
                <span>Map</span>
              </button>
              <button 
                className="flex items-center p-2 hover:bg-primary-600 rounded transition-colors"
                onClick={toggleChatVisibility}
              >
                <MessageSquare size={18} className="mr-2" />
                <span>Chat</span>
              </button>
              <button className="flex items-center p-2 hover:bg-primary-600 rounded transition-colors">
                <BellRing size={18} className="mr-2" />
                <span>Alerts</span>
              </button>
              <button className="flex items-center p-2 hover:bg-primary-600 rounded transition-colors">
                <Settings size={18} className="mr-2" />
                <span>Settings</span>
              </button>
            </div>
          </nav>
        )}
      </header>
      
      {/* Main Content */}
      <main className="flex-grow flex flex-col lg:flex-row overflow-hidden p-4">
        {/* Map Section */}
        <div 
          className={`
            ${isMapFullscreen ? 'w-full h-full' : 'lg:w-1/2 h-[300px] lg:h-auto'} 
            ${isChatVisible ? 'mb-4 lg:mb-0 lg:mr-4' : 'w-full h-full'}
            rounded-lg shadow-md overflow-hidden transition-all duration-300
          `}
        >
          <MapView 
            routes={routes} 
            hazards={hazards} 
            selectedRouteId={selectedRouteId} 
            className="w-full h-full"
          />
          
          {/* Map controls */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <button 
              onClick={toggleMapFullscreen}
              className="bg-white rounded-full p-2 shadow-md hover:bg-neutral-100 transition-colors"
              aria-label={isMapFullscreen ? "Exit fullscreen" : "Fullscreen map"}
            >
              {isMapFullscreen ? <X size={20} /> : <MapPin size={20} />}
            </button>
          </div>
        </div>
        
        {/* Chat Section */}
        {(isChatVisible || isMapFullscreen) && (
          <div className={`
            ${isMapFullscreen ? 'absolute bottom-16 right-4 w-96 max-h-[70vh]' : 'lg:w-1/2 w-full'} 
            transition-all duration-300
          `}>
            <ChatInterface 
              messages={chatMessages} 
              onSendMessage={onSendMessage} 
              isLoading={isLoading}
              className="h-full"
            />
          </div>
        )}
      </main>
      
      {children}
    </div>
  );
};

export default AppLayout;