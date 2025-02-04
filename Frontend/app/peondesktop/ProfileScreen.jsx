import { View, StyleSheet } from 'react-native';
import React from 'react';
import PersonInfo from '../personalinfo/PersonInfo';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <PersonInfo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5dc', // Mint-like color
    flex: 1, // Full height
    width: '100%', // Full width
  },
});
