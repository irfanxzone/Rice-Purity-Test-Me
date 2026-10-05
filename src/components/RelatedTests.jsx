import { getPage } from "@/lib/seo";
import relatedTests from "@/data/related-tests.json";

export default function RelatedTests({ slug }) {
  const links = relatedTests[slug];
  if (!links) throw new Error(`Missing related tests: ${slug}`);
  const spanish = slug === "rice-purity-test-in-spanish";
  return (
    <section data-testid="related-tests" aria-labelledby="related-tests-heading" className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
      <h2 id="related-tests-heading" className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
        {spanish ? "También te puede interesar" : "You may also like"}
      </h2>
      <p className="mt-4 text-[16px] leading-relaxed text-neutral-700">
        {spanish ? "Explora otras versiones y guías: " : "Explore related versions and guides: "}
        {links.map((target, index) => {
          const page = getPage(`/${target}`);
          return <span key={target}>{index > 0 && (index === links.length - 1 ? (spanish ? " y " : " and ") : ", ")}<a href={page.path} className="rpt-interlink">{page.title}</a></span>;
        })}.
      </p>
    </section>
  );
}
