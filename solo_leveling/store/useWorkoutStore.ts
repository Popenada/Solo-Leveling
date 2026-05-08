import { WORKOUTS } from '@/constants/workouts'
import type { Workout } from '@/types/Workout'
import { create } from 'zustand'

// Create workout store zustand storage to add global workouts
// Global methods 
interface WorkoutStore {
    workouts: Workout[]
    addWorkout: (workout: Workout) => void
    // Identify quest id and match to the workout id from constants file
    getWorkoutByQuestId: (questId: string) => Workout | undefined
}

export const useWorkoutStore = create<WorkoutStore>()((set, get) => ({
    workouts: WORKOUTS,
    addWorkout: (workout) => set(state => ({ workouts: [...state.workouts, workout] })),
    getWorkoutByQuestId: (questId) => get().workouts.find(w => w.questId === questId),
}))
