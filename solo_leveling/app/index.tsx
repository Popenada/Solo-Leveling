import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

import Text from "@/components/ui/Text";
import { theme } from "@/constants/theme";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/QuestBoard");
  }, [router]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.bg2,
      }}
    >
      <Text variant="caption">Loading Quest Board...</Text>
    </View>
  );
}
