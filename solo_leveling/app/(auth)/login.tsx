import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default async function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const [loading, setLoading] = useState('');

  const handleLogin = async () => {
    if (!email || !password){
        Alert.alert('Error', 'Please fill the fields');
        return;
    }
  }
  setLoading = (true);
  const result = await loginUser(email, password);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <Pressable onPress={() => router.push("/(auth)/register")}>
          <Text className="text-blue-500 mt-4">
            Don’t have an account? Register
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
