import Text from "@/components/ui/Text"
import { useQuestStore } from "@/store/useQuestStore"
import { Pressable, View } from "react-native"

export default function QuestBoardScreen() {
  const quests = useQuestStore(s => s.quests)
  const addQuest = useQuestStore(s => s.addQuest)

  console.log('render — quests length:', quests.length)

  return (
    <View style={{ flex: 1, padding: 20, gap: 16 }}>
      
      <Text variant="heading">Quests: {quests.length}</Text>

      <Pressable
        onPress={() => {
          console.log('pressed')
          addQuest({
            id: Date.now().toString(),
            type: 'daily',
            title: 'Test Quest',
            icon: '⚔️',
            progress: 0,
            xpReward: 100,
            completed: false,
            createdAt: new Date(),
            expiresAt: new Date(),
          })
          console.log('after add:', useQuestStore.getState().quests.length)
        }}
        style={{ backgroundColor: 'purple', padding: 16, borderRadius: 8 }}
      >
        <Text>ADD QUEST</Text>
      </Pressable>

      {quests.map(q => (
        <Text key={q.id}>{q.title}</Text>
      ))}

    </View>
  )
}