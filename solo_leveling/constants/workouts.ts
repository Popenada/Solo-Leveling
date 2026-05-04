// User taps quest->quest: [id].tsx->workout modal-> fetches data for matching quest.id <-> workout.id
// Linking workout id with quest id for testing
import { Workout } from "@/types/Workout";
// Hardcoded exercises data temporarily
export const WORKOUTS: Workout[] = [
    {
        id: 'workout-1',
        questId: 'quest-1',
        difficulty: 'A',
        timeRemaining: 30,
        exercises: [
            { name: 'Pushups', sets: 3, reps: 10, restSeconds: 30 },
            { name: 'Diamond Push-ups', sets: 2, reps: 15, restSeconds: 45 },
            { name: ' ', sets: 2, reps: 10, restSeconds: 2},
        ],
        statRewards: { strength: 2, intelligence: 4, vitality: 2}
    },
    {
        id: 'workout-1',
        questId: 'quest-2',
        difficulty: 'A',
        timeRemaining: 30,
        exercises: [
            { name: 'Pushups', sets: 3, reps: 10, restSeconds: 30 },
            { name: 'Diamond Push-ups', sets: 2, reps: 15, restSeconds: 45 },
            { name: ' ', sets: 2, reps: 10, restSeconds: 2},
        ],
        statRewards: { strength: 2, intelligence: 4, vitality: 2}
    },
    {
    id: 'workout-1',
        questId: 'quest-3',
        difficulty: 'A',
        timeRemaining: 30,
        exercises: [
            { name: 'Pushups', sets: 3, reps: 10, restSeconds: 30 },
            { name: 'Diamond Push-ups', sets: 2, reps: 15, restSeconds: 45 },
            { name: ' ', sets: 2, reps: 10, restSeconds: 2},
        ],
        statRewards: { strength: 2, intelligence: 4, vitality: 2}
    },
    {
        id: 'workout-1',
        questId: 'quest-4',
        difficulty: 'A',
        timeRemaining: 30,
        exercises: [
            { name: 'Pushups', sets: 3, reps: 10, restSeconds: 30 },
            { name: 'Diamond Push-ups', sets: 2, reps: 15, restSeconds: 45 },
            { name: ' ', sets: 2, reps: 10, restSeconds: 2},
        ],
        statRewards: { strength: 2, intelligence: 4, vitality: 2}
    },
]