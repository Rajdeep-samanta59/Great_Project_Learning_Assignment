import { Milestone, OptimizedRoute } from '../types';
import { nearestNeighbour, twoOpt, haversineDistance } from '../utils/calculations';

export function optimizeRoute(
  milestones: Milestone[], 
  current: { latitude: number; longitude: number }
): OptimizedRoute {
  const start: Milestone = {
    id: 'start',
    name: 'Current Location',
    address: 'Your current position',
    coordinates: current,
    estimatedDuration: 0,
    completed: true,
    order: 0
  };

  // Use nearest neighbor then 2-opt optimization
  const ordered = twoOpt(nearestNeighbour(start, milestones));
  let totalDistance = 0;
  const routeSegments = [];

  // Calculate segments and total distance
  for (let i = 0; i < ordered.length - 1; i++) {
    const dist = haversineDistance(ordered[i].coordinates, ordered[i + 1].coordinates);
    totalDistance += dist;
    routeSegments.push({
      from: ordered[i],
      to: ordered[i + 1],
      distance: dist,
      time: (dist / 5) * 60  // walking speed 5 km/h, time in minutes
    });
  }

  // Calculate total time (travel time + milestone durations)
  const travelTime = (totalDistance / 5) * 60; // walking at 5 km/h
  const milestoneTime = ordered.reduce((sum, m) => sum + m.estimatedDuration, 0);
  const estimatedTotalTime = travelTime + milestoneTime;

  return {
    milestones: ordered,
    totalDistance,
    estimatedTotalTime,
    startingPoint: start,
    routeSegments
  };
}