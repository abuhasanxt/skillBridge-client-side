"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "How do I book a tutor?",
    answer:
      "You can browse tutor profiles, check their availability, and click 'Book Session' to schedule a lesson.",
  },
  {
    question: "Can I get a refund if I cancel?",
    answer:
      "Yes, you can cancel at least 24 hours before the session to get a full refund.",
  },
  {
    question: "Are the lessons online or in-person?",
    answer:
      "All lessons are online via video calls, so you can learn from anywhere.",
  },
  {
    question: "How do I pay for a session?",
    answer:
      "Payments are handled securely through our platform using credit card or PayPal.",
  },
];

export default function FAQ() {
  return (
    <div className=" mx-auto p-6 space-y-4">
      <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible>
        {faqData.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}