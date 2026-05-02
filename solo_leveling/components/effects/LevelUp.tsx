import { theme } from '@/constants/theme'
import { usePlayerStore } from '@/store/usePlayerStore'
import * as Haptics from 'expo-haptics'
import { useEffect } from 'react'
import { Dimensions, Modal, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import Text from '../ui/Text'

const { width, height } = Dimensions.get('window')

const PARTICLES = ['✦', '✧', '✦', '✧', '✦', '✧', '✦', '✧']

export default function LevelUpEffect() {
  const level = usePlayerStore(s => s.level)
  const triggerLevelUp = usePlayerStore(s => s.triggerLevelUp)
  const clearLevelUp = usePlayerStore(s => s.clearLevelUp)

  const overlayOpacity = useSharedValue(0)
  const textScale = useSharedValue(0.3)
  const textOpacity = useSharedValue(0)
  const levelOpacity = useSharedValue(0)
  const particleOpacity = useSharedValue(0)

  useEffect(() => {
    if (!triggerLevelUp) return

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)

    overlayOpacity.value = withTiming(1, { duration: 300 })
    particleOpacity.value = withDelay(100, withTiming(1, { duration: 400 }))
    textScale.value = withDelay(200, withSpring(1, { damping: 10, stiffness: 120 }))
    textOpacity.value = withDelay(200, withTiming(1, { duration: 300 }))
    levelOpacity.value = withDelay(500, withTiming(1, { duration: 400 }))

    overlayOpacity.value = withSequence(
      withTiming(1, { duration: 300 }),
      withDelay(1400, withTiming(0, { duration: 600 }))
    )

    setTimeout(clearLevelUp, 300 + 1400 + 600)
  }, [triggerLevelUp])

  const overlayStyle = useAnimatedStyle(() => ({ opacity: overlayOpacity.value }))
  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ scale: textScale.value }],
  }))
  const levelStyle = useAnimatedStyle(() => ({ opacity: levelOpacity.value }))
  const particleStyle = useAnimatedStyle(() => ({ opacity: particleOpacity.value }))

  if (!triggerLevelUp) return null

  return (
    <Modal transparent animationType="none" statusBarTranslucent>
      <Animated.View style={[{
        position: 'absolute',
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(5,5,15,0.85)',
      }, overlayStyle]}>

        {/* Particles */}
        <Animated.View style={[{
          position: 'absolute',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }, particleStyle]}>
          {PARTICLES.map((p, i) => (
            <Text key={i} style={{
              position: 'absolute',
              fontSize: 18,
              color: theme.colors.purple,
              top: height * 0.3 + Math.sin(i / PARTICLES.length * Math.PI * 2) * 100,
              left: width * 0.5 + Math.cos(i / PARTICLES.length * Math.PI * 2) * 100,
              opacity: 0.6,
            }}>
              {p}
            </Text>
          ))}
        </Animated.View>

        {/* LEVEL UP text */}
        <Animated.View style={[{ alignItems: 'center', gap: theme.spacing.sm }, textStyle]}>
          <Text style={{
            fontFamily: theme.fonts.display,
            fontSize: 42,
            fontWeight: '900',
            color: theme.colors.cyan,
            letterSpacing: 6,
            textShadowColor: 'rgba(6,214,232,0.8)',
            textShadowRadius: 20,
          }}>
            LEVEL UP
          </Text>

          <View style={{
            width: 160,
            height: 1,
            backgroundColor: theme.colors.purple,
            opacity: 0.6,
          }} />

          <Animated.View style={[{ alignItems: 'center' }, levelStyle]}>
            <Text style={{
              fontFamily: theme.fonts.display,
              fontSize: 64,
              fontWeight: '900',
              color: theme.colors.purple,
              lineHeight: 70,
              textShadowColor: 'rgba(99,71,255,0.8)',
              textShadowRadius: 24,
            }}>
              {level}
            </Text>
            <Text style={{
              fontFamily: theme.fonts.display,
              fontSize: 11,
              color: theme.colors.textDim,
              letterSpacing: 4,
            }}>
              NEW LEVEL
            </Text>
          </Animated.View>
        </Animated.View>

      </Animated.View>
    </Modal>
  )
}
