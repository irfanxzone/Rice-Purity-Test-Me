"use client";
import { useCallback, useMemo, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const WEIGHTED_QUESTIONS = [
  { text: "Had a crush on someone?", weight: 1 },
  { text: "Held hands romantically?", weight: 1 },
  { text: "Gone on a casual date?", weight: 1 },
  { text: "Sent a flirty message?", weight: 1 },
  { text: "Received a love note or romantic text?", weight: 1 },
  { text: "Hugged someone you liked for more than a friendly moment?", weight: 1 },
  { text: "Slow dancing with someone?", weight: 1 },
  { text: "Kissed someone on the cheek?", weight: 1 },
  { text: "Had a secret crush your friends knew about?", weight: 1 },
  { text: "Been asked out by someone?", weight: 1 },
  { text: "Asked someone out yourself?", weight: 1 },
  { text: "Stayed up late talking to a romantic interest?", weight: 1 },
  { text: "Had a “talking stage” with someone?", weight: 1 },
  { text: "Felt jealous over someone you liked?", weight: 1 },
  { text: "Used a dating app or matchmaking app?", weight: 1 },
  { text: "Posted something online to get a certain person’s attention?", weight: 1 },
  { text: "Flirted in person on purpose?", weight: 1 },
  { text: "Been in a short-lived romantic connection?", weight: 1 },
  { text: "Hidden a crush from your family?", weight: 1 },
  { text: "Had your heart been broken by someone you never officially dated?", weight: 1 },
  { text: "Kissed someone on the lips?", weight: 2 },
  { text: "Made out with someone?", weight: 2 },
  { text: "Been in an official relationship?", weight: 2 },
  { text: "Said “I love you” romantically?", weight: 2 },
  { text: "Given or received a romantic gift?", weight: 2 },
  { text: "Gone on a late-night date?", weight: 2 },
  { text: "Cuddled with someone romantically?", weight: 2 },
  { text: "Lied about where you were to meet someone?", weight: 2 },
  { text: "Sneaked out of the house?", weight: 2 },
  { text: "Gone to a party without telling your parents or guardians?", weight: 2 },
  { text: "Danced closely with someone at a party or event?", weight: 2 },
  { text: "Had a romantic moment in a car?", weight: 2 },
  { text: "Kissed someone in public?", weight: 2 },
  { text: "Been caught flirting?", weight: 2 },
  { text: "Talked to two romantic interests at the same time?", weight: 2 },
  { text: "Ghosted someone you were talking to?", weight: 2 },
  { text: "Been ghosted after showing interest?", weight: 2 },
  { text: "Lied about your relationship status?", weight: 2 },
  { text: "Sent a message you later regretted in a romantic situation?", weight: 2 },
  { text: "Had an argument because of jealousy?", weight: 2 },
  { text: "Attended a house party?", weight: 2 },
  { text: "Stayed out later than you were allowed?", weight: 2 },
  { text: "Skipped a class, shift, or obligation for social reasons?", weight: 2 },
  { text: "Broken a small rule at school or work?", weight: 2 },
  { text: "Used someone else’s account, ID, or login without permission?", weight: 2 },
  { text: "Kept a serious secret for a friend?", weight: 2 },
  { text: "Been pressured into doing something you did not want to do socially?", weight: 2 },
  { text: "Gone somewhere mainly because a romantic interest would be there?", weight: 2 },
  { text: "Flirted with someone already in a relationship?", weight: 2 },
  { text: "Regretted how you treated someone romantically?", weight: 2 },
  { text: "Been in a relationship that became emotionally intense very quickly?", weight: 3 },
  { text: "Kissed more than one person within a short period of time?", weight: 3 },
  { text: "Had a “friends with benefits” type situation?", weight: 3 },
  { text: "Shared a bed with someone you were attracted to?", weight: 3 },
  { text: "Sent or received a suggestive photo?", weight: 3 },
  { text: "Had a private conversation that became strongly sexual in tone?", weight: 3 },
  { text: "Hidden a relationship from most people in your life?", weight: 3 },
  { text: "Cheated emotionally while in a relationship?", weight: 3 },
  { text: "Knowingly helped someone hide cheating?", weight: 3 },
  { text: "Gone back to someone you knew was bad for you?", weight: 3 },
  { text: "Consumed alcohol before the legal age in your area?", weight: 3 },
  { text: "Been noticeably drunk?", weight: 3 },
  { text: "Attended an event mainly for drinking or partying?", weight: 3 },
  { text: "Been removed from or warned at a public place for your behavior?", weight: 3 },
  { text: "Gambled money casually?", weight: 3 },
  { text: "Lied to avoid serious consequences?", weight: 3 },
  { text: "Damaged property, even as a prank?", weight: 3 },
  { text: "Traveled with someone who was not fully sober?", weight: 3 },
  { text: "Gotten into a physical fight or near-fight?", weight: 3 },
  { text: "Been seriously confronted by an authority figure for your behavior?", weight: 3 },
  { text: "Had sexual intercourse?", weight: 4 },
  { text: "Had an intimate experience with someone you were not dating?", weight: 4 },
  { text: "Been involved in a casual hookup?", weight: 4 },
  { text: "Regretted an intimate experience soon after it happened?", weight: 4 },
  { text: "Had an intimate experience in a place where you could have been caught?", weight: 4 },
  { text: "Cheated physically in a relationship?", weight: 4 },
  { text: "Knowingly been involved with someone who was cheating?", weight: 4 },
  { text: "Had an argument or breakup because of betrayal?", weight: 4 },
  { text: "Used a recreational drug?", weight: 4 },
  { text: "Been high from a non-prescribed substance?", weight: 4 },
  { text: "Mixed substances in a way you later realized was unsafe?", weight: 4 },
  { text: "Been unable to fully remember a night because of intoxication?", weight: 4 },
  { text: "Driven after drinking or using a substance?", weight: 4 },
  { text: "Knowingly ridden with an impaired driver?", weight: 4 },
  { text: "Stolen something of meaningful value?", weight: 4 },
  { text: "Entered somewhere you knew you were not allowed to be?", weight: 4 },
  { text: "Been questioned by police or security because of your actions?", weight: 4 },
  { text: "Received a formal warning, citation, or school/work disciplinary action?", weight: 4 },
  { text: "Participated in an act you knew could lead to legal trouble?", weight: 4 },
  { text: "Seriously lied to protect yourself from major consequences?", weight: 4 },
  { text: "Been arrested or detained by law enforcement?", weight: 5 },
  { text: "Faced a serious legal charge or court-related issue?", weight: 5 },
  { text: "Sold, distributed, or helped someone obtain illegal substances?", weight: 5 },
  { text: "Used a highly dangerous or addictive illegal drug?", weight: 5 },
  { text: "Caused significant harm to property on purpose?", weight: 5 },
  { text: "Been involved in a physical altercation that caused injury?", weight: 5 },
  { text: "Sought urgent help because of alcohol or drug use?", weight: 5 },
  { text: "Taken part in a dangerous act mainly for thrill, pressure, or attention?", weight: 5 },
  { text: "Experienced major personal fallout because of a reckless decision?", weight: 5 },
  { text: "Done something you still consider one of the most serious mistakes of your life?", weight: 5 },
];

const SCORE_MEANINGS = [
  { min: 90, max: 100, text: "Have gone through with very few experiences." },
  { min: 75, max: 89, text: "Got some social and a little dating experiences." },
  { min: 60, max: 74, text: "Has explored personal and relationship experiences." },
  { min: 40, max: 59, text: "Encountered romantic and risky experiences." },
  { min: 20, max: 39, text: "Highly experienced person with high impact of life choices." },
  { min: 0, max: 19, text: "An extremely experienced person who has explored experiences fully." },
];

function getScoreMeaning(score) {
  return SCORE_MEANINGS.find((range) => score >= range.min && score <= range.max)?.text || "";
}

export default function WeightedRicePurityTestPage() {
  const [stage, setStage] = useState("taking");
  const [checked, setChecked] = useState({});
  const [finalScore, setFinalScore] = useState(null);

  const checkedCount = useMemo(
    () => Object.values(checked).filter(Boolean).length,
    [checked]
  );

  const MAX_POINTS = 250;

  const pointsSum = useMemo(
    () =>
      WEIGHTED_QUESTIONS.reduce(
        (sum, question, index) => sum + (checked[index] ? question.weight : 0),
        0
      ),
    [checked]
  );

  const normalizedScore = useMemo(() => {
    // Convert total selected points to a 0-100 score where selecting the maximum
    // possible points results in a 0 score and selecting none results in 100.
    const percentDeducted = Math.round((pointsSum / MAX_POINTS) * 100);
    return Math.max(0, 100 - percentDeducted);
  }, [pointsSum]);

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
    setFinalScore(normalizedScore);
    setStage("done");
    setTimeout(() => {
      const el = document.getElementById("result");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, [normalizedScore]);

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
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl text-center">
            Weighted Rice Purity Test
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[16px] leading-relaxed text-ink-700 text-center">
            The Weighted Rice Purity Test is a much more realistic version of the official <a href="/" className="rpt-interlink">Rice purity Test</a>. After becoming popular, many users demanded that the score be weighted by different questions rather than simply decreasing by 1 point from 100. This version assigns a different weight to each question; the score weighting depends on the type of question. It’s a complete parody of the original test; the only thing that is changed is that instead of giving every question 1 point this test distributes scores in positive and negative scores.
            <br /><br />
            The Weighted Test doesn’t treat every question equally; it gives different importance to each question. Some questions weigh more than others; let’s say some reduce the score a little, but some reduce it more and the result is based on the weight of each question. The test is made for those who want a realistic approach with serious or risky experiences. This way, the score looks more meaningful.
          </p>
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-10 sm:px-6 lg:px-8 rpt-prose">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">
            Weighted Rice Purity Test 100 Questions
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            This test groups the questions into score levels based on how light or serious the experience is. Answer honestly to see how the weighted score changes compared to the classic test.
          </p>
         
        </section>

        <section id="test" className="mx-auto max-w-3xl px-4 pt-2 pb-10 sm:px-6 lg:px-8">
          {stage === "taking" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCalculate();
              }}
              className="space-y-6"
            >
              <ul className="mb-6 divide-y divide-ink-200 border rounded-xl bg-cream-50">
                {WEIGHTED_QUESTIONS.map((question, index) => (
                  <li key={index} className="flex items-start gap-3 py-3 px-4">
                    <input
                      id={`q${index}`}
                      type="checkbox"
                      checked={!!checked[index]}
                      onChange={() => handleToggle(index)}
                      className="mt-1 h-5 w-5 accent-[#FACC15]"
                    />
                    <label htmlFor={`q${index}`} className="text-base cursor-pointer select-none flex-1 flex items-center justify-between gap-3">
                      <span>{index + 1}. {question.text}</span>
                      <span className="ml-3 inline-flex items-center rounded-full bg-cream-100 px-2 py-0.5 text-xs font-semibold text-ink-700">
                        {question.weight} pt
                      </span>
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
                    Weighted Rice Purity Test · Result Card
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
                      / 100
                    </span>
                  </div>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
                    Weighted Purity Score Meaning
                  </h2>
                  <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-ink-700 sm:text-base">
                    {getScoreMeaning(finalScore)}
                  </p>
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-600 sm:text-sm">
                    Points deducted: <strong>{pointsSum}</strong> / {MAX_POINTS} — final score is out of 100.
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

        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 rpt-prose">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">
            What the Original Rice Purity Test Misses
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The Rice Purity Test started long ago. The questions included in it are still relevant and up-to-date, but the score mechanism is outdated. Many social media users wanted a more profound and better version which reduces the purity score out of 100 by the weight of the question. What the original tests misses is that we cannot treat holding hands and being arrested as having the same weight score.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The weighted test is also composed of the same questions given in the original version. The only difference is that each question has a different score. Seeing the high demand, we designed the test provided above, which perfectly gives a better scoring experience than the official rice purity test.
          </p>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">
            How the Weighted Rice Purity Test Works
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The weighted version works similarly, you still start with a score of 100. Minor experiences reduce a small score while mature experiences reduce the score by a larger amount. All questions are divided into different score levels, where the lightest have a smaller weight and the most extreme have a larger weight. Here’s a quick demonstration of how questions are categorized:</p>
          <ul className="list-disc ml-6 mt-4 text-[16px] text-neutral-700">
            <li>A lighter experience or a small social experience may reduce 1 point.</li>
            <li>Dating or relationship experience may cost you 2 points.</li>
            <li>Risky experiences may remove up to 5 points.</li>
          </ul>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The idea behind creating this test is to address the real concern of users who weigh or treat each question differently based on their experiences.
          </p>

          <h3 className="font-heading text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl mt-10">
            Weighted Rice Purity Score Distribution</h3>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="py-2">Question Range</th>
                  <th className="py-2">Experience Level</th>
                  <th className="py-2">No. of Questions</th>
                  <th className="py-2">Points Per “Yes”</th>
                  <th className="py-2">Maximum Points</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2">1–20</td>
                  <td className="py-2">Light</td>
                  <td className="py-2">20</td>
                  <td className="py-2">1</td>
                  <td className="py-2">20</td>
                </tr>
                <tr>
                  <td className="py-2">21–50</td>
                  <td className="py-2">Moderate</td>
                  <td className="py-2">30</td>
                  <td className="py-2">2</td>
                  <td className="py-2">60</td>
                </tr>
                <tr>
                  <td className="py-2">51–70</td>
                  <td className="py-2">Mature / Risky</td>
                  <td className="py-2">20</td>
                  <td className="py-2">3</td>
                  <td className="py-2">60</td>
                </tr>
                <tr>
                  <td className="py-2">71–90</td>
                  <td className="py-2">High-Impact</td>
                  <td className="py-2">20</td>
                  <td className="py-2">4</td>
                  <td className="py-2">80</td>
                </tr>
                <tr>
                  <td className="py-2">91–100</td>
                  <td className="py-2">Very Serious</td>
                  <td className="py-2">10</td>
                  <td className="py-2">5</td>
                  <td className="py-2">50</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold">Total</td>
                  <td className="py-2">—</td>
                  <td className="py-2">100</td>
                  <td className="py-2">—</td>
                  <td className="py-2">250</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-heading text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl mt-10">
            Weighted Purity Score Meaning</h3>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="py-2">Score</th>
                  <th className="py-2">Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2">90–100</td>
                  <td className="py-2">Have gone through with very few experiences</td>
                </tr>
                <tr>
                  <td className="py-2">75–89</td>
                  <td className="py-2">Got some social and a little dating experiences</td>
                </tr>
                <tr>
                  <td className="py-2">60–74</td>
                  <td className="py-2">Has explored personal and relationship experiences</td>
                </tr>
                <tr>
                  <td className="py-2">40–59</td>
                  <td className="py-2">Encountered romantic and risky experiences</td>
                </tr>
                <tr>
                  <td className="py-2">20–39</td>
                  <td className="py-2">Highly experienced person with high impact of life choices</td>
                </tr>
                <tr>
                  <td className="py-2">0–19</td>
                  <td className="py-2">An extremely experienced person who has explored experiences fully.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            If you want another way to explore personality, boundaries, and maturity in a different quiz format, check out the <a href="/kink-rice-purity-test" className="rpt-interlink">Kink Rice Purity Test</a> before you reach the final section.
          </p>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-12">
            Conclusion
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The Weighted Rice Purity Test is a much better version of the original test. The scoring mechanics, especially each question, has a different weight, based on their nature. This activity is the real problem solver and in-demand thing from social media users. This makes the test more user-oriented and engages them with the test until the last question.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
