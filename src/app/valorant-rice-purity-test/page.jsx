"use client";
import { useCallback, useMemo, useState, useEffect } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const VALORANT_QUESTIONS = [
  "Played Valorant?",
  "Got the Valorant Beta key?",
  "Played 5 Duelists in Competitive?",
  "Instalocked?",
  "Bought a skin?",
  "Bought a battle pass?",
  "Maxed out an Agent's progression?",
  "Recieved a Riot gun buddy?",
  "Recieved an I Create Buddy?",
  "Hit Ascendant or higher?",
  "Hit Immortal or higher?",
  "Hit Radiant?",
  "Been stuck in a rank for more than 6 months?",
  "Been stuck in a rank for more than a year?",
  "Check this box if that rank was Gold or Platinum",
  "Over Level 400?",
  "Spent over $1,000 on skins?",
  "Disrespected a knife 1v1?",
  "Played Valorant every single day for a month?",
  "Played Valorant for more than 6 hours straight?",
  "Rage quitted a game?",
  "Screamed at your monitor while playing?",
  "Sent a toxic message to a teammate?",
  "Yelled at or flamed a teammate in voice chat?",
  "Been muted by your teammates?",
  "Been chat or comm banned?",
  "Lost a friendship due to Valorant?",
  "Met someone on Valorant that you would consider a legitimate threat to society?",
  "Broken anything out of rage from Valorant?",
  "Publicly shamed someone for their gameplay?",
  "Added someone after a game to flame them?",
  "Sent or recieved a death threat to someone over a game?",
  "Joined a party after a game solely to argue?",
  "Neglected personal hygeine to play Valorant?",
  "Skipped school or work to play Valorant?",
  "Missed a major life event (wedding, funeral, etc) to play Valorant?",
  "Played while drunk?",
  "Played while high?",
  "Played while on drugs harder than marijuana?",
  "Let Valorant negatively affect your mental health?",
  "Played Valorant to relieve stress only to end up getting more stressed?",
  "Got into physical conflict because of Valorant?",
  "Flirted with someone in game?",
  "Had a sexual fantasy about a Valorant character?",
  "Created or seen inappropriate fan art?",
  "Gone on Reddit or Twitter for the sole purpose of viewing said fan art?",
  "Ever...you know... to a Valorant character?",
  "Ever...you know... done it to a Valorant character more than 10 times?",
  "Repeeked an op your teammate died to just to also die to the op?",
  "Believed PROD was NA's last hope?",
  "Know who the humble king is?",
  "Queued swiftplay for the sole purpose of finding love?",
  "Sent explicit pictures to someone you met on Valorant?",
  "Recieved explicit pictures from someone you met on Valorant?",
  "Strongly considered dating someone you met on Valorant?",
  "Cosplayed as a Valorant character?",
  "Got told you have a Valorant accent?",
  "Thrown a game on purpose?",
  "Smurfed?",
  "Got boosted by a smurf?",
  "Seen an e-couple?",
  "Made fun of edaters knowing full well you would do the same thing with the right person?",
  "Seen an 'i miss her'?",
  "Cheated in Valorant?",
  "Placed a bet on a pro match?",
  "Collaborated with others to rig matches?",
  "Gotten on a friends account to boost them?",
  "Had someone go on your account to boost you?",
  "Bought an alt account?",
  "Sold an account?",
  "Gifted a skin to someone?",
  "Check this box if you were romantically attracted to that person.",
  "Faked your gender in a game?",
  "Faked your voice in a game to make it deeper or higher?",
  "Was sexually attracted to someone's voice?",
  "Ever lied about your rank or achivements?",
  "Used tracker.gg to spy on someone?",
  "Stream sniped someone?",
  "Consistently an Odin, Judge, or Operator abuser?",
  "Used any of the weapons above for the sole purpose of tilting the enemy team?",
  "T-bagged a player?",
  "Shot someone's body after you killed them?",
  "Thought about Brimstone ulting a crowded area IRL?",
  "Barked or meowed at Sage/Skye for a heal?",
  "Acted annoying/loud in agent select to try and get someone to dodge?",
  "Actually edated someone you met on Valorant?",
  "Been banned from a Valorant fourm or discord?",
  "Joined a discord for the sole purpose of shit talking someone?",
  "Ever watched or listened to motivational speeches before queueing?",
  "Listened to any of the following artists while playing: glaive,Keshi,Joji?",
  "Thought to yourself 'these guys are pro?' after seeing a pro player die to spike instead of saving?",
  "Fell for a fake yoru clone?",
  "Turned from a flash IRL?",
  "Turned from a bird IRL thinking it was a Skye flash?",
  "Tried to jump or jiggle peek a corner IRL?",
  "Know where the Subroza angle is?",
  "Got tilted only after losing pistol?",
  "Copied a pro's crosshair or settings?",
  "Felt hyped after watching a pro match just to log on and bottom frag?",
  "Pi'ed in a ranked game?",
];

