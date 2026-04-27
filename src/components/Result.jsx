"use client";

import { useRef } from "react";
import { Link2, Printer, Share2 } from "lucide-react";
import { toast } from "sonner";
import HandCheck from "./HandCheck";

const interpretations = [
    {
        min: 97,
        max: 100,
        label: "Pure as Snow",
        text: "Very few life experiences checked off. You are as pure as it gets — innocence in its finest form.",
    },
    {
        min: 85,
        max: 96,
        label: "Mostly Pure",
        text: "A few experiences but still firmly on the innocent side. You have kept things fairly tame so far.",
    },
    {
        min: 55,
        max: 84,
        label: "Average",
        text: "A healthy mix of experiences. You have lived a balanced life — neither too wild nor too reserved.",
    },
    {
        min: 25,
        max: 54,
        label: "Experienced",
        text: "You have lived a full and varied life. You have clearly done a lot and collected plenty of stories.",
    },
    {
        min: 0,
        max: 24,
        label: "Very Experienced",
        text: "You have done most of what there is to do. A life lived out loud — no regrets, plenty of tales.",
    },
];

const getInterpretation = (score) =>
    interpretations.find((r) => score >= r.min && score <= r.max) ||
    interpretations[2];

const formattedDate = () => {
    const d = new Date();
    return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });
};

