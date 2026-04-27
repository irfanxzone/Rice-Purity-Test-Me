import PageLayout from "@/components/PageLayout";

export const metadata = {
    title: "Terms & Conditions",
    description: "The simple ground rules for using Rice Purity Test.",
    alternates: { canonical: "/terms-and-conditions" },
};

export default function Terms() {
    const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return (
        <PageLayout
            eyebrow="Legal"
            title="Terms & Conditions"
            subtitle="The simple ground rules for using Rice Purity Test."
        >
            <article className="space-y-8 text-[15px] leading-relaxed text-ink-700 sm:text-base">
                <section className="rounded-2xl border border-ink-300/60 bg-cream-50 p-6">
                    <h2 className="text-xl font-bold text-ink-900">
                        For entertainment only
                    </h2>
                    <p className="mt-3">
                        Rice Purity Test is a fun, informal survey. It is not
                        a scientific measurement and should not be used as one.
                        Your score does not describe you as a person.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
                        Acceptance of terms
                    </h2>
                    <p className="mt-3">
                        By using this website, you agree to these terms. If
                        you do not agree, please do not use the site.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
                        Permitted use
                    </h2>
                    <ul className="mt-3 list-disc space-y-2 pl-5">
                        <li>
                            You may take the test, share your score, and tell
                            your friends.
                        </li>
                        <li>You may link to pages on the site.</li>
                        <li>
                            You may quote short excerpts of our content with
                            proper attribution.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
                        Prohibited use
                    </h2>
                    <ul className="mt-3 list-disc space-y-2 pl-5">
                        <li>
                            No scraping, bulk downloading, or attempting to
                            disrupt the service.
                        </li>
                        <li>
                            No republishing our original content without
                            permission.
                        </li>
                        <li>
                            No using the site to harass or pressure anyone.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
                        No affiliation with Rice University
                    </h2>
                    <p className="mt-3">
                        Rice Purity Test is not affiliated with, endorsed by,
                        or connected to Rice University. The name refers to
                        the well-known informal survey that originated there.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
                        Disclaimer
                    </h2>
                    <p className="mt-3">
                        The site is provided &ldquo;as is&rdquo; without
                        warranties of any kind. We do not guarantee
                        availability, accuracy, or fitness for any particular
                        purpose.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
                        Changes to these terms
                    </h2>
                    <p className="mt-3">
                        We may update these terms from time to time. The
                        latest version will always be posted on this page.
                    </p>
                </section>

                <p className="text-xs text-ink-500">Last updated: {today}</p>
            </article>
        </PageLayout>
    );
}
