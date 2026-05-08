import { Workout } from "@/types/Workout";

export const WORKOUTS: Workout[] = [
    {
        id: 'workout-1',
        questId: 'quest-1',
        difficulty: 'D',
        timeRemaining: 30,
        exercises: [
            { name: 'Push-ups', sets: 3, reps: 20, restSeconds: 60 },
            { name: 'Diamond Push-ups', sets: 2, reps: 15, restSeconds: 45 },
            { name: 'Wide Push-ups', sets: 2, reps: 15, restSeconds: 45 },
        ],
        statRewards: { STR: 3, VIT: 1 },
        xpReward: 50
    },
    {
        id: 'workout-2',
        questId: 'quest-2',
        difficulty: 'C',
        timeRemaining: 25,
        exercises: [
            { name: 'Crunches', sets: 3, reps: 30, restSeconds: 45 },
            { name: 'Leg Raises', sets: 3, reps: 20, restSeconds: 45 },
            { name: 'Plank', sets: 3, reps: 60, restSeconds: 60 },
        ],
        statRewards: { STR: 1, VIT: 2, AGI: 1 },
        xpReward: 75
    },
    {
        id: 'workout-3',
        questId: 'quest-3',
        difficulty: 'B',
        timeRemaining: 40,
        exercises: [
            { name: '5km Run', sets: 1, reps: 1, restSeconds: 0 },
            { name: 'Jump Rope', sets: 3, reps: 100, restSeconds: 60 },
            { name: 'Burpees', sets: 3, reps: 15, restSeconds: 90 },
        ],
        statRewards: { AGI: 3, VIT: 2 },
        xpReward: 100
    },
    {
        id: 'workout-4',
        questId: 'quest-4',
        difficulty: 'C',
        timeRemaining: 20,
        exercises: [
            { name: 'Pull-ups', sets: 3, reps: 10, restSeconds: 90 },
            { name: 'Chin-ups', sets: 3, reps: 8, restSeconds: 90 },
            { name: 'Negative Pull-ups', sets: 2, reps: 5, restSeconds: 60 },
        ],
        statRewards: { STR: 2, AGI: 1, VIT: 1 },
        xpReward: 75
    },
]
