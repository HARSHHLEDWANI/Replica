'use client'

import { useState, useEffect, useCallback } from 'react'
import type { LocalNote } from '@/lib/storage/indexedDB'

// Use the exact LocalNote type from indexedDB
export type Note = LocalNote

export function useNotes() {
  const [notes, setNotes] = useState<LocalNote[]>([])
  const [loading, setLoading] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    setIsOnline(navigator.onLine)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Load notes from localStorage on mount
  useEffect(() => {
    const loadNotes = () => {
      try {
        setLoading(true)
        const savedNotes = localStorage.getItem('notes')
        if (savedNotes) {
          const parsedNotes = JSON.parse(savedNotes)
          // Convert string dates back to Date objects
          const notesWithDates = parsedNotes.map((note: any) => ({
            ...note,
            createdAt: new Date(note.createdAt),
            updatedAt: new Date(note.updatedAt),
            lastSyncedAt: note.lastSyncedAt ? new Date(note.lastSyncedAt) : undefined
          }))
          setNotes(notesWithDates)
        }
      } catch (error) {
        console.error('Error loading notes:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadNotes()
  }, [])

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('notes', JSON.stringify(notes))
    }
  }, [notes])

  const createNote = useCallback(async (title: string, content: string) => {
    const newNote: LocalNote = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      isSynced: isOnline,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'user-1',
      version: 1,
      lastSyncedAt: isOnline ? new Date() : undefined
    }

    setNotes(prev => [newNote, ...prev])

    if (isOnline) {
      // Simulate API call to sync with server
      try {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
        
        // Update note to show it's synced
        setNotes(prev => prev.map(note => 
          note.id === newNote.id ? { 
            ...note, 
            isSynced: true,
            lastSyncedAt: new Date() 
          } : note
        ))
        
        return { success: true, note: newNote }
      } catch (error) {
        console.error('Failed to sync note:', error)
        return { success: false, error }
      } finally {
        setLoading(false)
      }
    }

    return { success: true, note: newNote }
  }, [isOnline])

  const deleteNote = useCallback(async (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id))
    
    if (isOnline) {
      // Simulate API call to delete from server
      try {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 300))
        return { success: true }
      } catch (error) {
        console.error('Failed to delete note from server:', error)
        return { success: false, error }
      } finally {
        setLoading(false)
      }
    }

    return { success: true }
  }, [isOnline])

  // Sync all local notes when coming back online
  useEffect(() => {
    if (isOnline) {
      const syncLocalNotes = async () => {
        const localNotes = notes.filter(note => !note.isSynced)
        if (localNotes.length > 0) {
          setLoading(true)
          try {
            // Simulate syncing all local notes
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            setNotes(prev => prev.map(note => ({
              ...note,
              isSynced: true,
              lastSyncedAt: new Date(),
              version: note.version + 1
            })))
            
            console.log(`Synced ${localNotes.length} notes to server`)
          } catch (error) {
            console.error('Failed to sync notes:', error)
          } finally {
            setLoading(false)
          }
        }
      }
      
      syncLocalNotes()
    }
  }, [isOnline, notes])

  return {
    notes,
    loading,
    createNote,
    deleteNote,
    isOnline,
  }
}