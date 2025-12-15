'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NoteDetailPage() {
  const params = useParams()
  const router = useRouter()
  const noteId = params.id

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">Note detail</h1>
            <p className="mt-1 text-sm text-slate-300">Note ID: {noteId}</p>
          </div>
          <Link
            href="/notes"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-white/30 hover:text-white"
          >
            ← Back to Notes
          </Link>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-slate-200 shadow-xl shadow-indigo-900/30">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/20 text-sm uppercase text-slate-300">
            Soon
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">Note detail page</h3>
          <p className="text-slate-300">
            This screen will show the full note body, history, and AI summaries. Editing and
            conflict helpers are coming in the next update.
          </p>
          <p className="mt-2 text-sm text-slate-400">Stay tuned.</p>
        </div>
      </div>
    </div>
  )
}