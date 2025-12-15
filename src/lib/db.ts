// Temporary mock database - we'll replace with Prisma later
export const mockDB = {
  notes: [
    {
      id: '1',
      userId: 'user_1',
      title: 'Welcome to ReplicaSync',
      content: 'This is your first note. Create, edit, and delete notes here!',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1
    },
    {
      id: '2', 
      userId: 'user_1',
      title: 'Offline Sync Coming Soon',
      content: 'We are building an offline-first sync engine with conflict resolution.',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1
    }
  ]
}

export type Note = typeof mockDB.notes[0]