import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const router = useRouter();

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
