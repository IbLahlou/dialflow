import { HeroSection } from "@/components/hero-section"
import { PartnersSection } from "@/components/partners-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"

export default function Home() {
  return (
    <>
      <section id="product">
        <HeroSection />
      </section>
      <PartnersSection />
      <section id="features">
        <FeaturesSection />
      </section>
      <section id="testimonials">
        <TestimonialsSection />
      </section>
      <section id="faq">
        <FAQSection />
      </section>
      <section id="cta">
        <CTASection />
      </section>
    </>
  )
}

