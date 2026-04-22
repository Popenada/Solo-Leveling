import { useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import QuestCard from "@/components/quest/QuestCard";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import { theme } from "@/constants/theme";
import { useQuestStore } from "@/store/useQuestStore";
import type { Quest } from "@/types/Quest";

export default function QuestBoardScreen() {
  const { quests, addQuest, completeQuest } = useQuestStore();
  const [tapCount, setTapCount] = useState(0);

  const handleAddQuest = () => {
    setTapCount((count) => count + 1);
    console.log("button pressed");

    const newQuest: Quest = {
      id: Date.now().toString(),
      type: "daily",
      title: `Daily Training ${quests.length + 1}`,
      icon: "Q",
      progress: 0,
      xpReward: 25,
      completed: false,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 86400000),

    };

    addQuest(newQuest);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg2 }}>
      <FlatList
        data={quests}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          flexGrow: 1,
          padding: theme.spacing.md,
          gap: theme.spacing.md,
        }}
        ListHeaderComponent={
          <View style={{ gap: theme.spacing.sm }}>
            <Text variant="heading">Quest Board</Text>
            <Button label="Add Quest" onPress={handleAddQuest} fullWidth />
            <Text variant="caption">Quests loaded: {quests.length}</Text>
            <Text variant="caption">Button taps: {tapCount}</Text>
          </View>
        }
        renderItem={({ item }) => (
          <QuestCard
            quest={item}
            onComplete={() => completeQuest(item.id)}
          />
        )}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              padding: theme.spacing.lg,
            }}
          >
            <Text variant="heading">No quests yet</Text>
            <Text
              variant="caption"
              style={{ marginTop: theme.spacing.sm, textAlign: "center" }}
            >
              Tap Add Quest to create a quest card.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
