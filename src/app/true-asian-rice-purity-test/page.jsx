"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TRUE_ASIAN_QUESTIONS = [
  "You never wear shoes past the front door.",
  "You swap into indoor slippers the moment you step inside.",
  "There is a bag stuffed with other plastic bags somewhere in your kitchen.",
  "The rice cooker basically lives on the counter and never gets put away.",
  "Your home has a backup rice cooker, or one so old it should have died years ago.",
  "Nobody uses the dishwasher, even though the house has one.",
  "Laundry gets air-dried on racks instead of tumbled in a dryer.",
  "Takeout containers and glass jars become your food storage.",
  "Appliance boxes and shoeboxes get kept for years, just in case.",
  "Nice things get kept for good and saved for occasions that rarely come.",
  "A biscuit or cookie tin in your house actually holds sewing supplies.",
  "There is a pair of special scissors reserved for exactly one job.",
  "Lights get switched off in every empty room to save on the bill.",
  "You own a heavy floral duvet or blanket that weighs a ton.",
  "A thick blanket appears the instant the temperature drops even slightly.",
  "There is a small white fluffy dog in the family.",
  "Rice appears at nearly every meal.",
  "Rice comes home in a giant sack, not a small bag.",
  "You were warned to finish every grain of rice or face some old superstition.",
  "You start the morning with warm or hot water instead of anything cold.",
  "You carry a thermos of hot water or tea almost everywhere.",
  "You brew tea with all sorts of extra bits floating in it.",
  "Chopsticks are your default, even for chips and snacks.",
  "You will eat a sandwich holding it with a tissue or plastic bag to keep your hands clean.",
  "You have real opinions about preserved and pickled foods.",
  "You slap or knock on watermelons to pick the best one.",
  "You save extra sauce packets and napkins from takeout.",
  "A show or video is playing during almost every meal.",
  "You have or had an unhealthy love for instant noodles.",
  "You eat certain foods specifically to heat up or cool down your body.",
  "You are lactose intolerant but still drink boba anyway.",
  "You drank milk religiously as a kid to grow taller.",
  "You will happily consume odd remedies because they are good for you.",
  "You had tutoring in primary school.",
  "You had tutoring in high school.",
  "You were in tutoring before primary school even started.",
  "You went to weekend language school.",
  "You learned piano, violin, or cello.",
  "You leaned hard into science and maths subjects.",
  "You study, or were expected to study, medicine, law, or engineering.",
  "You have lied about your grades at least once.",
  "You feel real guilt when you do not get top marks.",
  "You got disciplined with whatever household object was nearest.",
  "You had a strict curfew growing up.",
  "You get grilled about where you went and who you were with.",
  "You still ask permission before going out.",
  "Your parents compare you to the neighbors' kids by name.",
  "You get measured against a relative who became a doctor, lawyer, or engineer.",
  "You have never actually heard your parents say they are proud of you.",
  "You get a lecture from your parents almost daily.",
  "Affection in your family looks like a plate of cut fruit appearing without a word.",
  "You cut fruit into small pieces for friends and family too.",
  "Your family has a highkey offensive nickname for you.",
  "You felt genuine dread realizing you forgot to start the rice before a parent got home.",
  "You cried while being made to practice an instrument or study.",
  "You get New Year money that your parents immediately hold onto for you.",
  "You have regifted something you received to someone else.",
  "You speak your mother tongue fluently.",
  "You can read and write it, not just speak it.",
  "You speak your regional dialect fluently.",
  "You use more of your mother language at home than English.",
  "You know your family's national anthem.",
  "You curse in your mother language when the moment calls for it.",
  "You lived in your family's home country for most of your life.",
  "You go back to the home country several times a year.",
  "Most of your close friends are Asian.",
  "You forward random articles from WeChat or KakaoTalk to relatives.",
  "You turn red after even a sip of alcohol.",
  "You do stretches first thing in the morning.",
  "You soak or boil your feet at night.",
  "You have a small round scar on your upper arm.",
  "You have had cupping, coining, or similar home remedies done on you.",
  "Your eyesight suffered from too much time on the computer.",
  "You can hold a full flat-footed squat with no trouble.",
  "You believe in a few household superstitions, like where furniture should go.",
  "You keep a real skincare routine.",
  "You look noticeably younger than your actual age.",
  "You grew up on anime like Naruto, One Piece, or Avatar.",
  "You watched Crayon Shin-chan as a kid.",
  "You still listen to K-pop, C-pop, or J-pop.",
  "You played Maplestory, LoL, Dota, CS, or StarCraft back in the day.",
  "You collected Yu-Gi-Oh or Pokemon cards.",
  "You know how to play Mahjong or a similar tile game.",
  "You watched the original wave of Asian YouTubers.",
  "You throw up a peace sign in photos on instinct.",
  "You can do the flashy pen-spinning trick.",
  "You mostly buy things when they are on sale.",
  "You haggle or expect a discount whenever there is any room to.",
  "You have fought someone at the table over who pays the bill.",
  "You have fudged your age to get a cheaper ticket.",
  "You bring a wheeled shopping trolley when you shop, the louder the color the better.",
  "You wear a sun visor outdoors.",
  "You arrive at the airport hours earlier than needed.",
  "You still live with your parents.",
  "You had a bowl cut as a child.",
  "You wore matching outfits with your siblings.",
  "You had a pet fish or rabbit growing up.",
  "You took a big trip to Japan, Korea, or China after high school.",
  "You spent part of your childhood staring at the lobster tank at restaurants.",
  "According to your parents, dating is off limits until you are almost 30.",
];

