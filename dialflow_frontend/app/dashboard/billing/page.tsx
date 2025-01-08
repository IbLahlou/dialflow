'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function BillingPage() {
  const { toast } = useToast()
  const [creditAmount, setCreditAmount] = useState(100)

  const handlePurchase = () => {
    // In a real application, you would integrate with a payment gateway here
    toast({
      title: "تم شراء الأرصدة",
      description: `لقد قمت بشراء ${creditAmount} رصيد بنجاح.`,
    })
  }

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-bold">Billing & Credits</h1>
      <Card>
        <CardHeader>
          <CardTitle>Purchase Credits</CardTitle>
          <CardDescription>Add more credits to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="creditAmount">Number of Credits</Label>
            <Input
              id="creditAmount"
              type="number"
              value={creditAmount}
              onChange={(e) => setCreditAmount(parseInt(e.target.value))}
            />
          </div>
          <p>Total cost: ${(creditAmount * 0.01).toFixed(2)}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={handlePurchase}>شراء الأرصدة</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Credit Usage</CardTitle>
          <CardDescription>See how your credits are being used</CardDescription>
        </CardHeader>
        <CardContent>
          <p>الرصيد الحالي: 250 رصيد</p>
          <p>الأرصدة المستخدمة هذا الشهر: 750 رصيد</p>
          <p>تجديد الأرصدة في: 1 من كل شهر</p>
        </CardContent>
      </Card>
    </div>
  )
}

