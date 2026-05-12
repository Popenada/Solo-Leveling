export interface Quest {
  id: string
  type: 'daily' | 'weekly' | 'special' | 'penalty'
  title: string
  icon: string  // MaterialCommunityIcons icon name
  progress: number
  xpReward: number
  completed: boolean
  expiresAt?: Date
  createdAt: Date
}
