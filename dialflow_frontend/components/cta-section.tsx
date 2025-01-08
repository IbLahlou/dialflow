import Link from "next/link"
import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="border-t bg-muted/50">
      <div className="container py-12 md:py-16 lg:py-24">
        <div className="mx-auto max-w-[58rem] space-y-6 text-center">
          <h2 className="text-2xl font-bold leading-[1.1] sm:text-3xl md:text-4xl lg:text-5xl">
            Ready to Revolutionize Your Customer Support?
          </h2>
          <p className="leading-normal text-muted-foreground text-sm sm:text-base md:text-lg">
            Join hundreds of businesses already using DialFlow to provide exceptional support.
            Get started in minutes and see the difference.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#4195FF] to-[#67DBFF] text-white hover:opacity-90"
              asChild
            >
              <Link href="/signup">
                Sign Up Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

