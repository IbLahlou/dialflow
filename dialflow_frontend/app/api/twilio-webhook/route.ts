import { NextResponse } from 'next/server'
import twilio from 'twilio'
import { getVoiceAgent } from '@/lib/db'

const VoiceResponse = twilio.twiml.VoiceResponse

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url)
  const agentId = searchParams.get('agentId')

  if (!agentId) {
    return NextResponse.json({ error: 'Agent ID is required' }, { status: 400 })
  }

  try {
    const agent = await getVoiceAgent('userId', agentId) // Replace 'userId' with actual user ID logic
    if (!agent) {
      throw new Error('Agent not found')
    }

    const twiml = new VoiceResponse()
    twiml.say({ voice: agent.voiceProvider === 'elevenlabs' ? 'alice' : agent.openAIVoiceId }, agent.firstMessage)
    
    // Add more complex logic here based on your agent's capabilities

    return new NextResponse(twiml.toString(), {
      headers: { 'Content-Type': 'text/xml' },
    })
  } catch (error) {
    console.error('Error in Twilio webhook:', error)
    const twiml = new VoiceResponse()
    twiml.say('An error occurred. Please try again later.')
    return new NextResponse(twiml.toString(), {
      headers: { 'Content-Type': 'text/xml' },
    })
  }
}

