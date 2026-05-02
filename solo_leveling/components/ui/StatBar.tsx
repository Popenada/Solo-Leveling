import { theme } from '@/constants/theme'
import { View } from 'react-native'
import ProgressBar from './ProgressBar'
import Text from './Text'
type STAT_VARIANTS = 'STR' | 'AGI' | 'VIT' | 'INT'

// Stats are in the form of points and bar
interface StatProps {
    stat: STAT_VARIANTS,
    value: number,
    max?: number,
    icon: string,
    size?: 'sm' | 'md'
}

// Create config for stats so types are dynamic
const STAT_CONFIG: Record<STAT_VARIANTS, {color: string, label: string, icon: string, description: string}> = {
    STR: {
        color: '#E24B4A',
        label: 'Strength',
        icon: 'S',
        description: 'Heavy lifting power'
    },
    AGI: {
        color: '#1D9E75',
        label: 'Agility',
        icon: 'A',
        description: 'Cardio, Speed, and Explosiveness',
    },
    VIT: {
        color: '#7F77DD',
        label: 'Vitality',
        icon: 'V',
        description: 'Endurance, stamina, and consistency'
    }, 
    INT: {
        color: '#BA7517',
        label: 'Intelligence', 
        icon: 'I',
        description: 'Nutrition, form and technique'
    }
}
const MAX_STAT = 100
export default function StatBar({stat, value, max = MAX_STAT, size = 'md'}: StatProps){
    const cfg = STAT_CONFIG[stat]
    const progress = Math.min((value / max) * 100, 100)
    const isSm = size === 'sm'

    return (
        <View style={{ gap: isSm ? 2 : 4 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{
                    fontFamily: theme.fonts.display,
                    fontSize: isSm ? 9 : 11,
                    fontWeight: '700',
                    color: cfg.color,
                    letterSpacing: 1,
                }}>
                    {stat}
                </Text>
                <Text style={{
                    fontFamily: theme.fonts.display,
                    fontSize: isSm ? 9 : 11,
                    color: theme.colors.textDim,
                }}>
                    {value}
                </Text>
            </View>
            <ProgressBar
                progress={progress}
                color={cfg.color}
                size={isSm ? 'thin' : 'default'}
            />
        </View>
    )
}