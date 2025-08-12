import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Button, 
  FlatList, 
  Alert, 
  StyleSheet, 
  TextInput,
  SafeAreaView 
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useAppStore } from '../store/AppStore';
import { Milestone } from '../types';
import { getCurrentLocation } from '../services/LocationService';
import { optimizeRoute } from '../services/RouteOptimizer';
import { sendNotification, setupNotifications } from '../services/NotificationService';
import { MilestoneItem } from '../components/MilestoneItem';

const HomeScreen: React.FC = () => {
  const { 
    milestones, 
    addMilestone, 
    removeMilestone,
    toggleComplete,
    setOptimizedRoute, 
    optimizedRoute 
  } = useAppStore();

  const [duration, setDuration] = useState('30');

  useEffect(() => {
    setupNotifications();
  }, []);

  const onPlaceSelect = (data: any, details: any = null) => {
    if (milestones.length >= 10) {
      Alert.alert('Limit Reached', 'Maximum 10 milestones allowed');
      return;
    }

    const milestone: Milestone = {
      id: Date.now().toString(),
      name: data.description,
      address: data.description,
      coordinates: {
        latitude: details?.geometry?.location?.lat ?? 0,
        longitude: details?.geometry?.location?.lng ?? 0
      },
      estimatedDuration: parseInt(duration) || 30,
      order: milestones.length + 1,
      completed: false
    };

    addMilestone(milestone);
    sendNotification('Milestone Added', `Added: ${milestone.name}`);
  };

  const onOptimizeRoute = async () => {
    if (milestones.length < 3) {
      Alert.alert('Need More Milestones', 'Add at least 3 milestones to optimize route');
      return;
    }

    try {
      const location = await getCurrentLocation();
      const route = optimizeRoute(milestones, location);
      setOptimizedRoute(route);

      Alert.alert(
        'Route Optimized!', 
        `Total Distance: ${route.totalDistance.toFixed(2)} km\nEstimated Time: ${Math.round(route.estimatedTotalTime)} minutes`
      );

      sendNotification('Route Ready', 'Your optimized route is ready!');
    } catch (error) {
      Alert.alert('Location Error', 'Unable to get your current location. Please enable location services.');
    }
  };

  const onRemoveMilestone = (id: string) => {
    Alert.alert(
      'Remove Milestone',
      'Are you sure you want to remove this milestone?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => removeMilestone(id) }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Micro-Adventure Route Planner</Text>

      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          fetchDetails={true}
          placeholder="Search for a place to add..."
          query={{ 
            key: 'YOUR_GOOGLE_PLACES_API_KEY', 
            language: 'en',
            components: 'country:us|country:ca|country:gb|country:au'
          }}
          onPress={onPlaceSelect}
          styles={{
            textInput: styles.searchInput,
            container: { flex: 0 },
            listView: { backgroundColor: 'white' }
          }}
        />
      </View>

      <View style={styles.durationContainer}>
        <Text style={styles.label}>Duration (minutes):</Text>
        <TextInput
          style={styles.durationInput}
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
          placeholder="30"
        />
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>
          Milestones ({milestones.length}/10)
        </Text>
      </View>

      <FlatList
        data={milestones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MilestoneItem
            milestone={item}
            onToggleComplete={() => toggleComplete(item.id)}
            onRemove={() => onRemoveMilestone(item.id)}
          />
        )}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.buttonContainer}>
        <Button 
          title="Optimize Route" 
          onPress={onOptimizeRoute}
          disabled={milestones.length < 3}
        />
      </View>

      {optimizedRoute && (
        <View style={styles.routeInfo}>
          <Text style={styles.routeText}>
            📍 Route: {optimizedRoute.totalDistance.toFixed(2)} km
          </Text>
          <Text style={styles.routeText}>
            ⏱️ Time: {Math.round(optimizedRoute.estimatedTotalTime)} min
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 16,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginRight: 12,
    color: '#333',
  },
  durationInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    width: 80,
    textAlign: 'center',
  },
  listHeader: {
    marginBottom: 12,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  list: {
    flex: 1,
    marginBottom: 16,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  routeInfo: {
    backgroundColor: '#f0f8ff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  routeText: {
    fontSize: 16,
    color: '#007AFF',
    textAlign: 'center',
    marginVertical: 2,
  },
});

export default HomeScreen;