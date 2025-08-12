import Geolocation from 'react-native-geolocation-service';

export const getCurrentLocation = () =>
  new Promise<{ latitude: number; longitude: number }>((resolve, reject) =>
    Geolocation.getCurrentPosition(
      p => resolve({ latitude: p.coords.latitude, longitude: p.coords.longitude }),
      err => reject(err),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  );

export const isWithinProximity = (
  userCoord: { latitude: number; longitude: number },
  targetCoord: { latitude: number; longitude: number },
  radius = 100 // meters
): boolean => {
  const distance = haversineDistance(userCoord, targetCoord) * 1000; // convert to meters
  return distance <= radius;
};

// Helper function for proximity check
const haversineDistance = (
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