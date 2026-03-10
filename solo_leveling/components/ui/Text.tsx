// components/ui/Text.tsx
import { theme } from '@/constants/theme'
import { Text as RNText, TextStyle } from 'react-native'

type Variant = 'display' | 'heading' | 'body' | 'caption' | 'label'
type Color   = keyof typeof theme.colors

const VARIANTS: Record<Variant, TextStyle> = {
  display: { fontFamily: theme.fonts.display, fontSize: 32, fontWeight: '900', color: theme.colors.text },
  heading: { fontFamily: theme.fonts.display, fontSize: 16, fontWeight: '700', color: theme.colors.text, letterSpacing: 1 },
  body:    { fontFamily: theme.fonts.body,    fontSize: 15, fontWeight: '500', color: theme.colors.text },
  caption: { fontFamily: theme.fonts.body,    fontSize: 12, fontWeight: '400', color: theme.colors.textDim },
  label:   { fontFamily: theme.fonts.display, fontSize: 9,  fontWeight: '700', color: theme.colors.textDim, letterSpacing: 3, textTransform: 'uppercase' },
}

interface Props {
  variant?: Variant
  color?: Color
  style?: TextStyle
  children: React.ReactNode
}

export default function Text({ variant = 'body', color, style, children }: Props) {
  return (
    <RNText style={[
      VARIANTS[variant],
      color && { color: theme.colors[color] },
      style
    ]}>
      {children}
    </RNText>
  )
}
