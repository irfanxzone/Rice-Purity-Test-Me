import Link from "next/link";
import PageLayout from "@/components/PageLayout";

export const metadata = {
    title: "About Rice Purity Test",
    description:
        "A simple, anonymous, 100-question self-survey that has quietly traveled dorms, group chats, and social feeds for a century.",
    alternates: { canonical: "/about" },
};

const stats = [
    { label: "Questions", value: "100" },
    { label: "Sections", value: "4" },
    { label: "Time", value: "~5 min" },
    { label: "Cost", value: "Free" },
];

export default function About() {
    return (
        <PageLayout
            eyebrow="About the test"
            title="About Rice Purity Test"
            subtitle="A simple, anonymous, 100-question self-survey that has quietly traveled dorms, group chats, and social feeds for a century."
        >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((s) => (
                    <div
                        key={s.label}
                        className="rounded-2xl border border-ink-300/60 bg-cream-50 px-4 py-5 text-center"
                    >
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">
                            {s.label}
                        </p>
                        <p className="mt-2 text-2xl font-bold text-ink-900">
                            {s.value}
                        </p>
                    </div>
                ))}
            </div>

            <article className="mt-12 space-y-8 text-[15px] leading-relaxed text-ink-700 sm:text-base">
                <section>
                    <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
                        What is the Rice Purity Test?
                    </h2>
                    <p className="mt-3">
                        The Rice Purity Test is a lighthearted, 100-question
                        self-graded survey that first appeared at Rice
                        University. Each statement represents a life
                        experience — romance, relationships, parties,
                        substances, rites of passage, and everything in
                        between. You simply tick the ones you have done. Your
                        score is{" "}
                        <strong className="text-ink-900">
                            100 minus the items you checked
                        </strong>
                        , giving you a number between 0 and 100.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
                        A quick history
                    </h2>
                    <p className="mt-3">
                        The test has been circulating informally for nearly a
                        century, originally printed on paper and passed between
                        students during orientation week. Over the years it
                        became a fixture of college life, and in the social
                        media era it went viral on TikTok, Twitter, and
                        Instagram, where people share their scores as a playful
                        signal of how they&rsquo;ve lived so far.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
                        Why we built this version
                    </h2>
                    <p className="mt-3">
                        Most copies of the test on the web are slow, cluttered,
                        or filled with ads. We wanted a version that was fast,
                        beautifully typeset, respectful of your privacy, and
                        honest about what the test is: a conversation starter
                        among friends &mdash; nothing more, nothing less.
                    </p>
                    <ul className="mt-4 space-y-2">
                        <li className="flex gap-3">
                            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#FACC15]" />
                            <span>
                                <strong className="text-ink-900">
                                    Anonymous by design.
                                </strong>{" "}
                                Runs entirely in your browser. No accounts, no
                                cookies for scoring, nothing saved server-side.
                            </span>
                        </li>
                        <li className="flex gap-3">
                            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#FACC15]" />
                            <span>
                                <strong className="text-ink-900">
                                    Fast and light.
                                </strong>{" "}
                                Optimized for Core Web Vitals so the test loads
                                instantly on any device.
                            </span>
                        </li>
                        <li className="flex gap-3">
                            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#FACC15]" />
                            <span>
                                <strong className="text-ink-900">
                                    Honest tone.
                                </strong>{" "}
                                No judgement, no score ranking, no
                                &ldquo;better/worse.&rdquo; Just your own
                                reflection.
                            </span>
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
                        A note on the results
                    </h2>
                    <p className="mt-3">
                        Your score says nothing about your character, your
                        morality, or your worth. Everyone grows at a different
                        pace, and every life looks different. Take it as a
                        snapshot, not a verdict.
                    </p>
                </section>

                <div className="mt-10 rounded-2xl border border-ink-300/60 bg-cream-50 p-6 text-center">
                    <h3 className="text-xl font-bold text-ink-900">
                        Ready to find out your score?
                    </h3>
                    <p className="mt-2 text-sm text-ink-700">
                        Take the 100-question Rice Purity Test &mdash; free,
                        anonymous, and instant.
                    </p>
                    <Link
                        href="/#test"
                        data-testid="about-take-test"
                        className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#FACC15] px-6 py-3 text-sm font-bold text-ink-900 shadow-[0_2px_0_#1A1A14] ring-1 ring-ink-900 transition-transform hover:-translate-y-0.5"
                    >
                        Take the Test →
                    </Link>
                </div>
            </article>
        </PageLayout>
    );
}
