import { useAuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import axios from "axios";

const useLogin = () => {
  const { setUser } = useAuthContext();

  const login = async ({ email, password }) => {
    // Input validation
    if (!email || !password) {
      Alert.alert("Login Failed", "Both email and password are required.");
      return false;
    }

    try {
      const API_URL = "http://192.168.1.3:3000/api/auth/login";
      const response = await axios.post(API_URL, { email, password });

      if (response.data.error) {
        Alert.alert("Login Failed", response.data.error);
        return false;
      }

      const { token, name, email: userEmail, classname, role } = response.data;

      // Prepare user data
      const userData = { name, email: userEmail, classname, role, token };

      // Save token and user data securely
      await AsyncStorage.setItem("jwt", token);
      await AsyncStorage.setItem("clean-campus", JSON.stringify(userData));

      // Update context state based on role
      setUser(userData);

      // Log role for debugging
      console.log(`Logged in as: ${role}`, userData);

      Alert.alert("Login Successful", `Welcome back, ${name}!`);
      return true;
    } catch (error) {
      if (error.response) {
        Alert.alert("Login Failed", error.response.data.error || "An unexpected error occurred.");
      } else if (error.request) {
        Alert.alert(
          "Network Error",
          "Unable to connect to the server. Please check your internet connection."
        );
      } else {
        console.error("Error during login:", error.message);
        Alert.alert("Login Failed", "An unexpected error occurred.");
      }
      return false;
    }
  };

  return { login };
};

export default useLogin;