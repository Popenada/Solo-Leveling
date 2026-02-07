import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Login() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white">

      {/* Your login form here */}

      <Pressable onPress={() => router.push("/(auth)/register")}>
        <Text className="text-blue-500 mt-4">
          Don’t have an account? Register
        </Text>
      </Pressable>

    </View>
  );
}
