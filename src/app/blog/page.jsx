"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";

export default function Blog() {
    const articles = [
        {
            title: "Updated BDSM Test",
            desc: "A 100-question adult self-assessment quiz about BDSM curiosity, boundaries, consent, and kink dynamics.",
            href: "/bdsm-test",
            tag: "Adult",
            read: "4 min read",
        },
        {
            title: "Fortnite Rice Purity Test",
            desc: "A 100-question Fortnite purity quiz about gameplay habits, skins, emotes, and competitive moments.",
            href: "/fortnite-rice-purity-test",
            tag: "Gaming",
            read: "4 min read",
        },
        {
            title: "Rice Purity Test for Girls",
            desc: "A gender-specific 100-question purity quiz reflecting girls' life, school, style, and social experiences.",
            href: "/rice-purity-test-for-girls",
            tag: "Guide",
            read: "4 min read",
        },
        {
            title: "Performative Rice Purity Test",
            desc: "A modern purity-style quiz about aesthetic habits, social trends, and online performance.",
            href: "/performative-rice-purity-test",
            tag: "Trending",
            read: "4 min read",
        },
        {
            title: "Rice Purity Test for Teens",
            desc: "A safe, age-specific 100-question purity test for teens focused on everyday life experiences.",
            href: "/rice-purity-test-for-teens",
            tag: "Teens",
            read: "4 min read",
        },
        {
            title: "76 Rice Purity Test",
            desc: "Learn what a Rice Purity Test score of 76 means and where it sits on the purity scale.",
            href: "/76-rice-purity-test",
            tag: "Guide",
            read: "2 min read",
        },
        {
            title: "Kink Rice Purity Test",
            desc: "A personal, age-specific 100-question test exploring preferences, boundaries, and consent.",
            href: "/kink-rice-purity-test",
            tag: "Adult",
            read: "3 min read",
        },
        {
            title: "Weighted Rice Purity Test",
            desc: "A more realistic 100-question purity quiz with weighted scoring for different experiences.",
            href: "/weighted-rice-purity-test",
            tag: "Scoring",
            read: "3 min read",
        },
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
        {
            title: "Overwatch Rice Purity Test",
            desc: "Check your Overwatch habits and community personality with this 100-question gaming quiz.",
            href: "/overwatch-rice-purity-test",
            tag: "Gaming",
            read: "3 min read",
        },
        {
            title: "Rice Purity Test for 14 Years Old",
            desc: "A safe, relatable purity test for teens with 20 questions tailored to 14-year-olds.",
            href: "/rice-purity-test-for-14-years-old",
            tag: "Teens",
            read: "2 min read",
        },
        {
            title: "Racism Rice Purity Test",
            desc: "Check your racial bias and self-awareness with this 100-question anonymous test.",
            href: "/racism-rice-purity-test",
            tag: "Awareness",
            read: "4 min read",
        },
        {
            title: "7 Tests Like the Rice Purity Test in 2026",
            desc: "Discover the most popular alternatives to the Rice Purity Test and what makes them unique.",
            href: "/tests-like-rice-purity-test",
            tag: "Trending",
            read: "3 min read",
        },
        {
            title: "MPS Meaning Rice Purity Test",
            desc: "Learn what MPS means in the Rice Purity Test and how to answer related questions honestly.",
            href: "/mps-meaning-rice-purity-test",
            tag: "Guide",
            read: "2 min read",
        },
        {
            title: "Brown Rice Purity Test",
            desc: "A playful food-themed quiz that gives the Rice Purity Test a funny brown rice twist.",
            href: "/brown-rice-purity-test",
            tag: "Food",
            read: "3 min read",
        },
    ];
    const ARTICLES_PER_PAGE = 9;
    const [page, setPage] = useState(1);
    const pageCount = Math.ceil(articles.length / ARTICLES_PER_PAGE);
    const visibleArticles = articles.slice((page - 1) * ARTICLES_PER_PAGE, page * ARTICLES_PER_PAGE);
    return (
        <PageLayout
            eyebrow="Blog"
            title="Words on the Rice Purity Test"
            subtitle="Guides, history, scoring explanations, and the occasional fun deep-dive. Read at your own pace."
            wide
        >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visibleArticles.map((p, i) => (
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
