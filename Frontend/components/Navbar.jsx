import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useAuthContext } from '@/context/AuthContext';

export default function Navbar() {
  const { user } = useAuthContext();

  return (
    <View style={styles.navbar}>
      {/* Column for User Name and Clean-Campus */}
      <View>
        {/* Clean Campus */}
        <Text style={styles.title}>Clean-Campus</Text>
        {/* User Name */}
        <Text style={styles.greeting}>Hi {user?.name}</Text>
      </View>

      {/* Notification Button */}
      <View style={styles.notificationContainer}>
        <Image
          source={require("../assets/images/navbaricons.jpg")} // Replace with your actual image path
          style={styles.notificationIcon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#000', // Equivalent to 'bg-back'
    height: 80, // Equivalent to 'h-20'
    flexDirection: 'row', // Equivalent to 'flex-row'
    alignItems: 'center', // Equivalent to 'items-center'
    justifyContent: 'space-between', // Equivalent to 'justify-between'
    paddingHorizontal: 16, // Equivalent to 'px-4'
  },
  title: {
    fontSize: 18, // Equivalent to 'text-lg'
    color: '#fff', // Equivalent to 'text-white'
    fontWeight: 'bold', // Equivalent to 'font-bold'
    textShadowColor: 'rgba(0, 0, 0, 0.3)', // Equivalent to 'shadow-sm'
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  greeting: {
    fontSize: 18, // Equivalent to 'text-lg'
    color: '#fff', // Equivalent to 'text-white'
  },
  notificationContainer: {
    backgroundColor: '#f0f0f0', // Equivalent to light gray background
    padding: 5,
    borderRadius: 10,
  },
  notificationIcon: {
    width: 60,
    height: 58,
  },
});
