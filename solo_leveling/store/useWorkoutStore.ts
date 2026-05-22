import { WORKOUTS } from '@/constants/workouts'
import type { Workout } from '@/types/Workout'
import { create } from 'zustand'

// Create workout store zustand storage to add global workouts
// Global methods 
interface WorkoutStore {
    workouts: Workout[]
    addWorkout: (workout: Workout) => void
    getWorkoutByQuestId: (questId: string) => Workout | undefined
    loadWorkouts: (workouts: any[]) => void
}

export const useWorkoutStore = create<WorkoutStore>()((set, get) => ({
    workouts: WORKOUTS,
    addWorkout: (workout) => set(state => ({ workouts: [...state.workouts, workout] })),
    // Matches quest id that of the workout is corresponds with
    getWorkoutByQuestId: (questId) => get().workouts.find(w => w.questId === questId),
    loadWorkouts: (workouts) => set(() => ({
        workouts: [
            ...WORKOUTS,
            ...workouts.map((w: any) => ({
                id: w.id,
                questId: w.quest_id,
                userId: w.user_id,
                difficulty: w.difficulty,
                timeRemaining: w.time_remaining,
                xpReward: w.xp_reward,
                statRewards: {
                    STR: w.str_reward,
                    AGI: w.agi_reward,
                    VIT: w.vit_reward,
                    INT: w.int_reward,
                },
                exercises: (
                    Array.isArray(w.exercises) ? w.exercises
                    : w.exercises ? [w.exercises]
                    : []
                ).map((ex: any) => ({
                    workoutId: ex.workout_id,
                    name: ex.name,
                    sets: ex.sets,
                    reps: ex.reps,
                    restSeconds: ex.rest_seconds,
                })),
            }))
        ]
    })),
}))
