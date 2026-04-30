"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

const MORE_TESTS = [
    { label: "A03 Rice Purity Test", to: "/ao3-rice-purity-test" },
    { label: "Valorant Rice Purity Test", to: "/valorant-rice-purity-test" },
];

const ABOUT_ITEMS = [
    { label: "About Us", to: "/about" },
    { label: "Contact Us", to: "/contact" },
    { label: "DMCA", to: "/dmca" },
    { label: "Privacy Policy", to: "/privacy-policy" },
];

const Dropdown = ({ label, items, testid }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const closeTimer = useRef(null);

    const cancelClose = () => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
    };

    const openNow = () => {
        cancelClose();
        setOpen(true);
    };

    const scheduleClose = () => {
        cancelClose();
        closeTimer.current = setTimeout(() => setOpen(false), 180);
    };

    useEffect(() => {
        const close = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", close);
        return () => {
            document.removeEventListener("mousedown", close);
            cancelClose();
        };
    }, []);

    return (
        <div
            ref={ref}
            className="relative"
            onMouseEnter={openNow}
            onMouseLeave={scheduleClose}
        >
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                data-testid={`nav-dropdown-${testid}`}
                className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-900/5 hover:text-ink-900"
            >
                {label}
                <ChevronDown
                    className={
                        "h-3.5 w-3.5 transition-transform " +
                        (open ? "rotate-180" : "")
                    }
                />
            </button>
            {open && (
                <div
                    data-testid={`dropdown-${testid}`}
                    onMouseEnter={openNow}
                    onMouseLeave={scheduleClose}
                    className="absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-2"
                >
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-2"
                    />
                    <div className="relative rounded-2xl border border-ink-300/60 bg-cream-50 p-2 shadow-[0_12px_40px_-12px_rgba(26,26,20,0.2)]">
                        <div className="pointer-events-none absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-ink-300/60 bg-cream-50" />
                        {items.map((it) =>
                            it.to.startsWith("#") ? (
                                <div
                                    key={it.label}
                                    data-testid={`dd-item-${it.label.toLowerCase().replace(/\s/g, "-")}`}
                                    className="flex cursor-not-allowed items-center justify-between rounded-xl px-3 py-2.5 text-sm text-ink-500"
                                    title={it.note || "Coming soon"}
                                >
                                    <span>{it.label}</span>
                                    {it.note && (
                                        <span className="rounded-full bg-[#FACC15]/30 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-ink-700">
                                            {it.note}
                                        </span>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    key={it.label}
                                    href={it.to}
                                    onClick={() => setOpen(false)}
                                    data-testid={`dd-item-${it.label.toLowerCase().replace(/\s/g, "-")}`}
                                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-[#FACC15]/30 hover:text-ink-900"
                                >
                                    <span>{it.label}</span>
                                    <span aria-hidden="true" className="text-ink-300">
                                        →
                                    </span>
                                </Link>
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default function Header() {
    const [mobile, setMobile] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === "/";
    const takeTestHref = isHome ? "#test" : "/#test";

    return (
        <header
            data-testid="site-header"
            className="sticky top-0 z-40 w-full px-3 pt-3 sm:px-5 sm:pt-5"
        >
            <div className="mx-auto max-w-6xl">
                <div className="rpt-header-shell relative">
                    <div className="rpt-header-glow" aria-hidden="true" />

                    <div className="relative z-10 flex h-16 items-center justify-between px-4 sm:h-[68px] sm:px-6">
                        <Link
                            href="/"
                            data-testid="site-logo"
                            className="flex items-center gap-2.5"
                        >
                            <span
                                aria-hidden="true"
                                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-900 bg-[#FACC15] shadow-[0_2px_0_#1A1A14]"
                            >
                                <span className="text-sm font-extrabold text-ink-900">
                                    R
                                </span>
                            </span>
                            <span className="flex flex-col leading-none">
                                <span className="text-[15px] font-bold tracking-tight text-ink-900 sm:text-[17px]">
                                    Rice Purity Test
                                </span>
                                <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-ink-500">
                                    Official
                                </span>
                            </span>
                        </Link>

                        <nav className="hidden items-center gap-1 md:flex">
                            <Link
                                href="/"
                                data-testid="nav-home"
                                className={
                                    "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-ink-900/5 hover:text-ink-900 " +
                                    (pathname === "/" ? "text-ink-900" : "text-ink-700")
                                }
                            >
                                Home
                            </Link>
                            <Dropdown
                                label="More Tests"
                                items={MORE_TESTS}
                                testid="more-tests"
                            />
                            <Dropdown
                                label="About"
                                items={ABOUT_ITEMS}
                                testid="about"
                            />
                            <Link
                                href="/blog"
                                data-testid="nav-blog"
                                className={
                                    "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-ink-900/5 hover:text-ink-900 " +
                                    (pathname === "/blog" ? "text-ink-900" : "text-ink-700")
                                }
                            >
                                Blog
                            </Link>

                            <a
                                href={takeTestHref}
                                data-testid="header-take-test"
                                className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-5 py-2 text-sm font-semibold text-cream-50 shadow-[0_2px_0_#000] transition-transform hover:-translate-y-0.5 active:translate-y-0"
                            >
                                Take Test
                                <span aria-hidden="true">→</span>
                            </a>
                        </nav>

                        <button
                            type="button"
                            onClick={() => setMobile((v) => !v)}
                            data-testid="mobile-menu-toggle"
                            aria-label="Toggle menu"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-300 bg-cream-50 text-ink-900 md:hidden"
                        >
                            {mobile ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </button>
                    </div>
                </div>

                {mobile && (
                    <div
                        data-testid="mobile-nav"
                        className="mt-2 rounded-2xl border border-ink-300/60 bg-cream-50 p-3 shadow-lg md:hidden"
                    >
                        <Link
                            href="/"
                            onClick={() => setMobile(false)}
                            className="block rounded-xl px-4 py-3 text-sm font-medium text-ink-700 hover:bg-[#FACC15]/30"
                        >
                            Home
                        </Link>

                        <div className="mt-1">
                            <p className="px-4 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
                                More Tests
                            </p>
                            {MORE_TESTS.map((t) => (
                                <div
                                    key={t.label}
                                    className="flex items-center justify-between px-4 py-2 text-sm text-ink-500"
                                >
                                    <span>{t.label}</span>
                                    <span className="rounded-full bg-[#FACC15]/30 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-ink-700">
                                        Soon
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-1">
                            <p className="px-4 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
                                About
                            </p>
                            {ABOUT_ITEMS.map((it) => (
                                <Link
                                    key={it.label}
                                    href={it.to}
                                    onClick={() => setMobile(false)}
                                    className="block rounded-xl px-4 py-2.5 text-sm font-medium text-ink-700 hover:bg-[#FACC15]/30"
                                >
                                    {it.label}
                                </Link>
                            ))}
                        </div>

                        <Link
                            href="/blog"
                            onClick={() => setMobile(false)}
                            className="mt-1 block rounded-xl px-4 py-3 text-sm font-medium text-ink-700 hover:bg-[#FACC15]/30"
                        >
                            Blog
                        </Link>

                        <a
                            href={takeTestHref}
                            onClick={() => setMobile(false)}
                            className="mt-2 block rounded-xl bg-ink-900 px-4 py-3 text-center text-sm font-semibold text-cream-50"
                        >
                            Take Test →
                        </a>
                    </div>
                )}
            </div>
        </header>
    );
}
