'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Edit, Trash } from 'lucide-react'
import { AddAgentDialog } from "./add-agent-dialog"
import { saveVoiceAgent, updateVoiceAgent, deleteVoiceAgent } from '@/lib/db'
import { toast } from '@/components/ui/use-toast'

interface VoiceAgent {
  id: string;
  name: string;
  created: string;
  status: string;
}

interface VoiceAgentsTableProps {
  voiceAgents: VoiceAgent[];
}

export function VoiceAgentsTable({ voiceAgents }: VoiceAgentsTableProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  const handleAddAgent = async (agentData: any) => {
    if (user) {
      try {
        const newAgentId = await saveVoiceAgent(user.uid, agentData)
        toast({
          title: "Agent Added",
          description: "New voice agent has been added successfully.",
        })
        return newAgentId
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add new agent. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handleEditAgent = (agentId: string) => {
    router.push(`/dashboard/agents/${agentId}`)
  }

  const handleDeleteAgent = async (agentId: string) => {
    if (user) {
      try {
        await deleteVoiceAgent(user.uid, agentId)
        toast({
          title: "Agent Deleted",
          description: "Voice agent has been deleted successfully.",
        })
        // You might want to refresh the agents list here
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete agent. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            className="bg-gradient-to-r from-[#4195FF] to-[#67DBFF] text-white hover:opacity-90"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Agent
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {voiceAgents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No voice agents available. Click "Add Agent" to create one.
                </TableCell>
              </TableRow>
            ) : (
              voiceAgents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell>{agent.name}</TableCell>
                  <TableCell>{new Date(agent.created).toLocaleDateString()}</TableCell>
                  <TableCell>{agent.status}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleEditAgent(agent.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteAgent(agent.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AddAgentDialog 
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddAgent}
      />
    </div>
  )
}

