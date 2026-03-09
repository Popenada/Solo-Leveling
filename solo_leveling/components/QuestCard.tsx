// Create Quest card that includes exp, workoout, type

import { Text, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'

type QuestType = 'daily' | 'weekly' | 'special' | 'penalty'

interface Quest {
    id: string
    type: QuestType
    title: string
    progress: number
    xpReward: number
    icon: string
    completed: boolean
}

const TYPE_CONFIG = {
  daily:   { label: 'DAILY QUEST',   color: 'text-cyan',   border: 'border-l-cyan',   iconBg: 'bg-cyan/10'    },
  weekly:  { label: 'WEEKLY QUEST',  color: 'text-purple', border: 'border-l-purple', iconBg: 'bg-purple/10'  },
  special: { label: 'SPECIAL QUEST', color: 'text-gold',   border: 'border-l-gold',   iconBg: 'bg-gold/10'    },
  penalty: { label: 'PENALTY QUEST', color: 'text-red',    border: 'border-l-red',    iconBg: 'bg-red/10'     },
}

// For dynamic values that Tailwind can't do, keep a small lookup
const PROGRESS_COLORS = {
  daily:   '#06d6e8',
  weekly:  '#6347ff',
  special: '#f5c842',
  penalty: '#ff4757',
}

export default function QuestCard({ quest, onPress }: { quest: Quest; onPress?: (q: Quest) => void }) {
    const scale = useSharedValue(1)
    const config = TYPE_CONFIG[quest.type]
    const isComplete = quest.progress >= 100

    return (
        <View className={`
            flex-row items-center gap-3
            bg-card rounded-xl p-4
            border border-purple/20 border-l-4 ${config.border}
            ${isComplete ? 'opacity-50' : 'opacity-100'}
        `}>
            <View className="flex-1 gap-1">
                <Text className={`text-[9px] font-semibold tracking-widest font-rajdhani ${config.color}`}>
                {config.label}
                </Text>

                <Text className={`text-[15px] font-bold text-white font-rajdhani
                    ${isComplete ? 'line-through text-white/30' : ''}
                    `}>
                    {quest.title}
                </Text>

                <View className="flex-row items-center gap-2">
                    <View className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                        <View
                            className="h-full rounded-full"
                            style={{
                            width: `${quest.progress}%`,
                            backgroundColor: PROGRESS_COLORS[quest.type],
                        }}
                        />
                    </View>
                    <Text className="text-[11px] text-white/40 font-orbitron w-8 text-right">
                        {quest.progress}%
                    </Text>
                </View>
            </View>
            {/* XP Badge */}
            <View className={`
                    px-2 py-1 rounded-md border
                    ${quest.type === 'penalty'
                    ? 'border-red/40 bg-red/10'
                    : 'border-purple/30 bg-purple/10'
                }
                `}>
                <Text className={`text-[11px] font-bold font-orbitron
                    ${quest.type === 'penalty' ? 'text-red' : 'text-purple-light'}
                `}>
                    {quest.type === 'penalty' ? 'PENALTY' : `+${quest.xpReward} XP`}
                </Text>
            </View>
        </View>

    )
}
