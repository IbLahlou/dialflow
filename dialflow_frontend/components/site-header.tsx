'use client'

import { useState } from 'react'
import Link from "next/link"
import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'
import { useLanguage } from "@/contexts/LanguageContext"
import { translations } from "@/lib/translations"
import { LanguageToggle } from "@/components/language-toggle"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <BrandLogo />
        <nav className={`${isMenuOpen ? 'flex' : 'hidden'} absolute top-16 left-0 right-0 flex-col items-center space-y-4 bg-background p-4 md:relative md:top-0 md:flex md:flex-row md:space-y-0 md:space-x-4 md:bg-transparent md:p-0`}>
          <Button variant="ghost" asChild>
            <Link href="/#product">{t.features}</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/#pricing">{t.pricing}</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/#contact">{t.contact}</Link>
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/login">{t.login}</Link>
            </Button>
            <Button 
              asChild
              className="bg-gradient-to-r from-[#4195FF] to-[#67DBFF] text-white hover:opacity-90"
            >
              <Link href="/signup">{t.signup}</Link>
            </Button>
          </div>
          <LanguageToggle />
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
    </header>
  )
}

