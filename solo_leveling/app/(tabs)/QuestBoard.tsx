// UI element imports 

import QuestCard from "@/components/QuestCard";
import { View } from "react-native";
// export function to return tabs screen
export default function QuestBoardScreen(){
    return (
        <View className="flex-1 bg-bg p-4 gap-3">
            <QuestCard quest ={{
                id: '1',
                type: 'daily',
                title: '5km Morning Run',
                icon: 'ICON',
                progress: 60,
                xpReward: 250,
                completed: false,
            }}/>
        </View>
    );
}