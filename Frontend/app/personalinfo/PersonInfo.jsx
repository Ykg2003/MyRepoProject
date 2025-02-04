import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import useLogout from '../../hook/uselogout';
import { useRouter } from 'expo-router';

export default function PersonInfo() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const router = useRouter();

  // Ensure user exists before rendering
  if (!user) {
    return null; // Optionally, render a loading spinner or placeholder
  }

  const handleLogout = async () => {
    await logout();
    router.push('/auth/sign-in'); // Navigate to sign-in page after logout
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        {/* Profile Image */}
        <View style={styles.profileImage}>
          <Text style={styles.profileText}>R</Text>
        </View>

        {/* Name and Email */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>

      {/* Additional User Information */}
      <TouchableOpacity style={styles.infoButton}>
        <Text style={styles.infoText}>Class Name: {user.classname}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.infoButton}>
        <Text style={styles.infoText}>College Name: vcst college</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.infoButton}>
        <Text style={styles.infoText}>Role: {user.role}</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Additional Empty Spacing */}
      {Array.from({ length: 5 }).map((_, index) => (
        <TouchableOpacity key={index} style={styles.emptySpace}>
          <Text style={styles.emptyText}>.</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#16a34a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userInfo: {
    marginLeft: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#6b7280',
  },
  infoButton: {
    backgroundColor: '#e5e7eb',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  infoText: {
    color: '#374151',
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  emptySpace: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  emptyText: {
    color: '#fff',
    textAlign: 'center',
  },
});
