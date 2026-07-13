"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BYU_QUESTIONS = [
  "Forgot to say 'amen' at the end of a prayer?",
  "Snuck out of the house?",
  "Told someone you were not a member of the church?",
  "Stayed in a BYU building after hours?",
  "Watched a rated-R movie?",
  "Bought food on a Sunday?",
  "Made a fake excuse to get out of a talk?",
  "Rejected a calling out of laziness?",
  "Skipped class?",
  "Flirted with a missionary?",
  "Been on a date?",
  "Drank caffeine?",
  "Used a swear word?",
  "Held hands romantically?",
  "Hugged someone of the opposite gender for longer than five seconds?",
  "Danced without leaving room for Jesus?",
  "Cuddled with an MPS?",
  "Been in a relationship?",
  "Had a MPS in your bedroom?",
  "Gossiped about someone?",
  "Gone to a concert on a Sunday?",
  "Slept through church?",
  "Voted opposed on a calling for someone?",
  "Pirated a textbook?",
  "Drank coffee?",
  "Not paid your tithing?",
  "Copied homework from someone?",
  "Cheated on an online test?",
  "Cheated on a test in the Testing Center?",
  "Parked illegally on campus?",
  "Parked illegally on campus without getting a ticket?",
  "Parked in a handicap spot?",
  "Hit a parked car and left without leaving a note?",
  "Kissed a non-family member on the lips?",
  "Kissed someone at Squaw Peak?",
  "French kissed?",
  "French kissed in public?",
  "Kissed on the neck?",
  "Given or received a hickey?",
  "Had a NCMO?",
  "Traveled farther than 2 hours for a NCMO?",
  "Kissed horizontally?",
  "Kissed someone until the sun came up?",
  "Gone to a UVU party just to check it out?",
  "Stayed at an MPS's apartment past midnight?",
  "Lied to your bishop?",
  "Driven over 100 MPH?",
  "Been pulled over?",
  "Used a fake ID?",
  "Had the police called on you?",
  "Run from the police?",
  "Had the police question you?",
  "Lied to a cop?",
  "Had the police handcuff you?",
  "Committed a felony?",
  "Been arrested for a crime?",
  "Been convicted for a crime?",
  "Seen or read pornographic material?",
  "Played a game involving stripping?",
  "Gone skinny-dipping?",
  "Violated the on-campus dress code?",
  "Stolen anything from a store?",
  "Snuck into BYU's pool after hours?",
  "Used an Honor Code loophole to justify behavior?",
  "Lied during a temple recommend interview?",
  "Committed vandalism?",
  "Got a secret piercing?",
  "Got a tattoo?",
  "?",
  "Drank alcohol?",
  "Been drunk?",
  "Been blackout drunk?",
  "Used marijuana?",
  "Used a drug stronger than marijuana?",
  "Spent the night at a MPS's apartment?",
  "Slept in the same bed with an MPS?",
  "Been sent to the Dean's Office for an Honor Code infraction?",
  "Been suspended from BYU?",
  "Been expelled from BYU?",
  "Got sent home early from your mission for non-medical reasons?",
  "Seen or been seen in a sexual context?",
  "Sent or been sent sexual images?",
  "Taken a sexually explicit photo?",
  "Matched with a family member on a dating app?",
  "Hit on a friend's parents?",
  "Had a wet dream about your friend's significant other?",
  "NCMO'd your friend's ex?",
  "Streaked?",
  "Given or received a sexual massage?",
  "Fondled or had your butt fondled?",
  "Kissed or been kissed on the breast?",
  "Participated in a booty call?",
  "Kissed 7 people in 7 days?",
  "Had multiple significant others at the same time without them knowing about each other?",
  "Kissed someone of the same sex?",
  "Durfed?",
  "Soaked?",
  "Had sex?",
  "Purchased contraceptives for yourself or someone else?",
  "Dated someone from the University of Utah?",
];

const SCORE_MEANINGS = [
  { min: 90, max: 100, text: "Very innocent and highly BYU-pure." },
  { min: 70, max: 89, text: "Mostly innocent, with a few normal life experiences." },
  { min: 40, max: 69, text: "Balanced and experienced, with several checked boxes." },
  { min: 20, max: 39, text: "Highly experienced and far from the innocent side." },
  { min: 0, max: 19, text: "Very experienced, with most of the list checked." },
];

function getScoreMeaning(score) {
  return SCORE_MEANINGS.find((range) => score >= range.min && score <= range.max)?.text || "";
}

