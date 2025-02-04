import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import PersonInfo from '../personalinfo/PersonInfo'

export default function Profile() {
  return (
    <View style={styles.container}>
      <PersonInfo/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B2F5EA', // Mint color
    width: '100%',
  },
});
