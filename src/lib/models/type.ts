// Base types
export type User = {
  id: string
  email: string | null
  createdAt: Date
}

export type Note = {
  id: string
  userId: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  version: number
}

export type OperationType = 'CREATE' | 'UPDATE' | 'DELETE'

export type Operation = {
  id: string
  userId: string
  entityType: 'note'
  entityId: string
  opType: OperationType
  changes: Record<string, any>
  clientTimestamp: number
  appliedAt: Date | null
  baseVersion: number | null
  createdAt: Date
}

// API types
export type CreateNoteInput = {
  title: string
  content: string
}

export type UpdateNoteInput = {
  title?: string
  content?: string
}

export type SyncRequest = {
  userId: string
  operations: Operation[]
}

export type SyncResponse = {
  updatedNotes: Note[]
  appliedOperations: string[]
  serverTime: number
}