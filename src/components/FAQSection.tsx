import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';

const faqData = [
  {
    question: "What is your service/product?",
    answer: "We provide a range of affordable housing solutions across Canada. This includes new modular builds, conventional construction, and creative retrofits. Our specific projects range from apartments for low-income families and micro-suites in inner cities to modular villages for rural and remote communities."
  },
  {
    question: "How do I get started?",
    answer: "Getting started is simple. First, explore our services to see how we can help. Then, contact us to schedule a no-cost pre-development appointment via phone or Zoom. Our team will be happy to discuss your project needs and provide guidance for your nonprofit or municipality."
  },
  {
    question: "How do you support my project?",
    answer: "We partner with municipalities, nonprofits, and Indigenous communities from start to finish. We offer development services, help with financing, and apply insights from systems theory to ensure your project strengthens the social, cultural, and economic fabric of your community."
  },
  {
    question: "Do you offer free pre-development consulting and advice?",
    answer: "Yes, we do! Anhart offers a no-cost, pre-development phone or Zoom appointment for nonprofits and municipalities. We can help with initial project assessments, feasibility studies, and guidance on financing to get your project off the ground."
  },
  {
    question: "How does Anhart get paid?",
    answer: "At Anhart, we help you build affordable homes, which are much needed for strong communities. Our focus is on creating sustainable, accessible housing that benefits everyone. After all project costs are covered and everyone is paid, we take a modest 3% development fee."
  }
];

export const FAQSection: React.FC = () => {
  return (
    <section className="w-full py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <ScrollAnimationWrapper direction="top">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper direction="top" delay={100}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our affordable housing development services
            </p>
          </ScrollAnimationWrapper>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-2">
            {faqData.map((faq, index) => (
              <ScrollAnimationWrapper key={index} direction="bottom" delay={200 + index * 50}>
              <AccordionItem 
                value={`item-${index}`}
                className="border border-border rounded-lg bg-card hover:bg-accent/5 transition-colors duration-200"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline text-left font-semibold text-foreground [&>svg]:bg-primary [&>svg]:text-white [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:w-6 [&>svg]:h-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
              </ScrollAnimationWrapper>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};