"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LESBIAN_QUESTIONS = [
  "Held hands or cuddled with a woman you were attracted to?",
  "Held hands or cuddled with a woman you were attracted to who was also attracted to you?",
  "Gone on a date with a girl?",
  "Kissed a woman who sexually identifies as a lesbian, bisexual, or other lady-liking persuasion?",
  "Kissed a woman who sexually identifies as straight?",
  "Kissed a woman who identifies as straight but is clearly not straight?",
  "Kissed a man who identifies as either bisexual or heterosexual?",
  "Kissed a man who identifies as homosexual?",
  "Touched a woman above the waist in a sexual or intimate way (clothed or otherwise)?",
  "Touched a woman below the waist in a sexual or intimate way (clothed or otherwise)?",
  "Masturbated?",
  "Masturbated with a partner? (Mutual masturbation)",
  "Masturbated while thinking about Shane?",
  "Masturbated while thinking about any other lesbian character on TV or in a movie?",
  "Had a sleepover (in the same bed) with another lady?",
  "Had a sleepover (in the same bed) with another lady, which lead to sexual activities?",
  "Had a sleepover (in the same bed) with another lady which UNEXPECTEDLY lead to sexual activities?",
  "Been in a monogamous relationship with another woman?",
  "Been in a polyamorous relationship with at least one other woman?",
  "Had an orgasm?",
  "Dry humped?",
  "Had sex?",
  "Scissored?",
  "69ed?",
  "69ed successfully?",
  "Had anal sex (given or received)?",
  "Given or received oral sex?",
  "Engaged in sexual activities you would classify as involving bondage and discipline (B&D), dominance and submission (D&S) or sadism and masochism (S&M)?",
  "Used a strap-on or other sex toy during sex?",
  "Worn a strap-on during sex?",
  "Broken a strap-on or other sex toy during sex?",
  "Fingerblasted or been fingerblasted?",
  "Rubbed another woman’s clit?",
  "Been fisted or fisted someone else?",
  "Been involved in a threesome with two other women?",
  "Been involved in a threesome with a man and a woman?",
  "Been involved in group sex or an orgy?",
  "Had phone sex?",
  "Had sex with a man?",
  "Had an orgasm during partner sex or sexual activities?",
  "Made out/had sex with someone in a position of power over you (teacher, boss, coach) or with someone you are in a position of power over?",
  "Made out/had sex with a sports teammate or opponent?",
  "Made out/had sex with someone who was in the closet?",
  "Made out/had sex with a celebrity?",
  "Made out/had sex with a closeted celebrity or closeted well-known person (locally, nationally, or internationally)?",
  "Made out/had sex with your straight best friend?",
  "Made out/had sex with your lesbian best friend?",
  "Made out/had sex with your friend’s girlfriend or ex-girlfriend?",
  "Made out/had sex with your girlfriend?",
  "Made out/had sex with more than five other women (not necessarily at the same time)?",
  "Made out/had sex with more than 10 other women (not necessarily at the same time)?",
  "Made out/had sex with a stranger?",
  "Made out/had sex with an ex?",
  "Made out/had sex with someone married to a man?",
  "Made out/had sex with someone married/civil unionized/domestic partnered/commitment-ceremonied to a woman?",
  "Made out/had sex with a current or former sex worker?",
  "Made out/had sex with someone you met at conversion camp?",
  "Made out/had sex with someone you met at school/work?",
  "Made out/had sex with someone you met at a bar/club?",
  "Watched straight porn?",
  "Watched “lesbian porn” that’s actually really just for straight people?",
  "Watched queer lesbian porn made for/by actual lesbians?",
  "Read lesbian erotica?",
  "Watched porn with a sexual partner?",
  "Made out/had sex in a bed?",
  "Made out/had sex in a bathroom?",
  "Made out/had sex in a religious building?",
  "Made out/had sex in a school?",
  "Made out/had sex in your/their parents' house?",
  "Made out/had sex in a car?",
  "Made out/had sex in a pool?",
  "Had sex while you or your partner were on your period?",
  "Had sex with two or more people in a 24-hour period?",
  "Had sex or sexual relations while intoxicated with alcohol?",
  "Had sex while under the influence of marijuana or other drugs?",
  "Had sex while pretending to be sober, even though you were not?"
];

const SCORE_MEANINGS = [
  {
    "min": 65,
    "max": 76,
    "label": "76 to 65",
    "text": "Very few listed experiences, likely early in the journey"
  },
  {
    "min": 50,
    "max": 64,
    "label": "64 to 50",
    "text": "A handful of experiences, still on the reserved side"
  },
  {
    "min": 35,
    "max": 49,
    "label": "49 to 35",
    "text": "A broad mix of experiences"
  },
  {
    "min": 15,
    "max": 34,
    "label": "34 to 15",
    "text": "Very experienced across the list"
  },
  {
    "min": 0,
    "max": 14,
    "label": "0 to 14",
    "text": "Has checked almost everything"
  }
];

