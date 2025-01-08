import Image from "next/image"

export function PartnersSection() {
  return (
    <section className="border-y bg-muted/50">
      <div className="container py-12 md:py-16">
        <div className="text-center mb-8">
          <p className="text-sm text-muted-foreground">Trusted by innovative companies worldwide</p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6 items-center justify-items-center">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="relative h-12 w-32 opacity-50 hover:opacity-100 transition-opacity">
              <Image
                src={`/placeholder-logo.svg`}
                alt={`Partner logo ${i}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

