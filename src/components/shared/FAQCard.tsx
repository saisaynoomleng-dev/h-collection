'use client';

import { FAQCardProps } from '@/types/types';
import clsx from 'clsx';
import SectionSubtitle from './SectionSubtitle';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const FAQCard = ({ className, faqs }: FAQCardProps) => {
  const [currentFaq, setCurrentFaq] = useState<string>(
    faqs[0]?.slug || 'general-information-faqs',
  );

  const activeCategory = faqs.find((f) => f.slug === currentFaq);
  const questions = activeCategory?.faqs || [];

  return (
    <div className={clsx('', className)}>
      <div className="grid md:grid-cols-[1fr_3fr] gap-x-5 gap-y-5">
        {/* sidebar nav */}
        <div className="flex gap-x-2 flex-wrap items-center justify-center gap-y-2 md:flex-col md:justify-start md:items-stretch md:sticky md:top-2 md:h-fit">
          {faqs.map((f) => (
            <Button
              variant="faq"
              key={f.slug}
              className={clsx(
                '',
                currentFaq === f.slug && 'bg-brand-pink font-semibold',
              )}
              onClick={() => setCurrentFaq(f.slug as string)}
            >
              {f.name}
            </Button>
          ))}
        </div>

        {/* content area */}
        <div className="flex flex-col border-brand-black/20 max-md:pt-5 md:pl-5 md:border-l gap-y-5">
          <SectionSubtitle as="h3">{activeCategory?.name}</SectionSubtitle>
          <Accordion type="single" collapsible className="space-y-2">
            {questions.map((f, i) => (
              <AccordionItem
                key={`${currentFaq}-${i}`}
                value={`item-${currentFaq}-${i}`}
              >
                <AccordionTrigger>{f.question}</AccordionTrigger>
                <AccordionContent>{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQCard;
