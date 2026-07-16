"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NYU_QUESTIONS = [
  "Been a student at NYU?",
  "Lost your NYU ID?",
  "Been to an NYU sports game?",
  "Went to Phebe's?",
  "Considered dropping out of NYU?",
  "Changed majors more than once?",
  "Turned in an assignment at 11:59pm?",
  "Attended a career fair and left with nothing?",
  "Used NYU SafeRide?",
  "Went to Santacon?",
  "Stayed inside a dorm during a fire drill?",
  "Got rejected by a Stern Club?",
  "Worked a shady job from NYU Handshake?",
  "Been posted on @nyumissedshots?",
  "Have a fake ID?",
  "Went to Project X during Welcome Week?",
  "Lost touch with your welcome week friends?",
  "Took a CAMS class which made you reconsider your life?",
  "Had a horrible freshman year roommate?",
  "Got into an argument with a homeless person?",
  "Lied about your major to someone?",
  "Skipped a lecture to sleep off a hangover?",
  "Used an NYU Bloomberg Terminal?",
  "Saw Timothee Chalamet at Wash?",
  "Got interviewed at Wash for an IG Reel or TikTok?",
  "Got ghosted after a superday?",
  "Been in the elevator while people were making out?",
  "Had your valuables stolen at a party or bar?",
  "Been hit on at a dining hall?",
  "Been hit on in the elevator?",
  "Hit on someone in the elevator?",
  "Had more than 20 people in your dorm room at once?",
  "Received a complaint from an RA?",
  "Gotten disciplinary action from an RA or housing department?",
  "Jumped a turnstile and got caught?",
  "Kicked out of a building by Campus Safety?",
  "Snuck into the US Open?",
  "Knew someone was a slammy before they could tell you?",
  "Met someone from Gallatin who made you question the point of college?",
  "Been to an AEPhi party?",
  "Puked from shots at a pregame?",
  "Had more than 40 people in your dorm room at once?",
  "Got an internship through nepotism?",
  "Smoked in Carlyle Court's yard?",
  "Smoked in a dorm stairwell?",
  "Smoked in a dorm bathroom?",
  "Took stimulants to study for a test?",
  "Attended a sober sister event while not sober?",
  "Smoked in a dorm and set off the alarm?",
  "Spent 4/20 at Wash?",
  "Vaped during a class?",
  "Sexted during a lecture?",
  "Pissed between subway cars?",
  "Been to Poco Thursday?",
  "Been to Wonderland?",
  "Used a pickup line on someone at Wash?",
  "Got caught sneaking into a Sternie's party?",
  "Gotten into The Box with a fake ID?",
  "Been to a bottle service night with Stern kids?",
  "Banned from an NYU building?",
  "Citibiked while drunk?",
  "Blacked out at a dorm and woke up in the lounge?",
  "Had someone buy you drinks then ditched them?",
  "Crossed the Hudson or East River for a hookup?",
  "Had drinks with your professor?",
  "Hooked up in a dorm common room?",
  "Hooked up in an NYU building's lounge?",
  "Hooked up in a laundry room?",
  "Hooked up with someone you met on the NYU shuttle?",
  "Hooked up with someone you met at a Zeta Psi party?",
  "Hooked up with someone you met in a class?",
  "Hooked up with more than 5 people in one night?",
  "Hooked up with someone you met at a Kimmel event?",
  "Hooked up with someone you met on a dating app?",
  "Hooked up with someone during a club event?",
  "Hooked up with someone from the Wrestling Team?",
  "Ghosted someone you met on a dating app?",
  "Ended the night in the ambulance?",
  "Snuck into the Palladium pool while it was closed?",
  "Done coke at The Playground?",
  "Got arrested during a night out?",
  "Paused a hookup to make a condom run?",
  "Had sex while their roommate was home in another room?",
  "Made out with someone on the subway?",
  "Had a threesome or more in Third North?",
  "Snorted coke during finals week?",
  "Lied about your age to someone at a bar or club?",
  "Crashed a billionaire's after-party?",
  "Fucked someone while their roommate was sleeping in the same room?",
  "Received a UTI from a one-night stand?",
  "Got caught checking out someone at 404?",
  "Had group sex?",
  "Pegged or got pegged?",
  "Been photographed or filmed during sex by yourself or others?",
  "Lost your virginity with someone from a dating app?",
  "Had sex in a bed not belonging to you or your partner?",
  "Used your roommate's clothes to clean up after a hookup?",
  "Paid or been paid for a sexual act?",
  "Hooked up with a TA in their office?",
  "Slept with a professor?",
];

