import { View } from 'react-native'
import { theme } from '@/constants/theme'
import Text from '@/components/ui/Text'
// Variations of rank Badges
type Variations = 'A' | 'B' | 'C' | 'D' | 'E' | 'S'

// Different rank configurations and colors
const RANK_CONFIG = {
  E: { color: '#888780', bg: 'rgba(136,135,128,0.1)', border: 'rgba(136,135,128,0.3)', glow: false },
  D: { color: '#639922', bg: 'rgba(99,153,34,0.1)',   border: 'rgba(99,153,34,0.3)',   glow: false },
  C: { color: '#1D9E75', bg: 'rgba(29,158,117,0.1)',  border: 'rgba(29,158,117,0.3)',  glow: false },
  B: { color: '#378ADD', bg: 'rgba(55,138,221,0.1)',  border: 'rgba(55,138,221,0.3)',  glow: true  },
  A: { color: '#7F77DD', bg: 'rgba(127,119,221,0.1)', border: 'rgba(127,119,221,0.3)', glow: true  },
  S: { color: '#f5c842', bg: 'rgba(245,200,66,0.1)',  border: 'rgba(245,200,66,0.3)',  glow: true  },
}

// Custom sizes
type Size = 'sm' | 'md' | 'lg'

// Size configs
const SIZE_CONFIG = {
  sm: { padding: 4,  paddingH: 8,  fontSize: 10, letterSpacing: 2 },
  md: { padding: 6,  paddingH: 12, fontSize: 12, letterSpacing: 3 },
  lg: { padding: 10, paddingH: 18, fontSize: 16, letterSpacing: 4 },
}
interface BadgeProps {
    rank?: Variations
    size?: Size
}
export default function Badge({rank = 'E', size = 'md'}: BadgeProps) {
    // Be able to customize each rank badge depending on rank type
    const cfg = RANK_CONFIG[rank]
    const dims = SIZE_CONFIG[size]
    return (
        <View style = {{
            backgroundColor: cfg.bg,
            borderWidth: 1,
            borderColor: cfg.border,
            paddingVertical: dims.padding,
            paddingHorizontal: dims.paddingH,
            // glow only on B rank and above
            ...(cfg.glow && {
            shadowColor: cfg.color,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.6,
            shadowRadius: 8,
            elevation: 4,
            })
        }}>
            <Text style={{
                fontFamily: theme.fonts.display,
                fontSize: dims.fontSize,
                color: cfg.color,
                letterSpacing: dims.letterSpacing,
                fontWeight: '700',
                }}>
                RANK {rank}
            </Text>
        </View>
    )
}