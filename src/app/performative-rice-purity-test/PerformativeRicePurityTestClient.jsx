"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PERFORMATIVE_QUESTIONS = [
  "Do you use wired headphones (even if you own AirPods)?",
  "Do you own a tote bag?",
  "Do you frequently carry a tote bag with a graphic or arty print?",
  "Do you carry a tote bag at least once a week?",
  "Do you wear baggy jeans?",
  "Do you wear jorts?",
  "Do you wear flannels or workwear overjackets?",
  "Do you wear sunglasses indoors?",
  "Do you wear beanies indoors for style more than warmth?",
  "Do you drink matcha?",
  "Have you ever put matcha into random foods?",
  "Have you ever drunk matcha without actually liking the taste?",
  "Do you drink non-dairy milk without being lactose intolerant?",
  "Do you make and share playlists?",
  "Do you make Pinterest boards?",
  "Do you have stickers on your laptop?",
  "Do you keep a Polaroid in your phone case?",
  "Do you wear any fitness watch that's not an Apple Watch (Whoop, Garmin, etc.)?",
  "Do you have stickers on your water bottle?",
  "Do you put carabiners on your keys, water bottles, or bags?",
  "Do you own or carry a Fujifilm Instax camera?",
  "Have you ever used retro or film camera apps to edit your photos?",
  "Do you use Polaroid photos as wall decor?",
  "Do you own a vinyl record or CD player?",
  "Do you carry an iPod (not your phone)?",
  "Do you own a digicam (digital camera)?",
  "Do you take photos with a digicam (not just your phone)?",
  "Do you own vintage or thrifted statement clothing?",
  "Do you spend your weekends thrifting or at flea markets?",
  "Do you own a Labubu keychain or figurine?",
  "Do you carry a Labubu around?",
  "Do you own blue-light glasses?",
  "Do you own or use a Muji pen?",
  "Do you own more than three Moleskine or Muji notebooks?",
  "Do you own more than three literary magazines or subscribe to The New Yorker?",
  "Do you own more than one ironic tote (from museums, niche bookstores, events)?",
  "Do you own the Trader Joe's tote bag without shopping at Trader Joe's?",
  "Do you own a matcha kit (whisk, bowl, strainer)?",
  "Do you own or wear Arc'teryx without ever hiking?",
  "Do you wear Patagonia or Japanese workwear brands?",
  "Do you have a spam account?",
  "Do you have a Letterboxd account?",
  "Do you have a Substack or newsletter?",
  "Do you have a pin collection (enamel pins, patches, etc.)?",
  "Do you like Instagram Reels solely so others see what you liked?",
  "Do you repost tweets as story content?",
  "Do you or have you ever paid for verification on Instagram or Twitter?",
  "Do you post on Strava?",
  "Do you repost your Strava activity on Instagram?",
  "Have you ever bought a film or disposable camera?",
  "Do you know your MBTI?",
  "Have you ever pretended to be interested in pottery?",
  "Have you ever tried to learn to knit or crochet?",
  "Have you ever tried to learn a language with no intention of using it?",
  "Do you have a Depop account?",
  "Have you ever pretended to know how to skateboard?",
  "Have you ever tried to learn rollerblading?",
  "Have you ever posted an Instagram Note with a song?",
  "Have you ever posted an Instagram Note to fish for replies?",
  "Have you ever claimed to be taller than you really are?",
  "Have you ever soft-launched a relationship by posting hints but not the person?",
  "Have you ever captioned a post with an obscure reference or inside joke?",
  "Have you ever posted an ambiguous quote or lyric as an Instagram caption?",
  "Have you ever romanticized mundane tasks and posted about it (like getting groceries and pretending you're the main character)?",
  "Have you ever posted a photo dump of random aesthetic shots?",
  "Have you ever posted a moody sunset photo with no caption?",
  "Have you ever posted about holding or cuddling a friend's dog or someone's baby to get likes?",
  "Do you purposefully visit niche/local or third-culture coffee shops?",
  "Have you ever posted a story highlighting your favorite indie artist's new release?",
  "Do you wear/own a quarter zip?",
  "Have you ever posted an Instagram story of your workspace or desk setup?",
  "Have you ever posted a close-up of coffee foam or latte art?",
  "Have you ever posted about attending art gallery openings or pop-up exhibitions?",
  "Have you ever posted a photo of a stack of books you plan to read?",
  "Have you ever shared a reading list post with books you haven't read?",
  "Have you ever visited a bookstore just to take photos without buying anything?",
  "Have you ever journaled in public for the aesthetic?",
  "Have you ever read in public?",
  "Have you ever read a Jane Austen novel?",
  "Have you ever read The Creative Act: A Way of Being?",
  "Have you ever read or owned a copy of Atomic Habits?",
  "Have you ever read novels in coffee shops or public spaces?",
  "Have you ever read a book while waiting in line?",
  "Do you listen to Clairo?",
  "Do you listen to Laufey?",
  "Do you listen to Beabadoobee?",
  "Do you listen to Lorde?",
  "Do you listen to Phoebe Bridgers?",
  "Have you ever started listening to an artist because an MPS put you on?",
  "Have you ever made a Spotify playlist for a season or month?",
  "Have you ever asked a girl about Love Island or Coraline?",
  "Have you ever taken photos of your shoes on textured surfaces?",
  "Have you ever pretended to understand a niche film or book to seem cultured?",
  "Have you ever claimed to be performative since before?",
  "Do you know your moon sign?",
  "Do you know a trait from your zodiac sign?",
  "Do you have a SoundCloud account to listen to niche unreleased music from popular artists or indie creators?",
  "Have you ever faked annotating a book?",
  "Have you ever bought merch from a band you don't listen to?",
  "Do you say you're not performative, that's just who you are?",
];

