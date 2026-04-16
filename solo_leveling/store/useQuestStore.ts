// store/useQuestStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Quest } from '@/types/Quest'

interface QuestStore {
  // state
  quests: Quest[]

  // actions
  setQuests:            (quests: Quest[]) => void
  completeQuest:        (id: string) => void
  updateQuestProgress:  (id: string, progress: number) => void
  convertToPenalty:     (id: string) => void
  resetDailyQuests:     () => void
}

export const useQuestStore = create<QuestStore>()(
  persist(
    (set, get) => ({
      quests: [],

      setQuests: (quests) => set({ quests }),

      completeQuest: (id) => set(state => ({
        quests: state.quests.map(q =>
          q.id === id
            ? { ...q, completed: true, progress: 100 }
            : q
        )
      })),

      updateQuestProgress: (id, progress) => set(state => ({
        quests: state.quests.map(q =>
          q.id === id
            ? { ...q, progress, completed: progress >= 100 }
            : q
        )
      })),

      convertToPenalty: (id) => set(state => ({
        quests: state.quests.map(q =>
          q.id === id
            ? { ...q, type: 'penalty' }
            : q
        )
      })),

      resetDailyQuests: () => set(state => ({
        quests: state.quests.filter(q => q.type !== 'daily')
      })),
    }),
    { name: 'quest-storage' } 
  )
)