// Import zustand for global use for components
// Global data to be accessed include completed, adding quest, 
import { Quest } from '@/types/Quest'
import { create } from 'zustand'

interface QuestStore {
  quests: Quest[]
  addQuest: (quest: Quest) => void
  completeQuest: (id: string) => void
  updateQuestProgress: (id: string, progress: number) => void
  dailyResetQuests: () => void
}
// Create quest store to create what functions for quest 
export const useQuestStore = create<QuestStore>()((set) => ({
  quests: [],
  addQuest: (quest) => {
    console.log('addQuest called', quest.title)
    set(state => {
      console.log('state before:', state.quests.length)
      return { quests: [...state.quests, quest] }
    })
  },
  // Mark quest as complete
  completeQuest: (id) => set(state => ({
    quests: state.quests.map(q => q.id === id ? {...q, completed: true, progress: 100} : q)
  })),
  // Update quest progress
  // Set completed to true if progress is 100 or more percent wise
  updateQuestProgress: (id, progress) => set(state => ({
    quests: state.quests.map(q => q.id == id ? {...q, completed: progress <= 100}: q )
  })),
  // Wipe daily quests
  dailyResetQuests: () => set (state => ({
    quests: state.quests.filter(q => q.type !=='daily')
  }))
}))