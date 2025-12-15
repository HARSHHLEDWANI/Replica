import { NextRequest, NextResponse } from 'next/server'
import { mockDB } from '@/lib/db'

const DEFAULT_USER_ID = 'user_1'

export async function GET() {
  try {
    const userNotes = mockDB.notes.filter(note => note.userId === DEFAULT_USER_ID)
    return NextResponse.json({ notes: userNotes })
  } catch (error) {
    console.error('Error fetching notes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    const newNote = {
      id: Date.now().toString(),
      userId: DEFAULT_USER_ID,
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1
    }

    // Add to mock DB
    mockDB.notes.unshift(newNote)

    return NextResponse.json({ note: newNote }, { status: 201 })
  } catch (error) {
    console.error('Error creating note:', error)
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    )
  }
}