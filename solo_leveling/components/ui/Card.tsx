// components/ui/Card.tsx
import { ViewStyle } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'
import { Pressable } from 'react-native'
import * as Haptics from 'expo-haptics'
import { theme } from '@/constants/theme'

type Variant = 'default' | 'glow' | 'highlighted' | 'flat' | 'danger'

const VARIANTS: Record<Variant, ViewStyle> = {
  default:     { borderColor: theme.colors.border },
  glow:        { borderColor: theme.colors.borderBright, ...theme.shadows.purple },
  highlighted: { borderColor: theme.colors.cyan,         ...theme.shadows.cyan   },
  flat:        { borderColor: 'rgba(255,255,255,0.04)'                            },
  danger:      { borderColor: 'rgba(255,71,87,0.4)',     ...theme.shadows.red    },
}

interface Props {
  children: React.ReactNode
  variant?: Variant
  padding?: number
  onPress?: () => void
  style?: ViewStyle
}

export default function Card({
  children,
  variant = 'default',
  padding = theme.spacing.md,
  onPress,
  style,
}: Props) {
  const scale = useSharedValue(1)

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))

  const handlePressIn = () => {
    if (!onPress) return
    scale.value = withSpring(0.97, { damping: 15 })
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 12 })
  }

  const cardStyle = [
    {
      backgroundColor: theme.colors.card,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      padding,
    },
    VARIANTS[variant],
    style,
  ]

  // Non-interactive — just a View
  if (!onPress) {
    return (
      <Animated.View style={[animStyle, ...cardStyle]}>
        {children}
      </Animated.View>
    )
  }

  // Interactive — wrapped in Pressable
  return (
    <Animated.View style={animStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={cardStyle}
      >
        {children}
      </Pressable>
    </Animated.View>
  )
}