import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        router.replace("/(auth)/login");
        return;
      }

      setEmail(session.user.email ?? null);
      setUsername((session.user.user_metadata?.username as string) ?? null);
    };

    loadUser();
  }, [router]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Logout failed", error.message);
      return;
    }

    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center px-6 gap-4">
        <Text className="text-3xl font-bold">Home</Text>
        <Text className="text-lg">
          Welcome {username || email || "Hunter"}.
        </Text>
        <Text className="text-gray-600">You are logged in successfully.</Text>

        <Pressable
          onPress={handleLogout}
          className="mt-4 bg-red-500 rounded-lg p-4 items-center"
        >
          <Text className="text-white font-semibold">Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
