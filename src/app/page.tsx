import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="border-b pb-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            ReplicaSync
          </h1>
          <p className="text-gray-600 mt-2">
            Offline-First Sync Engine with Conflict Resolution
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              ✅ Phase 1 Complete
            </h2>
            <p className="text-gray-700 mb-4">
              Next.js project initialized with TypeScript and Tailwind CSS.
            </p>
            <div className="text-sm text-green-600 p-3 bg-green-50 rounded">
              Database connection established with Supabase PostgreSQL
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Next Steps
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span>Implement basic online-only CRUD</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full mr-3"></div>
                <span>Add IndexedDB layer for offline storage</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full mr-3"></div>
                <span>Build sync engine with conflict resolution</span>
              </li>
            </ul>
            
            <div className="mt-6 pt-6 border-t">
              <Link 
                href="/notes" 
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Go to Notes App →
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Current setup:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Next.js 14 (App Router)</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Supabase PostgreSQL</li>
            <li>Prisma ORM</li>
          </ul>
        </div>
      </div>
    </main>
  );
}