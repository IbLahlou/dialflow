'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Share2, MoreVertical, Play, Pause, Upload, Phone, Bot, Download, Settings, BarChart2, Globe, Lock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from '@/components/auth-provider'
import { getVoiceAgent, updateVoiceAgent, deleteVoiceAgent } from '@/lib/db'
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { VoiceSelector } from "@/components/voice-selector"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { WorkflowBuilder } from "@/components/workflow-builder"
import { DataIntegrationConfig } from "@/components/data-integration-config"
import { AnalyticsConfig } from "@/components/analytics-config"
import { SecurityConfig } from "@/components/security-config"

const languages = [
  { value: "darija", label: "Darija", flag: "🇲🇦" },
  { value: "ar", label: "Arabic", flag: "🇸🇦" },
  { value: "fr", label: "French", flag: "🇫🇷" },
  { value: "en", label: "English", flag: "🇺🇸" },
]

export default function AgentConfigPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const agentId = params.agentId as string

  const [agent, setAgent] = useState<any>({
    name: '',
    status: 'inactive',
    languages: [],
    tasks: [],
    workflow: {},
    dataIntegration: {
      crmSystem: '',
      outputFormat: '',
    },
    analytics: {
      enableRealTimeDashboard: true,
      trackMetrics: [],
    },
    telephony: {
      twilioAccountSid: '',
      twilioAuthToken: '',
      twilioPhoneNumber: '',
    },
    security: {
      enableEncryption: true,
      gdprCompliant: true,
    },
    voiceProvider: 'elevenlabs',
    elevenLabsVoiceId: '',
    openAIVoiceId: '',
    useOpenAIForSTT: false,
    enableTranscripts: true,
    maxCallDuration: 300,
    endCallKeyword: 'goodbye',
  })

  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [testPhoneNumber, setTestPhoneNumber] = useState('')
  const [isTesting, setIsTesting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchAgent = async () => {
      if (user && agentId) {
        const agentData = await getVoiceAgent(user.uid, agentId)
        if (agentData) {
          setAgent(agentData)
        }
      }
    }
    fetchAgent()
  }, [user, agentId])

  const handleSave = async () => {
    if (user) {
      try {
        await updateVoiceAgent(user.uid, agentId, agent)
        toast({
          title: "Changes saved",
          description: "Your agent configuration has been updated successfully.",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save changes. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handleDelete = async () => {
    if (user) {
      try {
        setIsDeleting(true)
        await deleteVoiceAgent(user.uid, agentId)
        toast({
          title: "Agent deleted",
          description: "The agent has been deleted successfully.",
        })
        router.push('/dashboard')
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete agent. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const handleTestCall = async () => {
    try {
      setIsTesting(true)
      const response = await fetch('/api/test-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentId: agentId,
          phoneNumber: testPhoneNumber,
        }),
      })
      const data = await response.json()
      if (response.ok) {
        toast({
          title: "Test call initiated",
          description: `Calling ${testPhoneNumber}...`,
        })
      } else {
        throw new Error(data.error || 'Failed to initiate test call')
      }
      setIsTestDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to initiate test call. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsTesting(false)
    }
  }

  const handleToggleStatus = async () => {
    const newStatus = agent.status === 'active' ? 'inactive' : 'active'
    setAgent({ ...agent, status: newStatus })
    await handleSave()
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{agent.name}</h1>
            <div className="flex items-center gap-2">
              <Badge 
                variant={agent.status === 'active' ? 'default' : 'secondary'}
                className="cursor-pointer"
                onClick={handleToggleStatus}
              >
                {agent.status === 'active' ? 'Active' : 'Inactive'}
              </Badge>
              <code className="text-sm text-muted-foreground">
                {agentId}
              </code>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsTestDialogOpen(true)}
          >
            <Phone className="mr-2 h-4 w-4" />
            Test Agent
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsShareDialogOpen(true)}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => {
                // Implement duplication logic
                toast({
                  title: "Agent duplicated",
                  description: "A copy of this agent has been created.",
                })
              }}>
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive"
                onClick={handleDelete}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button 
            size="sm"
            className="bg-gradient-to-r from-[#4195FF] to-[#67DBFF] text-white hover:opacity-90"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="languages">Languages</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid gap-6 max-w-xl">
            <div className="space-y-2">
              <Label>Agent Name</Label>
              <Input 
                value={agent.name}
                onChange={(e) => setAgent({ ...agent, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Voice Provider</Label>
              <RadioGroup
                value={agent.voiceProvider}
                onValueChange={(value) => setAgent({ ...agent, voiceProvider: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="elevenlabs" id="elevenlabs" />
                  <Label htmlFor="elevenlabs">ElevenLabs</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="openai" id="openai" />
                  <Label htmlFor="openai">OpenAI</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label>Voice Selection</Label>
              <VoiceSelector
                selectedVoice={agent.voiceProvider === 'elevenlabs' ? agent.elevenLabsVoiceId : agent.openAIVoiceId}
                onVoiceSelect={(voiceId, provider) => {
                  if (provider === 'elevenlabs') {
                    setAgent({ ...agent, elevenLabsVoiceId: voiceId })
                  } else {
                    setAgent({ ...agent, openAIVoiceId: voiceId })
                  }
                }}
                provider={agent.voiceProvider}
                language={agent.languages[0] || 'en'}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="languages" className="space-y-6">
          <div className="grid gap-6 max-w-xl">
            <div className="space-y-2">
              <Label>Supported Languages</Label>
              <Select 
                multiple
                value={agent.languages}
                onValueChange={(value) => setAgent({ ...agent, languages: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select languages" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language.value} value={language.value}>
                      <span className="flex items-center gap-2">
                        <span>{language.flag}</span>
                        <span>{language.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <div className="grid gap-6 max-w-xl">
            <div className="space-y-2">
              <Label>Supported Tasks</Label>
              <Select 
                multiple
                value={agent.tasks}
                onValueChange={(value) => setAgent({ ...agent, tasks: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select tasks" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="order_confirmation">Order Confirmation</SelectItem>
                  <SelectItem value="product_inquiry">Product Inquiry</SelectItem>
                  <SelectItem value="new_order">New Order Processing</SelectItem>
                  <SelectItem value="appointment_scheduling">Appointment Scheduling</SelectItem>
                  <SelectItem value="customer_feedback">Customer Feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="workflow" className="space-y-6">
          <WorkflowBuilder
            workflow={agent.workflow}
            onWorkflowChange={(workflow) => setAgent({ ...agent, workflow })}
          />
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <DataIntegrationConfig
            config={agent.dataIntegration}
            onConfigChange={(dataIntegration) => setAgent({ ...agent, dataIntegration })}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsConfig
            config={agent.analytics}
            onConfigChange={(analytics) => setAgent({ ...agent, analytics })}
          />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <SecurityConfig
            config={agent.security}
            onConfigChange={(security) => setAgent({ ...agent, security })}
          />
        </TabsContent>
      </Tabs>

      {/* Test Call Dialog */}
      <Dialog open={isTestDialogOpen} onOpenChange={setIsTestDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Agent</DialogTitle>
            <DialogDescription>
              Enter a phone number to test the agent with a real call.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+1234567890"
                value={testPhoneNumber}
                onChange={(e) => setTestPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTestDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleTestCall}
              disabled={isTesting}
              className="bg-gradient-to-r from-[#4195FF] to-[#67DBFF] text-white hover:opacity-90"
            >
              {isTesting ? "Initiating..." : "Start Test Call"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Agent</DialogTitle>
            <DialogDescription>
              Choose how you want to share this agent.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Button variant="outline" className="justify-start">
              <Bot className="mr-2 h-4 w-4" />
              Share as Template
            </Button>
            <Button variant="outline" className="justify-start">
              <Download className="mr-2 h-4 w-4" />
              Export Configuration
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

