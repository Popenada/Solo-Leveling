// Player zustand storage for stats, levels, streak, and xp
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
type Rank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S'

interface Stats {
    STR: number
    AGI: number
    VIT: number
    INT: number
}
// All zustand methods and variables to be passed onto other components globally
interface PlayerStore {
    name: string
    level: number
    xp: number
    xp_to_next_level: number
    rank: Rank
    stats: Stats
    streak: number
    totalQuestsCompleted: number
    triggerLevelUp: boolean
    completedToday: boolean
    
    addXP: (amount: number) => void
    addStats: (rewards: Partial<Record<'STR'|'AGI'|'VIT'|'INT', number>>) => void
    levelUp: () => void
    clearLevelUp: () => void
    rankUp: (rank: Rank) => void
    addStreak: () => void
    resetStreak: () => void
    addQuestCount: () => void
    // load profile method owns data variable
    loadProfile: (data: any) => void
    setCompletedToday: (value: boolean) => void

}
// function to calculating xp for next level upon level up 
// use ^1.15 for incrementing xp to next level up  
const XP_FOR_LEVEL = (level: number) => 
    Math.floor(100 * Math.pow(1.15, level - 1))

// Create player store for storing player attributes such as levels, xp, and stats
// Use zustand create method for global storaging for components
export const usePlayerStore = create<PlayerStore>()(
    persist(
        (set, get) => ({
            name: 'Hunter',
            level: 1,
            xp: 100,
            xp_to_next_level: XP_FOR_LEVEL(1),
            rank: 'E',
            stats: {
                STR: 50,
                AGI: 30,
                VIT: 30,
                INT: 30,
            },
            streak: 0,
            totalWorkouts: 0,
            triggerLevelUp: false,
            totalQuestsCompleted: 0,
            completedToday: true,
            
            // Function to load hunter information
            // Have data as parameter to be passed into function when calling
            loadProfile: (data: any) => set({
                level: data.level,
                xp: data.xp, 
                xp_to_next_level: data.xp_to_next_level,
                rank: data.rank,
                stats: {
                    STR: data.STR,
                    AGI: data.AGI,
                    INT: data.INT,
                    VIT: data.VIT,
                },
                streak: data.daily_streak,
                totalQuestsCompleted: data.total_quests_completed,
                completedToday: data.completed_today,
            }),
            
            addXP: (amount) => {
                const { xp, xp_to_next_level, levelUp } = get()
                const newXP = xp + amount

                if (newXP >= xp_to_next_level) {
                    levelUp()
                    // If leveled up, carry remainder of XP to next level
                    const expOverflow = newXP - xp_to_next_level
                    if (expOverflow > 0) get().addXP(expOverflow)
                } else {
                    set({ xp: newXP })
                }
            },
            
            addStats: (rewards) => set(state => ({
                stats: {
                    STR: state.stats.STR + (rewards.STR ?? 0),
                    AGI: state.stats.AGI + (rewards.AGI ?? 0),
                    VIT: state.stats.VIT + (rewards.VIT ?? 0),
                    INT: state.stats.INT + (rewards.INT ?? 0),
                }
            })),
            setCompletedToday: (value)=> set({ completedToday: value}),
            levelUp: () => set(state => {
                const newLevel = state.level + 1
                // Add Rankup check once user levels up
                const newRank = 
                    newLevel >= 100 ? 'S' :
                    newLevel >= 80 ? 'A' :
                    newLevel >= 60 ? 'B' :
                    newLevel >= 40 ? 'C' : 
                    newLevel >= 20 ? 'D' : 'E'
                return {
                    level: newLevel,
                    xp: 0,
                    xp_to_next_level: XP_FOR_LEVEL(newLevel),
                    triggerLevelUp: true,
                    rank: newRank, 
                }
            }),

            clearLevelUp: () => set({ triggerLevelUp: false }),
            
            // Update rank every 20
            rankUp: (rank) => set({ rank }),

            addStreak: () => set(state => ({
                streak: state.streak + 1,
            })),
            // Total workout function that sets state using zustand and updates the total quests completed
            addQuestCount: () => set(state => ({
                totalQuestsCompleted: state.totalQuestsCompleted + 1
            })),
            resetStreak: () => set({ streak: 0 }),
        }),
        { name: 'player-storage-v2', storage: createJSONStorage(() => AsyncStorage) }
    )
)