const SCORE_MEANINGS = [
  { min: 90, max: 100, text: "Very NYU-pure. The city has barely touched your score." },
  { min: 70, max: 89, text: "Mostly innocent, with a few classic NYU experiences checked off." },
  { min: 40, max: 69, text: "City-seasoned. NYU and New York have definitely shaped your student life." },
  { min: 20, max: 39, text: "Very experienced. The city got you, and your score shows it." },
  { min: 0, max: 19, text: "Fully NYU-experienced. You have lived through almost the whole list." },
];

function getScoreMeaning(score) {
  return SCORE_MEANINGS.find((range) => score >= range.min && score <= range.max)?.text || "";
}

export default function NYURicePurityTestClient() {
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
            NYU rice purity test
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-[16px] leading-relaxed text-ink-700">
            The popular <Link href="/" className="rpt-interlink">Rice Purity Test</Link> was not created specifically for NYU students. It was designed keeping in mind the general audience. The NYU Rice Purity Test is specially designed for NYU students. The classic Rice Purity Test is all about traditional campus experiences like dorms, quads, and tailgates. But NYU students live in the busiest city on earth, filled with opportunities and unique experiences.
            <br /><br />
            Someone from the upperclassmen initiated this, and the whole community quickly embraced it. The questions are all about behaviours, activities, and experiences you have encountered during your student life at NYU. Below is the 100-question list. Answer each question carefully and the final result will be shown at the end.
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
              <h2 className="font-heading text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                Question:
              </h2>
              <ul className="mb-6 divide-y divide-ink-200 rounded-xl border bg-cream-50">
                {NYU_QUESTIONS.map((question, index) => (
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
                    NYU Rice Purity Test - Result Card
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
                    NYU Purity Score Category
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
            What Is the Rice Purity Test?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Before moving on to the NYU version, we must understand the original version of the Rice Purity Test, which was made for regular college students. It is based on 100 questions curated over the years for newly enrolled students. It works simply: if you check a box, it means you relate to it; otherwise, leave it unchecked.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            A score of 100 means you are completely innocent and have not experienced anything from the list, and a score of 0 means you have experienced everything and have fully experienced life. This is not an exam or judgment tool. Take it as a fun quiz, enjoy it, and share it with your friends.
          </p>

          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            What Makes the NYU Version Different
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            NYU is different because it does not have a traditional campus. There is no gate between you and the city. Washington Square Park is an unofficial campus where you share it with film students, street performers, and chess players. Therefore, it does not specifically ask about college life in a wider context, but asks about experiences in the whole city.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The question focuses on the following areas:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-[16px] leading-relaxed text-neutral-700">
            <li>City life as part of student life</li>
            <li>Living in Greenwich Village</li>
            <li>Finance culture</li>
            <li>Columbia jokes</li>
            <li>Tuition jokes</li>
          </ul>

          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Why NYU Students Take It
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Here are a few reasons why you should take it:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-[16px] leading-relaxed text-neutral-700">
            <li>It helps you in your orientation week. It works as an icebreaker when meeting strangers and can make you feel like you already know them.</li>
            <li>This can allow you to have late-night fun comparing scores with your roommates, and someone always has a low score.</li>
            <li>The scores are shared constantly on social platforms like Instagram. You will also be part of conversations if you have already taken it.</li>
            <li>It helps both freshmen and seniors reflect on their experiences. You can examine how much the city changed you, and your scores will not match.</li>
          </ul>

          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            What's a Normal Score?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            There is no fixed benchmark for a normal score. However, anything above 70 means you are on the innocent side, and below 40 means the city got you. It is common for the majority of students to start at a high score, and with each semester their scores go down because of more time and more experience. There is no good or bad score, and getting a high or low score does not affect you; take it as fun.
          </p>

          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Final words
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Take the NYU Rice Purity Test, laugh at your scores, and share it with friends. But remember it is a scorecard, not a bucket list; you do not need to chase a low score. At your own pace, the experiences will come naturally and make the score automatically lower over a period of time.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
