import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { text, voice } = await req.json()

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/openai`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'synthesize',
        data: { text, voice }
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to generate TTS preview')
    }

    const audioBuffer = await response.arrayBuffer()
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    })
  } catch (error) {
    console.error('Error generating TTS preview:', error)
    return NextResponse.json({ error: 'Failed to generate TTS preview' }, { status: 500 })
  }
}

