import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";

export const metadata = {
    title: "Blog — Rice Purity Test",
    description:
        "Guides, history, scoring explanations, and the occasional fun deep-dive on the Rice Purity Test.",
    alternates: { canonical: "/blog" },
};


export default function Blog() {
    const articles = [
        {
            title: "AO3 Rice Purity Test",
            desc: "A fun and interactive fandom purity score quiz for AO3 and fanfiction lovers.",
            href: "/ao3-rice-purity-test",
            tag: "Fanfic",
            read: "3 min read",
        },
        {
            title: "Valorant Rice Purity Test",
            desc: "A parody of the official rice purity test, but for Valorant players.",
            href: "/valorant-rice-purity-test",
            tag: "Gaming",
            read: "3 min read",
        },
    ];
    return (
        <PageLayout
            eyebrow="Blog"
            title="Words on the Rice Purity Test"
            subtitle="Guides, history, scoring explanations, and the occasional fun deep-dive. Read at your own pace."
            wide
        >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((p, i) => (
                    <Link href={p.href} key={i} data-testid={`blog-card-${i}`}>
                        <article
                            className="group flex flex-col rounded-2xl border border-ink-300/60 bg-cream-50 p-5 transition-all hover:-translate-y-1 hover:border-ink-900 hover:shadow-[0_12px_28px_-14px_rgba(26,26,20,0.25)]"
                        >
                            <div className="flex items-center justify-between">
                                <span className="inline-flex items-center rounded-full bg-[#FACC15]/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-900">
                                    {p.tag}
                                </span>
                                <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-500">
                                    <Clock className="h-3 w-3" />
                                    {p.read}
                                </span>
                            </div>
                            <h2 className="mt-5 text-lg font-bold leading-tight text-ink-900">
                                {p.title}
                            </h2>
                            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-700">
                                {p.desc}
                            </p>
                            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 group-hover:underline">
                                Read more <ArrowUpRight className="h-4 w-4" />
                            </span>
                        </article>
                    </Link>
                ))}
            </div>
        </PageLayout>
    );
}
