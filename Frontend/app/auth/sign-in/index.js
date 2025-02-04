import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image, Switch, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useLogin from "../../../hook/uselogin";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();
  const { login } = useLogin();

  const handleLogin = async () => {
    setLoading(true); // Start loading
    try {
      const success = await login({ email, password });
      if (success) {
        const userDataString = await AsyncStorage.getItem("clean-campus");
        const userData = userDataString ? JSON.parse(userDataString) : null;

        if (userData && userData.role) {
          switch (userData.role) {
            case "admin":
              router.push("/admindesktop");
              break;
            case "peon":
              router.push("/peondesktop");
              break;
            case "user":
              router.push("(tabs)/home");
              break;
            default:
              Alert.alert("Login Error", "Invalid user role.");
          }
        } else {
          Alert.alert("Login Error", "User data is missing. Please try again.");
        }
      } else {
        Alert.alert("Login Error", "Invalid email or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Login Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoImageWrapper}>
          <Image
            source={require("../../../assets/images/navbaricons.jpg")} // Replace with your actual image path
            style={styles.logoImage}
          />
        </View>
        <Text style={styles.logoText}>Clean Campus</Text>
      </View>

      {/* Login Form */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Login</Text>

        {/* Username */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.inputField}>
            <TextInput
              placeholder="Enter your email"
              style={styles.inputText}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        {/* Password */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputField}>
            <TextInput
              placeholder="Enter your password"
              style={styles.inputText}
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Text style={styles.passwordVisibilityText}>
                {passwordVisible ? "👁️" : "🙈"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Remember Me and Forgot Password */}
        <View style={styles.rememberMeContainer}>
          <View style={styles.rememberMeWrapper}>
            <Switch
              value={rememberMe}
              onValueChange={setRememberMe}
              thumbColor={rememberMe ? "#2196F3" : "#f4f3f4"}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
            />
            <Text style={styles.rememberMeText}>Remember me</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Create Account */}
        <TouchableOpacity onPress={() => router.replace("auth/signup")} style={styles.createAccountButton}>
          <Text style={styles.createAccountText}>Create Account</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.loginButton}
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <ActivityIndicator color="#fff" /> // Loading spinner
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#0A1D29",
  },
  logoContainer: {
    marginBottom: 32,
    alignItems: "center",
  },
  logoImageWrapper: {
    width: 60,
    height: 58,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#388E3C",
  },
  logoImage: {
    width: 60,
    height: 58,
  },
  logoText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
  },
  formContainer: {
    width: "100%",
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formTitle: {
    color: "#388E3C",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: "#000",
    marginBottom: 8,
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  passwordVisibilityText: {
    color: "#2196F3",
    fontSize: 18,
  },
  rememberMeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rememberMeWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeText: {
    fontSize: 14,
    color: "#2196F3",
    marginLeft: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#2196F3",
  },
  createAccountButton: {
    marginTop: 12,
  },
  createAccountText: {
    fontSize: 14,
    color: "#2196F3",
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#388E3C",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
