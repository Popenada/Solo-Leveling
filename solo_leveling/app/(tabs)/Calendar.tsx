import { FlatList, Pressable, View } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Text from '@/components/ui/Text'
import { useQuestStore } from '@/store/useQuestStore'
import QuestCard from '@/components/quest/QuestCard'
import { theme } from '@/constants/theme'
import { Quest } from '@/types/Quest'

export default function CalendarScreen() {
  const { quests, addQuest } = useQuestStore()
  const [tapCount, setTapCount] = useState(0)

  const handleAddQuest = () => {
    setTapCount(count => count + 1)

    const newQuest: Quest = {
      id: Date.now().toString(),
      type: 'daily',
      title: 'Complete 10 push-ups',
      icon: '⚔️',
      progress: 0,
      xpReward: 25,
      completed: false,
      createdAt: new Date(),
    }

    addQuest(newQuest)
  }

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
            <Pressable
              onPress={handleAddQuest}
              style={{
                backgroundColor: theme.colors.purple,
                borderRadius: theme.radius.md,
                paddingVertical: 14,
                paddingHorizontal: 24,
                alignItems: 'center',
              }}>
              <Text variant="label" style={{ color: '#ffffff' }}>
                Add Quest
              </Text>
            </Pressable>
            <Text variant="caption">
              Quests loaded: {quests.length}
            </Text>
            <Text variant="caption">
              Button taps: {tapCount}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <QuestCard quest={item} />
        )}
        ListEmptyComponent={
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: theme.spacing.lg,
          }}>
            <Text variant="heading">No quests yet</Text>
            <Text variant="caption" style={{ marginTop: theme.spacing.sm, textAlign: 'center' }}>
              Tap Add Quest to create a test quest card.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  )
}
