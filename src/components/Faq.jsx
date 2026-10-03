import { HOME_FAQ } from "@/data/home-faq";

export default function Faq({ items = HOME_FAQ }) {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }).replace(/</g, "\\u003c") }} />
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
      <div className="mt-8 w-full divide-y divide-ink-900/20">
        {items.map((f, i) => (
          <details key={f.q} data-testid={`faq-item-${i}`} className="group py-4">
            <summary
              data-testid={`faq-trigger-${i}`}
              className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-[15px] font-semibold text-neutral-900 [&::-webkit-details-marker]:hidden"
            >
              <span>{f.q}</span>
              <span aria-hidden="true" className="text-lg transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-[15px] leading-relaxed text-neutral-700">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
    </>
  );
}
