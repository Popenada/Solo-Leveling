// app/quest/[id].tsx
// Modal UI from quests
import Text from '@/components/ui/Text'
import { useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'

export default function QuestDetail() {
  const { id } = useLocalSearchParams()

  return (
    <View className="flex-1 bg-bg p-4">
      <Text variant="heading">Quest {id}</Text>
    </View>
  )
}