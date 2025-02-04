import { View } from "react-native";
import React, { useEffect } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [redirectPath, setRedirectPath] = React.useState(null);

  useEffect(() => {
    const checkAuthAndRole = async () => {
      try {
        // Retrieve user data from AsyncStorage
        const userData = await AsyncStorage.getItem("clean-campus");
        if (!userData) {
          setRedirectPath("/auth/sign-in"); // Redirect to sign-in if no user data
          return;
        }

        // Parse user data
        const user = JSON.parse(userData);

        // Check user role and set the redirection path
        switch (user.role) {
          case "admin":
            setRedirectPath("/admindesktop");
            break;
          case "peon":
            setRedirectPath("/peondesktop");
            break;
          case "user":
            setRedirectPath("/(tabs)/home");
            break;
          default:
            setRedirectPath("/auth/sign-in"); // Redirect to sign-in if role is unknown
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setRedirectPath("/auth/sign-in"); // Redirect to sign-in on error
      }
    };

    checkAuthAndRole();
  }, []);

  // Render the redirection when the path is determined
  if (!redirectPath) {
    return null; // Render nothing while determining redirection
  }

  return (
    <View>
      <Redirect href={redirectPath} />
    </View>
  );
}