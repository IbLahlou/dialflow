'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { VoiceAgentsTable } from "@/components/dashboard/voice-agents-table"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { getVoiceAgents } from '@/lib/db'

export default function DashboardPage() {
  const { user } = useAuth()
  const [voiceAgents, setVoiceAgents] = useState<any[]>([])

  useEffect(() => {
    const fetchVoiceAgents = async () => {
      if (user) {
        const agents = await getVoiceAgents(user.uid)
        // Transform the object into an array
        const agentsArray = agents ? Object.entries(agents).map(([id, data]) => ({
          id,
          ...(data as object)
        })) : []
        setVoiceAgents(agentsArray)
      }
    }
    fetchVoiceAgents()
  }, [user])

  return (
    <div className="space-y-6">
      <DashboardHeader 
        heading="Voice Agents"
        text="Create and manage your AI voice agents."
      />
      <VoiceAgentsTable voiceAgents={voiceAgents} />
    </div>
  )
}

