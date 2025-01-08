'use client'

import { Bot, Globe2, BarChart3, Zap, Shield, Cpu } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const features = [
  {
    title: "Multilingual Support",
    description: "Support customers in Darija, Arabic, French, and English with automatic language detection.",
    icon: Globe2,
  },
  {
    title: "Custom Voice Profiles",
    description: "Create unique voice personalities that match your brand identity.",
    icon: Bot,
  },
  {
    title: "Real-Time Analytics",
    description: "Track performance, customer satisfaction, and key metrics in real-time.",
    icon: BarChart3,
  },
  {
    title: "Lightning Fast",
    description: "600ms response time for natural, flowing conversations.",
    icon: Zap,
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade encryption and data protection for peace of mind.",
    icon: Shield,
  },
  {
    title: "Smart Integration",
    description: "Seamlessly connect with your existing CRM and business tools.",
    icon: Cpu,
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="container space-y-8 py-12 md:py-16 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="text-2xl font-bold leading-[1.1] sm:text-3xl md:text-4xl lg:text-5xl">
          Powerful Features for Modern Support
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground text-sm sm:text-base md:text-lg">
          Everything you need to deliver exceptional customer service at scale
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <Card 
            key={feature.title} 
            className="group relative overflow-hidden transition-all hover:shadow-lg hover:shadow-[#4195FF]/20 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#4195FF]/5 to-[#67DBFF]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#4195FF]/10 to-[#67DBFF]/10 opacity-0 group-hover:opacity-20 transition-opacity" />
            <CardHeader>
              <div className="relative">
                <div className="absolute -inset-4 bg-[#4195FF]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <feature.icon className="relative h-8 w-8 text-[#4195FF] transition-transform group-hover:scale-110" />
              </div>
              <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <span className="text-sm sm:text-base text-muted-foreground">{feature.description}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4195FF]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
              <Button 
                variant="link" 
                className="mt-4 p-0 text-[#4195FF] group-hover:text-[#67DBFF] transition-colors"
              >
                Learn More →
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