export const Result = ({ score, onRetake }) => {
    const { label, text } = getInterpretation(score);
    const certificateRef = useRef(null);

    const shareText = `I scored ${score}/100 on the Rice Purity Test (${label}). Take it yourself:`;
    const shareUrl =
        typeof window !== "undefined" ? window.location.origin : "";

    const handlePrint = () => {
        if (typeof window === "undefined") return;
        document.body.classList.add("rpt-printing");
        window.setTimeout(() => {
            window.print();
            window.setTimeout(() => {
                document.body.classList.remove("rpt-printing");
            }, 300);
        }, 80);
    };

    const shareTwitter = () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
        )}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const shareWhatsApp = () => {
        const url = `https://wa.me/?text=${encodeURIComponent(
            shareText + " " + shareUrl
        )}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
            toast.success("Score + link copied! Paste anywhere.");
        } catch {
            toast.error("Could not copy link");
        }
    };

    const shareNative = async () => {
        if (typeof navigator !== "undefined" && navigator.share) {
            try {
                await navigator.share({
                    title: "Rice Purity Test",
                    text: shareText,
                    url: shareUrl,
                });
            } catch {
                /* user cancelled */
            }
        } else {
            // Fallback — copy to clipboard
            copyLink();
        }
    };

    return (
        <section
            id="result"
            data-testid="result-section"
            className="mx-auto max-w-3xl px-4 pt-10 pb-24 sm:px-6 sm:pt-16 lg:px-8"
        >
            {/* Certificate card */}
            <div
                ref={certificateRef}
                id="rpt-certificate"
                data-testid="certificate-card"
                className="rpt-certificate animate-pop-in relative p-8 sm:p-12"
            >
                {/* Corner stamp */}
                <div
                    className="pointer-events-none absolute right-5 top-5 hidden sm:block"
                    aria-hidden="true"
                >
                    <div className="rpt-stamp animate-stamp-in origin-center text-[#B45309]/80">
                        Certified
                    </div>
                </div>

                <div className="text-center">
                    <p
                        data-testid="result-eyebrow"
                        className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-ink-500"
                    >
                        Rice Purity Test · Result Card
                    </p>

                    <div className="mt-4 flex items-center justify-center gap-3">
                        <span className="h-px w-10 bg-ink-300" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">
                            your score
                        </span>
                        <span className="h-px w-10 bg-ink-300" />
                    </div>

                    <div
                        data-testid="score-result-display"
                        className="relative mx-auto mt-2 inline-block"
                    >
                        <span className="text-[28vw] leading-none font-extrabold tracking-tight text-ink-900 sm:text-[200px] lg:text-[220px]">
                            {score}
                        </span>
                        <span className="absolute -right-10 top-5 font-mono text-sm font-semibold text-ink-500 sm:text-base">
                            / 100
                        </span>
                    </div>

                    <h2
                        data-testid="score-label"
                        className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl"
                    >
                        {label}
                    </h2>
                    <p
                        data-testid="score-text"
                        className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ink-700 sm:text-base"
                    >
                        {text}
                    </p>

                    {/* Meta info line */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
                        <span>Date · {formattedDate()}</span>
                        <span className="hidden sm:inline">·</span>
                        <span>Form A · 100 items</span>
                        <span className="hidden sm:inline">·</span>
                        <span>Anonymous</span>
                    </div>

                    <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center print:hidden">
                        <button
                            type="button"
                            onClick={onRetake}
                            data-testid="retake-test-btn"
                            className="rounded-full bg-[#FACC15] px-7 py-3 text-sm font-bold text-ink-900 shadow-[0_2px_0_#1A1A14] ring-1 ring-ink-900 transition-transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2"
                        >
                            Retake Test
                        </button>
                        <button
                            type="button"
                            onClick={handlePrint}
                            data-testid="download-pdf-btn"
                            className="inline-flex items-center gap-2 rounded-full border border-ink-900 bg-cream-50 px-6 py-3 text-sm font-semibold text-ink-900 transition-colors hover:bg-cream-200"
                        >
                            <Printer className="h-4 w-4" />
                            Save as PDF
                        </button>
                    </div>

                    {/* Printed-only signature line */}
                    <div className="mt-10 hidden items-end justify-between gap-6 text-left print:flex">
                        <div className="flex-1">
                            <div className="border-b border-ink-900/50 pb-1" />
                            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
                                Signature
                            </p>
                        </div>
                        <div className="w-40">
                            <div className="border-b border-ink-900/50 pb-1 text-right font-mono text-xs text-ink-700">
                                {formattedDate()}
                            </div>
                            <p className="mt-1 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
                                Date
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Share — prominent, visual, mobile-friendly */}
            <div className="mt-10 print:hidden" data-testid="share-section">
                <div className="overflow-hidden rounded-3xl border border-ink-300/60 bg-gradient-to-br from-cream-50 via-cream-100 to-cream-200 p-6 sm:p-8">
                    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
                        {/* Preview card */}
                        <div className="flex items-center gap-4">
                            <div className="relative flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-ink-900 text-cream-50 shadow-[0_3px_0_#000] sm:h-24 sm:w-24">
                                <span className="text-3xl font-extrabold sm:text-4xl">
                                    {score}
                                </span>
                                <span className="absolute -top-2 -right-2 rounded-full bg-[#FACC15] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-ink-900 shadow-[0_2px_0_#000]">
                                    /100
                                </span>
                            </div>
                            <div className="text-left">
                                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">
                                    Your score
                                </p>
                                <p className="mt-1 text-lg font-bold text-ink-900 sm:text-xl">
                                    {label}
                                </p>
                                <p className="mt-0.5 text-xs text-ink-500">
                                    Tap a button — beat your friends.
                                </p>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="grid w-full grid-cols-2 gap-2 sm:w-auto sm:grid-cols-4">
                            <button
                                type="button"
                                onClick={shareTwitter}
                                data-testid="share-twitter-btn"
                                aria-label="Share on X"
                                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-ink-900 px-3 py-3 text-xs font-semibold text-cream-50 shadow-[0_2px_0_#000] transition-transform hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                                <span>X</span>
                            </button>
                            <button
                                type="button"
                                onClick={shareWhatsApp}
                                data-testid="share-whatsapp-btn"
                                aria-label="Share on WhatsApp"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-3 text-xs font-semibold text-white shadow-[0_2px_0_#0b5c33] transition-transform hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                                    <path d="M20.52 3.48A11.9 11.9 0 0 0 12.01 0C5.4 0 .04 5.36.04 11.98c0 2.11.55 4.17 1.6 5.98L0 24l6.2-1.62a11.95 11.95 0 0 0 5.8 1.48h.01c6.6 0 11.97-5.37 11.97-11.98 0-3.2-1.25-6.21-3.46-8.4zM12 21.8h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.68.96.98-3.59-.23-.37a9.77 9.77 0 0 1-1.5-5.24C2.2 6.58 6.6 2.2 12.02 2.2c2.61 0 5.07 1.02 6.92 2.87A9.74 9.74 0 0 1 21.8 12c0 5.42-4.4 9.8-9.8 9.8zm5.37-7.33c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.48-.89-.8-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.08-.8.37-.27.3-1.05 1.02-1.05 2.49s1.08 2.89 1.23 3.09c.15.2 2.11 3.22 5.12 4.51.72.31 1.27.5 1.7.64.72.23 1.37.2 1.88.12.57-.08 1.76-.72 2-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
                                </svg>
                                <span>WhatsApp</span>
                            </button>
                            <button
                                type="button"
                                onClick={shareNative}
                                data-testid="share-native-btn"
                                aria-label="Share"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FACC15] px-3 py-3 text-xs font-semibold text-ink-900 shadow-[0_2px_0_#1A1A14] ring-1 ring-ink-900 transition-transform hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <Share2 className="h-4 w-4" />
                                <span>Share</span>
                            </button>
                            <button
                                type="button"
                                onClick={copyLink}
                                data-testid="share-copy-btn"
                                aria-label="Copy link"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink-900 bg-cream-50 px-3 py-3 text-xs font-semibold text-ink-900 transition-colors hover:bg-cream-200"
                            >
                                <Link2 className="h-4 w-4" />
                                <span>Copy</span>
                            </button>
                        </div>
                    </div>

                    {/* Message preview */}
                    <div className="mt-6 rounded-2xl border border-ink-300/50 bg-white/70 p-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
                            Message preview
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-ink-900">
                            “{shareText}”{" "}
                            <span className="text-ink-500">{shareUrl}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Range reference */}
            <div className="mt-14 rounded-2xl border border-ink-300/60 bg-cream-50 p-6 print:hidden">
                <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-bold text-ink-900">
                        Where your score sits
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
                        5 tiers · 0–100
                    </span>
                </div>
                <ul className="mt-4 divide-y divide-ink-900/10">
                    {interpretations.map((r) => {
                        const active = score >= r.min && score <= r.max;
                        return (
                            <li
                                key={r.label}
                                className={
                                    "flex items-center gap-3 rounded-md px-2 py-2.5 " +
                                    (active
                                        ? "bg-[#FACC15]/50 font-semibold ring-1 ring-ink-900/15"
                                        : "")
                                }
                            >
                                <span className="w-20 font-mono text-xs text-ink-500">
                                    {r.min}–{r.max}
                                </span>
                                <span className="flex-1 text-ink-900">
                                    {r.label}
                                </span>
                                {active && (
                                    <HandCheck className="h-5 w-5 text-ink-900" />
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default Result;
