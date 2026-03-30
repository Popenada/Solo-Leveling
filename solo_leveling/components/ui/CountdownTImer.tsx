// components/ui/CountdownTimer.tsx
import { View, Pressable } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
} from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'
import Text from './Text'
import { useEffect } from 'react'
import useCountdown  from '@/hooks/useCountdown'
import { theme } from '@/constants/theme'

interface Props {
  seconds: number
  autoStart?: boolean
  onComplete?: () => void
  variant?: 'rest' | 'quest' | 'penalty'
}

const VARIANT_COLORS = {
  rest:    theme.colors.cyan,
  quest:   theme.colors.purple,
  penalty: theme.colors.red,
}

const CIRCLE_SIZE = 160
const STROKE = 8
const RADIUS = (CIRCLE_SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function CountdownTimer({
  seconds,
  autoStart = false,
  onComplete,
  variant = 'rest',
}: Props) {
  const color = VARIANT_COLORS[variant]

  const {
    display,
    progress,
    isRunning,
    isComplete,
    start,
    pause,
    resume,
  } = useCountdown({
    initialSeconds: seconds,
    autoStart,
    onComplete: () => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      onComplete?.()
    },
  })

  // Circle stroke animation
  const strokeOffset = useSharedValue(CIRCUMFERENCE)

  useEffect(() => {
    strokeOffset.value = withTiming(
      CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE,
      { duration: 950 }
    )
  }, [progress])

  // Pulse when complete
  const scale = useSharedValue(1)
  useEffect(() => {
    if (isComplete) {
      scale.value = withRepeat(
        withSequence(
          withSpring(1.05),
          withSpring(1)
        ), 3
      )
    }
  }, [isComplete])

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))

  const handlePress = () => {
    if (isComplete) return
    if (isRunning) {
      pause()
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    } else {
      resume()
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    }
  }

  return (
    <View style={{ alignItems: 'center', gap: 24 }}>

      {/* Circle timer */}
      <Pressable onPress={handlePress}>
        <Animated.View style={[circleStyle, { width: CIRCLE_SIZE, height: CIRCLE_SIZE }]}>

          <Animated.View style={{
            position: 'absolute',
            inset: 0,
            borderRadius: CIRCLE_SIZE / 2,
            borderWidth: STROKE,
            borderColor: 'rgba(255,255,255,0.06)',
          }} />

          {/* Colored progress ring — use react-native-svg for real arc */}
          <Animated.View style={{
            position: 'absolute',
            inset: 0,
            borderRadius: CIRCLE_SIZE / 2,
            borderWidth: STROKE,
            borderColor: isComplete ? theme.colors.green : color,
            opacity: isComplete ? 1 : 0.9,
          }} />

          {/* Center content */}
          <View style={{
            position: 'absolute',
            inset: 0,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
          }}>
            {isComplete ? (
              <>
                <Text style={{ fontSize: 32 }}>✓</Text>
                <Text variant="label" style={{ color: theme.colors.green }}>
                  DONE
                </Text>
              </>
            ) : (
              <>
                <Text style={{
                  fontFamily: theme.fonts.display,
                  fontSize: 36,
                  fontWeight: '900',
                  color: isRunning ? color : theme.colors.textDim,
                }}>
                  {display}
                </Text>
                <Text variant="label">
                  {isRunning ? 'TAP TO PAUSE' : 'TAP TO START'}
                </Text>
              </>
            )}
          </View>

        </Animated.View>
      </Pressable>

      {/* Controls */}
      {!isComplete && (
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Pressable
            onPress={isRunning ? pause : (autoStart ? resume : start)}
            style={{
              backgroundColor: isRunning
                ? 'rgba(255,255,255,0.06)'
                : color + '22',
              borderWidth: 1,
              borderColor: isRunning
                ? 'rgba(255,255,255,0.1)'
                : color + '66',
              borderRadius: theme.radius.md,
              paddingVertical: 12,
              paddingHorizontal: 28,
            }}
          >
            <Text variant="label" style={{ color: isRunning ? theme.colors.textDim : color }}>
              {isRunning ? '⏸ PAUSE' : '▶ START'}
            </Text>
          </Pressable>
        </View>
      )}

    </View>
  )
}