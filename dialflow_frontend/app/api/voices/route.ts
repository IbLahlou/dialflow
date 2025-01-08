import { getElevenLabsVoices } from '@/lib/eleven-labs'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const voices = await getElevenLabsVoices()
    return NextResponse.json(voices)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch voices' }, { status: 500 })
  }
}

