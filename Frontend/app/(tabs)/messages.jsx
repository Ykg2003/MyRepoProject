import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import TaskList from '../tasklist/TaskList';

export default function Messages() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Clean Campus</Text>
      <TaskList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC', // Light background color
    padding: 10,
  },
  headerText: {
    height: 40,
    padding: 8,
    fontSize: 18,
    fontWeight: '600',
    backgroundColor: '#E2E8F0', // Gray background color
    marginBottom: 10,
    textAlign: 'center',
    color: '#2D3748', // Dark text color
  },
});