const SCORE_MEANINGS = [
  { min: 80, max: 100, text: "This score level indicates you’re a pure player and have the highest purity. You have been a chill and clean player who follows the rules." },
  { min: 60, max: 79, text: "You have little experience and a safer score level. This shows you explored a little darker side of Valorant." },
  { min: 40, max: 59, text: "That range tells you utilized the darker side at a moderate level, like toxic language, cheat code plays, etc." },
  { min: 20, max: 39, text: "Experienced score level, it tells you actively involved in chaotic habits and have faced game bans and other violations." },
  { min: 0, max: 19, text: "Highest score level and fully unhinged Valorant behaviour." },
];

function getScoreMeaning(score) {
  for (const range of SCORE_MEANINGS) {
    if (score >= range.min && score <= range.max) return range.text;
  }
  return "";
}

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can I retake the Valorant Rice Purity Test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, you can retake the test as many times as you want. Simply click on the “Retake Test” button after you see your score."
      }
    },
    {
      "@type": "Question",
      "name": "Is the Valorant rice purity test free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Do not pay any platform for the test. It’s completely free; the majority of the platforms provide it for free."
      }
    },
    {
      "@type": "Question",
      "name": "Is the Valorant Rice Purity Test accurate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Like the original test, which is also not scientifically proven, it’s not accurate at all. It just tells you the answer based on your experiences, which requires no scientific proof; just take it as fun."
      }
    }
  ]
};

