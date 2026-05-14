// Workout data types
// Create an exercise as data type array 
// Each object in Workout array is of type Exercise that includes data type of parameters listed
export interface Exercise {
    workoutId: string
    name: string
    sets: number
    reps: number
    restSeconds: number
}

export interface Workout {
    id: string
    questId: string
    userId?: string
    difficulty: string
    exercises: Exercise[]
    timeRemaining: number
    statRewards: {
        STR?: number
        AGI?: number
        VIT?: number
        INT?: number
    }
    xpReward: number
}