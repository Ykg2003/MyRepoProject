import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import useSignup from "../../../hook/usesignup";

export default function SignUp() {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [classname, setClassname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();
  const { signup } = useSignup();

  const handleSignUp = async () => {
    setLoading(true); // Start loading
    const success = await signup({ name, email, classname, password });
    setLoading(false); // Stop loading after signup process
    if (success) {
      Alert.alert("Success", "Account created successfully!");
      router.replace("auth/sign-in");
    } else {
      Alert.alert("Error", "Signup failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Welcome To Clean Campus</Text>
      </View>

      {/* Signup Form */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>
          Sign Up <Text style={styles.formSubtitle}>in Clean-Campus</Text>
        </Text>

        {/* Name */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Name</Text>
          <View style={styles.inputField}>
            <TextInput
              placeholder="Enter your name"
              style={styles.inputText}
              value={name}
              onChangeText={setname}
            />
          </View>
        </View>

        {/* Email */}
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

        {/* Classname */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Classname</Text>
          <View style={styles.inputField}>
            <TextInput
              placeholder="Enter your classname"
              style={styles.inputText}
              value={classname}
              onChangeText={setClassname}
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

        {/* Sign In Navigation */}
        <TouchableOpacity onPress={() => router.replace("auth/sign-in")} style={styles.signInButton}>
          <Text style={styles.signInText}>Already have an account? Sign In</Text>
        </TouchableOpacity>

        {/* Signup Button */}
        <TouchableOpacity
          style={styles.signupButton}
          onPress={handleSignUp}
          disabled={loading} // Disable the button while loading
        >
          {loading ? (
            <ActivityIndicator color="white" /> // Loading spinner
          ) : (
            <Text style={styles.signupButtonText}>Sign Up</Text>
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
    backgroundColor: "#0A1D29",
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
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
  formSubtitle: {
    color: "#9E9E9E",
    fontSize: 14,
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
  signInButton: {
    marginTop: 12,
  },
  signInText: {
    fontSize: 14,
    color: "#2196F3",
    textAlign: "center",
  },
  signupButton: {
    backgroundColor: "#388E3C",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
