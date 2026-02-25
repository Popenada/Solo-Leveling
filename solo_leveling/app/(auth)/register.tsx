import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerUser } from "./authservice";

export default function Register() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // validation and error checkings for registering
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      // Awaiting user authentication from authservice for email, password, and username
      const result = await registerUser(email, password, username);

      if (result?.needsEmailConfirmation) {
        Alert.alert("Confirm Email", result.message);
      } else {
        Alert.alert("Success", "Account created!");
        router.replace("/Profile");
      }
    } catch (err: any) {
      Alert.alert("Registration failed", err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6 gap-4">
        <Text className="text-2xl font-bold">Create Account</Text>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          className="w-full border border-gray-300 rounded-lg p-3"
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          className="w-full border border-gray-300 rounded-lg p-3"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="w-full border border-gray-300 rounded-lg p-3"
        />

        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          className="w-full border border-gray-300 rounded-lg p-3"
        />

        <Pressable
          onPress={handleRegister}
          disabled={loading}
          className="w-full bg-blue-500 rounded-lg p-4 items-center"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold">Register</Text>
          )}
        </Pressable>

        <Pressable onPress={() => router.push("/(auth)/login")}>
          <Text className="text-blue-500 mt-4">
            Already have an account? Login
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
