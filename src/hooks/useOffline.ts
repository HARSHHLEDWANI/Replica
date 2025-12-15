import { useState, useEffect } from 'react'
import { syncStorage } from '@/lib/storage/indexedDB'

export function useOffline() {
  const [isOnline, setIsOnline] = useState(true)
  const [lastSync, setLastSync] = useState<Date | null>(null)

  useEffect(() => {
    // Set initial online status
    setIsOnline(syncStorage.isOnline())
    
    // Load last sync time
    syncStorage.getLastSyncTime().then(setLastSync)

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return {
    isOnline,
    lastSync,
    updateLastSync: () => {
      syncStorage.updateLastSyncTime()
      syncStorage.getLastSyncTime().then(setLastSync)
    }
  }
}