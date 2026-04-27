import PageLayout from "@/components/PageLayout";
import ContactForm from "@/components/ContactForm";
import { Mail, MapPin, Clock } from "lucide-react";

export const metadata = {
    title: "Contact Us",
    description:
        "Found a bug, spotted a typo, want to partner, or just feel like saying hello? Drop us a line.",
    alternates: { canonical: "/contact" },
};

export default function Contact() {
    return (
        <PageLayout
            eyebrow="Get in touch"
            title="Contact Us"
            subtitle="Found a bug, spotted a typo, want to partner, or just feel like saying hello? Drop us a line — we read every message."
            wide
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
                {/* Info column */}
                <aside className="space-y-4 lg:col-span-4">
                    <div className="rounded-2xl border border-ink-300/60 bg-cream-50 p-5">
                        <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FACC15] text-ink-900">
                                <Mail className="h-4 w-4" />
                            </span>
                            <div>
                                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
                                    Email
                                </p>
                                <a
                                    href="mailto:ricepurtytest@gmail.com"
                                    className="text-sm font-semibold text-ink-900 hover:text-[#CA8A04]"
                                >
                                    hello@ricepuritytestme.com
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-ink-300/60 bg-cream-50 p-5">
                        <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FACC15] text-ink-900">
                                <Clock className="h-4 w-4" />
                            </span>
                            <div>
                                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
                                    Response
                                </p>
                                <p className="text-sm font-semibold text-ink-900">
                                    Within 24–48 hours
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-ink-300/60 bg-cream-50 p-5">
                        <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FACC15] text-ink-900">
                                <MapPin className="h-4 w-4" />
                            </span>
                            <div>
                                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
                                    Remote team
                                </p>
                                <p className="text-sm font-semibold text-ink-900">
                                    Worldwide · Async-first
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-ink-900 p-5 text-cream-100">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FACC15]">
                            Tip
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-cream-100/85">
                            If you are reporting an issue, please include the
                            page URL and a screenshot. It helps us fix things
                            faster.
                        </p>
                    </div>
                </aside>

                <ContactForm />
            </div>
        </PageLayout>
    );
}
