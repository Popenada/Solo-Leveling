import QuestList from "@/components/quest/QuestList";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuestStore } from "@/store/useQuestStore";
import Text from "@/components/ui/Text";

export default function QuestBoardScreen() {
  const addQuest = useQuestStore(s => s.addQuest);

  const handleAddTestQuest = () => {
    addQuest({
      id: Date.now().toString(),
      type: 'daily',
      title: 'Test Quest',
      icon: '⚔️',
      progress: 0,
      xpReward: 100,
      completed: false,
      createdAt: new Date(),
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#111" }}>
      <QuestList />
      <View style={{ padding: 16 }}>
        <Pressable
          onPress={handleAddTestQuest}
          style={{ backgroundColor: '#06d6e8', borderRadius: 8, padding: 14, alignItems: 'center' }}
        >
          <Text style={{ color: '#000', fontWeight: '700' }}>+ Add Test Quest</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
