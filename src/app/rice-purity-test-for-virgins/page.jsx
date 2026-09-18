"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const VIRGIN_QUESTIONS = [
  "Held hands romantically?",
  "Been on a date?",
  "Been in a relationship?",
  "Danced without leaving room for Jesus?",
  "Kissed a non-family member?",
  "Kissed a non-family member on the lips?",
  "French kissed?",
  "French kissed in public?",
  "Kissed on the neck?",
  "Kissed horizontally?",
  "Given or received a hickey?",
  "Kissed or been kissed on the breast?",
  "Kissed someone below the belt?",
  "Kissed for more than two hours consecutively?",
  "Played a game involving stripping?",
  "Seen or been seen by another person in a sensual context?",
  "Masturbated?",
  "Masturbated to a picture or video?",
  "Masturbated while someone else was in the room?",
  "Been caught masturbating?",
  "Masturbated with an inanimate object?",
  "Seen or read pornographic material?",
  "Massaged or been massaged sensually?",
  "Gone through the motions of intercourse while fully dressed?",
  "Undressed or been undressed by a MPS (member of the preferred sex)?",
  "Showered with a MPS?",
  "Fondled or had your butt cheeks fondled?",
  "Fondled or had your breasts fondled?",
  "Fondled or had your genitals fondled?",
  "Had or given “blue balls”?",
  "Had an orgasm due to someone else’s manipulation?",
  "Sent a sexually explicit text or instant message?",
  "Sent or received sexually explicit photographs?",
  "Engaged in sexually explicit activity over video chat?",
  "Cheated on a significant other during a relationship?",
  "Purchased contraceptives?",
  "Gave oral sex?",
  "Received oral sex?",
  "Used a sex toy with a partner?",
  "Spent the night with a MPS?",
  "Been walked in on while engaging in a sexual act?",
  "Kicked a roommate out to commit a sexual act?",
  "Ingested alcohol in a non-religious context?",
  "Played a drinking game?",
  "Been drunk?",
  "Faked sobriety to parents or teachers?",
  "Had severe memory loss due to alcohol?",
  "Used tobacco?",
  "Used marijuana?",
  "Used a drug stronger than marijuana?",
  "Used methamphetamine, crack cocaine, PCP, horse tranquilizers or heroin?",
  "Been sent to the office of a principal, dean or judicial affairs representative for a disciplinary infraction?",
  "Been put on disciplinary probation or suspended?",
  "Urinated in public?",
  "Gone skinny-dipping?",
  "Gone streaking?",
  "Seen a stripper?",
  "Had the police called on you?",
  "Run from the police?",
  "Had the police question you?",
  "Had the police handcuff you?",
  "Been arrested?",
  "Been convicted of a crime?",
  "Been convicted of a felony?",
  "Committed an act of vandalism?"
];



export default function VirginsRicePurityTestPage() {
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
    setFinalScore(null);
    setStage("taking");
  }, []);

  const handleReset = useCallback(() => { setChecked({}); setFinalScore(null); setStage("taking"); }, []);

  const handleCalculate = useCallback(() => {
    const score = VIRGIN_QUESTIONS.length - checkedCount;
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
          <h1 className="mt-5 text-center text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">Rice Purity Test For Virgins</h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-[16px] leading-relaxed text-ink-700">
            Do you want to take the <a href="https://ricepuritytestme.com/" className="rpt-interlink">rice purity test</a> but can&rsquo;t because most of the questions revolve around intimacy and you have never experienced an intimate relationship? Rice Purity Test for virgins is a special variant that is made for those who do not need sexual experience or have never had it before.
            <br /><br />
            This is an unofficial version of the rice purity test, and the questions are totally different from the official version. The purpose of this test is that if you have never had sex, you can still answer the questions and get a score. You also do not need to score 100 to describe yourself as a virgin.
          </p>
        </section>

        <section id="test" className="mx-auto max-w-3xl px-4 pt-2 pb-10 sm:px-6 lg:px-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCalculate();
            }}
            className="space-y-6"
          >
            <h2 className="font-heading text-2xl font-bold text-ink-900">Questions:</h2>
            <ul className="mb-6 divide-y divide-ink-200 rounded-xl border bg-cream-50">
              {VIRGIN_QUESTIONS.map((q, i) => (
                <li key={i} className="flex items-center px-4 py-3">
                  <input
                    id={`q${i}`}
                    type="checkbox"
                    checked={!!checked[i]}
                    onChange={() => handleToggle(i)}
                    className="mr-3 h-5 w-5 shrink-0 accent-[#FACC15]"
                  />
                  <label htmlFor={`q${i}`} className="cursor-pointer select-none text-base">
                    {i + 1}. {q}
                  </label>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap justify-center gap-4">
              <button type="submit" className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700">
                Calculate Score
              </button>
              <button type="button" onClick={handleReset} className="rounded bg-gray-200 px-6 py-2 text-gray-800 transition hover:bg-gray-300">
                Clear
              </button>
            </div>
          </form>
        </section>

        {stage === "done" && finalScore !== null && (
          <section id="result" data-testid="result-section" className="mx-auto max-w-3xl px-4 pt-10 pb-24 sm:px-6 sm:pt-16 lg:px-8">
            <div className="rpt-certificate animate-pop-in relative p-8 sm:p-12">
              <div className="text-center">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-ink-500">
                  Rice Purity Test For Virgins Result Card
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <span className="h-px w-10 bg-ink-300" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">your score</span>
                  <span className="h-px w-10 bg-ink-300" />
                </div>
                <div className="relative mx-auto mt-2 inline-block">
                  <span className="text-[112px] font-extrabold leading-none tracking-tight text-ink-900 sm:text-[160px]">
                    {finalScore}
                  </span>
                  <span className="absolute -right-10 top-5 font-mono text-sm font-semibold text-ink-500 sm:text-base">/ {VIRGIN_QUESTIONS.length}</span>
                </div>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">Your Purity Score</h2>
                <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-ink-700 sm:text-base">
                  There is no score to aim for and no reason to rush into experiences just to change a number.
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

        <section id="about" data-testid="seo-content" className="rpt-prose mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="font-heading mt-10 text-2xl font-bold text-neutral-900 sm:text-3xl">What Is the Rice Purity Test for Virgins?</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">{"It is about personal experiences, presented for people who identify themselves as virgins. This unofficial test consists of 65 different questions. The score is also given on a 65 point-scale. It’s different from the standard 100-question format. A version labeled “for virgins” is not automatically free of adult content. Read its description before starting, especially if you are looking for a quiz without intimate questions."}</p>
          <img src="/rice-purity-test-for-virgin.webp" alt="Rice Purity Test for Virgins: 65-question personal experiences quiz" className="mt-6 h-auto w-full rounded-lg border border-ink-200 object-cover" />
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">{"Questions are related to relationships, intimacy and other behaviours a person can experience in day to day life. If you relate any of the question tap yes otherwise leave it blank for no and a score out of 65 will determine your final result."}</p>
          <div className="mt-5 overflow-x-auto rounded-lg border border-ink-200"><table className="w-full text-left text-sm text-neutral-700"><thead className="bg-[#FACC15]/25 text-ink-900"><tr><th scope="col" className="px-4 py-3">&nbsp;</th><th scope="col" className="px-4 py-3">65-question variant</th><th scope="col" className="px-4 py-3">Classic test</th></tr></thead><tbody className="divide-y divide-ink-200 bg-cream-50"><tr><th scope="row" className="px-4 py-3">Number of questions</th><td className="px-4 py-3">65</td><td className="px-4 py-3">100</td></tr>
<tr><th scope="row" className="px-4 py-3">Highest score</th><td className="px-4 py-3">65</td><td className="px-4 py-3">100</td></tr>
<tr><th scope="row" className="px-4 py-3">Main focus</th><td className="px-4 py-3">Romance and intimacy</td><td className="px-4 py-3">All life experiences</td></tr>
<tr><th scope="row" className="px-4 py-3">Scoring</th><td className="px-4 py-3">65 minus items checked</td><td className="px-4 py-3">100 minus items checked</td></tr></tbody></table></div>
          <h2 className="font-heading mt-10 text-2xl font-bold text-neutral-900 sm:text-3xl">Can You Take the Test If You Have Never Had Sex?</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">{"Yes you can take it if have never had sex. Having sexual experience is not a requirement. Answer each item based on what has happened in your own life. You do not need to pretend or replace your answers with what seems typical for your age. You also do not need to imagine what you might do in the future. For example, a college student who has never dated can answer the same questionnaire as someone who has been in a relationship. Their answers will differ, but neither person is taking the quiz incorrectly."}</p>
          <h2 className="font-heading mt-10 text-2xl font-bold text-neutral-900 sm:text-3xl">Why Can a Virgin Get Less Than 100?</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">{"Because the quiz does not ask only about intercourse. The standard test includes romantic experiences, substance use, and rule-breaking alongside sexual questions. An answer in any of those categories can affect the total. Think of the result as a count of unchecked boxes. It does not separate your answers into a detailed explanation of your life. Someone might check several boxes about relationships without checking a single item about intercourse. Another person might check boxes in completely different categories and finish with the same number."}</p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">{"That is why “I got 80, but I am a virgin” is not a contradiction. The number alone does not tell anyone which 20 items you checked. It also explains why guessing a friend's sexual history from their score does not work. You are looking at a total, not the answers behind it."}</p>
          <h2 className="font-heading mt-10 text-2xl font-bold text-neutral-900 sm:text-3xl">How Is the Score Calculated?</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">{"Both versions work the same way, just with different starting numbers."}</p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-neutral-700"><li>You read each question and answer yes or no.</li><li>Every &quot;yes&quot; removes one point.</li><li>Every &quot;no&quot; leaves your score where it is.</li><li>The number left at the end is your result.</li></ol>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">{"So the score is not a grade. It is just a count. A score of 80 on the classic test means you checked 20 items out of 100. Nothing more complicated than that."}</p>
          <h2 className="font-heading mt-10 text-2xl font-bold text-neutral-900 sm:text-3xl">What Is a Good Rice Purity Score for a Virgin?</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">{"There is no score you need to reach. A high total means fewer items were marked yes. It does not award you better character, and a lower total does not take anything away from you. An average from a general group of quiz users would not answer the specific question of what virgins usually score. Rather than asking whether your number is good enough, ask whether you understood the questions and answered them as intended. That is the part you can check."}</p>
          <h2 className="font-heading mt-10 text-2xl font-bold text-neutral-900 sm:text-3xl">Conclusion</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">{"You can take the Rice Purity Test for virgins even if you have never had sex, and your score does not need to be 100. The quiz covers several types of experiences, so the final number cannot confirm virginity or explain your personal history. Answer honestly, check which version you are using, and share only what feels comfortable. There is no score to aim for and no reason to rush into experiences just to change a number."}</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
