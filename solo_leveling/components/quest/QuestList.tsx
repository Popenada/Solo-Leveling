import { theme } from '@/constants/theme'
import { usePlayerStore } from '@/store/usePlayerStore'
import { useQuestStore } from '@/store/useQuestStore'
import type { Quest } from '@/types/Quest'
import { FlatList, View } from 'react-native'
import Text from '../ui/Text'
import QuestCard from './QuestCard'
export default function QuestList() {
    // Use QuestStore and PlayerStore for Quest and Player objects
    // Props to use for QuestList: quests, completeQuest, addXp
    const quests = useQuestStore(s => s.quests)
    const completeQuest = useQuestStore(s => s.completeQuest)
    const addXP = usePlayerStore(s => s.addXP)
    
    const questIsCompleted = (quest: Quest) => {
        completeQuest(quest.id)
        addXP(quest.xpReward)
    }
    // Check if there are no quests, display no quests available text
    if (quests.length === 0) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text variant="caption">No quests available</Text>
            </View>
        )
    }

    return (
        <FlatList 
            data={quests}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <QuestCard quest={item} onComplete={questIsCompleted}/>
            )}
            contentContainerStyle={{ gap: theme.spacing.md, padding: theme.spacing.md}}
            showsVerticalScrollIndicator={false}
        />
    )
}