const SCORE_MEANINGS = [
  { min: 80, max: 100, text: "You are mostly authentic and only lightly influenced by performative trends." },
  { min: 60, max: 79, text: "You have some performative habits, but they do not fully define your personality." },
  { min: 40, max: 59, text: "You are moderately performative and often influenced by online culture." },
  { min: 20, max: 39, text: "You are highly performative and probably curate your image very carefully." },
  { min: 0, max: 19, text: "You are extremely performative and deeply shaped by aesthetic internet culture." },
];

function getScoreMeaning(score) {
  return SCORE_MEANINGS.find((range) => score >= range.min && score <= range.max)?.text || "";
}

export default function PerformativeRicePurityTestClient() {
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
    <div className="App">
      <Header />
      <main data-testid="main-content">
        <section className="mx-auto max-w-3xl px-4 pt-10 pb-10 sm:px-6 sm:pt-14 lg:px-8">
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl text-center">
            Performative Rice Purity Test
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[16px] leading-relaxed text-ink-700 text-center">
            The Performative Rice Purity Test is a modern trend that started on social media, where purity is no longer the subject; it's modernized to check how performative a person is. It's all about your personality, opinions, behaviours, and life choices influenced by social media. It provides an amazing opportunity to reflect on how you try to appear cooler, more chill, aesthetic, or different online and in real life.
            <br /><br />
            The core idea is taken from the famous and viral <a href="/" className="rpt-interlink">purity test</a>, but this version doesn't focus on typical relationship and dating experiences. It asks how much you follow social trends, music taste, reading habits, fashion choices, etc.
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
              <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                Questions:
              </h2>
              <ul className="mb-6 divide-y divide-ink-200 border rounded-xl bg-cream-50">
                {PERFORMATIVE_QUESTIONS.map((question, index) => (
                  <li key={index} className="flex items-center py-3 px-4">
                    <input
                      id={`q${index}`}
                      type="checkbox"
                      checked={!!checked[index]}
                      onChange={() => handleToggle(index)}
                      className="mr-3 h-5 w-5 accent-[#FACC15]"
                    />
                    <label htmlFor={`q${index}`} className="text-base cursor-pointer select-none">
                      {index + 1}. {question}
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
                    Performative Rice Purity Test - Result Card
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
                    Performative Score Category
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
          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">
            What does Performative Mean?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Performativity is a social media term that means doing things just for appearances rather than genuine interest. It refers to the way a person portrays themselves, or being performative, when influenced by their social circle, instead of being genuine. The questions included are totally aesthetic or image-based by intention. It doesn't mean all of the habits or behaviors are fake, many people actually follow these things with a strong interest.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Here are some question categories:
          </p>
          <ul className="list-disc ml-6 mt-2 text-[16px] text-neutral-700">
            <li>Social media habits like mod-based stories, sharing, scrolling, photo dumps, and unclear captions.</li>
            <li>Fashion sense or choices such as baggy jeans, wired headphones, and accessories.</li>
            <li>Music taste, films and series, and home or desk setup.</li>
            <li>Coffee choices, reading habits, and many other lifestyle choices.</li>
          </ul>

          <h3 className="font-heading text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl mt-10">
            Is the Performative Purity Test Accurate?
          </h3>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            On the structural basis, it's totally accurate but not scientifically validated. The questions are random, which doesn't truly reflect anyone's personality. It's based on cultural norms, and participation allows you to do a self-assessment in a fun and modern way. So, it doesn't matter whether the test is accurate or not; learning and exploring life with a modern approach are what matters most.
          </p>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">
            Is Being Performative Always Bad?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Being performative isn't always a bad thing. Many people dress differently, listen to music, and share different things online under the influence of social media. So, many people present themselves in a different style on social media; it's normal. But when anybody starts doing things or adopting behaviours or fashion choices that truly do not truly reflect their personality, that's where being performative takes the wrong turn.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            This modern Performative Purity Test is a very useful way to understand whether the person is just performing on social media or actually has an interest in the things they are adopting. If you get a low score on the test, you might need to check your posting for yourself or for social performance.
          </p>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">
            Final Thoughts
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The Performative Rice Purity Test, which is also known as the performative male quiz on the internet, is unique and captures the modern culture of the internet. This test addresses a real problem where people want to be authentic but also want to look aware, stylish, and well-dressed. This can be a great conversation starter, share your score with your friends, and enjoy it.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
