'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash, Edit, Globe, Mic } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from '@/components/auth-provider'
import { getPhoneNumbers, addPhoneNumber, updatePhoneNumber, deletePhoneNumber } from '@/lib/db'

interface PhoneNumber {
  id: string;
  number: string;
  twilioSid: string;
  elevenLabsVoiceId: string;
  language: string;
  assignedAgent: string;
}

const languages = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
  { value: "ar", label: "Arabic" },
  { value: "zh", label: "Chinese" },
]

const elevenLabsVoices = [
  { value: "voice1", label: "Rachel (Professional)" },
  { value: "voice2", label: "Mike (Friendly)" },
  { value: "voice3", label: "Emily (Empathetic)" },
  { value: "voice4", label: "James (Technical)" },
]

export default function PhoneNumbersPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState<PhoneNumber | null>(null)
  const [newPhoneNumber, setNewPhoneNumber] = useState({
    number: '',
    twilioSid: '',
    elevenLabsVoiceId: '',
    language: '',
    assignedAgent: '',
  })

  useEffect(() => {
    if (user) {
      fetchPhoneNumbers()
    }
  }, [user])

  const fetchPhoneNumbers = async () => {
    if (user) {
      const numbers = await getPhoneNumbers(user.uid)
      setPhoneNumbers(numbers)
    }
  }

  const handleAddPhoneNumber = async () => {
    if (user) {
      try {
        await addPhoneNumber(user.uid, newPhoneNumber)
        toast({
          title: "Phone number added",
          description: "The new phone number has been added successfully.",
        })
        setIsAddDialogOpen(false)
        setNewPhoneNumber({
          number: '',
          twilioSid: '',
          elevenLabsVoiceId: '',
          language: '',
          assignedAgent: '',
        })
        fetchPhoneNumbers()
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add phone number. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handleEditPhoneNumber = async () => {
    if (user && currentPhoneNumber) {
      try {
        await updatePhoneNumber(user.uid, currentPhoneNumber.id, currentPhoneNumber)
        toast({
          title: "Phone number updated",
          description: "The phone number has been updated successfully.",
        })
        setIsEditDialogOpen(false)
        setCurrentPhoneNumber(null)
        fetchPhoneNumbers()
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update phone number. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handleDeletePhoneNumber = async (id: string) => {
    if (user) {
      try {
        await deletePhoneNumber(user.uid, id)
        toast({
          title: "Phone number deleted",
          description: "The phone number has been deleted successfully.",
        })
        fetchPhoneNumbers()
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete phone number. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Phone Numbers</h1>
          <p className="text-sm text-muted-foreground">
            Manage your Twilio phone numbers and Eleven Labs voices
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-[#4195FF] to-[#67DBFF] text-white hover:opacity-90"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Phone Number
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Phone Number</TableHead>
              <TableHead>Twilio SID</TableHead>
              <TableHead>Eleven Labs Voice</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Assigned Agent</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {phoneNumbers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No phone numbers available. Click "Add Phone Number" to add one.
                </TableCell>
              </TableRow>
            ) : (
              phoneNumbers.map((phoneNumber) => (
                <TableRow key={phoneNumber.id}>
                  <TableCell>{phoneNumber.number}</TableCell>
                  <TableCell>{phoneNumber.twilioSid}</TableCell>
                  <TableCell>{phoneNumber.elevenLabsVoiceId}</TableCell>
                  <TableCell>{phoneNumber.language}</TableCell>
                  <TableCell>{phoneNumber.assignedAgent}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setCurrentPhoneNumber(phoneNumber)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePhoneNumber(phoneNumber.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Phone Number Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Phone Number</DialogTitle>
            <DialogDescription>
              Add a new Twilio phone number and configure its settings.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={newPhoneNumber.number}
                onChange={(e) => setNewPhoneNumber({ ...newPhoneNumber, number: e.target.value })}
                placeholder="+1234567890"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="twilioSid">Twilio SID</Label>
              <Input
                id="twilioSid"
                value={newPhoneNumber.twilioSid}
                onChange={(e) => setNewPhoneNumber({ ...newPhoneNumber, twilioSid: e.target.value })}
                placeholder="Enter Twilio SID"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="elevenLabsVoice">Eleven Labs Voice</Label>
              <Select
                value={newPhoneNumber.elevenLabsVoiceId}
                onValueChange={(value) => setNewPhoneNumber({ ...newPhoneNumber, elevenLabsVoiceId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent>
                  {elevenLabsVoices.map((voice) => (
                    <SelectItem key={voice.value} value={voice.value}>
                      {voice.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={newPhoneNumber.language}
                onValueChange={(value) => setNewPhoneNumber({ ...newPhoneNumber, language: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language.value} value={language.value}>
                      {language.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assignedAgent">Assigned Agent</Label>
              <Input
                id="assignedAgent"
                value={newPhoneNumber.assignedAgent}
                onChange={(e) => setNewPhoneNumber({ ...newPhoneNumber, assignedAgent: e.target.value })}
                placeholder="Enter assigned agent name or ID"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPhoneNumber}>Add Phone Number</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Phone Number Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Phone Number</DialogTitle>
            <DialogDescription>
              Update the settings for this phone number.
            </DialogDescription>
          </DialogHeader>
          {currentPhoneNumber && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={currentPhoneNumber.number}
                  onChange={(e) => setCurrentPhoneNumber({ ...currentPhoneNumber, number: e.target.value })}
                  placeholder="+1234567890"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="twilioSid">Twilio SID</Label>
                <Input
                  id="twilioSid"
                  value={currentPhoneNumber.twilioSid}
                  onChange={(e) => setCurrentPhoneNumber({ ...currentPhoneNumber, twilioSid: e.target.value })}
                  placeholder="Enter Twilio SID"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="elevenLabsVoice">Eleven Labs Voice</Label>
                <Select
                  value={currentPhoneNumber.elevenLabsVoiceId}
                  onValueChange={(value) => setCurrentPhoneNumber({ ...currentPhoneNumber, elevenLabsVoiceId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {elevenLabsVoices.map((voice) => (
                      <SelectItem key={voice.value} value={voice.value}>
                        {voice.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={currentPhoneNumber.language}
                  onValueChange={(value) => setCurrentPhoneNumber({ ...currentPhoneNumber, language: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((language) => (
                      <SelectItem key={language.value} value={language.value}>
                        {language.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assignedAgent">Assigned Agent</Label>
                <Input
                  id="assignedAgent"
                  value={currentPhoneNumber.assignedAgent}
                  onChange={(e) => setCurrentPhoneNumber({ ...currentPhoneNumber, assignedAgent: e.target.value })}
                  placeholder="Enter assigned agent name or ID"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditPhoneNumber}>Update Phone Number</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

