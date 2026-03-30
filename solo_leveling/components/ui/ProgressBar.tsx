import { View, ViewStyle } from 'react-native'
import { theme } from '@/constants/theme'

type Size = 'default' | 'thin' | 'thick'

const SIZES: Record<Size, number> = {
  thin:    4,
  default: 8,
  thick:   12,
}
interface ProgressBarProps {
    progress: number
    style?: ViewStyle
    color?: string
    size?: Size
}
export default function ProgressBar({progress, style, color = theme.colors.purple, size = 'default'}: ProgressBarProps){

    // clamp progress from 0 to 100
    const clamped = Math.min(Math.max(progress, 0), 100)

    const height = SIZES[size]
    const radius = height / 2
    return (
        <View style={[{
            height, 
            backgroundColor: 'rgba(255,255,255,0.06)',
            borderRadius: radius,
            overflow: 'hidden',
        }, style]}>
            <View style={[{
                width: `${clamped}%`,
                height: '100%',
                backgroundColor: color,
                borderRadius: radius,
            }]}/>
        </View>
    )
}