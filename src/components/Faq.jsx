"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        q: "Is the Rice Purity Test suitable for a 14-year-old?",
        a: "Preferably not, but some students voluntarily take the test. Still certain questions are not associated with 14-years-old that is why it is recommended to not answer if you don’t feel comfortable.",
    },
    {
        q: "Is the Rice Purity Test accurate?",
        a: "It entirely depends on your answers. To be very precise, if you answer all questions accurately, it will give a proper score. In contrast, wrong answers result in inaccurate results.",
    },
    {
        q: "Why is it called the Rice Test?",
        a: "The name is given after Rice University, where it actually started. Therefore, it is known as the Rice Purity test.",
    },
];

export const Faq = () => {
    return (
        <section
            id="faq"
            data-testid="faq-section"
            className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        >
            <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                Frequently asked questions
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
                Quick answers about the Rice Purity Test.
            </p>

            <Accordion type="single" collapsible className="mt-8 w-full">
                {faqs.map((f, i) => (
                    <AccordionItem
                        key={i}
                        value={`item-${i}`}
                        data-testid={`faq-item-${i}`}
                        className="border-b border-neutral-200"
                    >
                        <AccordionTrigger
                            data-testid={`faq-trigger-${i}`}
                            className="text-left text-[15px] font-semibold text-neutral-900 hover:no-underline"
                        >
                            {f.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-[15px] leading-relaxed text-neutral-700">
                            {f.a}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
};

export default Faq;
