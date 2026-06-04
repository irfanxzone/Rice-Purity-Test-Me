"use client";
import { useCallback, useMemo, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const OVERWATCH_QUESTIONS = [
  "Have you ever played the original version of Overwatch?",
  "Have you been playing Overwatch for over three years?",
  "Have you ever run the GOATS comp in ranked?",
  "Have you queued with Double Shield in Competitive?",
  "Do you have a gold weapon skin?",
  "Do you own ten or more gold weapons?",
  "Is the Jade gun part of your collection?",
  "Did you get the Pink Mercy skin?",
  "Do you have the Reinhardt skin for Reinhardt?",
  "Have you ever reached Diamond rank?",
  "Have you made it to Grandmaster in Overwatch?",
  "Have you ever hit Champion or Top 500?",
  "Have you stayed in the same rank for more than six months?",
  "Have you been hardstuck in a rank for over a year?",
  "Was that rank either Gold or Platinum?",
  "Have you spent more than $100 on Overwatch?",
  "Have you dropped over $500 on the game?",
  "Have you played every day for a full week?",
  "Have you logged in every day for a full month?",
  "Have you binged for six hours or more in one session?",
  "Have you ever quit a match out of frustration?",
  "Have you yelled at your screen while gaming?",
  "Have you typed a harsh message to a teammate?",
  "Have you raised your voice at someone over voice chat?",
  "Have your teammates ever muted you mid-match?",
  "Have you been hit with a chat restriction?",
  "Has Overwatch caused a rift in any friendships?",
  "Have you run into someone in-game who made you genuinely uneasy?",
  "Have you broken an object due to rage while playing?",
  "Have you shamed someone in a public setting over how they played?",
  "Have you taken in-game trash talk too far?",
  "Have you ever issued or received threats because of a match?",
  "Have you added someone post-game just to vent at them?",
  "Have you ever ignored personal hygiene just to keep playing?",
  "Have you missed work or school to play?",
  "Have you skipped a major life moment to queue up?",
  "Have you played while under the influence of alcohol?",
  "Have you queued up while feeling high?",
  "Have you played under the influence of stronger substances?",
  "Has playing Overwatch affected your health or well-being?",
  "Do you play to relax but end up more frustrated?",
  "Has a disagreement over Overwatch ever led to a physical fight?",
  "Have you ever flirted with another player during a match?",
  "Have you imagined an Overwatch character in a romantic way?",
  "Have you pretended to be an Overwatch character in an adult scenario?",
  "Have you made or viewed suggestive fan content?",
  "Have you visited Reddit just to find that type of content?",
  "Have you used Twitter to seek that type of content?",
  "Have you ever done... certain things... while thinking of an Overwatch character?",
  "Or while thinking of a content creator from the community?",
  "Has that happened ten or more times?",
  "Was it specifically Mercy, D.Va, or Widowmaker?",
  "Have you ever been caught mid-act while thinking of a character?",
  "Do you know who Jeff Kaplan is?",
  "Have you played a match without any clothes on?",
  "Have you deleted another game to make room for Overwatch?",
  "Have you sent personal photos to someone you met in-game?",
  "Have you received those kinds of photos from another player?",
  "Have you ever dressed up as a character from the game?",
  "Have you overly supported a teammate in a... unique context?",
  "Have you matched usernames with someone else?",
  "Have you thrown a game on purpose?",
  "Have you queued on a lower-ranked account?",
  "Have you lost matches intentionally for a reward?",
  "Have you used exploits or tools to gain an unfair advantage?",
  "Have you ever used unauthorized programs while playing?",
  "Have you created or spread cheat software?",
  "Have you teamed up with others to influence match results?",
  "Have you helped someone rank up artificially?",
  "Has someone done that for you?",
  "Have you sold a game account or in-game items?",
  "Have you bought one from someone else?",
  "Have you hidden your real gender while playing?",
  "Have you pretended to be older or younger than you are?",
  "Have you exaggerated your in-game history?",
  "Have you faked being high-ranked?",
  "Have you made a second account to check on someone secretly?",
  "Have you watched a stream while playing against that streamer?",
  "Have you followed someone across multiple lobbies?",
  "Are you someone who sticks to heroes like Sombra, Junkrat, Moira, Symmetra, Mei, or Mauga?",
  "Have you picked one of those heroes to specifically annoy the other team?",
  "Have you crouch-spammed someone just because they used one of those characters?",
  "Do you engage in hard counter-picking without shame?",
  "Have you ever stayed at the enemy spawn to keep them stuck?",
  "Have you ever spawn-trapped an entire team?",
  "Have you spawn-camped someone solely due to their hero pick?",
  "Have you met another player with the exact same gamertag?",
  "Have you ever misled a dev, admin, or moderator to get someone banned?",
  "Have you been removed from any community or forum?",
  "Have you been part of any public drama in the Overwatch world?",
  "Have you altered screenshots to make yourself look better?",
  "Have you accessed someone else’s account without permission?",
  "Have you tried to get into Blizzard’s systems?",
  "Have you gambled on pro Overwatch matches?",
  "Have you been temporarily suspended from the game?",
  "Have you received a full ban from Overwatch?",
  "Have you shared a match with someone well-known?",
  "Have you harassed a streamer while they were live?",
  "Have you ever disrespected a Reinhardt 1v1 duel?",
  "Is Supertf your favorite player?",
];

const SCORE_MEANINGS = [
  {
    min: 90,
    max: 100,
    text: "A score between 90 and 100 means you have kept your Overwatch habits light and have avoided many of the wild moments that hardcore players live for.",
  },
  {
    min: 70,
    max: 89,
    text: "A score between 70 and 89 means you are an active player, with some memorable and spicy Overwatch moments, but you still keep it fairly chill.",
  },
  {
    min: 40,
    max: 69,
    text: "A score between 40 and 69 means you are deeply involved in Overwatch and have experienced many chaotic matches, strong opinions, and community moments.",
  },
  {
    min: 0,
    max: 39,
    text: "A score between 0 and 39 means you are very invested in Overwatch, with plenty of memes, drama, and habit-facing gameplay that only true fans understand.",
  },
];

function getScoreMeaning(score) {
  return SCORE_MEANINGS.find((range) => score >= range.min && score <= range.max)?.text || "";
}

export default function OverwatchRicePurityTestPage() {
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
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 50);
  }, []);

  return (
    <div className="App">
      <Header />
      <main data-testid="main-content">
        <section className="mx-auto max-w-3xl px-4 pt-10 pb-10 sm:px-6 sm:pt-14 lg:px-8">
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl text-center">
            Overwatch Rice Purity Test
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[16px] leading-relaxed text-ink-700 text-center">
            Have you played Overwatch 2, filled with unforgettable matches, amazing moments, and a community of wonderful gamers? Every type of person is a part of the community: chaotic, passionate, or unhinged. Which one are you? Take the Overwatch Rice Purity Test to check the personality you hold. It’s a community-made 100-question quiz that focuses on experiences, memories, and habits related solely to Overwatch.
            <br /><br />
            This test follows the structure of the <a href="/" className="rpt-interlink">Rice purity Test</a>, but the questions included are about Overwatch, which gamers can relate to. With an evolving community of Overwatch gamers, the test became a meme and spread across social media and gaming communities.
          </p>
          <div className="mx-auto max-w-xl text-center mt-2">
            <span className="text-[16px] text-ink-700">
              Want more action-game content? Try the <a href="/valorant-rice-purity-test" className="rpt-interlink">Valorant Rice Purity Test</a> too.
            </span>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-10 sm:px-6 lg:px-8">
          <h3 className="font-heading text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl mt-10">
            Questions
          </h3>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Answer every question honestly by checking the boxes that apply to you. Each checked item subtracts one point from the full 100 score.
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
                {OVERWATCH_QUESTIONS.map((q, i) => (
                  <li key={i} className="flex items-start gap-3 py-3 px-4">
                    <input
                      id={`q${i}`}
                      type="checkbox"
                      checked={!!checked[i]}
                      onChange={() => handleToggle(i)}
                      className="mt-1 h-5 w-5 accent-[#FACC15]"
                    />
                    <label htmlFor={`q${i}`} className="text-base cursor-pointer select-none flex-1">
                      {i + 1}. {q}
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
                    Overwatch Rice Purity Test · Result Card
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
                    Overwatch Score Category
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
          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">
            What is Overwatch?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Overwatch is a community-based, free-to-play, team-based shooter game designed and developed by Blizzard Entertainment. It’s a team-based game where 5v5 players compete with each other in a fast-paced environment. They can select any of the 45 unique characters each of which has different abilities, damage, weapons, and support roles.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            While playing, the main concern of teams is to defend areas, capture control points on the map, and complete many other goals. In 2016, Overwatch was released and became popular as an action shooter game. Now, Blizzard Entertainment has upgraded the game and launched Overwatch 2 with better graphics, updated heroes, and more amazing features.
          </p>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">
            What is the Overwatch Rice Purity Test?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            It’s a fan-made quiz with one hundred questions created to measure how deeply someone is involved in Overwatch. Unlike other tests, it doesn’t ask questions about general life and experiences; it is fully focused on what kind of choices you make while playing matches, cosmic spending habits, and tough questions about your relationships with heroes.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            What makes it different from others is that its questions reflect everyday life of an Overwatch gamer. Some questions are simple, but some are eyebrow-raising. The score you’ll see is out of 100; a lower score indicates greater involvement in the game, and a higher score shows your purity.
          </p>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">
            Overwatch Rice Purity Test Score Meaning
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The score tells you how deep your Overwatch habits are. A high score means you are more pure in the context of this game, while a lower score means you are more involved in all the chaotic, memorable, and intense Overwatch experiences.
          </p>
          <ul className="list-disc ml-6 mt-2 text-[16px] text-neutral-700">
            <li>90–100: You keep your Overwatch habits light and mostly stick to casual moments.</li>
            <li>70–89: You are a solid player with some intense matches and memorable gameplay.</li>
            <li>40–69: You are deeply involved in the game and have experienced many community and performance ups and downs.</li>
            <li>0–39: You are a hardcore Overwatch player with plenty of wild stories, drama, and dedication.</li>
          </ul>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">
            Explore More
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            If you enjoy gaming purity quizzes, there are more stories and guides waiting for you on our blog.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="/blog"
              className="inline-flex items-center justify-center rounded-full bg-ink-900 px-5 py-3 text-sm font-semibold text-cream-50 shadow-[0_2px_0_#000] transition hover:bg-ink-800"
            >
              Explore Blog
            </a>
            <a
              href="/valorant-rice-purity-test"
              className="inline-flex items-center justify-center rounded-full border border-ink-900 px-5 py-3 text-sm font-semibold text-ink-900 transition hover:bg-ink-100"
            >
              Valorant Rice Purity Test
            </a>
          </div>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-12">
            Conclusion
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The Overwatch Rice Purity Test is a viral gaming quiz that covers humor, chaos, and unforgettable experiences while being part of the Overwatch community. At the end, whether you get a high or low score, it still shows that you have spent years playing Overwatch. The sole purpose of the test is entertainment.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
