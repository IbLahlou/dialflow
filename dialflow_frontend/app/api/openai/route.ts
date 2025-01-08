import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { action, data } = await req.json()

  try {
    switch (action) {
      case 'transcribe':
        const transcription = await openai.audio.transcriptions.create({
          file: Buffer.from(data.audioBuffer),
          model: "whisper-1",
        });
        return NextResponse.json({ text: transcription.text })

      case 'synthesize':
        const mp3 = await openai.audio.speech.create({
          model: "tts-1",
          voice: data.voice,
          input: data.text,
        });
        const buffer = Buffer.from(await mp3.arrayBuffer());
        return new NextResponse(buffer, {
          headers: {
            'Content-Type': 'audio/mpeg',
          },
        })

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('OpenAI API error:', error)
    return NextResponse.json({ error: 'OpenAI API error' }, { status: 500 })
  }
}

