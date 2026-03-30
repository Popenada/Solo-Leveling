// UI element imports 

import QuestCard from "@/components/quest/QuestCard";
import { View } from "react-native";
import ProgressBar from "@/components/ui/ProgressBar";
// export function to return tabs screen
export default function QuestBoardScreen(){
    return (
        <View>
            <ProgressBar progress={20}/>
        </View>
    );
}