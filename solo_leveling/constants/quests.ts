// Create quest data type that creates unique id for quests
// Hardcoded ids for now importing data from the quest data type

import type { Quest } from '@/types/Quest'

export const TEST_QUESTS: Quest[] = [
    {
        id: 'quest-1',
        type: 'daily',
        title: 'STRENGTH TRAINING',
        icon: 'ICON',
        progress: 0,
        xpReward: 50,
        completed: false,
        createdAt: new Date(),
    },
    {
        id: 'quest-2',
        type: 'weekly',
        title: 'ABS',
        icon: 'ICON',
        progress: 100,
        xpReward: 50,
        completed: true,
        createdAt: new Date(),
    },
    {
        id: 'quest-3',
        type: 'special',
        title: 'ENDURANCE',
        icon: 'ICON',
        progress: 0,
        xpReward: 50,
        completed: false,
        createdAt: new Date(),
    },
    {
        id: 'quest-4',
        type: 'penalty',
        title: 'PULL UPS',
        icon: 'ICON',
        progress: 0,
        xpReward: 50,
        completed: false,
        createdAt: new Date(),
    },
]