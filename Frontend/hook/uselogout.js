import { useAuthContext } from "../context/AuthContext";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";

const useLogout = () => {
  const { setUser } = useAuthContext();
   const router = useRouter();

  const logout = async () => {
    try {
      const API_URL = "http://192.168.1.3:3000/api/auth/logout";

      // Make API call for logout
      const response = await axios.post(API_URL);

      if (response.status !== 200) {
        Alert.alert("Logout failed", "Please try again later.");
        return;
      }

      // Clear local storage and reset user state
      await AsyncStorage.removeItem("jwt"); // Removing token explicitly
      await AsyncStorage.removeItem("clean-campus"); // Removing stored user data
      setUser(null);

      // Navigate to the sign-in page using router
       router.push("/app/auth/sign-in");

      // Show success message
      Alert.alert("Logout Successful", "You have been logged out.");
    } catch (error) {
      console.error("Error during logout:", error);
      Alert.alert("Logout failed", "An unexpected error occurred. Please try again.");
    }
  };

  return { logout };
};

export default useLogout;