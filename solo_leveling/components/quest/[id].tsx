// app/quest/[id].tsx
import { View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import Text from '@/components/ui/Text'

export default function QuestDetail() {
  const { id } = useLocalSearchParams()

  return (
    <View className="flex-1 bg-bg p-4">
      <Text variant="heading">Quest {id}</Text>
    </View>
  )
}