export default function BYURicePurityTestClient() {
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
    const score = 100 - checkedCount;
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
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  }, []);

  return (
    <div className="App">
      <Header />
      <main data-testid="main-content">
        <section className="mx-auto max-w-3xl px-4 pt-10 pb-10 sm:px-6 sm:pt-14 lg:px-8">
          <h1 className="mt-5 text-center text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
            BYU Rice Purity Test
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-[16px] leading-relaxed text-ink-700">
            Have you been advised by the Honor Code Officer (HCO) at BYU to take the popular <Link href="/" className="rpt-interlink">Rice Purity Test</Link>? And you have no clue what it is. Or do you simply want to take it before meeting with the HCO? In either case, the carefully curated BYU Rice Purity Test will help you.
            <br /><br />
            In this specific test, the university tries to understand student personalities and innocence regarding worldly matters, which helps create a friendlier environment that is better suited for current as well as future students. BYU's purity test follows the pattern of the viral Rice Purity Test created by Rice University for its students. Below, we have provided the 100-question list to take the test and estimate your level of innocence.
          </p>
        </section>

        <section id="test" className="mx-auto max-w-3xl px-4 pt-2 pb-10 sm:px-6 lg:px-8">
          {stage === "taking" && (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleCalculate();
              }}
              className="space-y-6"
            >
              <ul className="mb-6 divide-y divide-ink-200 rounded-xl border bg-cream-50">
                {BYU_QUESTIONS.map((question, index) => (
                  <li key={`${index}-${question}`} className="flex items-start gap-3 px-4 py-3">
                    <input
                      id={`q${index}`}
                      type="checkbox"
                      checked={!!checked[index]}
                      onChange={() => handleToggle(index)}
                      className="mt-1 h-5 w-5 accent-[#FACC15]"
                    />
                    <label htmlFor={`q${index}`} className="flex-1 cursor-pointer select-none text-base">
                      {index + 1}. {question}
                    </label>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  type="submit"
                  className="rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-cream-50 shadow-[0_2px_0_#000] transition hover:bg-ink-800"
                >
                  Calculate Score
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full border border-ink-300 bg-white px-6 py-3 text-sm font-semibold text-ink-900 transition hover:border-ink-900"
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
                    BYU Rice Purity Test - Result Card
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <span className="h-px w-10 bg-ink-300" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">
                      your score
                    </span>
                    <span className="h-px w-10 bg-ink-300" />
                  </div>
                  <div className="relative mx-auto mt-2 inline-block">
                    <span className="text-[28vw] font-extrabold leading-none tracking-tight text-ink-900 sm:text-[200px] lg:text-[220px]">
                      {finalScore}
                    </span>
                    <span className="absolute -right-10 top-5 font-mono text-sm font-semibold text-ink-500 sm:text-base">
                      / 100
                    </span>
                  </div>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
                    BYU Purity Score Category
                  </h2>
                  <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-ink-700 sm:text-base">
                    {getScoreMeaning(finalScore)}
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

        <section className="rpt-prose mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            What is the BYU Rice Purity Test?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The BYU Rice Purity Test is an updated and customized version of the original Rice Purity Test based on 100 questions about your personal relationships, habits, behaviors, and experiences over time. This test was created specifically for BYU students, which is why it is named the BYU Rice Purity Test.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The score is described in different levels. Each level determines which category you fall into, such as a purely innocent, partially innocent, or more experienced person.
          </p>

          <h3 className="font-heading mt-10 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
            History of the BYU Rice Purity Test
          </h3>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            It all started back in 2020 during the peak of COVID-19, when BYU (Brigham Young University) decided to screen all the students for a COVID-19 test. The decision was taken to check if any of the students had been infected or were still healthy. In this regard, all the students gathered at the university, and the HCO (Honor Code Officer) at BYU decided it was a good opportunity to conduct the Rice Purity Test as well.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Initial questions were basic and interactive. As the list went on, questions became more personal about relationships, intimacy, and personality. The test is scored out of 100. If you score higher, it means you are on the more innocent side, and a lower score shows more experiences.
          </p>

          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            How to Score Better on This Test
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Here are some tips that will help you ace the test:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-[16px] leading-relaxed text-neutral-700">
            <li>Be honest, nobody is checking the answers, so do not fake it.</li>
            <li>Read all the way to the bottom; the upcoming questions may change your mind regarding what is available at the start.</li>
            <li>Do not skip easy questions; they contribute to your overall score.</li>
            <li>Keep in mind it is meant for fun, and nobody is judging you.</li>
            <li>Take the test alone first if you are not comfortable sharing with others.</li>
            <li>Do not try to get a perfect score; just take the test. The majority of people score in the middle.</li>
          </ul>

          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Final Words
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The BYU Rice Purity Test is a good initiative by Brigham Young University to help its students understand themselves better and which areas they need to improve on in the future, which will be beneficial for their personal growth. Take the opportunity, give the test, share the score with your peers, and enjoy comparing results.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
