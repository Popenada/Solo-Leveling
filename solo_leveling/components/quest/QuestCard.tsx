// Create Quest card that includes exp, workoout, type

import { View, Pressable } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'
import Text from '@/components/ui/Text'
import ProgressBar from '@/components/ui/ProgressBar'
import { theme } from '@/constants/theme'
import { Quest } from '@/types/Quest'
type QuestType = 'daily' | 'weekly' | 'special' | 'penalty'

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
        onPress?.(quest)
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
                    borderLeftColor: config.leftBar
                }}
            >
                
            </Pressable>
        </Animated.View>
    )
}
