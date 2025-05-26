// Safety route types
export interface SafetyRoute {
  id: string;
  routeName: string;
  safetyScore: number; // 0-100
  distance: string;
  duration: string;
  hazards: Hazard[];
  path: [number, number][]; // Array of [lng, lat] coordinates
}

// Hazard types
export interface Hazard {
  id: string;
  type: HazardType;
  severity: 'low' | 'medium' | 'high';
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  reportedAt: Date;
  isActive: boolean;
}

export type HazardType = 
  | 'crime' 
  | 'infrastructure' 
  | 'weather'
  | 'lighting'
  | 'traffic' 
  | 'other';

// Chat message types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  attachments?: ChatAttachment[];
}

export interface ChatAttachment {
  type: 'route' | 'hazard' | 'location' | 'emergency';
  data: SafetyRoute | Hazard | Location | EmergencyInfo;
}

// Location type
export interface Location {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

// Emergency info
export interface EmergencyInfo {
  type: 'police' | 'fire' | 'medical' | 'general';
  contacts: string[];
  instructions: string[];
  nearbyServices: Location[];
}

// User preferences
export interface UserPreferences {
  transportMode: 'walking' | 'biking' | 'driving' | 'transit';
  safetyPriority: 'maximum' | 'balanced' | 'faster';
  avoidHazardTypes: HazardType[];
  emergencyContacts: string[];
}