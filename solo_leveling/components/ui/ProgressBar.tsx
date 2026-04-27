// components/ui/ProgressBar.tsx
import { theme } from '@/constants/theme'
import { useEffect } from 'react'
import { View, ViewStyle } from 'react-native'
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated'

type Size = 'thin' | 'default' | 'thick'

const SIZES: Record<Size, number> = {
  thin:    4,
  default: 8,
  thick:   12,
}

interface Props {
  progress: number
  color?: string
  size?: Size
  animated?: boolean
  showShimmer?: boolean
  style?: ViewStyle
}

export default function ProgressBar({
  progress,
  color = theme.colors.purple,
  size = 'default',
  animated = true,
  showShimmer = true,
  style,
}: Props) {
  const height = SIZES[size]
  const radius = height / 2
  const clamped = Math.min(Math.max(progress, 0), 100)
  const isComplete = clamped >= 100

  // fill width animation
  const width = useSharedValue(0)

  // shimmer position — slides across the bar
  const shimmer = useSharedValue(0)

  useEffect(() => {
    width.value = animated
      ? withSpring(clamped, { damping: 15, stiffness: 80 })
      : clamped
  }, [clamped])

  useEffect(() => {
    if (!showShimmer) return
    shimmer.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1800 }),
        withTiming(0, { duration: 0 }),
      ),
      -1,   // infinite
    )
  }, [])

  const fillStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }))

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: interpolate(shimmer.value, [0, 1], [-40, 200])
    }],
    opacity: interpolate(shimmer.value, [0, 0.1, 0.9, 1], [0, 0.6, 0.6, 0])
  }))

  return (
    <View style={[{
      height,
      backgroundColor: 'rgba(255,255,255,0.06)',
      borderRadius: radius,
      overflow: 'hidden',
    }, style]}>

      {/* Fill bar */}
      <Animated.View style={[fillStyle, {
        height: '100%',
        backgroundColor: isComplete ? theme.colors.green : color,
        borderRadius: radius,
        overflow: 'hidden',
      }]}>

        {/* Shimmer overlay — only visible on the filled portion */}
        {showShimmer && (
          <Animated.View style={[shimmerStyle, {
            position: 'absolute',
            top: 0, bottom: 0,
            width: 40,
            backgroundColor: 'rgba(255,255,255,0.3)',
            transform: [{ skewX: '-20deg' }],
          }]} />
        )}

      </Animated.View>

    </View>
  )
}