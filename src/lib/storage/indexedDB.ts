import localforage from 'localforage'

// Configure localforage
localforage.config({
  name: 'ReplicaSync',
  version: 1.0,
  storeName: 'notes_store',
  description: 'Offline storage for ReplicaSync notes'
})

// Types
export type LocalNote = {
  id: string
  userId: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  version: number
  isSynced: boolean // Whether synced to server
  lastSyncedAt?: Date // When last synced
}

export type OperationType = 'CREATE' | 'UPDATE' | 'DELETE'

export type LocalOperation = {
  id: string
  userId: string
  entityType: 'note'
  entityId: string
  opType: OperationType
  changes: Record<string, any> // e.g., { title: "New Title" }
  clientTimestamp: number // When operation was created locally
  appliedAt?: Date // When applied on server
  baseVersion?: number // Version of note when operation was created
}

// Keys for storage
const NOTES_KEY = 'notes'
const OPERATIONS_KEY = 'pending_operations'
const LAST_SYNC_KEY = 'last_sync_time'

// Note operations
export const noteStorage = {
  // Get all notes
  async getAllNotes(): Promise<LocalNote[]> {
    try {
      const notes = await localforage.getItem<LocalNote[]>(NOTES_KEY)
      return notes || []
    } catch (error) {
      console.error('Error getting notes from IndexedDB:', error)
      return []
    }
  },

  // Get a single note
  async getNote(id: string): Promise<LocalNote | null> {
    const notes = await this.getAllNotes()
    return notes.find(note => note.id === id) || null
  },

  // Save a note (create or update)
  async saveNote(note: LocalNote): Promise<void> {
    try {
      const notes = await this.getAllNotes()
      const existingIndex = notes.findIndex(n => n.id === note.id)
      
      if (existingIndex >= 0) {
        // Update existing note
        notes[existingIndex] = note
      } else {
        // Add new note
        notes.push(note)
      }
      
      await localforage.setItem(NOTES_KEY, notes)
    } catch (error) {
      console.error('Error saving note to IndexedDB:', error)
      throw error
    }
  },

  // Delete a note
  async deleteNote(id: string): Promise<void> {
    try {
      const notes = await this.getAllNotes()
      const filteredNotes = notes.filter(note => note.id !== id)
      await localforage.setItem(NOTES_KEY, filteredNotes)
    } catch (error) {
      console.error('Error deleting note from IndexedDB:', error)
      throw error
    }
  },

  // Mark note as synced
  async markNoteAsSynced(id: string): Promise<void> {
    const notes = await this.getAllNotes()
    const noteIndex = notes.findIndex(note => note.id === id)
    
    if (noteIndex >= 0) {
      notes[noteIndex].isSynced = true
      notes[noteIndex].lastSyncedAt = new Date()
      await localforage.setItem(NOTES_KEY, notes)
    }
  }
}

// Operation queue
export const operationQueue = {
  // Get all pending operations
  async getPendingOperations(): Promise<LocalOperation[]> {
    try {
      const ops = await localforage.getItem<LocalOperation[]>(OPERATIONS_KEY)
      return ops || []
    } catch (error) {
      console.error('Error getting operations from IndexedDB:', error)
      return []
    }
  },

  // Add operation to queue
  async addOperation(operation: LocalOperation): Promise<void> {
    try {
      const ops = await this.getPendingOperations()
      ops.push(operation)
      await localforage.setItem(OPERATIONS_KEY, ops)
    } catch (error) {
      console.error('Error adding operation to IndexedDB:', error)
      throw error
    }
  },

  // Remove operation from queue (after successful sync)
  async removeOperation(operationId: string): Promise<void> {
    try {
      const ops = await this.getPendingOperations()
      const filteredOps = ops.filter(op => op.id !== operationId)
      await localforage.setItem(OPERATIONS_KEY, filteredOps)
    } catch (error) {
      console.error('Error removing operation from IndexedDB:', error)
      throw error
    }
  },

  // Clear all operations (e.g., after full sync)
  async clearOperations(): Promise<void> {
    await localforage.setItem(OPERATIONS_KEY, [])
  }
}

// Sync status
export const syncStorage = {
  // Get last sync time
  async getLastSyncTime(): Promise<Date | null> {
    try {
      const time = await localforage.getItem<string>(LAST_SYNC_KEY)
      return time ? new Date(time) : null
    } catch (error) {
      console.error('Error getting last sync time:', error)
      return null
    }
  },

  // Update last sync time
  async updateLastSyncTime(): Promise<void> {
    try {
      await localforage.setItem(LAST_SYNC_KEY, new Date().toISOString())
    } catch (error) {
      console.error('Error updating last sync time:', error)
      throw error
    }
  },

  // Check if online
  isOnline(): boolean {
    return typeof navigator !== 'undefined' && navigator.onLine
  }
}