import Link from "next/link"
import { BrandLogo } from "@/components/brand-logo"

export function SiteFooter() {
  return (
    <footer className="border-t bg-gradient-to-b from-muted/50 to-muted">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="space-y-4">
            <BrandLogo variant="white" />
            <p className="text-sm text-muted-foreground max-w-[250px]">
              Transforming customer service with AI-powered multilingual voice agents
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-[#4195FF]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-[#4195FF]">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-[#4195FF]">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-[#4195FF]">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/documentation" className="text-muted-foreground hover:text-[#4195FF]">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-[#4195FF]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-[#4195FF]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-[#4195FF]">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-muted-foreground hover:text-[#4195FF]">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} DialFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