const SCORE_MEANINGS = [
  { min: 90, max: 100, text: "Extremely relatable to the True Asian Test checklist, with many shared household, food, school, and family experiences checked." },
  { min: 70, max: 89, text: "Very relatable, with a strong mix of cultural habits, family expectations, school memories, and everyday Asian household experiences." },
  { min: 45, max: 69, text: "Moderately relatable. You checked several familiar experiences, but plenty of the list still does not match your life." },
  { min: 20, max: 44, text: "Lightly relatable. A few items landed, but your upbringing or daily life does not strongly match the checklist." },
  { min: 0, max: 19, text: "Only a small part of the checklist matched you. This score is just for fun and does not define identity or belonging." },
];

function getScoreMeaning(score) {
  for (const range of SCORE_MEANINGS) {
    if (score >= range.min && score <= range.max) return range.text;
  }
  return "";
}

export default function TrueAsianRicePurityTestPage() {
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
    setFinalScore(checkedCount);
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
          <h1 className="mt-5 text-center text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">True Asian Rice Purity Test</h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-[16px] leading-relaxed text-ink-700">
            If you belong to Asia and have seen friends posting screenshots of an asian purity test and arguing over who scored higher, you have run into the True Asian Rice Purity Test. It looks familiar because it borrows its layout from the <a href="/" className="rpt-interlink">Rice Purity Test</a>, but it plays by different rules, and most write-ups online get those rules wrong.
            <br /><br />
            Here is the interesting part that confuses people most of the time. On the classic test, checking more boxes lowers your score. On the True Asian Test, checking more boxes raises it. The whole thing is reversed, and once you know that, then everything makes sense.
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
            <h2 className="text-center font-heading text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">Questions</h2>
            <ul className="mb-6 divide-y divide-ink-200 rounded-xl border bg-cream-50">
              {TRUE_ASIAN_QUESTIONS.map((q, i) => (
                <li key={i} className="flex items-center px-4 py-3">
                  <input
                    id={`q${i}`}
                    type="checkbox"
                    checked={!!checked[i]}
                    onChange={() => handleToggle(i)}
                    className="mr-3 h-5 w-5 accent-[#FACC15]"
                  />
                  <label htmlFor={`q${i}`} className="cursor-pointer select-none text-base">
                    {i + 1}. {q}
                  </label>
                </li>
              ))}
            </ul>
            <div className="flex justify-center gap-4">
              <button type="submit" className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700">
                Calculate Score
              </button>
              <button type="button" onClick={handleReset} className="rounded bg-gray-200 px-6 py-2 text-gray-800 transition hover:bg-gray-300">
                Reset
              </button>
            </div>
          </form>
        </section>

        {stage === "done" && finalScore !== null && (
          <section id="result" data-testid="result-section" className="mx-auto max-w-3xl px-4 pt-10 pb-24 sm:px-6 sm:pt-16 lg:px-8">
            <div className="rpt-certificate animate-pop-in relative p-8 sm:p-12">
              <div className="text-center">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-ink-500">
                  True Asian Rice Purity Test Result Card
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <span className="h-px w-10 bg-ink-300" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">your score</span>
                  <span className="h-px w-10 bg-ink-300" />
                </div>
                <div className="relative mx-auto mt-2 inline-block">
                  <span className="text-[28vw] font-extrabold leading-none tracking-tight text-ink-900 sm:text-[200px] lg:text-[220px]">
                    {finalScore}
                  </span>
                  <span className="absolute -right-10 top-5 font-mono text-sm font-semibold text-ink-500 sm:text-base">/ 100</span>
                </div>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">True Asian Score Category</h2>
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

        <section id="about" data-testid="seo-content" className="rpt-prose mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">What the True Asian Rice Purity Test Is</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The True Asian Test is a parody quiz built on the format of the original Rice Purity Test. It was created by Liang Pan. Instead of measuring innocence or life experience, it measures how many stereotypically Asian household and upbringing experiences you can relate to.
          </p>
          <img
            src="/true-asian-rice-purity-test.webp"
            alt="True Asian Rice Purity Test featured image about Asian upbringing quiz"
            className="mt-6 h-auto w-full rounded-lg border border-ink-200 object-cover"
          />
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            You go down a checklist and tick every item that applies to you. The more you tick, the higher your percentage will be and the more asian your belonging proves. It leans into humor about strict parents, tutoring, food habits, and growing up in an Asian household, so it lands hardest with people who lived those things.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            It is not a scientific measure of identity or heritage. There is no official body behind it, no data collection about your ethnicity, and no real meaning to the number. It is a shared-experience meme that spread through TikTok and group chats, which is exactly why the how asian are you framing caught on.
          </p>

          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">How the Scoring Works (and Why It Confuses People)</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            This is where accuracy matters, because several popular articles describe the scoring backwards by copying the logic of the classic test.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            On the True Asian Test, you check off every item you have actually done or experienced. Every box you tick pushes your total higher, and the site converts that tally into a percentage at the end. Higher means you relate to more of the list. The site adds a joke warning that scoring below 90 percent means you bring dishonour to your family, which is played for laughs, not as a real threshold.
          </p>
          <div className="mt-5 overflow-hidden rounded-lg border border-ink-200">
            <table className="w-full text-left text-sm text-neutral-700">
              <thead className="bg-[#FACC15]/25 text-ink-900">
                <tr><th className="px-4 py-3">Test</th><th className="px-4 py-3">You check items that...</th><th className="px-4 py-3">Higher score means</th></tr>
              </thead>
              <tbody className="divide-y divide-ink-200 bg-cream-50">
                <tr><td className="px-4 py-3 font-semibold">Classic Rice Purity Test</td><td className="px-4 py-3">you have done</td><td className="px-4 py-3">less pure, more life experience</td></tr>
                <tr><td className="px-4 py-3 font-semibold">True Asian Rice Purity Test</td><td className="px-4 py-3">you relate to</td><td className="px-4 py-3">more relatable Asian upbringing experiences</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            If you see a guide telling you that a high score on the True Asian Test means least experienced or most pure, that guide is applying the old scoring by mistake. The two tests share a look, not a meaning.
          </p>

          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">What Kind of Questions It Asks</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The checklist runs to dozens of items, all pulled from everyday life rather than the milestone-and-taboo questions of the original. They cluster into a few loose themes.
          </p>
          <h3 className="mt-6 font-heading text-xl font-semibold text-neutral-900">Home and daily habits:</h3>
          <ul className="ml-6 mt-2 list-disc text-[16px] text-neutral-700">
            <li>No shoes worn inside the house</li>
            <li>Eating rice almost every day and owning a rice cooker</li>
            <li>Drinking warm or hot water in the morning</li>
            <li>Keeping a stash of plastic bags at home</li>
          </ul>
          <h3 className="mt-6 font-heading text-xl font-semibold text-neutral-900">School and parents:</h3>
          <ul className="ml-6 mt-2 list-disc text-[16px] text-neutral-700">
            <li>Tutoring in primary or high school</li>
            <li>Saturday language school</li>
            <li>Learning piano, violin, or cello</li>
            <li>A curfew and getting asked where you were and who you were with</li>
          </ul>
          <h3 className="mt-6 font-heading text-xl font-semibold text-neutral-900">Culture and pop culture:</h3>
          <ul className="ml-6 mt-2 list-disc text-[16px] text-neutral-700">
            <li>Watching anime or listening to K-pop, C-pop, or J-pop</li>
            <li>Being able to do the asian squat with feet flat</li>
            <li>Getting asian flush after a small amount of alcohol</li>
            <li>Believing in household superstitions</li>
          </ul>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The tone throughout is affectionate and self-deprecating, which is why it reads as a bonding exercise rather than a real assessment. People share results to say same, not to compete on virtue.
          </p>

          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">True Asian Test vs the Original Rice Purity Test</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            They are easy to mix up, so here is the short version of how they differ.
          </p>
          <div className="mt-5 overflow-hidden rounded-lg border border-ink-200">
            <table className="w-full text-left text-sm text-neutral-700">
              <thead className="bg-[#FACC15]/25 text-ink-900">
                <tr><th className="px-4 py-3">Feature</th><th className="px-4 py-3">Rice Purity Test</th><th className="px-4 py-3">True Asian Rice Purity Test</th></tr>
              </thead>
              <tbody className="divide-y divide-ink-200 bg-cream-50">
                <tr><td className="px-4 py-3 font-semibold">Origin</td><td className="px-4 py-3">Rice University student culture</td><td className="px-4 py-3">Parody by Liang Pan</td></tr>
                <tr><td className="px-4 py-3 font-semibold">Measures</td><td className="px-4 py-3">Innocence and life experience</td><td className="px-4 py-3">Relatable Asian upbringing</td></tr>
                <tr><td className="px-4 py-3 font-semibold">Checking a box</td><td className="px-4 py-3">Lowers your score</td><td className="px-4 py-3">Raises your score</td></tr>
                <tr><td className="px-4 py-3 font-semibold">Tone</td><td className="px-4 py-3">Mixed, sometimes serious</td><td className="px-4 py-3">Comedic throughout</td></tr>
                <tr><td className="px-4 py-3 font-semibold">Best score to brag about</td><td className="px-4 py-3">A high number, more innocent</td><td className="px-4 py-3">A high number, more relatable</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The original started as a self-scored survey in Rice University's student newspaper in the 1920s and later grew into the 100-question format that went viral on TikTok. The True Asian Test is a much more recent spin-off that kept the checkbox design and swapped in cultural in-jokes.
          </p>

          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">Should You Take It Seriously?</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            No, and that is the point. The True Asian Test is entertainment. It cannot tell you whether you count as Asian, and questions like am I asian do not have a real answer hiding inside a checkbox quiz. Identity is not a percentage.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            It is worth being aware that purity style tests, including the original, have been criticized for the way they frame experience and culture. Treat the True Asian Test the way its creator intended, as a lighthearted way to laugh about shared experiences with friends, and it holds up fine. Read too much into the number and you are giving a meme more weight than it can carry.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}