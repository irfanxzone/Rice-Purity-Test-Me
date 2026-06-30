"use client";
import { useCallback, useMemo, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleJsonLd from "@/components/ArticleJsonLd";

const BROWN_QUESTIONS = [
  "Tracked daily steps",
  "Skipped breakfast all week",
  "Ate only takeout for three days",
  "Cooked brown rice at home",
  "Meal‑prepped for the week",
  "Went a whole day without water",
  "Swapped soda for water for a month",
  "Tried a sugar‑free challenge",
  "Fasted for non‑religious reasons",
  "Stayed up all night scrolling",
  "Turned your phone off for a day",
  "Deleted a social media app",
  "Went a week without social media",
  "Posted something you instantly regretted",
  "Doom‑scrolled past midnight",
  "Pretended to be offline",
  "Muted someone instead of unfollowing",
  "Checked an ex’s profile",
  "Posted just to make someone jealous",
  "Skipped homework to watch a show",
  "Copied a friend’s homework",
  "Came late to class three days in a row",
  "Faked a sick day for school",
  "Slept in class on purpose",
  "Changed an answer after grading yourself",
  "Skipped a test without a real excuse",
  "Crammed an entire course in one night",
  "Turned in work you didn’t read",
  "Ignored a group project completely",
  "Broke a house rule and hid it",
  "Lied about where you were",
  "Snuck out after dark",
  "Came home past curfew on purpose",
  "Broke something and blamed “no one”",
  "Read someone’s messages without asking",
  "Took money without telling the owner",
  "Kept something you borrowed",
  "Ignored someone calling your name",
  "Threw away mail that wasn’t yours",
  "Ghosted someone without explanation",
  "Got ghosted by someone you liked",
  "Flirted just for attention",
  "Led someone on for fun",
  "Dated more than one person in a month",
  "Went back to an ex after swearing you wouldn’t",
  "Scrolled a crush’s posts for an hour",
  "Texted “I miss you” without meaning it",
  "Ended a relationship over text",
  "Hid your real relationship status",
  "Went to a party without telling home",
  "Left a party without saying goodbye",
  "Pretended to be busy to dodge plans",
  "Joined an event just for photos",
  "Left a friend alone at a party",
  "Invited yourself to someone’s plans",
  "Canceled plans at the last minute",
  "Lied about where you slept that night",
  "Stayed out all night without sleeping",
  "Went to a party where you knew no one",
  "Tried alcohol at least once",
  "Tried vaping or smoking",
  "Lied about how much you drank",
  "Pressured someone else to drink",
  "Mixed drinks just to “see what happens”",
  "Hid bottles or cans from adults",
  "Went to school or work hungover",
  "Lost something important while drunk",
  "Rode in a car with a tipsy driver",
  "Forgot parts of a night after drinking",
  "Skipped brushing teeth for a day",
  "Went a week with zero exercise",
  "Slept less than three hours two nights straight",
  "Pulled an all‑nighter for no real reason",
  "Ignored a health problem for months",
  "Searched symptoms instead of seeing a doctor",
  "Lied to a doctor about your habits",
  "Forgot to eat all day",
  "Ate only snacks for dinner",
  "Tried a trend diet from social media",
  "Drove faster than the speed limit on purpose",
  "Texted while driving",
  "Crossed the street on a red light",
  "Ignored a “no trespassing” sign",
  "Snuck into a movie without paying",
  "Took something small without paying",
  "Lied to security or staff",
  "Broke something in public and walked away",
  "Got warned by police or security",
  "Rode in a car without a seatbelt",
  "Shared a secret you promised to keep",
  "Lied to protect your reputation",
  "Started a rumor without proof",
  "Spread gossip just because it was funny",
  "Ignored a friend’s serious problem",
  "Laughed at someone in public",
  "Unfollowed a friend after a fight",
  "Blocked someone out of spite",
  "Pretended not to recognize someone",
  "Felt proud of breaking your own rules",
  "Changed your diet for health",
];

const SCORE_MEANINGS = [
  { min: 90, max: 100, text: "You have strong brown rice energy: calm, natural, and mindful of your choices." },
  { min: 70, max: 89, text: "You are lighthearted and healthy most of the time, with a few spicy moments." },
  { min: 40, max: 69, text: "You are a balanced mix of fun and chaos — a little brown rice, a little spice." },
  { min: 0, max: 39, text: "You are more chaotic and processed — the spicy side of the Brown Rice Purity Test." },
];

function getScoreMeaning(score) {
  return SCORE_MEANINGS.find((range) => score >= range.min && score <= range.max)?.text || "";
}

export default function BrownRicePurityTestPage() {
  const [stage, setStage] = useState("taking");
  const [checked, setChecked] = useState({});
  const [finalScore, setFinalScore] = useState(null);

  const checkedCount = useMemo(
    () => Object.values(checked).filter(Boolean).length,
    [checked]
  );

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
      <ArticleJsonLd slug="brown-rice-purity-test" />
      <Header />
      <main data-testid="main-content">
        <section className="mx-auto max-w-3xl px-4 pt-10 pb-10 sm:px-6 sm:pt-14 lg:px-8">
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl text-center">
            Brown Rice Purity Test
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[16px] leading-relaxed text-ink-700 text-center">
            The term Brown Rice Purity Test is a little confusing. Most people know only the <a href="/" className="rpt-interlink">Rice purity Test</a>, and what confuses them is the word “Brown.” Their concern is whether this is the actual version or a funny internet name given to the Rice Purity Test. Well, this is not an official version of the test; rather, it is just another playful, fun variant of the original version.
            <br /><br />
            This is a more generic and lighthearted test that revolves around food, culture, life experiences, and personality. You can take it as a light, fun test instead of treating it as a personality assessment tool with a very calm and relatable tone.
          </p>
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-10 sm:px-6 lg:px-8 rpt-prose">
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700">
            The test below is a yes-or-no style quiz. Each yes reduces your score by one point, and the final score is calculated out of 100. The interactive question list starts here.
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
                {BROWN_QUESTIONS.map((question, index) => (
                  <li key={index} className="flex items-start gap-3 py-3 px-4">
                    <input
                      id={`q${index}`}
                      type="checkbox"
                      checked={!!checked[index]}
                      onChange={() => handleToggle(index)}
                      className="mt-1 h-5 w-5 accent-[#FACC15]"
                    />
                    <label htmlFor={`q${index}`} className="text-base cursor-pointer select-none flex-1">
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
                    Brown Rice Purity Test · Result Card
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
                    Brown Rice Score Meaning
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

        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 rpt-prose">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">What Is the Brown Rice Purity Test?</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700">
            The Brown Rice Purity Test is a humorous and food-related quiz. The original version focuses on personality and purity based on a person's life experiences, and checks how innocent a person is in different areas of life.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700">
            However, the brown version has no fixed format; it consists of a random mix of questions related to culture, fun, and food. Brown rice is considered as more natural and healthier, so this test is also described as healthy and natural.
          </p>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">Why Is It Called Brown Rice?</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700">
            The idea behind calling it brown rice is simple. It gives this phrase a little unique name and a funny twist. Brown rice is considered more natural, simple, and less processed than white rice. That’s why social media users jokingly associate it with being more honest, pure, and a simple personality like brown rice itself.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700">
            Many other tests on the internet started as social media trends with slight variations in their names. Although it is not widely popular, the Brown Rice Purity Test still attracts user attention due to a slight change in the name, which builds curiosity among people to search for and take it.
          </p>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">Is the Brown Rice Purity Test Different from the Rice Purity Test?</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700">
            The simple answer is yes, it is different because there are no official questions available for this version, unlike the original version, which asks 100 organized questions about life experiences. It can be taken as a more open-minded, funny, and creative version of the real test. This test doesn’t include mature or highly personal questions; rather, it asks funny questions like:
          </p>
          <ul className="list-disc ml-6 mt-4 text-[16px] text-neutral-700">
            <li>Have you ever eaten plain rice without seasoning?</li>
            <li>Have you ever tried to act healthy for one week?</li>
            <li>Have you ever judged someone for eating white rice?</li>
          </ul>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">How Does the Score Work?</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700">
            The scoring system works the same as the original test. You answer questions in a yes-or-no format at the end, and you’ll get results out of 100. Every yes decreases your score, and a no simply increases it. A higher score indicates that you have strong brown rice energy; a low score indicates you are chaotic, spicy, or processed. The scores are just numbers; you don’t have to take them seriously.
          </p>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">Final Thoughts</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700">
            The Brown Purity Test is a funny and creative variation of the famous Rice Purity Test. There is no official meaning behind the term “Brown Rice”, it was likely created by a random internet user for fun. It is used as a humorous and light personality quiz. Take the test for fun; it is not about being pure or perfect; it’s all about experiencing new things for fun and enjoyment.
          </p>
          <p className="mt-6 text-[16px] leading-relaxed text-neutral-700">
            If you want another playful twist on purity quizzes, check out the <a href="/weighted-rice-purity-test" className="rpt-interlink">Weighted Rice Purity Test</a> before you finish.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
