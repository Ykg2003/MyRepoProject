import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import axios from "axios";

const useSignup = () => {
  const { setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const signup = async ({ name, email, classname, password }) => {
    // Input validation
    if (!name || !email || !classname || !password) {
      Alert.alert("Signup Failed", "All fields are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Signup Failed", "Invalid email format.");
      return false;
    }

    if (password.length < 7) {
      Alert.alert("Signup Failed", "Password must be at least 7 characters.");
      return false;
    }

    setLoading(true); // Indicate loading state

    try {
      const API_URL = "http://192.168.1.3:3000/api/auth/signup";
      const response = await axios.post(API_URL, { name, email, classname, password });

      if (response.data.error) {
        Alert.alert("Signup Failed", response.data.error);
        return false;
      }

      const { token, ...userData } = response.data;

      // Save user data and token securely
      await AsyncStorage.setItem("jwt", token);
      await AsyncStorage.setItem("clean-campus", JSON.stringify(userData));

      // Update auth context
      setUser(userData);

      Alert.alert("Signup Successful", "Welcome to Clean Campus!");
      return true;
    } catch (error) {
      if (error.response) {
        Alert.alert("Signup Failed", error.response.data.error || "An unexpected error occurred.");
      } else if (error.request) {
        Alert.alert(
          "Network Error",
          "Unable to connect to the server. Please check your internet connection."
        );
      } else {
        console.error("Signup Error:", error.message);
        Alert.alert("Signup Failed", "An unexpected error occurred.");
      }
      return false;
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return { signup, loading };
};

export default useSignup;