import { Milestone } from '../types';

/** Haversine distance calculation (returns km) */
export const haversineDistance = (
  a: { latitude: number; longitude: number },
  b: { latitude: number; longitude: number }
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (b.latitude - a.latitude) * Math.PI / 180;
  const dLon = (b.longitude - a.longitude) * Math.PI / 180;
  const lat1 = a.latitude * Math.PI / 180;
  const lat2 = b.latitude * Math.PI / 180;

  const x = Math.sin(dLat / 2) ** 2 +
            Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
};

/** Nearest-Neighbour TSP algorithm */
export const nearestNeighbour = (start: Milestone, rest: Milestone[]): Milestone[] => {
  const ordered: Milestone[] = [start];
  let current = start;
  const pool = [...rest];

  while (pool.length) {
    let idx = 0;
    let min = haversineDistance(current.coordinates, pool[0].coordinates);

    for (let i = 1; i < pool.length; i++) {
      const d = haversineDistance(current.coordinates, pool[i].coordinates);
      if (d < min) { 
        min = d; 
        idx = i; 
      }
    }

    current = pool.splice(idx, 1)[0];
    ordered.push(current);
  }
  return ordered;
};

/** 2-opt route improvement */
export const twoOpt = (route: Milestone[]): Milestone[] => {
  const swap = (r: Milestone[], i: number, k: number) =>
    [...r.slice(0, i), ...r.slice(i, k + 1).reverse(), ...r.slice(k + 1)];

  let improved = true;
  let best = route;

  while (improved) {
    improved = false;
    for (let i = 1; i < best.length - 2; i++) {
      for (let k = i + 1; k < best.length - 1; k++) {
        const newRoute = swap(best, i, k);
        const distOld = haversineDistance(best[i - 1].coordinates, best[i].coordinates) +
                        haversineDistance(best[k].coordinates, best[k + 1].coordinates);
        const distNew = haversineDistance(newRoute[i - 1].coordinates, newRoute[i].coordinates) +
                        haversineDistance(newRoute[k].coordinates, newRoute[k + 1].coordinates);
        if (distNew < distOld) {
          best = newRoute;
          improved = true;
        }
      }
    }
  }
  return best;
};