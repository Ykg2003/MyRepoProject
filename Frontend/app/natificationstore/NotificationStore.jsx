import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from 'expo-router';

export default function NotificationStore() {
  const navigation = useNavigation();

  // Set the header title
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Notification',
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: 'green',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.activeTabText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.inactiveTabText}>Mentions</Text>
        </TouchableOpacity>
      </View>

      {/* Section Title */}
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitleText}>This Week</Text>
      </View>

      {/* Notifications List */}
      <ScrollView>
        {notifications.map((item, index) => (
          <View key={index} style={styles.notificationContainer}>
            {/* Profile Icon */}
            <View style={styles.profileIcon}>
              <Text style={styles.profileIconText}>{item.initial}</Text>
            </View>

            {/* Notification Content */}
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationTime}>{item.time}</Text>
            </View>

            {/* Thumbnail */}
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.thumbnail} />
            ) : null}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const notifications = [
  {
    initial: 'Z',
    title: 'Recommended: Fateh - Official Trailer | Sonu Sood | Jacqueline Fernandez',
    time: '1 day ago',
    image: '', // Replace with actual image URL
  },
  {
    initial: 'O',
    title: 'Recommended: Tech Placement & Internship preparation',
    time: '2 days ago',
    image: 'https://via.placeholder.com/100x60',
  },
  {
    initial: 'S',
    title: 'Recommended: Superman | Official Teaser Trailer',
    time: '2 days ago',
    image: 'https://via.placeholder.com/100x60',
  },
  {
    initial: 'S',
    title: 'Recommended: Sikandar - New Movie Trailer | Salman Khan',
    time: '2 days ago',
    image: 'https://via.placeholder.com/100x60',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8f5',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f8f5',
    padding: 8,
    justifyContent: 'center',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: 'black',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inactiveTabText: {
    color: '#6c757d',
  },
  sectionTitleContainer: {
    padding: 12,
  },
  sectionTitleText: {
    fontSize: 14,
    color: '#6c757d',
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginVertical: 4,
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileIconText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#6c757d',
  },
  thumbnail: {
    width: 60,
    height: 40,
    borderRadius: 4,
  },
});
