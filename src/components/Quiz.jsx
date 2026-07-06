"use client";

import { useMemo, useState, useCallback } from "react";
import { ALL_QUESTIONS, TOTAL_QUESTIONS } from "@/data/questions";
import HandCheck from "./HandCheck";

export const Quiz = ({ checked, onToggle, onCalculate, onReset }) => {
    const checkedCount = useMemo(
        () => Object.values(checked).filter(Boolean).length,
        [checked]
    );
    const percent = Math.round((checkedCount / TOTAL_QUESTIONS) * 100);
    const [showCancelled, setShowCancelled] = useState(false);

    const handleClear = useCallback(() => {
        const had = Object.values(checked).some(Boolean);
        onReset();
        if (had) {
            setShowCancelled(true);
            window.setTimeout(() => setShowCancelled(false), 1400);
        }
    }, [checked, onReset]);

    let globalIdx = 0;

    return (
        <section
            id="top"
            data-testid="quiz-section"
            className="mx-auto max-w-3xl px-4 pt-6 pb-10 sm:px-6 sm:pt-14 lg:px-8"
        >
            {/* Intro strip */}
            <div className="mb-8 text-center">
                <h1
                    data-testid="page-heading"
                    className="mt-0 text-4xl font-extrabold tracking-tight text-ink-900 sm:mt-5 sm:text-5xl"
                >
                    Rice Purity Test
                </h1>
                <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-ink-700">
                    Test your personality with a viral Rice Purity Test that has fascinated millions. A completely secure, anonymous, and non-judgmental test that describes your life experiences, from innocent memories to unforgettable adventures.
                </p>
            </div>

            {/* Disclaimer */}
            <div
                id="test"
                className="relative mb-10 text-center"
            >
                <p className="mx-auto max-w-2xl text-[15px] font-bold leading-relaxed text-ink-900">
                    Disclaimer: This test is a reflection of your past–not a roadmap for your future so answer honestly, not aspirationally.
                </p>

                {showCancelled && (
                    <div
                        data-testid="cancelled-stamp"
                        className="pointer-events-none absolute inset-0 flex items-center justify-center"
                    >
                        <span className="rpt-cancelled-stamp">Cancelled</span>
                    </div>
                )}
            </div>

            {/* ======= QUESTIONS ZONE — single sequence (no categories) ======= */}
            <div className="relative">
                <div className="mb-10 scroll-mt-28">
                    <ul className="divide-y divide-ink-900/10 rounded-2xl border border-ink-300/50 bg-cream-50/70 px-3 sm:px-4">
                        {ALL_QUESTIONS.map((text, idx) => {
                            const id = `q-${idx}`;
                            const isChecked = !!checked[id];
                            return (
                                <li key={id}>
                                    <label
                                        htmlFor={id}
                                        data-testid={`question-row-${idx + 1}`}
                                        data-checked={isChecked}
                                        className="rpt-row group flex cursor-pointer items-start gap-3 rounded-md px-1 py-3 transition-colors hover:bg-cream-200/50 sm:gap-4 sm:py-3.5"
                                    >
                                        <input
                                            type="checkbox"
                                            id={id}
                                            data-testid={`question-checkbox-${idx + 1}`}
                                            checked={isChecked}
                                            onChange={() => onToggle(id)}
                                            className="sr-only"
                                        />
                                        <span aria-hidden="true" className="rpt-checkbox mt-0.5">
                                            <HandCheck strokeWidth={2.6} className="h-4 w-4 text-ink-900" />
                                        </span>
                                        <span className="flex-1 text-[15px] leading-relaxed text-ink-900">
                                            <span className="mr-2 font-mono text-xs text-ink-500">{idx + 1}.</span>
                                            <span className="rpt-q-text transition-colors">{text}</span>
                                        </span>
                                    </label>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Sticky action bar — scoped to questions zone.
                    - Hidden until user scrolls to questions (natural position is at the end).
                    - Sticky to viewport bottom while questions are on-screen.
                    - Releases & sits inline once user scrolls past the last question. */}
                <div
                    data-testid="sticky-action-bar"
                    className="sticky bottom-0 z-30 -mx-4 border-t border-ink-900/20 bg-cream-100/95 backdrop-blur-md sm:-mx-6 lg:-mx-8"
                >
                    <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <span
                                    data-testid="progress-count"
                                    className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-700"
                                >
                                    {checkedCount} / {TOTAL_QUESTIONS} checked
                                </span>
                            </div>
                            <div className="mt-2 h-[5px] w-full overflow-hidden rounded-full bg-ink-900/10">
                                <div
                                    className="h-full bg-[#FACC15] transition-[width] duration-200"
                                    style={{ width: `${percent}%` }}
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleClear}
                            data-testid="clear-btn"
                            className="rounded-full border border-ink-300 bg-cream-50 px-3 py-2 text-xs font-medium text-ink-700 transition-colors hover:border-ink-900 sm:px-4"
                        >
                            Clear
                        </button>
                        <button
                            type="button"
                            onClick={onCalculate}
                            data-testid="calculate-score-btn"
                            className="rounded-full bg-ink-900 px-4 py-2.5 text-sm font-semibold text-cream-50 shadow-[0_2px_0_#000] transition-transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2 sm:px-6"
                        >
                            Reveal Score
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Quiz;
