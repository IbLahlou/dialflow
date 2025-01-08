'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth-provider'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Trash, Upload, Download } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface KnowledgeItem {
  id: string
  title: string
  content: string
  type: 'faq' | 'product' | 'policy'
}

export default function AgentKnowledgePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newItem, setNewItem] = useState<Omit<KnowledgeItem, 'id'>>({
    title: '',
    content: '',
    type: 'faq'
  })

  useEffect(() => {
    // In a real application, fetch knowledge items from the database
    // For now, we'll use mock data
    setKnowledgeItems([
      { id: '1', title: 'What is DialFlow?', content: 'DialFlow is an AI-powered voice agent platform that provides multilingual support for businesses.', type: 'faq' },
      { id: '2', title: 'How do I set up my first agent?', content: 'To set up your first agent, go to the Voice Agents section and click on "Add Agent". Follow the step-by-step guide to configure your agent.', type: 'faq' },
      { id: '3', title: 'Basic Plan', content: 'Our Basic Plan includes support for one language, up to 1000 minutes of calls per month, and basic analytics.', type: 'product' },
      { id: '4', title: 'Pro Plan', content: 'The Pro Plan supports up to 3 languages, unlimited call minutes, advanced analytics, and priority support.', type: 'product' },
      { id: '5', title: 'Privacy Policy', content: 'DialFlow is committed to protecting your privacy. We collect and use personal information solely for providing and improving our services.', type: 'policy' },
      { id: '6', title: 'Terms of Service', content: 'By using DialFlow, you agree to abide by our terms of service, which include responsible use of our platform and respect for intellectual property rights.', type: 'policy' },
    ])
  }, [])

  const handleAddItem = () => {
    const id = Date.now().toString()
    setKnowledgeItems([...knowledgeItems, { ...newItem, id }])
    setIsAddDialogOpen(false)
    setNewItem({ title: '', content: '', type: 'faq' })
    toast({
      title: "Knowledge item added",
      description: "The new knowledge item has been added successfully.",
    })
  }

  const handleDeleteItem = (id: string) => {
    setKnowledgeItems(knowledgeItems.filter(item => item.id !== id))
    toast({
      title: "Knowledge item deleted",
      description: "The knowledge item has been deleted successfully.",
    })
  }

  const handleImport = () => {
    // Implement import functionality
    toast({
      title: "Import successful",
      description: "Knowledge items have been imported successfully.",
    })
  }

  const handleExport = () => {
    // Implement export functionality
    toast({
      title: "Export successful",
      description: "Knowledge items have been exported successfully.",
    })
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Agent Knowledge</h1>
          <p className="text-sm text-muted-foreground">
            Manage the knowledge base for your AI agents
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleImport}>
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            className="bg-gradient-to-r from-[#4195FF] to-[#67DBFF] text-white hover:opacity-90"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="faq">FAQs</TabsTrigger>
          <TabsTrigger value="product">Products</TabsTrigger>
          <TabsTrigger value="policy">Policies</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {knowledgeItems.map(item => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.type}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{item.content}</p>
              </CardContent>
              <CardFooter>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteItem(item.id)}>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="faq" className="space-y-4">
          {knowledgeItems.filter(item => item.type === 'faq').map(item => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{item.content}</p>
              </CardContent>
              <CardFooter>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteItem(item.id)}>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="product" className="space-y-4">
          {knowledgeItems.filter(item => item.type === 'product').map(item => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{item.content}</p>
              </CardContent>
              <CardFooter>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteItem(item.id)}>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="policy" className="space-y-4">
          {knowledgeItems.filter(item => item.type === 'policy').map(item => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{item.content}</p>
              </CardContent>
              <CardFooter>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteItem(item.id)}>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Knowledge Item</DialogTitle>
            <DialogDescription>
              Add a new item to your agent's knowledge base.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={newItem.content}
                onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <select
                id="type"
                value={newItem.type}
                onChange={(e) => setNewItem({ ...newItem, type: e.target.value as KnowledgeItem['type'] })}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="faq">FAQ</option>
                <option value="product">Product</option>
                <option value="policy">Policy</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddItem}>Add Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

