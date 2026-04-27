import Text from '@/components/ui/Text'
import { theme } from '@/constants/theme'
import { usePlayerStore } from '@/store/usePlayerStore'
import { useEffect } from 'react'
import { View } from 'react-native'
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
export default function HunterProfile() {
   const{
    name, 
    level, 
    xp, 
    xpToNextLevel,
    rank, 
    stats,
    streak, 
    totalWorkouts,
   } = usePlayerStore()

   // avatar ring rotation
   const ringRotate = useSharedValue(0)

   // xp shimmer effect
   const shimmer = useSharedValue(0)

   useEffect(() => {
    ringRotate.value = withRepeat(
      withTiming(360, { duration: 8000 }),
      -1 // infinite
    )

   shimmer.value = withRepeat(
    withSequence(
      withTiming(1, { duration: 1800 }),
      withTiming(0, { duration: 0}),
    ), -1
   )
  }, [])

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${ringRotate.value}deg` }]
  }))

  const xpProg = Math.min((xp / xpToNextLevel) * 100, 100)

  return (
    <View style={{
      backgroundColor: theme.colors.card,
      borderRadius: theme.radius.lg,
      borderWidth: 1,
      borderColor: theme.colors.borderBright,
      padding: theme.spacing.md,
      gap: theme.spacing.md,
      // purple glow
      shadowColor: theme.colors.purple,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
      elevation: 8,
      overflow: 'hidden',
    }}>
      {/* header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14}}>
        {/* avatar */}
        <View style={{ position: 'relative', width: 58, height: 58}}>
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
            <Text style={{ fontSize: 28 }}>Insert ICON here</Text>
          </View>
          {/* spinning ring */}
          <Animated.View style={[ringStyle, {
            position: 'absolute',
            inset: -5,
            borderRadius: 17,
            borderWidth: 1,
            borderColor: 'rgba(99,71,255,0.3)',
            borderStyle: 'dashed',
          }]} />
        </View>
        {/* Name, Title, and Rank */}
        <View style={{ flex: 1, gap: 3}}>
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
            fontFamily:theme.fonts.body, 
            fontSize: 12,
            color: theme.colors.purpleLight,
            letterSpacing: 1,
          }}>
            Shadow Monarch
          </Text>
          <Rank rank={rank} size="sm"/>
        </View>

        {/* level */}
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
      
      {/* xp bar */}
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
            {xp.toLocaleString()} / {xpToNextLevel.toLocaleString()} XP
          </Text>
        </View>

        <ProgressBar
          progress={xpProg}
          color={theme.colors.cyan}
          size="thick"
          showShimmer
        />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{
              fontFamily: theme.fonts.display,
              fontSize: 9,
              color: theme.colors.textDim,
            }}>
              LVL. {level}
            </Text>
            <Text style={{
              fontFamily: theme.fonts.display,
              fontSize: 9,
              color: theme.colors.textDim,
            }}>
              LVL. {level + 1}
            </Text>
            {/* stats */}
            <View style={{ gap: 10 }}>
              <StatBar stat="STR" value={stats.strength}     icon="ICON" />
              <StatBar stat="AGI" value={stats.agility}      icon="ICON" />
              <StatBar stat="VIT" value={stats.vitality}     icon="ICON" />
              <StatBar stat="INT" value={stats.intelligence} icon="ICON" />
            </View>
          </View>

          <Divider/>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{ fontSize: 22 }}>ICON</Text>
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
                Day Streak
              </Text>
            </View>
        </View>
    </View>
  )
}
