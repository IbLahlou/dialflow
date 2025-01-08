'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    accountName: 'حميد الرشيدي',
    email: 'hamid@example.com',
    notificationsEnabled: true,
    apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    twilioAccountSid: 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    twilioAuthToken: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    openAIApiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    elevenLabsApiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  })

  const handleSave = () => {
    // In a real application, you would save these settings to the backend
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    })
  }

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Manage your account details and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accountName">اسم الحساب</Label>
                <Input
                  id="accountName"
                  value={settings.accountName}
                  onChange={(e) => setSettings({ ...settings, accountName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="notifications"
                  checked={settings.notificationsEnabled}
                  onCheckedChange={(checked) => setSettings({ ...settings, notificationsEnabled: checked })}
                />
                <Label htmlFor="notifications">تفعيل إشعارات البريد الإلكتروني</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for various integrations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">DialFlow API Key</Label>
                <Input
                  id="apiKey"
                  value={settings.apiKey}
                  onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twilioAccountSid">Twilio Account SID</Label>
                <Input
                  id="twilioAccountSid"
                  value={settings.twilioAccountSid}
                  onChange={(e) => setSettings({ ...settings, twilioAccountSid: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twilioAuthToken">Twilio Auth Token</Label>
                <Input
                  id="twilioAuthToken"
                  type="password"
                  value={settings.twilioAuthToken}
                  onChange={(e) => setSettings({ ...settings, twilioAuthToken: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="openAIApiKey">OpenAI API Key</Label>
                <Input
                  id="openAIApiKey"
                  value={settings.openAIApiKey}
                  onChange={(e) => setSettings({ ...settings, openAIApiKey: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="elevenLabsApiKey">ElevenLabs API Key</Label>
                <Input
                  id="elevenLabsApiKey"
                  value={settings.elevenLabsApiKey}
                  onChange={(e) => setSettings({ ...settings, elevenLabsApiKey: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your billing details and view your current plan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Current Plan: Pro Plan (500 credits/month)</p>
              <p>Next billing date: June 1, 2023</p>
              <Button>Upgrade Plan</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Manage your payment methods.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Current method: Visa ending in 1234</p>
              <Button>Update Payment Method</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Button onClick={handleSave}>Save Settings</Button>
    </div>
  )
}

