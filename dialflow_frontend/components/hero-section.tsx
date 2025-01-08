'use client'

import Link from "next/link"
import { ArrowRight, Play, Phone, MessageSquare, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { AnimatedBackground } from "./animated-background"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      <AnimatedBackground />
      <div className="container relative flex flex-col items-center space-y-8 text-center">
        <div className="space-y-4 max-w-[800px]">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            DialFlow: AI-Powered Voice Agents for{" "}
            <span className="bg-gradient-to-r from-[#4195FF] to-[#67DBFF] bg-clip-text text-transparent">
              Revolutionary Customer Support
            </span>
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-base sm:text-lg md:text-xl">
            Transform your customer service with intelligent, multilingual voice agents that understand, 
            respond, and learn. Reduce wait times by 80% and support customers 24/7.
          </p>
        </div>
        
        <div className="relative w-full max-w-4xl aspect-[2/1] my-8 md:my-12">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl transform scale-150" />
              <div className="relative bg-background/80 backdrop-blur-sm border rounded-2xl p-6 glowing floating">
                <div className="flex items-center gap-4">
                  <Phone className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <div className="h-2 w-24 bg-primary/20 rounded animate-pulse" />
                    <div className="h-2 w-16 bg-primary/20 rounded mt-2 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-background/80 backdrop-blur-sm border rounded-xl p-4 floating" style={{ animationDelay: '-2s' }}>
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
          </div>
          
          <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
            <div className="bg-background/80 backdrop-blur-sm border rounded-xl p-4 floating" style={{ animationDelay: '-4s' }}>
              <Zap className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-[#4195FF] to-[#67DBFF] text-white hover:opacity-90 group relative overflow-hidden"
            asChild
          >
            <Link href="/signup">
              <span className="relative z-10 flex items-center">
                Sign Up Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#4195FF] to-[#67DBFF] opacity-0 group-hover:opacity-20 transition-opacity" />
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Watch Demo
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#4195FF]/10 to-[#67DBFF]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Support Coverage", value: "24/7" },
            { label: "Languages Supported", value: "4+" },
            { label: "Cost Reduction", value: "80%" },
            { label: "Setup Time", value: "5min" },
          ].map((stat, i) => (
            <div 
              key={i}
              className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-[#4195FF]/5 transition-colors"
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#4195FF] to-[#67DBFF] bg-clip-text text-transparent">
                {stat.value}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

