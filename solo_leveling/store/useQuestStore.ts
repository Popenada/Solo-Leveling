// Import zustand for global use for components
// Global data to be accessed include completed, adding quest, 
import { TEST_QUESTS } from '@/constants/quests'
import { Quest } from '@/types/Quest'
import { create } from 'zustand'
import { usePlayerStore } from './usePlayerStore'
interface QuestStore {
  quests: Quest[],
  addQuest: (quest: Quest) => void
  completeQuest: (id: string) => void
  updateQuestProgress: (id: string, progress: number) => void
  dailyResetQuests: () => void
  weeklyResetQuests: () => void
  checkAndReset: () => void
  lastDailyReset: number
  lastWeeklyReset: number
  loadQuests: (quests: Quest[]) => void
}

// Create quest store to create what functions for quest
// Populate array quest data type with constant
export const useQuestStore = create<QuestStore>()((set, get) => ({
  // Added test_quest population from quests constant
  quests: TEST_QUESTS,
  lastDailyReset: Date.now(),
  lastWeeklyReset: Date.now(),
  // Adds quest id from quest constant
  addQuest: (quest) => {
    console.log('addQuest called', quest.title)
    set(state => {
      console.log('state before:', state.quests.length)
      return { quests: [...state.quests, quest] }
    })
  },
  // Mark quest as complete
  completeQuest: (id) => set(state => ({
    quests: state.quests.filter(q => q.id !== id)
  })),

  // Update quest progress
  // Set completed to true if progress is 100 or more percent wise
  updateQuestProgress: (id, progress) => set(state => ({
    quests: state.quests.map(q => q.id === id ? {... q, progress} : q)
  })),
  // Wipe daily quests
  dailyResetQuests: () => set (state => ({
    quests: state.quests.filter(q => q.type !=='daily')
  })),
  // Wipe weekly quests
  weeklyResetQuests: () => set(state => ({
    quests: state.quests.filter(q => q.type !=='weekly')
  })),
  // Load quests
  loadQuests: (quests: Quest[]) => set({ quests }),

  // Check and compare timestamps 
  // After reset if user has completed at least one workout, increment the streak count
  checkAndReset: () => {
    const { lastDailyReset, lastWeeklyReset } = get()
    const { completedToday, addStreak, resetStreak, setCompletedToday } = usePlayerStore.getState()
    const now = Date.now()
    const ONE_DAY = 24 * 60 * 60 * 1000
    const ONE_WEEK = 7 * ONE_DAY

    if (now - lastDailyReset >= ONE_DAY) {
      set({ lastDailyReset: now })
      console.log("Resetting daily quests")
      get().dailyResetQuests()
      if (completedToday) {
        addStreak()
      } else {
        resetStreak()
      }
      setCompletedToday(false)
    }

    if (now - lastWeeklyReset >= ONE_WEEK) {
      set({ lastWeeklyReset: now })
      console.log("Resetting weekly quests")
      get().weeklyResetQuests()
    }
  }
}))