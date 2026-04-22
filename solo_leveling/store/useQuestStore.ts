// store/useQuestStore.ts
import { Quest } from '@/types/Quest'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface QuestStore {
  // state
  quests: Quest[]

  // actions
  setQuests:            (quests: Quest[]) => void
  addQuest:             (quest: Quest) => void
  completeQuest:        (id: string) => void
  updateQuestProgress:  (id: string, progress: number) => void
  convertToPenalty:     (id: string) => void
  resetDailyQuests:     () => void
}

export const useQuestStore = create<QuestStore>()(
  persist(
    (set) => ({
      quests: [],

      setQuests: (quests) => set({ quests }),
      addQuest: (quest) => set(state => {
        const quests = [...state.quests, quest]
        console.log('quest added', quest.id, 'total quests:', quests.length)

        return { quests }
      }),

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
    {
      name: 'quest-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
