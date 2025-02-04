import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AdminHome from '../admindesktop/AdminHome';
import useLogout from '../../hook/uselogout';
import { useRouter } from 'expo-router';

const AdminLayout = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { logout } = useLogout();
  const router = useRouter();

  // Toggle the menu visibility
  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/auth/sign-in');
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Admin Dashboard</Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Text style={styles.menuIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Dropdown menu */}
      {menuVisible && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity onPress={handleLogout} style={styles.dropdownItem}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Render the AdminHome component */}
      <AdminHome />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B2F5EA', // Mint color
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#48BB78', // Green color
    height: 48, // 12 * 4 (converted from h-12)
    paddingHorizontal: 16, // px-4
    position: 'relative',
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18, // text-lg
  },
  menuIcon: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24, // text-xl
  },
  dropdownMenu: {
    position: 'absolute',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 8,
    right: 16, // right-4
    top: 64, // top-16
    zIndex: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0', // border-gray-200
    minWidth: 120,
  },
  dropdownItem: {
    paddingVertical: 8, // py-2
    paddingHorizontal: 16, // px-4
  },
  logoutText: {
    color: '#E53E3E', // Red color
    fontWeight: 'bold',
  },
});

export default AdminLayout;
