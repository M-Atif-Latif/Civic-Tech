import React from 'react';
import { AlertTriangle, Info, MapPin, Clock } from 'lucide-react';
import { Hazard } from '../../types';

interface HazardCardProps {
  hazard: Hazard;
  compact?: boolean;
  onClick?: () => void;
}

const HazardCard: React.FC<HazardCardProps> = ({ 
  hazard, 
  compact = false,
  onClick 
}) => {
  // Helper to determine hazard severity colors
  const getSeverityInfo = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low':
        return {
          color: 'text-neutral-600',
          bgColor: 'bg-neutral-100',
          borderColor: 'border-neutral-200',
          label: 'Low Risk'
        };
      case 'medium':
        return {
          color: 'text-alert-600',
          bgColor: 'bg-alert-50',
          borderColor: 'border-alert-200',
          label: 'Medium Risk'
        };
      case 'high':
        return {
          color: 'text-danger-600',
          bgColor: 'bg-danger-50',
          borderColor: 'border-danger-200',
          label: 'High Risk'
        };
      default:
        return {
          color: 'text-neutral-600',
          bgColor: 'bg-neutral-100',
          borderColor: 'border-neutral-200',
          label: 'Unknown'
        };
    }
  };

  // Helper to get icon for hazard type
  const getHazardTypeIcon = (type: string) => {
    switch (type) {
      case 'crime':
        return <AlertTriangle size={14} className="mr-1" />;
      case 'infrastructure':
        return <Info size={14} className="mr-1" />;
      case 'weather':
        return <AlertTriangle size={14} className="mr-1" />;
      case 'lighting':
        return <AlertTriangle size={14} className="mr-1" />;
      case 'traffic':
        return <AlertTriangle size={14} className="mr-1" />;
      default:
        return <AlertTriangle size={14} className="mr-1" />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const severityInfo = getSeverityInfo(hazard.severity);
  const typeIcon = getHazardTypeIcon(hazard.type);

  if (compact) {
    return (
      <div 
        className={`
          border rounded-md p-2 cursor-pointer transition-all duration-200
          ${severityInfo.borderColor} ${severityInfo.bgColor}
        `}
        onClick={onClick}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {typeIcon}
            <span className="text-xs font-medium">{hazard.description}</span>
          </div>
          <div className={`text-xs ${severityInfo.color} font-medium`}>
            {severityInfo.label}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className={`
        border rounded-lg p-3 mb-2 cursor-pointer transition-all duration-200
        ${severityInfo.borderColor} ${severityInfo.bgColor}
      `}
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          {typeIcon}
          <span className="font-semibold">{hazard.type.charAt(0).toUpperCase() + hazard.type.slice(1)}</span>
        </div>
        <div className={`text-xs font-medium px-2 py-1 rounded-full ${severityInfo.bgColor} ${severityInfo.color}`}>
          {severityInfo.label}
        </div>
      </div>
      
      <p className="text-sm mb-2">{hazard.description}</p>
      
      <div className="flex justify-between text-xs text-neutral-500">
        <div className="flex items-center">
          <MapPin size={12} className="mr-1" />
          <span>Near location</span>
        </div>
        <div className="flex items-center">
          <Clock size={12} className="mr-1" />
          <span>Reported at {formatTime(hazard.reportedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default HazardCard;