import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Register() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <View className="flex-1 items-center justify-center">
        <Pressable
          className="mt-4"
          onPress={() => router.push("/(auth)/login")}
        >
          <Text className="text-blue-500 text-base">
            Already have an account? Login
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