export default function LesbianRicePurityTestPage() {
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
    const score = LESBIAN_QUESTIONS.length - checkedCount;
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
          <h1 className="mt-5 text-center text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">Lesbian Rice Purity Test 2026</h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-[16px] leading-relaxed text-ink-700">
            {"The lesbian rice purity test is purely about queer women. Instead of a one-size-fits-all crowd, it specifically revolves around the experiences that actually shape a sapphic life. Unlike the Rice Purity Test, the Lesbian test consists of 76 questions rather than 100. Each question delves into the deep experiences of your life, from the first confusing crush to the day coming out finally stopped feeling scary."}
            <br /><br />
            {"Every question of the quiz holds a very profound experience from someone's life that keeps anyone hooked from start to finish. That’s the reason it is one of the most popular purity tests on TikTok and other social media sites. Answer all questions with complete attention and get the result at the end."}
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
              {LESBIAN_QUESTIONS.map((q, i) => (
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
                  Lesbian Rice Purity Test Result Card
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
                  <span className="absolute -right-10 top-5 font-mono text-sm font-semibold text-ink-500 sm:text-base">/ {LESBIAN_QUESTIONS.length}</span>
                </div>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">Your Lesbian Purity Score</h2>
                <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-ink-700 sm:text-base">
                  {SCORE_MEANINGS.find((range) => finalScore >= range.min && finalScore <= range.max)?.text}
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
          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">What Is the Lesbian Rice Purity Test?</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The format of this test stays the same as the Official version of the <a href="https://ricepuritytestme.com/" className="rpt-interlink">Rice Purity Test</a>, but it’s totally built around lesbian dating and relationship experiences. It follows the checklist-type questions approach like other purity tests and asks about things such as dates, affection, and personal milestones. You simply tick off things that you experienced in your life honestly and privately.
          </p>
          <img src="/lesbian-rice-purity-test.webp" alt="Lesbian Rice Purity Test 2026: 76-question relationship experiences quiz" className="mt-6 h-auto w-full rounded-lg border border-ink-200 object-cover" />
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            {"The difference it creates when it goes beyond the dating questions and asks about identity, self-discovery, first relationships, community, and the small everyday moments that come with figuring out who you are. It is made for reflection and fun, not for putting anyone in a box. Take it as a conversation starter. You might recognize a situation immediately, laugh at a memory, or find that half the list has little to do with your life."}
          </p>
          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">How the Score Works</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            {"There is simple math behind the score calculation. You start at 76 and lose one point for every statement you have experienced. The final number is your score, so it is really just 76 minus the number of things you checked. A higher score means you have checked fewer items, which often points to being earlier in the journey or simply more private. A lower score means a wider range of experiences."}
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            {"Whatever score you get on result card don’t think of it as a verdict, just take it like a random test nothing can describe your innerself."}
          </p>
          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">What Your Score Means</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            {"Below is the clear distinction of what score actually means:"}
          </p>
          <div className="mt-5 overflow-hidden rounded-lg border border-ink-200">
            <table className="w-full text-left text-sm text-neutral-700">
              <thead className="bg-[#FACC15]/25 text-ink-900">
                <tr><th scope="col" className="px-4 py-3">Score</th><th scope="col" className="px-4 py-3">General read</th></tr>
              </thead>
              <tbody className="divide-y divide-ink-200 bg-cream-50">
                {SCORE_MEANINGS.map((range) => (
                  <tr key={range.min}><td className="px-4 py-3 font-semibold">{range.label}</td><td className="px-4 py-3">{range.text}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">Is There a Good Lesbian Purity Test Score?</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            {"There’s no score that defines anybody’s being a lesbian or not and it’s not scientfically proved. you need not to aim for any specific score. Having fewer experiences doesn’t make you immature, and having more doesn’t make you a better partner."}
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            {"Consider someone who has been in one long relationship and someone who has had several first dates. A checklist might count their experiences differently, but it cannot explain the care, confidence, or connection involved."}
          </p>
          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">Is an LGBT Purity Test the Same Thing?</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            {"Lesbian Purity test is only made for women but LGBT purity test covers a broader mix of identities and community experiences. So they are totally different tests in terms of questions and purpose. If you focus on the list of questions you will notice the difference between both tests."}
          </p>
          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">Can a Lesbian Test Tell You Whether You’re Lesbian?</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            {"Certainly No, Checking experiences off a list cannot establish your sexual orientation.The sole purpose of this purity quiz is to reflect on attraction. You can have feelings for women without having dated one. You can also be unsure which label feels right without needing a quiz to settle it. Enjoy the quiz if it feels fun. Keep your answers private if you prefer, and leave any question that makes you uncomfortable."}
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
