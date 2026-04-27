import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginUser } from "@/lib/auth";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const result = await loginUser(email, password);

      if (!result?.user || !result?.session) {
        Alert.alert("Login failed", "No active session returned from login");
        return;
      }

      router.replace("/(tabs)/QuestBoard");
    } catch (err: any) {
      Alert.alert("Login failed", err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6 gap-4">
        <Text className="text-2xl font-bold">Welcome Back</Text>

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

        <Pressable
          onPress={handleLogin}
          disabled={loading}
          className="w-full bg-blue-500 rounded-lg p-4 items-center"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold">Login</Text>
          )}
        </Pressable>

        <Pressable onPress={() => router.push("/(auth)/register")}>
          <Text className="text-blue-500 mt-4">
            Don’t have an account? Register
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
