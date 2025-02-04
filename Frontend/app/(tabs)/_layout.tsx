import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Tablayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { color: 'black' },
      }}
    >
      <Tabs.Screen
        name="home"
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
      <Tabs.Screen
        name="messages"
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color = 'gray', focused = false }) => (
            <Ionicons
              name="chatbubbles"
              size={24}
              color={focused ? '#16a34a' : color} // green-600 for active, default gray for inactive
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
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
    </Tabs>
  );
}