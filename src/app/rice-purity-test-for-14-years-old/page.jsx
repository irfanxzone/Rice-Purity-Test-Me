"use client";
import { useCallback, useMemo, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const QUESTIONS_14 = [
  "Kissed someone?",
  "Asked someone out?",
  "Played a game that involves stripping?",
  "Used a dating app?",
  "Watched porn?",
  "Sent nudes?",
  "Been in love?",
  "Posted a thirst trap?",
  "Bought plan B?",
  "Bought birth control?",
  "Spent the night with “MPS (member of the preferred sex)”?",
  "Smoked weed/vape/etc?",
  "French kissed?",
  "Used a sex toy?",
  "Fondled or been fondled?",
  "Been on a date?",
  "Had oral sex with more than one person in one day?",
  "Have you had sex yet?",
  "Flirted or had a crush?",
  "Been sent a dick pic/boob pic?"
];

const SCORE_MEANINGS_14 = [
  { min: 16, max: 20, text: "A pure soul with little or almost no experience, focused on studies and family." },
  { min: 13, max: 15, text: "Started exploring social life and personal needs." },
  { min: 7, max: 12, text: "Actively taking part in dating and sexual behavior." },
  { min: 0, max: 6, text: "You’re ahead of your time and have had greater unique experiences." },
];

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
    const score = 20 - checkedCount;
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
            Are you curious to know your purity score at the beginning of your teenage years? The Rice Purity Test for 14-year-olds is an improved version of the official test. The questions included in this test are especially relatable to 14-year-olds; no adult stuff, purely related to teen experiences.<br /><br />
            At such a young age, this test provides a sense of self-identity and helps teens understand where they stand in life. This updated version of the Rice Purity Test is safe, carefully designed, and provides a learning experience for 14-year-olds.
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
          <h1 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-4">What Is the Rice Purity Test for 14-Year-Olds?</h1>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            It all started on social media after seeing a viral trend among adults; teens demanded a test relevant to them. It is the same as the adult version; the only difference is that the questions are tailored to teen experiences. This test has no affiliation with Rice University.<br /><br />
            Unlike the <a href="/" className="rpt-interlink">original rice purity test</a>, this test consists of 20 questions about the social life, relationships, and sexual life of the 14-year-olds in a safe and protected manner. The result scale of the test ranges from 0 to 20. Our website also offers a feature to share the test and save it as a PDF.
          </p>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">How to Take the Rice Purity Test for 14-Year-Olds</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            It works the same as other tests; there is a list of 20 questions related to your life experiences until now, and you simply answer them according to your choice. Below is the detailed guide on how to take this fun quiz:
          </p>
          <ul className="list-disc ml-6 mt-2 text-[16px] text-neutral-700">
            <li>Select a trusted source or visit our official ricepuritytestme.com website, because multiple websites offer this test. However, do not put any sensitive information on any platform.</li>
            <li>Go to the Rice Purity Test for 14-Year-Olds page. At the start of the page, test questions are available.</li>
            <li>Answer the questions. If you want to say Yes to a question, just simply check the box or leave it as it is for No.</li>
            <li>After completing the score, click the “Calculate” button.</li>
            <li>Your purity score will appear out of 20. Share your score with your friends and compare results for fun.</li>
          </ul>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">Average Score for 14-Year-Olds</h2>
          <table className="w-full mt-4 mb-6 border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Average Score</th>
                <th className="border px-4 py-2">Range</th>
                <th className="border px-4 py-2">Characteristics</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">18.3</td>
                <td className="border px-4 py-2">16-20</td>
                <td className="border px-4 py-2">A pure soul with little or almost no experience, focused on studies and family.</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">17.4</td>
                <td className="border px-4 py-2">13-17</td>
                <td className="border px-4 py-2">Started exploring social life and personal needs.</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">15.7</td>
                <td className="border px-4 py-2">7-12</td>
                <td className="border px-4 py-2">Actively taking part in dating and sexual behavior.</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">13.2</td>
                <td className="border px-4 py-2">0-6</td>
                <td className="border px-4 py-2">You’re ahead of your time and have had greater unique experiences.</td>
              </tr>
            </tbody>
          </table>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">Rice Purity Score Meaning for 14-Year-Olds</h2>
          <ul className="list-disc ml-6 mt-2 text-[16px] text-neutral-700">
            <li><span className="font-bold">16–20 Score:</span> A pure soul like an angel means that you have very little experience. You should enjoy your life to the fullest.</li>
            <li><span className="font-bold">11–15 Score:</span> Innocent —  still has little experience, needs to socialize more.</li>
            <li><span className="font-bold">6–10 Score:</span> Experienced— you have some experience but remain within safe limits.</li>
            <li><span className="font-bold">0–5 Score:</span> Fully experienced — You are definitely not the same as average teens and have lived a full social life.</li>
          </ul>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">Conclusion</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Take the Rice Purity Test for 14-year-olds, evaluate your personality, and reflect on your past experiences. The sole purpose of this test is to give safe and supportive questions to 14-year-olds so they take this test honestly without being judgmental about themselves. This will help you understand yourself. Finally, I would say share your test results with friends and encourage them to share theirs on social profiles to start a fun trend.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
