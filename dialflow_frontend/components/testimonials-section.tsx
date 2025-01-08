import Image from "next/image"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    quote: "DialFlow transformed our customer service. Setup took minutes, and our satisfaction rates increased by 40%.",
    author: "Sarah Chen",
    role: "CTO, TechCorp",
    company: "TechCorp",
  },
  {
    quote: "The multilingual support is a game-changer. Our international customers love the natural conversations.",
    author: "Mohammed Ali",
    role: "Head of Support",
    company: "GlobalTrade",
  },
  {
    quote: "Reduced our support costs by 60% while improving response times. The ROI is incredible.",
    author: "Lisa Johnson",
    role: "Operations Director",
    company: "RetailPlus",
  },
]

export function TestimonialsSection() {
  return (
    <section className="container py-12 md:py-16 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="text-2xl font-bold leading-[1.1] sm:text-3xl md:text-4xl lg:text-5xl">
          Loved by Businesses Worldwide
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground text-sm sm:text-base md:text-lg">
          See what our customers have to say about DialFlow
        </p>
      </div>
      <div className="mt-8 md:mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, i) => (
          <Card key={i} className="relative overflow-hidden">
            <CardHeader>
              <div className="text-2xl text-[#4195FF]">"</div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm sm:text-base">{testimonial.quote}</p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg`} />
                  <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

