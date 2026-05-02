// Player zustand storage for stats, levels, streak, and xp
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
type Rank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S'

interface Stats {
    strength: number
    agility: number
    vitality: number
    intelligence: number
}
interface PlayerStore {
    name: string
    level: number
    xp: number
    xpToNextLevel: number
    rank: Rank
    stats: Stats
    streak: number
    totalWorkouts: number
    triggerLevelUp: boolean

    addXP: (amount: number) => void
    addStats: (rewards: Partial<Record<'STR'|'AGI'|'VIT'|'INT', number>>) => void
    levelUp: () => void
    clearLevelUp: () => void
    rankUp: (rank: Rank) => void
    addStreak: () => void
    resetStreak: () => void
}

const XP_FOR_LEVEL = (level: number) => 
    Math.floor(100 * Math.pow(1.15, level - 1))

export const usePlayerStore = create<PlayerStore>()(
    persist(
        (set, get) => ({
            name: 'Hunter',
            level: 1,
            xp: 100,
            xpToNextLevel: XP_FOR_LEVEL(1),
            rank: 'E',
            stats: {
                strength: 50,
                agility: 30,
                vitality: 30,
                intelligence: 30,
            },
            streak: 0,
            totalWorkouts: 0,
            triggerLevelUp: false,

            addXP: (amount) => {
                const { xp, xpToNextLevel, levelUp } = get()
                const newXP = xp + amount

                if (newXP >= xpToNextLevel) {
                    levelUp()
                    // If leveled up, carry remainder of XP to next level
                    const expOverflow = newXP - xpToNextLevel
                    if (expOverflow > 0) get().addXP(expOverflow)
                } else {
                    set({ xp: newXP })
                }
            },
            
            addStats: (rewards) => set(state => ({
                stats: {
                    strength: state.stats.strength + (rewards.STR ?? 0),
                    agility: state.stats.agility + (rewards.AGI ?? 0),
                    vitality: state.stats.vitality + (rewards.VIT ?? 0),
                    intelligence: state.stats.intelligence + (rewards.INT ?? 0),
                }
            })),

            levelUp: () => set(state => {
                const newLevel = state.level + 1
                return {
                    level: newLevel,
                    xp: 0,
                    xpToNextLevel: XP_FOR_LEVEL(newLevel),
                    triggerLevelUp: true,
                }
            }),

            clearLevelUp: () => set({ triggerLevelUp: false }),

            rankUp: (rank) => set({ rank }),

            addStreak: () => set(state => ({
                streak: state.streak + 1,
                totalWOrkouts: state.totalWorkouts + 1,
            })),

            resetStreak: () => set({ streak: 0 }),
        }),
        { name: 'player-storage', storage: createJSONStorage(() => AsyncStorage) }
    )
)