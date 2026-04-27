"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";

const PAGES = [
    { label: "About Us", to: "/about" },
    { label: "Blog", to: "/blog" },
    { label: "DMCA", to: "/dmca" },
    { label: "Privacy Policy", to: "/privacy-policy" },
    { label: "Terms & Conditions", to: "/terms-and-conditions" },
];

const SOCIALS = [
    {
        key: "twitter",
        label: "X / Twitter",
        href: "https://twitter.com/intent/tweet?text=Take%20the%20Rice%20Purity%20Test",
        svg: (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        key: "facebook",
        label: "Facebook",
        href: "https://www.facebook.com/sharer/sharer.php?u=",
        svg: (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.6V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.3H7.5V13h2.7v8h3.3z" />
            </svg>
        ),
    },
    {
        key: "instagram",
        label: "Instagram",
        href: "https://instagram.com",
        svg: (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.3.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.5.4 1.1.4 2.3.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.3-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.5.2-1.1.4-2.3.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.3-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.5-.4-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.3.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.5-.2 1.1-.4 2.3-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.5-1.2.8-.3.3-.6.7-.8 1.2-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.5.9.8 1.2.3.3.7.6 1.2.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.5 1.2-.8.3-.3.6-.7.8-1.2.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.5-.9-.8-1.2-.3-.3-.7-.6-1.2-.8-.4-.2-1-.3-2.1-.4C15.5 4 15.1 4 12 4zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4zm5.2-2.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
            </svg>
        ),
    },
];

export default function Footer() {
    const scrollTop = () => {
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <footer
            data-testid="site-footer"
            className="mt-16 bg-[#1A1A14] text-cream-100"
        >
            <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
                    {/* Brand */}
                    <div className="md:col-span-5">
                        <Link href="/" className="flex items-center gap-3">
                            <span
                                aria-hidden="true"
                                className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-cream-100/30 bg-[#FACC15] shadow-[0_2px_0_#000]"
                            >
                                <span className="text-lg font-extrabold text-ink-900">
                                    R
                                </span>
                            </span>
                            <div className="leading-tight">
                                <p className="text-lg font-bold text-cream-50">
                                    Rice Purity Test
                                </p>
                                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-400/80">
                                    Official · 100 items
                                </p>
                            </div>
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-100/75">
                            <span className="font-semibold text-[#FACC15]">
                                RicePurityTest
                            </span>{" "}
                            is a simple, anonymous, 100-question purity score
                            test. Free forever. Runs entirely in your browser —
                            nothing saved, nothing tracked, nothing shared.
                        </p>

                        <Link
                            href="/#test"
                            data-testid="footer-cta"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#FACC15] px-5 py-2.5 text-sm font-semibold text-ink-900 shadow-[0_2px_0_#000] transition-transform hover:-translate-y-0.5"
                        >
                            Take the test
                            <span aria-hidden="true">→</span>
                        </Link>
                    </div>

                    {/* Pages */}
                    <div className="md:col-span-3">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FACC15]">
                            Pages
                        </h4>
                        <ul className="mt-5 space-y-3">
                            {PAGES.map((p) => (
                                <li key={p.label}>
                                    <Link
                                        href={p.to}
                                        data-testid={`footer-link-${p.label.toLowerCase().replace(/[\s&]+/g, "-")}`}
                                        className="text-sm text-cream-100/80 transition-colors hover:text-[#FACC15]"
                                    >
                                        {p.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials */}
                    <div className="md:col-span-4">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FACC15]">
                            Follow
                        </h4>

                        <div className="mt-5 flex flex-wrap gap-2.5">
                            {SOCIALS.map((s) => (
                                <a
                                    key={s.key}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-testid={`footer-social-${s.key}`}
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#FACC15] px-3.5 py-2.5 text-xs font-semibold text-ink-900 shadow-[0_2px_0_#000] transition-transform hover:-translate-y-0.5"
                                >
                                    {s.svg}
                                    <span>{s.label}</span>
                                </a>
                            ))}
                        </div>

                        <p className="mt-6 text-xs leading-relaxed text-cream-100/60">
                            Not affiliated with Rice University. For
                            entertainment purposes only. If content distresses
                            you, please speak with a trusted person or
                            professional.
                        </p>
                    </div>
                </div>
            </div>

            <div className="border-t border-cream-100/10 bg-black/50">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream-100/60">
                        © {new Date().getFullYear()} RicePurityTest · All Rights Reserved
                    </p>
                    <div className="flex items-center gap-5">
                        <Link
                            href="/privacy-policy"
                            className="font-mono text-[11px] uppercase tracking-[0.15em] text-cream-100/60 transition-colors hover:text-[#FACC15]"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="/terms-and-conditions"
                            className="font-mono text-[11px] uppercase tracking-[0.15em] text-cream-100/60 transition-colors hover:text-[#FACC15]"
                        >
                            Terms
                        </Link>
                        <button
                            type="button"
                            onClick={scrollTop}
                            data-testid="footer-back-to-top"
                            aria-label="Back to top"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream-100/20 bg-cream-100/5 text-[#FACC15] transition-colors hover:bg-[#FACC15] hover:text-ink-900"
                        >
                            <ArrowUp className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
