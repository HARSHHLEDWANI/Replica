export type Note = {
  id: string
  userId: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  version: number
}

export type CreateNoteInput = {
  title: string
  content: string
}

export type UpdateNoteInput = {
  title?: string
  content?: string
}