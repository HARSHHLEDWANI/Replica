export interface LocalNote {
  id: string
  title: string
  content: string
  isSynced: boolean
  createdAt: Date
  updatedAt: Date
  userId: string
  version: number
}

export type Note = LocalNote