import Link from 'next/link'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-14">
        <header className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-lg font-semibold text-white shadow-lg shadow-indigo-500/10 backdrop-blur-md">
              R
            </div>
            <div>
              <p className="text-sm text-slate-300">ReplicaSync</p>
              <p className="text-lg font-semibold text-white">Offline-first workspace with AI</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/notes"
              className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/20"
            >
              Open Notes
            </Link>
            <a
              href="#roadmap"
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 hover:border-white/30 hover:text-white"
            >
              Roadmap
            </a>
          </div>
        </header>

        <section className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Modern UI refresh • Offline-first ready
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Stay in flow across devices—even when you are offline
            </h1>
            <p className="text-lg text-slate-300">
              ReplicaSync combines an offline-first sync engine, conflict awareness, and AI helpers
              to keep your notes, todos, and media in lockstep across every connection state.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/notes"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5"
              >
                Go to Notes
                <span className="text-base">→</span>
              </Link>
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                  ✓
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">Sync Engine</p>
                  <p className="font-medium text-white">Offline-first by default</p>
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: 'Conflict aware', value: 'Built-in safeguards' },
                { label: 'AI-ready', value: 'Summaries & transcription' },
                { label: 'Secure storage', value: 'Local-first with sync' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 backdrop-blur-sm"
                >
                  <p className="text-xs uppercase tracking-wide text-slate-400">{item.label}</p>
                  <p className="font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-indigo-900/30 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-300">Workspaces · Live</p>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300">
                Sync healthy
              </span>
            </div>
            <div className="mt-6 space-y-4">
              {[
                {
                  title: 'Notes',
                  description: 'Rich text, fast search, version history',
                  status: 'Online',
                },
                {
                  title: 'Sync engine',
                  description: 'Delta sync + conflict detection',
                  status: 'Idle',
                },
                {
                  title: 'AI co-pilot',
                  description: 'Summaries, transcription & smart tags',
                  status: 'Beta',
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 p-4"
                >
                  <div>
                    <p className="text-sm text-slate-300">{card.title}</p>
                    <p className="text-base font-semibold text-white">{card.description}</p>
                  </div>
                  <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-200">
                    {card.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-3 text-sm text-indigo-100">
                <p className="text-xs uppercase tracking-wide text-indigo-200">Now syncing</p>
                <p className="font-semibold">Offline edits queued → server</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                <p className="text-xs uppercase tracking-wide text-slate-400">Resilient</p>
                <p className="font-semibold text-white">Optimistic UI with fallbacks</p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="roadmap"
          className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-indigo-900/30 lg:grid-cols-3"
        >
          <div className="lg:col-span-1">
            <p className="text-sm uppercase tracking-wide text-slate-400">Roadmap</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">What is shipping next</h2>
            <p className="mt-2 text-slate-300">
              A pragmatic path to launch: solid CRUD, resilient sync, human-friendly conflict
              resolution, and AI helpers that stay out of the way.
            </p>
          </div>
          <div className="lg:col-span-2 grid gap-3">
            {[
              { phase: 'Phase 1', title: 'Notes CRUD', status: 'Done', color: 'emerald' },
              { phase: 'Phase 2', title: 'Offline Sync Engine', status: 'In progress', color: 'cyan' },
              { phase: 'Phase 3', title: 'Conflict Resolution', status: 'Queued', color: 'yellow' },
              { phase: 'Phase 4', title: 'AI Summaries & Transcribe', status: 'Beta soon', color: 'indigo' },
              { phase: 'Phase 5', title: 'Todos & Media Attachments', status: 'Upcoming', color: 'slate' },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-white/80 to-white/40" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">{item.phase}</p>
                    <p className="text-base font-semibold text-white">{item.title}</p>
                  </div>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-200">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}