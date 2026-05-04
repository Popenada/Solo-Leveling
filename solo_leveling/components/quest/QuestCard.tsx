// Create Quest card that includes exp, workoout, type

import ProgressBar from '@/components/ui/ProgressBar'
import Text from '@/components/ui/Text'
import { theme } from '@/constants/theme'
import type { Quest } from '@/types/Quest'
import * as Haptics from 'expo-haptics'
import { router } from 'expo-router'
import { Pressable, View } from 'react-native'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated'

interface Props {
    quest: Quest,
    onPress?:   (quest: Quest) => void
    onComplete?: (quest: Quest) => void
}
const TYPE_CONFIG = {
  daily:   { label: 'DAILY QUEST',   color: 'text-cyan',   border: 'border-l-cyan',   iconBg: 'bg-cyan/10', leftBar: '#06d6e8'    },
  weekly:  { label: 'WEEKLY QUEST',  color: 'text-purple', border: 'border-l-purple', iconBg: 'bg-purple/10', leftBar: '#7F77DD'  },
  special: { label: 'SPECIAL QUEST', color: 'text-gold',   border: 'border-l-gold',   iconBg: 'bg-gold/10', leftBar: '#f5c842'  },
  penalty: { label: 'PENALTY QUEST', color: 'text-red',    border: 'border-l-red',    iconBg: 'bg-red/10', leftBar: '#ff4757'    },
}

// For dynamic values that Tailwind can't do, keep a small lookup
const PROGRESS_COLORS = {
  daily:   '#06d6e8',
  weekly:  '#6347ff',
  special: '#f5c842',
  penalty: '#ff4757',
}

export default function QuestCard({quest, onPress, onComplete}: Props) {
    const config = TYPE_CONFIG[quest.type]
    const progressColor = PROGRESS_COLORS[quest.type]
    
    const scale = useSharedValue(1)
    const opacity = useSharedValue(1)

    const handlePressIn = () => {
        scale.value = withSpring(0.97, { damping: 15 })
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }

    const handlePressOut = () => {
        scale.value = withSpring(1, {damping: 12})
    }
    const handleLongPress = () => {
        if (quest.completed) return
        opacity.value = withSequence(
            withTiming(0.5, { duration: 100 }),
            withTiming(1, {duration: 100 }),
        )
        
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        onComplete?.(quest)
    }
    const handlePress = () => {
        console.log('pushing id: ', quest.id)
        // Quest fetches quest.id from addQuest that generates the id
        router.push(`/workout/${quest.id}`)
    }
    const animStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }))
    return (
        <Animated.View style={animStyle}>
            <Pressable 
                onPress={handlePress}
                onLongPress={handleLongPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={{
                    backgroundColor: theme.colors.card,
                    borderRadius: theme.radius.md, 
                    borderWidth: 1,
                    borderColor: theme.colors.border,
                    borderLeftWidth: 3,
                    borderLeftColor: config.leftBar,
                    padding: theme.spacing.md,
                    gap: theme.spacing.md,
                    opacity: quest.completed ? 0.65 : 1,
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    gap: theme.spacing.md,
                }}>
                    <View style={{
                        width: 42,
                        height: 42,
                        borderRadius: theme.radius.sm,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: `${config.leftBar}1A`,
                    }}>
                        <Text style={{ fontSize: 22 }}>{quest.icon}</Text>
                    </View>

                    <View style={{ flex: 1, gap: theme.spacing.xs }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: theme.spacing.sm,
                        }}>
                            <Text variant="label" style={{ color: config.leftBar, flexShrink: 1 }}>
                                {config.label}
                            </Text>
                            <Text variant="caption" style={{ color: theme.colors.gold, fontWeight: '700' }}>
                                +{quest.xpReward} XP
                            </Text>
                        </View>

                        <Text variant="heading" style={{
                            color: quest.completed ? theme.colors.textDim : theme.colors.text,
                        }}>
                            {quest.title}
                        </Text>
                    </View>
                </View>

                <View style={{ gap: theme.spacing.xs }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <Text variant="caption">
                            Progress
                        </Text>
                        <Text variant="caption" style={{ color: progressColor, fontWeight: '700' }}>
                            {Math.round(quest.progress)}%
                        </Text>
                    </View>
                    <ProgressBar progress={quest.progress} color={progressColor} />
                </View>
            </Pressable>
        </Animated.View>
    )
}
