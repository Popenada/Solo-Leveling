import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Register() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white">

      {/* Your register form */}

      <Pressable onPress={() => router.push("/(auth)/login")}>
        <Text className="text-blue-500 mt-4">
          Already have an account? Login
        </Text>
      </Pressable>

    </View>
  );
}
