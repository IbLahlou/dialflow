import { NextResponse } from 'next/server'
import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioClient = twilio(accountSid, authToken)

export async function POST(req: Request) {
  const { agentId, phoneNumber } = await req.json()

  try {
    // Replace this URL with your actual Twilio webhook URL that handles the agent logic
    const webhookUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/twilio-webhook?agentId=${agentId}`

    const call = await twilioClient.calls.create({
      url: webhookUrl,
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
    })

    return NextResponse.json({ success: true, callSid: call.sid })
  } catch (error) {
    console.error('Error initiating test call:', error)
    return NextResponse.json({ error: 'Failed to initiate test call' }, { status: 500 })
  }
}

