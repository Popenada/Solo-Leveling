// components/ui/Divider.tsx
import { View, ViewStyle } from 'react-native'

type Variant = 'default' | 'bright' | 'glow' | 'cyan' | 'thick'

const VARIANT_STYLES: Record<Variant, ViewStyle> = {
  default: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  bright: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  glow: {
    height: 1,
    backgroundColor: 'rgba(99,71,255,0.4)',
    shadowColor: '#6347ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  cyan: {
    height: 1,
    backgroundColor: 'rgba(6,214,232,0.3)',
    shadowColor: '#06d6e8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  thick: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 1,
  },
}

interface Props {
  variant?: Variant
  style?:   ViewStyle
}

export default function Divider({ variant = 'default', style }: Props) {
  return (
    <View style={[
      { width: '100%' },
      VARIANT_STYLES[variant],
      style,
    ]} />
  )
}