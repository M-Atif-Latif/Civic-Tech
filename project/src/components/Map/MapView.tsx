import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { AlertTriangle, Navigation, MapPin } from 'lucide-react';
import { Hazard, SafetyRoute } from '../../types';

// Custom marker icons
const createCustomIcon = (color: string, Icon: typeof AlertTriangle) => {
  const svg = `
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="${color}"/>
      <path d="M12 8V12M12 16H12.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
};

// Current location marker with pulse effect
const createLocationMarker = () => {
  const svg = `
    <div class="location-marker">
      <div class="location-marker__icon"></div>
      <div class="location-marker__pulse"></div>
    </div>
  `;

  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
};

interface MapViewProps {
  center?: [number, number];
  zoom?: number;
  routes?: SafetyRoute[];
  hazards?: Hazard[];
  selectedRouteId?: string;
  onHazardClick?: (hazard: Hazard) => void;
  className?: string;
}

// Map update component
const MapUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  
  return null;
};

const MapView: React.FC<MapViewProps> = ({
  center = [-86.158, 39.768],
  zoom = 14,
  routes = [],
  hazards = [],
  selectedRouteId,
  onHazardClick,
  className = ''
}) => {
  const mapRef = useRef<L.Map>(null);
  const selectedRoute = routes.find(route => route.id === selectedRouteId);

  // Generate color based on safety score
  const getRouteColor = (safetyScore: number) => {
    if (safetyScore >= 80) return '#33CC66';
    if (safetyScore >= 60) return '#FF9933';
    return '#CC3333';
  };

  // Generate marker color based on hazard severity
  const getHazardColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low': return '#FF9933';
      case 'medium': return '#FF6633';
      case 'high': return '#CC3333';
      default: return '#FF9933';
    }
  };

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      <MapContainer
        center={[center[1], center[0]]}
        zoom={zoom}
        className="w-full h-full"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater center={[center[1], center[0]]} />
        
        {/* Current location marker */}
        <Marker 
          position={[center[1], center[0]]}
          icon={createLocationMarker()}
        />
        
        {/* Render routes */}
        {routes.map(route => (
          <Polyline
            key={route.id}
            positions={route.path.map(([lng, lat]) => [lat, lng])}
            pathOptions={{
              color: getRouteColor(route.safetyScore),
              weight: selectedRouteId === route.id ? 6 : 4,
              opacity: selectedRouteId === route.id ? 1 : 0.7,
              dashArray: selectedRouteId === route.id ? undefined : '5, 5'
            }}
          />
        ))}
        
        {/* Hazard markers */}
        {hazards.map(hazard => (
          <Marker
            key={hazard.id}
            position={[hazard.location.lat, hazard.location.lng]}
            icon={createCustomIcon(getHazardColor(hazard.severity), AlertTriangle)}
            eventHandlers={{
              click: () => onHazardClick && onHazardClick(hazard)
            }}
          />
        ))}
        
        {/* Destination marker if there's a selected route */}
        {selectedRoute && selectedRoute.path.length > 0 && (
          <Marker
            position={[
              selectedRoute.path[selectedRoute.path.length - 1][1],
              selectedRoute.path[selectedRoute.path.length - 1][0]
            ]}
            icon={createCustomIcon('#1F3D7A', MapPin)}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;