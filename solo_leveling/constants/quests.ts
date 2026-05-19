// Create quest data type that creates unique id for quests
// Hardcoded ids for now importing data from the quest data type

import type { Quest } from '@/types/Quest'

export const TEST_QUESTS: Quest[] = [
    {
        id: '146bbccc-e1e7-44ff-9b02-9989e0d02c82',
        type: 'daily',
        title: 'STRENGTH TRAINING',
        icon: 'dumbbell',
        progress: 0,
        xpReward: 50,
        completed: false,
        createdAt: new Date(),
    },
    {
        id: 'e75982cd-5957-4cba-aa66-971035f4d48e',
        type: 'weekly',
        title: 'ABS',
        icon: 'fire',
        progress: 0,
        xpReward: 50,
        completed: true,
        createdAt: new Date(),
    },
    {
        id: 'fd12f394-8fc4-4761-979f-49e45b834918',
        type: 'special',
        title: 'ENDURANCE',
        icon: 'run-fast',
        progress: 0,
        xpReward: 50,
        completed: false,
        createdAt: new Date(),
    },
    {
        id: '0a2a5515-7307-46c0-8af2-67de5a47738e',
        type: 'penalty',
        title: 'PULL UPS',
        icon: 'arm-flex',
        progress: 0,
        xpReward: 50,
        completed: false,
        createdAt: new Date(),
    },
]