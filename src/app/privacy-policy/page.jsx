import PageLayout from "@/components/PageLayout";

export const metadata = {
    title: "Privacy Policy",
    description:
        "What we collect, what we don't, and how we treat the information you share with us.",
    alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicy() {
    const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return (
        <PageLayout
            eyebrow="Legal"
            title="Privacy Policy"
            subtitle="What we collect, what we don't, and how we treat the information you share with us."
        >
            <article className="space-y-8 text-[15px] leading-relaxed text-ink-700 sm:text-base">
                <section className="rounded-2xl border border-ink-300/60 bg-cream-50 p-6">
                    <h2 className="text-xl font-bold text-ink-900">
                        The short version
                    </h2>
                    <ul className="mt-3 space-y-2">
                        <li className="flex gap-3">
                            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#FACC15]" />
                            <span>
                                The Rice Purity Test runs in your browser. Your
                                answers and score are never sent to our
                                servers.
                            </span>
                        </li>
                        <li className="flex gap-3">
                            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#FACC15]" />
                            <span>
                                We do not sell or share personal data. We do
                                not build ad profiles about you.
                            </span>
                        </li>
                        <li className="flex gap-3">
                            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#FACC15]" />
                            <span>
                                We use minimal, privacy-respecting analytics
                                to understand aggregate traffic.
                            </span>
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
                        Information we collect
                    </h2>
                    <p className="mt-3">
                        We collect only the information necessary to operate
                        the site and improve it over time:
                    </p>
                    <ul className="mt-3 list-disc space-y-2 pl-5">
                        <li>
                            <strong className="text-ink-900">Test data:</strong>{" "}
                            your answers stay in your browser. Nothing is
                            transmitted to us.
                        </li>
                        <li>
                            <strong className="text-ink-900">
                                Aggregate analytics:
                            </strong>{" "}
                            anonymous visit counts, referring sites, pages
                            visited, and device type.
                        </li>
                        <li>
                            <strong className="text-ink-900">
                                Contact form submissions:
                            </strong>{" "}
                            if you send us a message, we keep the email and
                            message only to respond.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
                        How we use information
                    </h2>
                    <p className="mt-3">We use the data above to:</p>
                    <ul className="mt-3 list-disc space-y-2 pl-5">
                        <li>Operate, maintain, and improve the website.</li>
                        <li>Respond to your messages and support requests.</li>
                        <li>
                            Understand aggregate usage patterns (not tied to
                            individuals).
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
                        Cookies
                    </h2>
                    <p className="mt-3">
                        We may use a minimal set of cookies or local-storage
                        keys to remember light UI preferences. We do not use
                        tracking cookies across other sites.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
                        Your rights
                    </h2>
                    <p className="mt-3">
                        You may request deletion of any contact-form message
                        you have sent us by emailing{" "}
                        <a
                            href="mailto:privacy@ricepuritytestme.com"
                            className="font-semibold text-ink-900 underline decoration-[#FACC15] decoration-2 underline-offset-4"
                        >
                            privacy@ricepuritytestme.com
                        </a>
                        .
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
                        Children
                    </h2>
                    <p className="mt-3">
                        This site is intended for a general audience. If you
                        are under 13, please do not send us personal
                        information.
                    </p>
                </section>

                <p className="text-xs text-ink-500">Last updated: {today}</p>
            </article>
        </PageLayout>
    );
}
