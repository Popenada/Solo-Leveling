import { theme } from '@/constants/theme'
import * as Haptics from 'expo-haptics'
import { Pressable, TextStyle, ViewStyle } from 'react-native'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated'
import Text from './Text'
// Different variants for buttons to indicate different situations for buttons 
type Variant = 'primary' | 'secondary' | 'invisible' | 'danger'

const VARIANT_STYLES: Record<Variant, { container: ViewStyle; text: TextStyle }> = {
  primary: {
    container: {
      backgroundColor: theme.colors.purple,
      borderWidth: 1,
      borderColor: theme.colors.borderBright,
      ...theme.shadows.purple,
    },
    text: { color: '#ffffff' },
  },
  secondary: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    text: { color: theme.colors.purpleLight },
  },
  invisible: {
    container: {
      backgroundColor: 'rgba(99,71,255,0.08)',
      borderWidth: 1,
      borderColor: 'rgba(99,71,255,0.15)',
    },
    text: { color: theme.colors.textMid },
  },
  danger: {
    container: {
      backgroundColor: 'rgba(255,71,87,0.1)',
      borderWidth: 1,
      borderColor: 'rgba(255,71,87,0.4)',
    },
    text: { color: theme.colors.red },
  },
}
// Props types to be passed to parameters of Button
interface Props {
    label: string
    onPress: () => void
    variant?: Variant
    fullWidth?: boolean
    disabled?: boolean
    style?: ViewStyle
}
// Button function with parameters of props passed to component
export default function Button ({label, onPress, variant = 'primary', fullWidth, disabled, style}: Props){
    const scale = useSharedValue(1)
    const opacity = useSharedValue(1)
    const animStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }))
    const variantStyle = VARIANT_STYLES[variant]

    const handlePressIn = () => {
        scale.value = withSpring(0.96, { damping: 15 })
        opacity.value = withSpring(0.85)
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }

    // Return animation values to their resting state when the press ends.
    const handlePressOut = () => {
        scale.value = withSpring(1, {damping: 12})
        opacity.value = withSpring(1)
    }

    return (
        <Animated.View style={[animStyle, fullWidth && { width: '100%'}]}>
            <Pressable
                onPress={disabled ? undefined: onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={[{
                    paddingVertical: 14,
                    paddingHorizontal: 24,
                    borderRadius: theme.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center'
                }, variantStyle.container, style]}
            >
                <Text variant="label" style={variantStyle.text}>
                    {label}
                </Text>
            </Pressable>
        </Animated.View>
    )
}
