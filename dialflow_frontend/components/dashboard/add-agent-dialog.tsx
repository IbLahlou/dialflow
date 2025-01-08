'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

interface Template {
  id: string;
  name: string;
  description: string;
  avatar: string;
  avatarFallback: string;
  systemPrompt: string;
}

const templates: Template[] = [
  {
    id: "blank",
    name: "Blank template",
    description: "Start with a blank template and customize your agent to suit your needs.",
    avatar: "/placeholder.svg",
    avatarFallback: "BT",
    systemPrompt: "You are a helpful AI assistant.",
  },
  {
    id: "support",
    name: "Support agent",
    description: "Talk to Eric, a dedicated support agent who is always ready to resolve any issues.",
    avatar: "/avatars/eric.png",
    avatarFallback: "EA",
    systemPrompt: "You are a support agent named Eric. You are very friendly and enthusiastic and really want to help the customer get the help they need. Answer in 3 to 7 sentences in most cases.",
  },
  {
    id: "math",
    name: "Math tutor",
    description: "Speak with Matilda, a mathematics tutor who can help you with your studies.",
    avatar: "/avatars/matilda.png",
    avatarFallback: "MT",
    systemPrompt: "You are a math tutor named Matilda. You are patient, encouraging, and skilled at breaking down complex concepts into simple steps.",
  },
  {
    id: "game",
    name: "Video game character",
    description: "Speak with a mysterious wizard who offers ancient wisdom to aid you on your journey.",
    avatar: "/avatars/wizard.png",
    avatarFallback: "WZ",
    systemPrompt: "You are Callum, a wise and mysterious wizard character. Speak with medieval flair and offer guidance through metaphors and ancient wisdom.",
  },
]

interface AddAgentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (agentData: any) => void;
}

export function AddAgentDialog({ isOpen, onClose, onAdd }: AddAgentDialogProps) {
  const [agentName, setAgentName] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const template = templates.find(t => t.id === selectedTemplate)
    const agentData = {
      name: agentName,
      status: 'inactive',
      template: selectedTemplate,
      systemPrompt: template?.systemPrompt,
      created: new Date().toISOString(),
    }
    
    const agentId = await onAdd(agentData)
    onClose()
    router.push(`/dashboard/agents/${agentId}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create an AI agent</DialogTitle>
          <DialogDescription>
            Choose a template to get started or create a custom agent from scratch.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">AI Agent name</Label>
              <Input
                id="name"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="Enter agent name..."
                required
              />
            </div>
            <RadioGroup
              value={selectedTemplate}
              onValueChange={setSelectedTemplate}
              className="grid grid-cols-2 gap-4"
            >
              {templates.map((template) => (
                <div key={template.id}>
                  <RadioGroupItem
                    value={template.id}
                    id={template.id}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={template.id}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Avatar className="h-16 w-16 mb-4">
                      <AvatarImage src={template.avatar} alt={template.name} />
                      <AvatarFallback>{template.avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {template.description}
                      </p>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-[#4195FF] to-[#67DBFF] text-white hover:opacity-90"
            >
              Create agent
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

