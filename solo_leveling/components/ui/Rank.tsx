// components/ui/RankBadge.tsx
import { theme } from '@/constants/theme'
import { useEffect } from 'react'
import { ViewStyle } from 'react-native'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated'
import Text from './Text'

type Rank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S'
type Size = 'sm' | 'md' | 'lg'

const RANK_CONFIG = {
  E: {
    color:  '#888780',
    bg:     'rgba(136,135,128,0.1)',
    border: 'rgba(136,135,128,0.3)',
    glow:   false,
  },
  D: {
    color:  '#639922',
    bg:     'rgba(99,153,34,0.1)',
    border: 'rgba(99,153,34,0.3)',
    glow:   false,
  },
  C: {
    color:  '#1D9E75',
    bg:     'rgba(29,158,117,0.1)',
    border: 'rgba(29,158,117,0.3)',
    glow:   false,
  },
  B: {
    color:  '#378ADD',
    bg:     'rgba(55,138,221,0.1)',
    border: 'rgba(55,138,221,0.3)',
    glow:   true,
  },
  A: {
    color:  '#7F77DD',
    bg:     'rgba(127,119,221,0.1)',
    border: 'rgba(127,119,221,0.3)',
    glow:   true,
  },
  S: {
    color:  '#f5c842',
    bg:     'rgba(245,200,66,0.1)',
    border: 'rgba(245,200,66,0.35)',
    glow:   true,
  },
}

const SIZE_CONFIG = {
  sm: { paddingV: 3,  paddingH: 8,  fontSize: 9,  radius: 5, spacing: 1.5 },
  md: { paddingV: 5,  paddingH: 12, fontSize: 11, radius: 6, spacing: 2   },
  lg: { paddingV: 9,  paddingH: 18, fontSize: 15, radius: 8, spacing: 3   },
}

interface Props {
  rank:   Rank
  size?:  Size
  style?: ViewStyle
}

export default function RankBadge({ rank, size = 'md', style }: Props) {
  const cfg  = RANK_CONFIG[rank]
  const dims = SIZE_CONFIG[size]

  // glow pulse for B rank and above
  const glowOpacity = useSharedValue(0.3)

  useEffect(() => {
    if (!cfg.glow) return
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: rank === 'S' ? 1000 : 1500 }),
        withTiming(0.3, { duration: rank === 'S' ? 1000 : 1500 }),
      ), -1
    )
  }, [rank])

  const glowStyle = useAnimatedStyle(() => ({
    shadowOpacity: glowOpacity.value,
  }))

  return (
    <Animated.View style={[
      glowStyle,
      {
        alignSelf: 'flex-start',
        backgroundColor: cfg.bg,
        borderWidth: 1,
        borderColor: cfg.border,
        borderRadius: dims.radius,
        paddingVertical: dims.paddingV,
        paddingHorizontal: dims.paddingH,
        // glow only on B+
        ...(cfg.glow && {
          shadowColor: cfg.color,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.4,
          shadowRadius: rank === 'S' ? 12 : 8,
          elevation: 4,
        }),
      },
      style,
    ]}>
      <Text style={{
        fontFamily: theme.fonts.display,
        fontSize: dims.fontSize,
        fontWeight: '700',
        color: cfg.color,
        letterSpacing: dims.spacing,
      }}>
        RANK {rank}
      </Text>
    </Animated.View>
  )
}