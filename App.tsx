import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import { setupNotifications } from './src/services/NotificationService';

const Stack = createStackNavigator();

const App: React.FC = () => {
  useEffect(() => {
    setupNotifications();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'Micro-Adventure Planner',
            headerShown: false // We have our own title in the screen
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;