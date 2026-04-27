import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";

export const metadata = {
    title: "Blog — Rice Purity Test",
    description:
        "Guides, history, scoring explanations, and the occasional fun deep-dive on the Rice Purity Test.",
    alternates: { canonical: "/blog" },
};

const posts = [
    {
        title: "What is a Good Rice Purity Test Score?",
        desc: "Breaking down the 0–100 ranges and why there’s no objectively ‘good’ number.",
        read: "4 min read",
        tag: "Guide",
    },
    {
        title: "The Surprising History of the Rice Purity Test",
        desc: "From paper handouts at orientation week to a TikTok phenomenon — a century of context.",
        read: "6 min read",
        tag: "History",
    },
    {
        title: "Rice Purity Test Averages by Country",
        desc: "How scores vary around the world — and why those differences matter less than you think.",
        read: "5 min read",
        tag: "Data",
    },
    {
        title: "Is the Rice Purity Test Accurate?",
        desc: "Short answer: no. Long answer: it depends on what you mean by accurate.",
        read: "3 min read",
        tag: "FAQ",
    },
    {
        title: "Rice Purity Test for Teens (14+)",
        desc: "How parents and teens can approach the test thoughtfully and respectfully.",
        read: "4 min read",
        tag: "Parents",
    },
    {
        title: "Sharing Your Score: Etiquette and Ideas",
        desc: "Fun ways to share your score — and moments when it’s better to keep it private.",
        read: "3 min read",
        tag: "Social",
    },
];

export default function Blog() {
    return (
        <PageLayout
            eyebrow="Blog"
            title="Words on the Rice Purity Test"
            subtitle="Guides, history, scoring explanations, and the occasional fun deep-dive. Read at your own pace."
            wide
        >
            {/* <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((p, i) => (
                    <article
                        key={i}
                        data-testid={`blog-card-${i}`}
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
                        <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-900">
                            Read soon
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                    </article>
                ))}
            </div> */}

            <div className="mt-14 rounded-2xl border border-ink-300/60 bg-cream-50 p-6 text-center sm:p-8">
                <h3 className="text-xl font-bold text-ink-900 sm:text-2xl">
                    Articles coming soon
                </h3>
                <p className="mx-auto mt-2 max-w-xl text-sm text-ink-700">
                    We’re writing each of these carefully. In the meantime, the
                    FAQ and the test itself are fully live.
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                    <Link
                        href="/#test"
                        className="inline-flex items-center gap-2 rounded-full bg-[#FACC15] px-5 py-2.5 text-sm font-bold text-ink-900 shadow-[0_2px_0_#1A1A14] ring-1 ring-ink-900 transition-transform hover:-translate-y-0.5"
                    >
                        Take the Test →
                    </Link>
                    <Link
                        href="/about"
                        className="inline-flex items-center gap-2 rounded-full border border-ink-900 bg-cream-50 px-5 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:bg-cream-200"
                    >
                        Read About
                    </Link>
                </div>
            </div>
        </PageLayout>
    );
}
