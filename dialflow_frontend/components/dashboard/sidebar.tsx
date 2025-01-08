'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Bot, Phone, BarChart2, BookOpen, FileText, Settings, FileCode2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from 'next/navigation';

const sidebarItems = [
  {
    title: "Voice Agents",
    href: "/dashboard",
    icon: Bot,
  },
  {
    title: "Phone Numbers",
    href: "/dashboard/phone-numbers",
    icon: Phone,
  },
  {
    title: "Call Logs",
    href: "/dashboard/call-logs",
    icon: FileText,
  },
  {
    title: "Campaigns",
    href: "/dashboard/campaigns",
    icon: BarChart2,
  },
  {
    title: "Agent Knowledge",
    href: "/dashboard/knowledge",
    icon: BookOpen,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Documentation",
    href: "/dashboard/docs",
    icon: FileCode2,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter();

  return (
    <div className="hidden border-r bg-muted/10 lg:block lg:w-64">
      <div className="flex h-full flex-col">
        <ScrollArea className="flex-1 p-4">
          <nav className="grid items-start gap-2">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon
              return (
                <Link
                  key={index}
                  href={item.href}
                >
                  <span
                    className={cn(
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href ? "bg-accent" : "transparent"
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </span>
                </Link>
              )
            })}
          </nav>
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Credit Usage</p>
            <div className="text-sm font-medium">250 / 500 credits</div>
            <Button 
              className="w-full bg-gradient-to-r from-[#4195FF] to-[#67DBFF] text-white hover:opacity-90"
              onClick={() => router.push('/dashboard/billing')}
            >
              Purchase Credits
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

