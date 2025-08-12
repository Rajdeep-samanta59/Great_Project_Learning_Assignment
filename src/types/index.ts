export interface Milestone {
  id: string;
  name: string;
  address: string;
  coordinates: { latitude: number; longitude: number };
  estimatedDuration: number;  // minutes
  order: number;
  completed: boolean;
}

export interface RouteSegment {
  from: Milestone;
  to: Milestone;
  distance: number;  // km
  time: number;      // minutes
}

export interface OptimizedRoute {
  milestones: Milestone[];
  totalDistance: number;      // km
  estimatedTotalTime: number; // minutes
  startingPoint: Milestone;
  routeSegments: RouteSegment[];
}