export default function ValorantRicePurityTestPage() {
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  }, []);

  return (
    <>
      {/* FAQPage Schema.org JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
        key="faq-schema"
      />
      <div className="App">
        <Header />
        <main data-testid="main-content">
        <section className="mx-auto max-w-3xl px-4 pt-10 pb-10 sm:px-6 sm:pt-14 lg:px-8">
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl text-center">Valorant Rice Purity Test</h1>
          <p className="mx-auto mt-3 max-w-xl text-[16px] leading-relaxed text-ink-700 text-center">
            Are you looking for the viral Valorant Rice Purity Test trend? Do you want to check how familiar you are with Valorant’s in-game action, different experiences, and overall gameplay? Take this test. It is a parody of the official rice purity, a self-assessment questionnaire purely about the Valorant game.
            <br /><br />
            The core concept of this test same as the original version; you just answer the right question that relates to you. The questions in this test aim to focus on players' playing habits, how they play, and their ethical boundaries. Also, it focuses on all the achievements while playing the game and the rankings of the players, whether they are beginners or pros.
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
                {VALORANT_QUESTIONS.map((q, i) => (
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
                    Valorant Rice Purity Test · Result Card
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
                    Valorant Score Category
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
        <section id="about" data-testid="seo-content" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 rpt-prose">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-4">What is the Valorant Purity Test</h1>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Valorant is a famous shooting game designed by Riot Games. Inspired by the <a href="/" className="rpt-interlink">rice purity test</a>, Valorant's active community of gamers created this trend to check the purity score of players and test their game knowledge. This test is also a complete 100-question list where all questions are about Valorant.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The test results show how you have experienced the game and give you score between 0 to 100. This score helps to understand how dedicated the players are, toxicity levels, or whether players use unethical ways to get higher rankings. Take the test by simply answering in yes no format like the original version.
          </p>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">How to Take the Valorant Rice Purity Test</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            There are plenty of options available online to take the test. Many sites are available on the internet. Just visit a trusted website like ours and start taking the test. Here’s a detailed guide about taking the test efficiently:
          </p>
          <ul className="list-disc ml-6 mt-2 text-[16px] text-neutral-700">
            <li>Open a browser on your device and search “Valorant rice purity test”.</li>
            <li>There will be plenty of websites that will appear on the search engine. Select one of them or take the test on this website at the start of the page.</li>
            <li>Start attempting the 100-question list and answer each one of them honestly.</li>
            <li>On completion of the test, click the “Calculate Score” button, and you’ll see the score ranging from 0 to 100.</li>
            <li>At last, share the score with fellow gamers by clicking the share button.</li>
          </ul>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            With these easy steps, you can evaluate your Valorant purity score.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Want to try something different? <a href="/rice-purity-test-for-14-years-old" className="rpt-interlink">Take the Rice Purity Test for 14-year-olds</a> especially designed for younger teens.
          </p>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">How Score Calculated in the Valorant Rice Purity Test</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            There are a total of 5 level scores in the test. Each level describes a different personality of the player. Below, we have explained each level in detail:
          </p>
          <ul className="list-disc ml-6 mt-2 text-[16px] text-neutral-700">
            <li><span className="font-bold">100–80</span><br />This score level indicates you’re a pure player and have the highest purity. You have been a chill and clean player who follows the rules.</li>
            <li><span className="font-bold">79–60</span><br />You have little experience and a safer score level. This shows you explored a little darker side of Valorant.</li>
            <li><span className="font-bold">59–40</span><br />That range tells you utilized the darker side at a moderate level, like toxic language, cheat code plays, etc.</li>
            <li><span className="font-bold">39–20</span><br />Experienced score level, it tells you actively involved in chaotic habits and have faced game bans and other violations.</li>
            <li><span className="font-bold">19–0</span><br />Highest score level and fully unhinged Valorant behaviour.</li>
          </ul>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">Final Thoughts</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The Valorant rice purity test is a game experience questionnaire quiz that asks you questions in a lighthearted way. The score you get by taking this test doesn’t define your character; it just shows how well aware you are of Valorant. Do not take this test to judge your personality; it’s just a fun quiz, don’t take it personally.
          </p>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10 mb-4">Frequently Asked Questions</h2>
          <div className="mx-auto max-w-2xl">
            <Accordion type="single" collapsible className="rounded-xl border bg-cream-50 divide-y divide-ink-200">
              <AccordionItem value="faq-1">
                <AccordionTrigger className="text-base font-semibold px-4 py-3">Can I retake the Valorant Rice Purity Test?</AccordionTrigger>
                <AccordionContent className="text-[16px] px-4 pb-4 pt-0 text-neutral-700">
                  Yes, you can retake the test as many times as you want. Simply click on the “Retake Test” button after you see your score.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger className="text-base font-semibold px-4 py-3">Is the Valorant rice purity test free?</AccordionTrigger>
                <AccordionContent className="text-[16px] px-4 pb-4 pt-0 text-neutral-700">
                  Do not pay any platform for the test. It’s completely free; the majority of the platforms provide it for free.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger className="text-base font-semibold px-4 py-3">Is the Valorant Rice Purity Test accurate?</AccordionTrigger>
                <AccordionContent className="text-[16px] px-4 pb-4 pt-0 text-neutral-700">
                  Like the original test, which is also not scientifically proven, it’s not accurate at all. It just tells you the answer based on your experiences, which requires no scientific proof; just take it as fun.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
        <Footer />
      </div>
    </>
  );
}
