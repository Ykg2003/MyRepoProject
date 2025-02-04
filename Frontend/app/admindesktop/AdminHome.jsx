import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Alert, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "http://192.168.1.3:3000/api/admin";

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  const getToken = async () => {
    try {
      const userData = await AsyncStorage.getItem("clean-campus");
      return JSON.parse(userData)?.token;
    } catch (e) {
      console.error("Error fetching token", e);
      return null;
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await getToken();
        if (!token) {
          Alert.alert("Error", "User authentication failed");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${BASE_URL}/getuser`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(response.data);
      } catch (error) {
        Alert.alert("Error", error.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert("Error", "User authentication failed");
        return;
      }

      const response = await axios.delete(`${BASE_URL}/deleteuser/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert("Success", response.data.message);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      Alert.alert("Error", "Failed to delete user");
      console.error(error);
    }
  };

  const handleAddPeon = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/addazpeon`, { name, email, password });
      Alert.alert("Success", "Peon role added successfully");
      const data = response.data.newUser;
      Alert.alert(data);
      setUsers((prevUsers) => [...prevUsers, data]);
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      Alert.alert("Error", "Failed to add peon role");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin User Management</Text>

      <Text style={styles.subHeader}>Add Peon:</Text>
      <TextInput
        style={styles.input}
        placeholder="Peon Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Peon Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Peon Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleAddPeon} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>

      <Text style={styles.subHeader}>All Users:</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : users.length === 0 ? (
        <Text style={styles.noUsersText}>No users found.</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.userItem}>
              <Text style={styles.userName}>{item.name || 'N/A'}</Text>
              <Text style={styles.userEmail}>{item.email}</Text>
              <TouchableOpacity onPress={() => handleDeleteUser(item._id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2F1',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderColor: '#B0BEC5',
  },
  addButton: {
    backgroundColor: '#00796B',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noUsersText: {
    textAlign: 'center',
    color: '#757575',
  },
  userItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: '#B0BEC5',
  },
  userName: {
    flex: 1,
    fontSize: 16,
    color: '#455A64',
  },
  userEmail: {
    flex: 1,
    fontSize: 16,
    color: '#455A64',
  },
  deleteButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default AdminUserManagement;
