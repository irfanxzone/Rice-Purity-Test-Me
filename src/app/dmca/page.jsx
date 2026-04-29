import PageLayout from "@/components/PageLayout";

export const metadata = {
    title: "DMCA Policy",
    description:
        "How to file a copyright takedown notice or counter-notice under the Digital Millennium Copyright Act.",
    alternates: { canonical: "/dmca" },
};

export default function Dmca() {
    const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return (
        <PageLayout
            eyebrow="Legal"
            title="DMCA Policy"
            subtitle="We respect the intellectual property rights of others. Here is how to file a takedown notice or counter-notice."
        >
            <article className="space-y-8 text-[15px] leading-relaxed text-ink-700 sm:text-base">
                <section className="rounded-2xl border border-ink-300/60 bg-cream-50 p-6">
                    <h2 className="text-xl font-bold text-ink-900">
                        Reporting infringement
                    </h2>
                    <p className="mt-3">
                        If you believe that content on Rice Purity Test
                        infringes your copyright, please send a written notice
                        of alleged infringement to our designated agent at{" "}
                        <a
                            href="mailto:ricepuritytestme@gmail.com"
                            className="font-semibold text-ink-900 underline decoration-[#FACC15] decoration-2 underline-offset-4"
                        >
                            ricepuritytestme@gmail.com
                        </a>
                        .
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
                        What to include in a notice
                    </h2>
                    <p className="mt-3">
                        To be effective under the Digital Millennium Copyright
                        Act (17 U.S.C. §512(c)(3)), your notice must include:
                    </p>
                    <ol className="mt-4 list-decimal space-y-2 pl-5">
                        <li>
                            A physical or electronic signature of the person
                            authorized to act on behalf of the owner of the
                            exclusive right that is allegedly infringed.
                        </li>
                        <li>
                            Identification of the copyrighted work claimed to
                            have been infringed.
                        </li>
                        <li>
                            Identification of the material that is claimed to
                            be infringing, with information reasonably
                            sufficient to permit us to locate the material
                            (e.g., a URL).
                        </li>
                        <li>
                            Information reasonably sufficient to permit us to
                            contact you — address, telephone number, and email.
                        </li>
                        <li>
                            A statement that you have a good-faith belief that
                            use of the material in the manner complained of is
                            not authorized by the copyright owner, its agent,
                            or the law.
                        </li>
                        <li>
                            A statement, under penalty of perjury, that the
                            information in the notice is accurate and that you
                            are authorized to act on behalf of the owner.
                        </li>
                    </ol>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
                        Counter-notice
                    </h2>
                    <p className="mt-3">
                        If you believe your content was removed by mistake or
                        misidentification, you may submit a counter-notice with
                        the items required under 17 U.S.C. §512(g)(3).
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
                        Repeat infringers
                    </h2>
                    <p className="mt-3">
                        It is our policy to terminate, in appropriate
                        circumstances, the access of users who are repeat
                        infringers.
                    </p>
                </section>

                <p className="text-xs text-ink-500">Last updated: {today}</p>
            </article>
        </PageLayout>
    );
}
