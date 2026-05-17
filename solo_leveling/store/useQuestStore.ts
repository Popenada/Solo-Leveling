// Import zustand for global use for components
// Global data to be accessed include completed, adding quest, 
import { TEST_QUESTS } from '@/constants/quests'
import { saveQuests } from '@/lib/hunter'
import { supabase } from '@/lib/supabase'
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
  loadQuests: (quests: any[]) => void
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
  dailyResetQuests: () => set (state => {
    // Filter to only daily quests 
    const dailyQuests = TEST_QUESTS.filter(q => q.type === 'daily')
    const randomQuest = dailyQuests[Math.floor(Math.random() * dailyQuests.length)]
    return { quests: [
      ...state.quests.filter(q => q.type !=='daily'),
      { ...randomQuest, progress: 0, completed: false, createdAt: new Date()}
    ]
  }
  }),
  // Wipe weekly quests
  weeklyResetQuests: () => set(state => {
    const weeklyQuests = TEST_QUESTS.filter(q => q.type === 'weekly')
    const randomQuest = weeklyQuests[Math.floor(Math.random() * weeklyQuests.length)]

    return { quests: [
        ...state.quests.filter(q => q.type !=='weekly'),
       {...randomQuest, progress: 0, completed: false, createdAt: new Date()}
      ]
    }
  }),
  loadQuests: (quests: any[]) => set({
    quests: quests.map(q => ({
      id: q.id,
      type: q.type,
      title: q.title,
      icon: q.icon,
      progress: q.progress,
      xpReward: q.xp_reward,
      completed: q.completed,
      createdAt: new Date(q.created_at),
      expiresAt: q.expires_at ? new Date(q.expires_at) : undefined,
    }))
  }),

  // Check and compare timestamps 
  // After reset if user has completed at least one workout, increment the streak count
  checkAndReset: async () => {
    const { lastDailyReset, lastWeeklyReset } = get()
    const { completedToday, addStreak, resetStreak, setCompletedToday } = usePlayerStore.getState()
    // Fetch user data from supabase 
    const { data: { user } } = await supabase.auth.getUser()
    const now = Date.now()
    const ONE_DAY = 24 * 60 * 60 * 1000
    const ONE_WEEK = 7 * ONE_DAY

    if (now - lastDailyReset >= ONE_DAY) {
      set({ lastDailyReset: now })
      console.log("Resetting daily quests")
      await supabase.from('quests').delete()
        .eq('user_id', user!.id)
        .eq('type', 'daily')
      get().dailyResetQuests()
      const quests = get().quests
      await saveQuests(user!.id, quests)
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
      await supabase.from('quests').delete()
        .eq('user_id', user!.id)
        .eq('type', 'weekly')
      const quests = get().quests
      await saveQuests(user!.id, quests)
      get().weeklyResetQuests()
    }
  }
}))