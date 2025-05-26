import React from 'react';
import { Phone, AlertTriangle, Info, MapPin, Heart, Shield, Siren } from 'lucide-react';
import { EmergencyInfo } from '../../types';

interface EmergencyCardProps {
  emergencyInfo: EmergencyInfo;
}

const EmergencyCard: React.FC<EmergencyCardProps> = ({ emergencyInfo }) => {
  const emergencyNumbers = {
    'Emergency (Police/Fire/Medical)': '911',
    'Poison Control': '1-800-222-1222',
    'Suicide Prevention': '988',
    'Domestic Violence': '1-800-799-7233',
    'Missing Children': '1-800-843-5678',
    'Road Conditions': '511',
    'Non-Emergency Police': '317-327-3811',
    'Animal Control': '317-327-1397'
  };

  return (
    <div className="border-2 border-danger-400 bg-danger-50 rounded-lg overflow-hidden shadow-lg">
      <div className="bg-danger-600 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle size={20} className="mr-2" />
          <h3 className="font-semibold text-lg">Emergency Assistance</h3>
        </div>
        <Siren className="animate-pulse" size={20} />
      </div>
      
      <div className="p-4 space-y-4">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button className="bg-danger-600 text-white rounded-lg p-3 flex items-center justify-center hover:bg-danger-700 transition-colors shadow-md">
            <Phone size={18} className="mr-2" />
            <span className="font-semibold">Call 911</span>
          </button>
          <button className="bg-primary-600 text-white rounded-lg p-3 flex items-center justify-center hover:bg-primary-700 transition-colors shadow-md">
            <MapPin size={18} className="mr-2" />
            <span className="font-semibold">Share Location</span>
          </button>
        </div>

        {/* Emergency Numbers */}
        <div className="bg-white rounded-lg p-4 shadow-md border border-danger-100">
          <h4 className="text-lg font-semibold mb-3 text-danger-700 flex items-center">
            <Phone size={18} className="mr-2" />
            Emergency Numbers
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(emergencyNumbers).map(([service, number]) => (
              <a
                key={service}
                href={`tel:${number.replace(/\D/g, '')}`}
                className="flex items-center justify-between p-3 hover:bg-danger-50 rounded-md transition-colors border border-danger-100"
              >
                <span className="text-neutral-900 font-medium">{service}</span>
                <span className="text-lg font-bold text-danger-600">{number}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg p-4 shadow-md border border-danger-100">
          <h4 className="text-lg font-semibold mb-3 text-danger-700 flex items-center">
            <Shield size={18} className="mr-2" />
            Safety Instructions
          </h4>
          <ul className="space-y-3">
            {emergencyInfo.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start bg-danger-50 p-3 rounded-md">
                <Info size={16} className="mr-2 mt-1 flex-shrink-0 text-danger-600" />
                <span className="text-neutral-900 font-medium">{instruction}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Nearby Services */}
        <div className="bg-white rounded-lg p-4 shadow-md border border-danger-100">
          <h4 className="text-lg font-semibold mb-3 text-danger-700 flex items-center">
            <Heart size={18} className="mr-2" />
            Nearby Services
          </h4>
          <div className="space-y-3">
            {emergencyInfo.nearbyServices.map((service, index) => (
              <div key={index} className="flex items-start p-3 hover:bg-danger-50 rounded-md transition-colors border border-danger-100">
                <MapPin size={16} className="mr-2 mt-1 flex-shrink-0 text-danger-600" />
                <div>
                  <div className="font-semibold text-neutral-900">{service.name}</div>
                  <div className="text-neutral-700">{service.address}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-danger-100 p-4 flex justify-between items-center border-t-2 border-danger-200">
        <span className="text-sm font-medium text-danger-800">
          Always call 911 for immediate emergencies
        </span>
        <button className="bg-danger-600 text-white rounded-lg px-6 py-2 font-semibold hover:bg-danger-700 transition-colors flex items-center shadow-md">
          <Siren size={16} className="mr-2" />
          Get Help Now
        </button>
      </div>
    </div>
  );
};

export default EmergencyCard;