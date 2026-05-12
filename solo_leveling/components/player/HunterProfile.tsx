import Text from '@/components/ui/Text'
import { theme } from '@/constants/theme'
import { usePlayerStore } from '@/store/usePlayerStore'
import { useEffect } from 'react'
import { Image, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import Divider from '../ui/Divider'
import ProgressBar from '../ui/ProgressBar'
import Rank from '../ui/Rank'
import StatBar from '../ui/StatBar'
import StatGraph from './StatGraph'

const pfp = require('@/assets/images/hunterpfp.png')

export default function HunterProfile() {
   const{
    name,
    level,
    xp,
    xp_to_next_level,
    rank,
    stats,
    streak,
    totalQuestsCompleted,
   } = usePlayerStore()

   const ringRotate = useSharedValue(0)
   const shimmer = useSharedValue(0)

   useEffect(() => {
    ringRotate.value = withRepeat(
      withTiming(360, { duration: 8000 }),
      -1
    )
    shimmer.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1800 }),
        withTiming(0, { duration: 0 }),
      ), -1
    )
  }, [])

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${ringRotate.value}deg` }]
  }))

  const xpProg = Math.min((xp / xp_to_next_level) * 100, 100)

  return (
    <View style={{
      backgroundColor: theme.colors.card,
      borderRadius: theme.radius.lg,
      borderWidth: 1,
      borderColor: theme.colors.borderBright,
      padding: theme.spacing.md,
      gap: theme.spacing.md,
      shadowColor: theme.colors.purple,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
      elevation: 8,
    }}>

      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <View style={{ position: 'relative', width: 58, height: 58 }}>
          <View style={{
            width: 58, height: 58,
            borderRadius: 14,
            backgroundColor: '#6347ff',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: 'rgba(99,71,255,0.5)',
            shadowColor: theme.colors.purple,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.6,
            shadowRadius: 12,
          }}>
            <Image source={pfp} style={{ width: 54, height: 72, borderRadius: 12, position: 'absolute', top: -8 }} resizeMode="cover" />
          </View>
          <Animated.View style={[ringStyle, {
            position: 'absolute',
            inset: -5,
            borderRadius: 17,
            borderWidth: 1,
            borderColor: 'rgba(99,71,255,0.3)',
            borderStyle: 'dashed',
          }]} />
        </View>

        <View style={{ flex: 1, gap: 3 }}>
          <Text style={{
            fontFamily: theme.fonts.display,
            fontSize: 15,
            fontWeight: '700',
            color: theme.colors.text,
            letterSpacing: 1,
          }}>
            {name.toUpperCase()}
          </Text>
          <Text style={{
            fontFamily: theme.fonts.body,
            fontSize: 12,
            color: theme.colors.purpleLight,
            letterSpacing: 1,
          }}>
            Shadow Monarch
          </Text>
          <Rank rank={rank} size="sm" />
        </View>

        <View style={{ alignItems: 'flex-end', gap: 2 }}>
          <Text style={{
            fontFamily: theme.fonts.display,
            fontSize: 36,
            fontWeight: '900',
            color: theme.colors.cyan,
            lineHeight: 36,
            textShadowColor: 'rgba(6,214,232,0.5)',
            textShadowRadius: 12,
          }}>
            {level}
          </Text>
          <Text style={{
            fontFamily: theme.fonts.display,
            fontSize: 9,
            color: theme.colors.textDim,
            letterSpacing: 3,
          }}>
            LEVEL
          </Text>
        </View>
      </View>

      {/* XP Bar */}
      <View style={{ gap: 6 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{
            fontFamily: theme.fonts.display,
            fontSize: 9,
            color: theme.colors.textDim,
            letterSpacing: 2,
          }}>
            EXPERIENCE
          </Text>
          <Text style={{
            fontFamily: theme.fonts.display,
            fontSize: 11,
            color: theme.colors.cyan,
          }}>
            {xp.toLocaleString()} / {xp_to_next_level.toLocaleString()} XP
          </Text>
        </View>
        <ProgressBar
          progress={xpProg}
          color={theme.colors.cyan}
          size="thick"
          showShimmer
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontFamily: theme.fonts.display, fontSize: 9, color: theme.colors.textDim }}>
            LVL. {level}
          </Text>
          <Text style={{ fontFamily: theme.fonts.display, fontSize: 9, color: theme.colors.textDim }}>
            LVL. {level + 1}
          </Text>
        </View>
      </View>

      <Divider />

      {/* Stats section */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}>
        <View style={{ flexShrink: 0 }}>
          <StatGraph
            strength={stats.STR}
            agility={stats.AGI}
            vitality={stats.VIT}
            intelligence={stats.INT}
            size={120}
          />
        </View>
        <View style={{ flex: 1, gap: theme.spacing.sm }}>
          <StatBar stat="STR" value={stats.STR} icon="ICON" size="sm" />
          <StatBar stat="AGI" value={stats.AGI} icon="ICON" size="sm" />
          <StatBar stat="VIT" value={stats.VIT} icon="ICON" size="sm" />
          <StatBar stat="INT" value={stats.INT} icon="ICON" size="sm" />
        </View>
      </View>

      <Divider />

      {/* Streak + Total Workouts */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{
            fontFamily: theme.fonts.display,
            fontSize: 18,
            fontWeight: '900',
            color: '#ff6b35',
            textShadowColor: 'rgba(255,107,53,0.5)',
            textShadowRadius: 8,
          }}>
            {streak}
          </Text>
          <Text style={{
            fontFamily: theme.fonts.display,
            fontSize: 9,
            color: theme.colors.textDim,
            letterSpacing: 1,
          }}>
            DAY STREAK
          </Text>
        </View>

        {/* DISPLAY TOTAL QUESTS COMPLETED */}
        <View style={{ alignItems: 'center' }}>
          <Text style={{
            fontFamily: theme.fonts.display,
            fontSize: 18,
            fontWeight: '900',
            color: theme.colors.cyan,
          }}>
            {totalQuestsCompleted}
          </Text>
          <Text style={{
            fontSize: 9,
            color: theme.colors.textDim,
            letterSpacing: 1,
          }}>
            QUESTS COMPLETED
          </Text>
        </View>
      </View>

    </View>
  )
}
