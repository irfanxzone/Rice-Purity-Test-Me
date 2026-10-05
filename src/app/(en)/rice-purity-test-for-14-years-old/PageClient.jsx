"use client";
import RelatedTests from "@/components/RelatedTests";

import { useCallback, useMemo, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { QUESTIONS_14, SCORE_MEANINGS_14 } from "@/data/teen-quiz";

function getScoreMeaning14(score) {
  for (const range of SCORE_MEANINGS_14) {
    if (score >= range.min && score <= range.max) return range.text;
  }
  return "";
}

export default function RicePurityTest14Page() {
  const [stage, setStage] = useState("taking");
  const [checked, setChecked] = useState({});
  const [finalScore, setFinalScore] = useState(null);

  const checkedCount = useMemo(() => Object.values(checked).filter(Boolean).length, [checked]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#test") {
      setTimeout(() => {
        const el = document.getElementById("test");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }, []);

  const handleToggle = useCallback((id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleReset = useCallback(() => setChecked({}), []);

  const handleCalculate = useCallback(() => {
    const score = QUESTIONS_14.length - checkedCount;
    setFinalScore(score);
    setStage("done");
    setTimeout(() => {
      const el = document.getElementById("result");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, [checkedCount]);

  const handleRetake = useCallback(() => {
    setChecked({});
    setFinalScore(null);
    setStage("taking");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  }, []);

  return (
    <div className="App">
      <Header />
      <main data-testid="main-content">
        <section className="mx-auto max-w-3xl px-4 pt-10 pb-10 sm:px-6 sm:pt-14 lg:px-8">
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl text-center">Rice Purity Test for 14-Year-Olds</h1>
          <p className="mx-auto mt-3 max-w-xl text-[16px] leading-relaxed text-ink-700 text-center">
            Try 20 lighthearted questions about school, friends, crushes, hobbies, and phones. Tick the experiences that apply to you and get a score out of 20.<br /><br />
            This version contains no sexual questions. It is just for fun: your score does not measure your character, maturity, or worth. You can skip any question and keep your result private.
          </p>
        </section>
        <section id="test" className="mx-auto max-w-3xl px-4 pt-2 pb-10 sm:px-6 lg:px-8">
          {stage === "taking" && (
            <form
              onSubmit={e => {
                e.preventDefault();
                handleCalculate();
              }}
              className="space-y-6"
            >
              <ul className="mb-6 divide-y divide-ink-200 border rounded-xl bg-cream-50">
                {QUESTIONS_14.map((q, i) => (
                  <li key={i} className="flex items-center py-3 px-4">
                    <input
                      id={`q${i}`}
                      type="checkbox"
                      checked={!!checked[i]}
                      onChange={() => handleToggle(i)}
                      className="mr-3 h-5 w-5 accent-[#FACC15]"
                    />
                    <label htmlFor={`q${i}`} className="text-base cursor-pointer select-none">
                      {i + 1}. {q}
                    </label>
                  </li>
                ))}
              </ul>
              <div className="flex gap-4 justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                  Calculate Score
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
                >
                  Reset
                </button>
              </div>
            </form>
          )}
          {stage === "done" && finalScore !== null && (
            <section
              id="result"
              data-testid="result-section"
              className="mx-auto max-w-3xl px-4 pt-10 pb-24 sm:px-6 sm:pt-16 lg:px-8"
            >
              <div className="rpt-certificate animate-pop-in relative p-8 sm:p-12">
                <div className="text-center">
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-ink-500">
                    Rice Purity Test 14 · Result Card
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <span className="h-px w-10 bg-ink-300" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">
                      your score
                    </span>
                    <span className="h-px w-10 bg-ink-300" />
                  </div>
                  <div className="relative mx-auto mt-2 inline-block">
                    <span className="text-[28vw] leading-none font-extrabold tracking-tight text-ink-900 sm:text-[200px] lg:text-[220px]">
                      {finalScore}
                    </span>
                    <span className="absolute -right-10 top-5 font-mono text-sm font-semibold text-ink-500 sm:text-base">
                      / 20
                    </span>
                  </div>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
                    Score Category
                  </h2>
                  <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-ink-700 sm:text-base">
                    {getScoreMeaning14(finalScore)}
                  </p>
                  <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center print:hidden">
                    <button
                      type="button"
                      onClick={handleRetake}
                      className="rounded-full bg-[#FACC15] px-7 py-3 text-sm font-bold text-ink-900 shadow-[0_2px_0_#1A1A14] ring-1 ring-ink-900 transition-transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2"
                    >
                      Retake Test
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </section>
        <section id="about" data-testid="seo-content" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 rpt-prose">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900">About this version for 14-year-olds</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-700">This is a non-sexual, 20-question quiz about everyday teenage experiences. It covers friendships, school, hobbies, crushes, and phone habits. This site is not affiliated with Rice University.</p>
          <h2 className="mt-10 text-2xl font-bold">How to take the quiz</h2>
          <ol className="list-decimal ml-6 mt-4 space-y-2 text-neutral-700">
            <li>Read each question and tick it if it describes something you have done.</li>
            <li>Leave other boxes unchecked. You can skip anything you prefer not to answer.</li>
            <li>Select Calculate Score to see your result out of 20.</li>
            <li>Select Retake Test to start again. Sharing your result is optional.</li>
          </ol>
          <h2 className="mt-10 text-2xl font-bold">What your score means</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-700">Your score is 20 minus the number of boxes you checked. A higher score means fewer checked experiences; a lower score means more. There is no better score and no need to try things just to change it.</p>
          <table className="w-full mt-4 mb-6 border border-gray-300">
            <thead><tr><th scope="col">Score</th><th scope="col">Checked experiences</th></tr></thead>
            <tbody>{SCORE_MEANINGS_14.map((range) => <tr key={range.min}><td>{range.min}-{range.max}</td><td>{range.text}</td></tr>)}</tbody>
          </table>
          <p className="mt-4 text-base leading-relaxed text-neutral-700">These ranges explain the calculation, not an average for teenagers. People have different interests and opportunities, and this quiz is not a psychological assessment.</p>
        </section>
        <RelatedTests slug="rice-purity-test-for-14-years-old" />
      </main>
      <Footer />
    </div>
  );
}
