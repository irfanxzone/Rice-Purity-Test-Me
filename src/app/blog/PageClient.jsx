"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";

export default function Blog({ articles }) {
    const ARTICLES_PER_PAGE = 9;
    const [page, setPage] = useState(1);
    const pageCount = Math.ceil(articles.length / ARTICLES_PER_PAGE);
    return (
        <PageLayout
            eyebrow="Blog"
            title="Words on the Rice Purity Test"
            subtitle="Guides, history, scoring explanations, and the occasional fun deep-dive. Read at your own pace."
            wide
        >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((p, i) => (
                    <Link prefetch={false} hidden={Math.floor(i / ARTICLES_PER_PAGE) + 1 !== page} href={p.href} key={p.href} data-testid={`blog-card-${i}`}>
                        <article
                            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-300/60 bg-cream-50 transition-all hover:-translate-y-1 hover:border-ink-900 hover:shadow-[0_12px_28px_-14px_rgba(26,26,20,0.25)]"
                        >
                            {p.image && (
                                <img
                                    src={p.image}
                                    loading="lazy"
                                    decoding="async"
                                    alt={p.imageAlt}
                                    className="aspect-[16/9] w-full border-b border-ink-200 object-cover"
                                />
                            )}
                            <div className="flex flex-1 flex-col p-5">
                                {!p.image && (
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center rounded-full bg-[#FACC15]/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-900">
                                            {p.tag}
                                        </span>
                                        <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-500">
                                            <Clock className="h-3 w-3" />
                                            {p.read}
                                        </span>
                                    </div>
                                )}
                                <h2 className={`${p.image ? "" : "mt-5"} text-lg font-bold leading-tight text-ink-900`}>
                                    {p.title}
                                </h2>
                                {!p.image && (
                                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-700">
                                        {p.desc}
                                    </p>
                                )}
                                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 group-hover:underline">
                                    Read more <ArrowUpRight className="h-4 w-4" />
                                </span>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
            <div className="mt-8 flex items-center justify-center gap-3">
                {Array.from({ length: pageCount }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setPage(index + 1)}
                        className={`h-10 min-w-[40px] rounded-full border px-3 text-sm font-semibold transition ${
                            page === index + 1
                                ? "bg-ink-900 text-cream-50"
                                : "border-ink-300 bg-white text-ink-900 hover:border-ink-900"
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </PageLayout>
    );
}