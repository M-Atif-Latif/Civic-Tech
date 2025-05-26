import React, { useState } from 'react';
import { AlertOctagon } from 'lucide-react';

interface EmergencyButtonProps {
  onClick?: () => void;
}

const EmergencyButton: React.FC<EmergencyButtonProps> = ({ onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleClick = () => {
    setIsExpanded(!isExpanded);
    if (onClick) onClick();
  };
  
  return (
    <div className="relative">
      <button 
        className={`
          flex items-center justify-center bg-danger-500 hover:bg-danger-600 
          text-white font-medium rounded-lg transition-all duration-300
          ${isExpanded ? 'px-4' : 'w-8 h-8'}
        `}
        onClick={handleClick}
        aria-label="Emergency assistance"
      >
        <AlertOctagon size={18} className={isExpanded ? 'mr-2' : ''} />
        {isExpanded && <span>Emergency</span>}
      </button>
      
      {isExpanded && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-md shadow-lg border border-danger-200 w-64 z-10">
          <div className="p-3 border-b border-neutral-100">
            <h3 className="text-danger-600 font-medium">Emergency Options</h3>
          </div>
          
          <div className="p-3">
            <button className="w-full text-left px-3 py-2 text-sm hover:bg-danger-50 rounded-md transition-colors mb-1">
              Call 911
            </button>
            <button className="w-full text-left px-3 py-2 text-sm hover:bg-danger-50 rounded-md transition-colors mb-1">
              Share my location
            </button>
            <button className="w-full text-left px-3 py-2 text-sm hover:bg-danger-50 rounded-md transition-colors mb-1">
              Alert emergency contacts
            </button>
            <button className="w-full text-left px-3 py-2 text-sm hover:bg-danger-50 rounded-md transition-colors">
              Find nearest safe place
            </button>
          </div>
          
          <div className="bg-neutral-50 p-2 text-xs text-neutral-500 rounded-b-md">
            Use for genuine emergencies only
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyButton;