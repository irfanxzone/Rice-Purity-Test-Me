import { PAGES } from "@/lib/seo";

export default function AllTests() {
  const pages = PAGES.filter(page => page.type === "article" && !page.noindex);
  return (
    <section id="all-tests" data-testid="all-tests" aria-labelledby="all-tests-heading" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <h2 id="all-tests-heading" className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">All Rice Purity Test Versions</h2>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map(page => <a key={page.path} href={page.path} className="rounded-2xl border border-ink-300/60 bg-cream-50 p-5 text-base font-semibold leading-relaxed text-ink-900 transition-colors hover:border-ink-900 hover:bg-cream-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink-900">{page.title}</a>)}
      </div>
    </section>
  );
}
