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
export default function StatBar({stat, value, max = MAX_STAT}: StatProps){
    const cfg = STAT_CONFIG[stat]
    const progress = Math.min((value / max) * 100, 100)

    return (
        <View className='gap-2'>
            <View className="flex-row items-center justify between">
                <Text style={{
                    fontFamily: theme.fonts.display,
                    fontSize: 15,
                    fontWeight: '700',
                    color: cfg.color,
                }}>
                    {value}
                </Text>
            </View>
            <ProgressBar
                progress={progress}
                color={cfg.color}
                size="default"
                />
        </View>
    )
}