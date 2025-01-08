import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How secure is DialFlow?",
    answer: "DialFlow employs bank-grade encryption and follows strict security protocols. All data is encrypted in transit and at rest, and we're compliant with major security standards.",
  },
  {
    question: "How does the multilingual support work?",
    answer: "Our AI automatically detects the caller's language and switches seamlessly between Darija, Arabic, French, and English. No setup required - it works out of the box.",
  },
  {
    question: "What's the typical setup time?",
    answer: "Most businesses are up and running in under 5 minutes. Simply upload your knowledge base, customize your voice preferences, and you're ready to go.",
  },
  {
    question: "Can I integrate DialFlow with my existing systems?",
    answer: "Yes! DialFlow integrates seamlessly with popular CRM systems, helpdesk software, and business tools through our API and pre-built connectors.",
  },
  {
    question: "How much can I save with DialFlow?",
    answer: "Our customers typically see 60-80% cost reduction compared to traditional call centers, while improving response times and customer satisfaction.",
  },
]

export function FAQSection() {
  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
          Frequently Asked Questions
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Everything you need to know about DialFlow
        </p>
      </div>
      <div className="mx-auto max-w-[58rem] mt-12">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

