import { SafetyRoute, Hazard, ChatMessage, Location, EmergencyInfo } from '../types';

// Mock safety routes
export const mockRoutes: SafetyRoute[] = [
  {
    id: '1',
    routeName: 'Safest Route',
    safetyScore: 92,
    distance: '1.2 miles',
    duration: '24 min',
    hazards: [],
    path: [
      [-86.158, 39.768],
      [-86.158, 39.770],
      [-86.156, 39.770],
      [-86.156, 39.772],
      [-86.154, 39.772],
    ]
  },
  {
    id: '2',
    routeName: 'Balanced Route',
    safetyScore: 78,
    distance: '0.9 miles',
    duration: '18 min',
    hazards: [
      {
        id: 'h1',
        type: 'lighting',
        severity: 'medium',
        description: 'Poor street lighting',
        location: {
          lat: 39.771,
          lng: -86.157
        },
        reportedAt: new Date(),
        isActive: true
      }
    ],
    path: [
      [-86.158, 39.768],
      [-86.157, 39.769],
      [-86.157, 39.771],
      [-86.155, 39.771],
      [-86.154, 39.772],
    ]
  },
  {
    id: '3',
    routeName: 'Fastest Route',
    safetyScore: 65,
    distance: '0.7 miles',
    duration: '15 min',
    hazards: [
      {
        id: 'h2',
        type: 'crime',
        severity: 'medium',
        description: 'Recent theft reports',
        location: {
          lat: 39.770,
          lng: -86.156
        },
        reportedAt: new Date(Date.now() - 86400000), // 1 day ago
        isActive: true
      },
      {
        id: 'h3',
        type: 'infrastructure',
        severity: 'high',
        description: 'Construction zone',
        location: {
          lat: 39.771,
          lng: -86.155
        },
        reportedAt: new Date(),
        isActive: true
      }
    ],
    path: [
      [-86.158, 39.768],
      [-86.156, 39.768],
      [-86.155, 39.769],
      [-86.155, 39.771],
      [-86.154, 39.772],
    ]
  }
];

// Mock hazards
export const mockHazards: Hazard[] = [
  {
    id: 'h1',
    type: 'lighting',
    severity: 'medium',
    description: 'Poor street lighting',
    location: {
      lat: 39.771,
      lng: -86.157
    },
    reportedAt: new Date(),
    isActive: true
  },
  {
    id: 'h2',
    type: 'crime',
    severity: 'medium',
    description: 'Recent theft reports',
    location: {
      lat: 39.770,
      lng: -86.156
    },
    reportedAt: new Date(Date.now() - 86400000), // 1 day ago
    isActive: true
  },
  {
    id: 'h3',
    type: 'infrastructure',
    severity: 'high',
    description: 'Construction zone',
    location: {
      lat: 39.771,
      lng: -86.155
    },
    reportedAt: new Date(),
    isActive: true
  },
  {
    id: 'h4',
    type: 'weather',
    severity: 'low',
    description: 'Slippery walkway',
    location: {
      lat: 39.769,
      lng: -86.158
    },
    reportedAt: new Date(),
    isActive: true
  },
  {
    id: 'h5',
    type: 'traffic',
    severity: 'high',
    description: 'Heavy traffic area',
    location: {
      lat: 39.772,
      lng: -86.153
    },
    reportedAt: new Date(),
    isActive: true
  }
];

// Mock chat messages
export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg1',
    role: 'system',
    content: 'Welcome to SafeRoute AI! How can I help you navigate safely today?',
    timestamp: new Date(Date.now() - 120000),
  },
  {
    id: 'msg2',
    role: 'user',
    content: 'I need to get to the Central Library',
    timestamp: new Date(Date.now() - 90000),
  },
  {
    id: 'msg3',
    role: 'assistant',
    content: 'I can help you get to Central Library safely. I found 3 possible routes. The safest route will take about 24 minutes walking.',
    timestamp: new Date(Date.now() - 60000),
    attachments: [
      {
        type: 'route',
        data: mockRoutes[0]
      }
    ]
  },
  {
    id: 'msg4',
    role: 'user',
    content: 'Is there a faster route?',
    timestamp: new Date(Date.now() - 30000),
  },
  {
    id: 'msg5',
    role: 'assistant',
    content: 'Yes, there is a faster route that will take 15 minutes, but it has a lower safety score of 65/100 due to recent reports of theft and a construction zone along the way.',
    timestamp: new Date(Date.now() - 15000),
    attachments: [
      {
        type: 'route',
        data: mockRoutes[2]
      }
    ]
  }
];

// Mock emergency info
export const mockEmergencyInfo: EmergencyInfo = {
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
};