// store/useQuestStore.ts — stripped down, no persist
import { Quest } from '@/types/Quest'
import { create } from 'zustand'

interface QuestStore {
  quests: Quest[]
  addQuest: (quest: Quest) => void
}

export const useQuestStore = create<QuestStore>()((set) => ({
  quests: [],
  addQuest: (quest) => {
    console.log('addQuest called', quest.title)
    set(state => {
      console.log('state before:', state.quests.length)
      return { quests: [...state.quests, quest] }
    })
  },
}))