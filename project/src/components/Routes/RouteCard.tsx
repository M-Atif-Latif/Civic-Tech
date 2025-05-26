import React from 'react';
import { Clock, Navigation, Shield, AlertTriangle } from 'lucide-react';
import { SafetyRoute } from '../../types';

interface RouteCardProps {
  route: SafetyRoute;
  isSelected?: boolean;
  onClick?: () => void;
}

const RouteCard: React.FC<RouteCardProps> = ({ 
  route, 
  isSelected = false,
  onClick 
}) => {
  // Helper to determine safety score color and label
  const getSafetyInfo = (score: number) => {
    if (score >= 80) {
      return {
        color: 'text-success-600',
        bgColor: 'bg-success-100',
        label: 'Safest',
        icon: <Shield size={16} className="text-success-600" />
      };
    } else if (score >= 60) {
      return {
        color: 'text-alert-600',
        bgColor: 'bg-alert-100',
        label: 'Moderate',
        icon: <Shield size={16} className="text-alert-600" />
      };
    } else {
      return {
        color: 'text-danger-600',
        bgColor: 'bg-danger-100',
        label: 'Caution',
        icon: <Shield size={16} className="text-danger-600" />
      };
    }
  };

  const safetyInfo = getSafetyInfo(route.safetyScore);
  
  return (
    <div 
      className={`
        border rounded-lg p-3 mb-2 cursor-pointer transition-all duration-200 
        ${isSelected 
          ? 'border-primary-500 shadow-md bg-primary-50' 
          : 'border-neutral-200 hover:border-primary-300 hover:shadow-sm'
        }
      `}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className={`${safetyInfo.bgColor} rounded-md px-2 py-1 flex items-center`}>
            {safetyInfo.icon}
            <span className={`text-xs font-medium ml-1 ${safetyInfo.color}`}>{safetyInfo.label}</span>
          </div>
          <span className="ml-2 font-semibold">{route.routeName}</span>
        </div>
        <div className="flex items-center text-xs text-neutral-600">
          <Clock size={14} className="mr-1" />
          {route.duration}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center text-sm">
          <Navigation size={14} className="mr-1 text-neutral-500" />
          <span>{route.distance}</span>
        </div>
        
        <div className="text-sm flex items-center">
          <div className="flex items-center">
            <span className={`font-medium ${safetyInfo.color}`}>{route.safetyScore}</span>
            <span className="text-neutral-500 ml-1">/100</span>
          </div>
        </div>
      </div>
      
      {/* Hazard indicators if any */}
      {route.hazards.length > 0 && (
        <div className="mt-2 pt-2 border-t border-neutral-100">
          <div className="flex items-center text-xs text-neutral-600">
            <AlertTriangle size={14} className="mr-1 text-alert-500" />
            <span>{route.hazards.length} hazard{route.hazards.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="mt-1 text-xs text-neutral-500 line-clamp-1">
            {route.hazards.map(h => h.description).join(', ')}
          </div>
        </div>
      )}
      
      {isSelected && (
        <div className="mt-2 flex justify-center">
          <button className="bg-primary-500 text-white rounded-full px-4 py-1 text-sm hover:bg-primary-600 transition-colors">
            Navigate
          </button>
        </div>
      )}
    </div>
  );
};

export default RouteCard;