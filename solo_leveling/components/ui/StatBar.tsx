import {View, ViewStyle} from 'react-native'

type STAT_VARIANTS = 'STR' | 'AGI' | 'VIT' | 'INT'

// Stats are in the form of points and bar


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

export default function StatBar(){

}