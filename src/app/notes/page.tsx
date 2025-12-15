'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useNotes } from '@/hooks/useNotes'
import NoteList from '@/components/notes/NoteList'

export default function NotesPage() {
  const [newNote, setNewNote] = useState({ title: '', content: '' })
  const { notes, loading, createNote, deleteNote, isOnline } = useNotes()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const title = newNote.title.trim()
    const content = newNote.content.trim()
    if (!title || !content) return

    await createNote(title, content)
    setNewNote({ title: '', content: '' })
  }

  const handleDelete = async (id: string) => {
    await deleteNote(id)
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-400">Workspace</p>
            <h1 className="text-3xl font-semibold text-white">Notes</h1>
            <p className="text-slate-300">Offline-first, conflict-aware, AI-ready.</p>
          </div>
          <Link
            href="/"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-white/30 hover:text-white"
          >
            ← Back to home
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-indigo-900/20 backdrop-blur-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-wide text-slate-400">New note</p>
                  <h2 className="text-xl font-semibold text-white">Capture without losing flow</h2>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    isOnline
                      ? 'border border-emerald-400/30 bg-emerald-500/10 text-emerald-200'
                      : 'border border-amber-400/30 bg-amber-500/10 text-amber-200'
                  }`}
                >
                  {isOnline ? 'Online' : 'Offline mode'}
                </span>
              </div>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="text-sm text-slate-300">Title</label>
                  <input
                    type="text"
                    value={newNote.title}
                    onChange={(e) => setNewNote((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Sync strategy, meeting notes..."
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-300">Content</label>
                  <textarea
                    value={newNote.content}
                    onChange={(e) => setNewNote((prev) => ({ ...prev, content: e.target.value }))}
                    placeholder="What do you want to remember?"
                    rows={5}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-indigo-400" />
                    {loading ? 'Syncing...' : 'Autosave to local + queued sync'}
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Create note
                    <span className="text-base">→</span>
                  </button>
                </div>
              </form>
            </section>

            <section className="grid gap-4 sm:grid-cols-3">
              {[
                { label: 'Total notes', value: notes.length },
                { label: 'Sync status', value: isOnline ? 'Online' : 'Offline' },
                { label: 'Loading', value: loading ? 'Working' : 'Idle' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
                >
                  <p className="text-xs uppercase tracking-wide text-slate-400">{item.label}</p>
                  <p className="text-lg font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </section>
          </div>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-indigo-900/20 backdrop-blur-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-wide text-slate-400">Library</p>
                <h2 className="text-xl font-semibold text-white">Your notes</h2>
              </div>
              <Link
                href="/"
                className="hidden rounded-full border border-white/10 px-4 py-2 text-xs text-slate-200 transition hover:border-white/30 hover:text-white sm:inline-flex"
              >
                Dashboard
              </Link>
            </div>
            <div className="mt-6">
              <NoteList notes={notes} loading={loading} onDelete={handleDelete} isOnline={isOnline} />
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}