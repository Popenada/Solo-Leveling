import { Workout } from "@/types/Workout";

export const WORKOUTS: Workout[] = [
    {
        id: 'workout-1',
        questId: '146bbccc-e1e7-44ff-9b02-9989e0d02c82',
        difficulty: 'D',
        timeRemaining: 30,
        exercises: [
            { workoutId: 'workout-1',name: 'Push-ups', sets: 3, reps: 20, restSeconds: 60 },
            { workoutId: 'workout-1', name: 'Diamond Push-ups', sets: 2, reps: 15, restSeconds: 45 },
            { workoutId: 'workout-1', name: 'Wide Push-ups', sets: 2, reps: 15, restSeconds: 45 },
        ],
        statRewards: { STR: 3, VIT: 1 },
        xpReward: 50
    },
    {
        id: 'workout-2',
        questId: 'e75982cd-5957-4cba-aa66-971035f4d48e',
        difficulty: 'C',
        timeRemaining: 25,
        exercises: [
            { workoutId: 'workout-2', name: 'Crunches', sets: 3, reps: 30, restSeconds: 45 },
            { workoutId: 'workout-2', name: 'Leg Raises', sets: 3, reps: 20, restSeconds: 45 },
            { workoutId: 'workout-2', name: 'Plank', sets: 3, reps: 60, restSeconds: 60 },
        ],
        statRewards: { STR: 1, VIT: 2, AGI: 1 },
        xpReward: 75
    },
    {
        id: 'workout-3',
        questId: 'fd12f394-8fc4-4761-979f-49e45b834918',
        difficulty: 'B',
        timeRemaining: 40,
        exercises: [
            { workoutId: 'workout-3', name: '5km Run', sets: 1, reps: 1, restSeconds: 0 },
            { workoutId: 'workout-3', name: 'Jump Rope', sets: 3, reps: 100, restSeconds: 60 },
            { workoutId: 'workout-3', name: 'Burpees', sets: 3, reps: 15, restSeconds: 90 },
        ],
        statRewards: { AGI: 3, VIT: 2 },
        xpReward: 100
    },
    {
        id: 'workout-4',
        questId: '0a2a5515-7307-46c0-8af2-67de5a47738e',
        difficulty: 'C',
        timeRemaining: 20,
        exercises: [
            { workoutId: 'workout-4', name: 'Pull-ups', sets: 3, reps: 10, restSeconds: 90 },
            { workoutId: 'workout-4', name: 'Chin-ups', sets: 3, reps: 8, restSeconds: 90 },
            { workoutId: 'workout-4', name: 'Negative Pull-ups', sets: 2, reps: 5, restSeconds: 60 },
        ],
        statRewards: { STR: 2, AGI: 1, VIT: 1 },
        xpReward: 75
    },
]
