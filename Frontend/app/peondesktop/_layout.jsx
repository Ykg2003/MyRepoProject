
import { View, Text } from 'react-native';
import React from 'react';
import PeonHome from '../peondesktop/PeonHome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen'; // Import your Profile screen
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function PeonLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { color: 'black' },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={PeonHome} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color = 'gray', focused = false }) => (
            <Ionicons
              name="home"
              size={24}
              color={focused ? '#16a34a' : color} // green-600 for active, default gray for inactive
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color = 'gray', focused = false }) => (
            <Ionicons
              name="person-circle"
              size={24}
              color={focused ? '#16a34a' : color} // green-600 for active, default gray for inactive
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}