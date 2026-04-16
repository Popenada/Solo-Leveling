

// Everything QuestCard displays
export interface Quest {
  id:         string
  type:       'daily' | 'weekly' | 'special' | 'penalty'
  title:      string
  icon:       string
  progress:   number        // 0-100
  xpReward:   number
  completed:  boolean

  expiresAt?: Date
  createdAt: Date
}