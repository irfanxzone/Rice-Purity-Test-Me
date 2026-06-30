

"use client";
import { useCallback, useMemo, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleJsonLd from "@/components/ArticleJsonLd";


const AO3_QUESTIONS = [
  "angst",
  "fluff",
  "hurt/comfort",
  "smut",
  "canon compliant",
  "canon divergent",
  "slow burn",
  "getting together",
  "falling in love",
  "established relationship",
  "mutual pining",
  "unrequited",
  "friends to lovers",
  "enemies to lovers",
  "strangers to lovers",
  "childhood friends to lovers",
  "friends to enemies to lovers",
  "friends with benefits",
  "idiots in love",
  "oblivious",
  "secret relationship",
  "fake/pretend relationship",
  "arranged marriage",
  "marriage",
  "marriage proposal",
  "domestic fluff",
  "tooth-rotting fluff",
  "slice of life",
  "parenthood",
  "pregnancy",
  "unplanned pregnancy",
  "found family",
  "friendship",
  "developing relationships",
  "reconciliation",
  "break up",
  "humor",
  "crack",
  "crack taken seriously",
  "character study",
  "missing scene",
  "fix-it",
  "time travel fix-it",
  "pre-canon",
  "post-canon",
  "future fic",
  "non-linear narrative",
  "unreliable narrator",
  "5+1 things",
  "oneshot",
  "long-fic",
  "m/f",
  "m/m",
  "f/f",
  "polyamory",
  "omegaverse",
  "mating cycles/in heat",
  "mpreg",
  "alternate universe - modern setting",
  "alternate universe - high school",
  "alternate universe - college/university",
  "alternate universe - historical",
  "alternate universe - fantasy",
  "alternate universe - soulmates",
  "alternate universe - superheroes/supervillains",
  "coffee shop AU",
  "science fiction & fantasy",
  "violence",
  "canon-typical violence",
  "graphic depictions of violence",
  "gore",
  "major character death",
  "minor character death",
  "torture",
  "body horror",
  "dead dove: do not eat",
  "grief/mourning",
  "mental health issues",
  "suicidal thoughts",
  "unhealthy relationships",
  "unhealthy coping mechanisms",
  "domestic abuse",
  "child abuse",
  "bullying",
  "manipulation",
  "dubious consent",
  "drug use",
  "first kiss",
  "first time",
  "loss of virginity",
  "sexual inexperience",
  "oral sex",
  "anal sex",
  "vaginal sex",
  "rough sex",
  "gentle/tender sex",
  "BDSM",
  "bondage",
  "praise kink",
  "degradation kink"
];

const SCORE_MEANINGS = [
  { min: 90, max: 100, text: "If your score is between 90 and 100, it means you have seen very little fanfiction content and are stuck with safe and light tropes." },
  { min: 70, max: 89, text: "You have seen basic tropes like fluff and romance, and have had limited exposure to darker tropes." },
  { min: 40, max: 69, text: "This score category means you actively read and write fanfic and know much about it, and also read mature content." },
  { min: 0, max: 39, text: "You're very deep into fanfiction and take part very actively." },
];

function getScoreMeaning(score) {
  for (const range of SCORE_MEANINGS) {
    if (score >= range.min && score <= range.max) return range.text;
  }
  return "";
}

export default function AO3RicePurityTestPage() {
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
      <ArticleJsonLd slug="ao3-rice-purity-test" />
      <Header />
      <main data-testid="main-content">
        <section className="mx-auto max-w-3xl px-4 pt-10 pb-10 sm:px-6 sm:pt-14 lg:px-8">
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl text-center">AO3 Rice Purity Test</h1>
          <p className="mx-auto mt-3 max-w-xl text-[16px] leading-relaxed text-ink-700 text-center">
            Are you a fandom lover who wants to check how messed up your fanfiction taste is? Well, you landed in the right place. Ao3 Rice Purity Test is a fun and interactive fandom purity score quiz that asks you questions and gives you a score out of 100. The questions are about your experiences and scenarios that you might encounter while being part of online communities like fandom.
            <br /><br />
            Many internet users find it better than the <a href="/" className="rpt-interlink">original rice purity test</a>. This test actually doesn't calculate your score based on the specific answers; it's based on the number of options you click. To calculate your score, just click the boxes that you think are relevant to you and get the results.
          </p>
          <div className="mx-auto max-w-xl text-center mt-2">
            <span className="text-[16px] text-ink-700">Want more? <a href="/valorant-rice-purity-test" className="rpt-interlink">Take the Valorant Rice Purity Test</a></span>
          </div>
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
                {AO3_QUESTIONS.map((q, i) => (
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
                    AO3 Rice Purity Test · Result Card
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
                    AO3 Score Category
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
          <h1 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-4">What is AO3 Rice Purity Test</h1>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Ao3 is the famous fanfiction platform where people read, write, and share fanfictions. Ao3 means Archive of Our Own. This test is the same as the official rice purity test, but converted into fanfiction culture. All the questions are related to fanfiction content, and fandom lovers share their creative ideas and connect with people who have the same fandom.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            This fanfic test is a self-assessment quiz with questions about your fandom life and fanfictions like fluff, angst, darkfic, etc. You'll be answering questions about Genres, Relationships, Tropes, AUs (ALTERNATE UNIVERSE), and much more. You gotta be honest with the answers.
          </p>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">How AO3 Rice Purity Test Works</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The process is simple and easy; all you need to do is just click or check the boxes that are relevant to you. Here's a step-by-step process for taking the test:
          </p>
          <ul className="list-disc ml-6 mt-2 text-[16px] text-neutral-700">
            <li>Go to the test questions section/page. You'll start taking the test with a full 100 score.</li>
            <li>Go through each question slowly and carefully. Questions will be there like trope, genre, and fic.</li>
            <li>Answer every question honestly cause no one is there to judge you. Mark Tick for Yes, otherwise keep it unchecked for No.</li>
            <li>Once you have checked any question for Yes, there will be 1 score subtracted from the overall score.</li>
          </ul>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            This is not scientific at all; it's all about how much you have explored fandom tropes or how deep you're into fanfiction culture.
          </p>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">AO3 Rice Purity Test Score Meaning</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Let’s discuss the score's meaning and complete explanation. Check in which category your score falls:
          </p>
          <ul className="list-disc ml-6 mt-2 text-[16px] text-neutral-700">
            <li><span className="font-bold">90–100</span><br />If your score is between 90 and 100, it means you have seen very little fanfiction content and are stuck with safe and light tropes.</li>
            <li><span className="font-bold">70–89</span><br />You have seen basic tropes like fluff and romance, and have had limited exposure to darker tropes.</li>
            <li><span className="font-bold">40–69</span><br />This score category means you actively read and write fanfic and know much about it, and also read mature content.</li>
            <li><span className="font-bold">0–39</span><br />You’re very deep into fanfiction and take part very actively.</li>
          </ul>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">AO3 Version vs Original Version</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            A03 Test is a copy of the original version, but all questions and topics are related to the fandom world. The original version focuses on the life experiences of students and adults in terms of relationships and personality traits. On the other hand, the AO3 quiz is all about fanfics and fandom content, which is the major difference. Both versions are fun and engaging in their own ways.
          </p>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">Is the AO3 Rice Purity Test Safe?</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            It's completely safe and totally anonymous. This test comprises only questions and does not ask for any personal details. That's why it's safe and efficient to protect your safety. Always visit trusted websites, do not fill in any personal details like name or any socials.
          </p>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">Who Should Take the AO3 Rice Purity Test?</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Everyone who loves or is into fanfic and fandom can take this test and check their taste. Specifically, online fandom communities, friend groups, and people who take part in or are willing to write fanfictions can take the AO3 test. Share your score with your community members and compare with them for joy.
          </p>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">Conclusion</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The AO3 fanfic test is an amazing fandom quiz inspired by the original rice purity test. It measures how much exposure you have in fandom content by asking simple questions. Enjoy this fun quiz. This test score only shows your familiarity with the fandom culture and fanfictions. Take this lighthearted test, check your score, and share joy with your community members.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

