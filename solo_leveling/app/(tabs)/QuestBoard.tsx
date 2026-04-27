import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QuestBoardScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#111", justifyContent: "center", alignItems: "center" }}>
      <View>
        <Text style={{ color: "#fff", fontSize: 24, fontWeight: "700" }}>Quest Board Debug</Text>
        <Text style={{ color: "#fff", marginTop: 12 }}>If you can see this, routing works.</Text>
      </View>
    </SafeAreaView>
  );
}
