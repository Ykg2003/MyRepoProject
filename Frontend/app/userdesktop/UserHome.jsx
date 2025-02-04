import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Navbar from '../../components/Navbar';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useRouter } from 'expo-router';

export default function UserHome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Navbar />

      <View style={styles.card}>
        <Text style={styles.instructionText}>
          If you see any trash or dust, click a photo and submit it by tapping the button below.
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push('/components/camera/PhotoClick')} // Navigate to PhotoClick
        style={styles.buttonContainer}
      >
        <FontAwesome name="camera" size={30} color="black" />
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  card: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  instructionText: {
    fontSize: 16,
    color: '#4a4a4a',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    backgroundColor: '#4caf50',
    color: '#ffffff',
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
    textAlign: 'center',
  },
});
