import QuestList from "@/components/quest/QuestList";
import CreateQuestModal from "@/components/quest/CreateQuestModal";
import Text from "@/components/ui/Text";
import { theme } from "@/constants/theme";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QuestBoardScreen() {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <View style={{ flex: 1 }}>

        {/* Header */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: theme.spacing.md,
          paddingBottom: 0,
        }}>
          <Text style={{
            fontFamily: theme.fonts.display,
            fontSize: 16,
            fontWeight: '700',
            color: theme.colors.text,
            letterSpacing: 2,
          }}>
            QUEST BOARD
          </Text>
          <Pressable
            onPress={() => setModalVisible(true)}
            style={{
              backgroundColor: theme.colors.purple,
              borderRadius: theme.radius.sm,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
              ...theme.shadows.purple,
            }}
          >
            <Text style={{
              fontFamily: theme.fonts.display,
              fontSize: 12,
              fontWeight: '700',
              color: theme.colors.text,
              letterSpacing: 1,
            }}>
              + NEW
            </Text>
          </Pressable>
        </View>

        <QuestList />
      </View>

      <CreateQuestModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}
