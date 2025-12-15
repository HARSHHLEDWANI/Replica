'use client'

import Link from 'next/link'
import { LocalNote } from '@/lib/storage/indexedDB'

interface NoteListProps {
  notes: LocalNote[]
  loading: boolean
  onDelete: (id: string) => void
  isOnline: boolean
}

export default function NoteList({ notes, loading, onDelete, isOnline }: NoteListProps) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
        <div className="text-center py-8">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-b-2 border-indigo-400"></div>
          <p className="mt-3 text-sm text-slate-300">Loading notes...</p>
        </div>
      </div>
    )
  }

  if (notes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 bg-black/10 p-6">
        <div className="text-center py-8">
          <div className="mb-4 text-slate-500">
            <svg className="mx-auto h-14 w-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-3-3v6m-7.5 3.75h15A1.5 1.5 0 0021 17.25V6.75A1.5 1.5 0 0019.5 5.25h-15A1.5 1.5 0 003 6.75v10.5A1.5 1.5 0 004.5 18.75Z"
              />
            </svg>
          </div>
          <h3 className="mb-1 text-lg font-medium text-white">No notes yet</h3>
          <p className="text-sm text-slate-400">Create your first note to get started</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 p-4 sm:p-6">
      <h2 className="mb-4 text-lg font-semibold text-white">
        Your notes ({notes.length})
      </h2>
      
      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-white/20"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Link href={`/notes/${note.id}`} className="block group">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="font-semibold text-white transition group-hover:text-indigo-300">
                      {note.title}
                    </h3>
                    {!note.isSynced && (
                      <span className="inline-flex items-center rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-200">
                        Pending sync
                      </span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-300">
                    {note.content}
                  </p>
                </Link>
                <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
                  <span>Updated: {new Date(note.updatedAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>Version: {note.version}</span>
                  {note.lastSyncedAt && (
                    <>
                      <span>•</span>
                      <span>Synced: {new Date(note.lastSyncedAt).toLocaleTimeString()}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/notes/${note.id}`}
                  className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/10"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(note.id)}
                  className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-200 transition hover:bg-red-500/20"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}