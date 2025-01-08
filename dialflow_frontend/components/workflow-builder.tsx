import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, X } from 'lucide-react'

interface WorkflowStep {
  id: string
  type: string
  config: Record<string, any>
}

interface WorkflowBuilderProps {
  workflow: WorkflowStep[]
  onWorkflowChange: (workflow: WorkflowStep[]) => void
}

export function WorkflowBuilder({ workflow, onWorkflowChange }: WorkflowBuilderProps) {
  const [newStepType, setNewStepType] = useState('')

  const addStep = () => {
    if (newStepType) {
      const newStep: WorkflowStep = {
        id: Date.now().toString(),
        type: newStepType,
        config: {},
      }
      onWorkflowChange([...workflow, newStep])
      setNewStepType('')
    }
  }

  const removeStep = (id: string) => {
    onWorkflowChange(workflow.filter(step => step.id !== id))
  }

  const updateStepConfig = (id: string, config: Record<string, any>) => {
    onWorkflowChange(workflow.map(step => 
      step.id === id ? { ...step, config } : step
    ))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Step type (e.g., greeting, question, action)"
          value={newStepType}
          onChange={(e) => setNewStepType(e.target.value)}
        />
        <Button onClick={addStep}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Step
        </Button>
      </div>
      {workflow.map((step, index) => (
        <Card key={step.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Step {index + 1}: {step.type}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => removeStep(step.id)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {/* Add specific configuration options based on step type */}
            <div className="space-y-2">
              <Label>Message</Label>
              <Input
                value={step.config.message || ''}
                onChange={(e) => updateStepConfig(step.id, { ...step.config, message: e.target.value })}
                placeholder="Enter step message or prompt"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

