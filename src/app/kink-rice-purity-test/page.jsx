"use client";
import { useCallback, useMemo, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleJsonLd from "@/components/ArticleJsonLd";

const KINK_QUESTIONS = [
  "Felt curious about exploring a more private side of your personality?",
  "Shared a personal boundary with someone before things became intimate?",
  "Agreed on a safe word or signal before trying something new?",
  "Felt nervous while opening up about a fantasy?",
  "Tried roleplay with someone you trusted?",
  "Worn something mainly because it made you feel confident, bold, or desired?",
  "Enjoyed letting someone else take gentle control?",
  "Taken the lead in a romantic or intimate moment?",
  "Talked clearly about consent before exploring a new experience?",
  "Taken a kink or intimacy quiz just to understand yourself better?",
  "Discovered a preference that surprised you?",
  "Explained what makes you feel safe, respected, and comfortable?",
  "Made a personal “yes, no, maybe” list?",
  "Felt closer to someone after an honest conversation about intimacy?",
  "Been curious about light power exchange?",
  "Enjoyed playful teasing when both people were comfortable with it?",
  "Tried blindfolding or sensory limitation in a safe, trusted setting?",
  "Used soft restraints with clear consent and comfort?",
  "Felt drawn to the emotional side of submission?",
  "Explored taking control with care and responsibility?",
  "Realized that trust made an experience feel deeper?",
  "Kept a fantasy private because it felt too personal to say out loud?",
  "Written down your preferences to understand yourself better?",
  "Talked about aftercare before or after an intense experience?",
  "Needed reassurance after trying something unfamiliar?",
  "Preferred slow buildup instead of rushing into anything?",
  "Created playful rules with a partner?",
  "Enjoyed receiving praise during a private moment?",
  "Given praise to make someone feel wanted and valued?",
  "Felt attracted to a certain mood, setting, or atmosphere?",
  "Used music, lighting, or scent to create a more intimate feeling?",
  "Tried a fantasy scene that felt more emotional than physical?",
  "Enjoyed the anticipation before meeting someone?",
  "Felt shy about admitting something you secretly liked?",
  "Had a conversation that changed how you understood your desires?",
  "Realized something sounded exciting in theory but was not right for you in reality?",
  "Stopped an experience because it no longer felt comfortable?",
  "Respected someone’s boundary even when you were curious?",
  "Felt proud after communicating your needs clearly?",
  "Explored gentle sensory play through texture, temperature, or touch?",
  "Felt curious about costumes, characters, or scripted scenarios?",
  "Preferred discussing a fantasy before trying it in real life?",
  "Used humor to make an awkward intimate conversation easier?",
  "Realized emotional safety mattered more than the activity itself?",
  "Researched safety before trying anything new?",
  "Read about BDSM or kink from an educational source?",
  "Joined or read an online discussion about boundaries, consent, or curiosity?",
  "Wondered whether a preference was truly yours or influenced by the internet?",
  "Changed your mind about a desire after learning more about it?",
  "Clearly explained what feels like “too much” for you?",
  "Enjoyed being surprised within limits already agreed on?",
  "Planned a scene or private experience in advance?",
  "Checked in with someone during an intimate moment?",
  "Appreciated someone checking in with you?",
  "Felt more connected to someone because they respected your limits?",
  "Felt drawn to fantasies involving control, trust, or surrender?",
  "Opened up emotionally in a private relationship setting?",
  "Noticed that confidence changed how intimacy felt for you?",
  "Had a kink-related conversation that felt scary but freeing?",
  "Enjoyed playful challenges or tasks with a partner?",
  "Felt curious about being guided by a partner’s instructions?",
  "Liked the idea of rituals, routines, or symbolic gestures in intimacy?",
  "Discussed what kind of language feels good or uncomfortable?",
  "Realized words can change the mood as much as actions?",
  "Explored intensity in a controlled and respectful way?",
  "Preferred emotional dominance over physical intensity?",
  "Wanted softness and reassurance even during playful exploration?",
  "Felt curious about switching roles?",
  "Acted more assertive than usual in a private setting?",
  "Allowed yourself to be more receptive or passive than usual?",
  "Realized kink can be more psychological than physical?",
  "Had a fantasy inspired by a movie, book, character, or story?",
  "Talked about what should stay fantasy and what could be real?",
  "Discovered that trust can make simple things feel more intense?",
  "Enjoyed keeping a private side of yourself separate from everyday life?",
  "Worried about being judged for your curiosity?",
  "Supported someone after they shared a vulnerable preference?",
  "Said “not tonight” and felt respected?",
  "Accepted someone else’s “no” without pressure or frustration?",
  "Felt that clear consent made the experience more comfortable?",
  "Explored a fantasy only through conversation or messages?",
  "Set boundaries around digital intimacy?",
  "Chose not to try something because it did not match your values?",
  "Felt more mature after learning how to communicate your needs?",
  "Reflected on whether your curiosity comes from emotion, trust, or excitement?",
  "Shared a private inside joke connected to intimacy?",
  "Created a judgment-free space for someone to be honest?",
  "Realized patience made exploration feel better?",
  "Updated your boundaries after your feelings changed?",
  "Learned that kink can include care, softness, and emotional awareness?",
  "Felt interested in a dynamic that required strong communication?",
  "Explored a “maybe” preference after careful discussion?",
  "Said yes to something new only after feeling fully comfortable?",
  "Felt relieved after admitting a desire you had kept private?",
  "Enjoyed the emotional buildup more than the actual experience?",
  "Noticed your boundaries change depending on trust and connection?",
  "Felt more open because mutual respect was present?",
  "Changed a plan because someone’s comfort mattered more?",
  "Understood yourself better after reflecting on your desires?",
  "Took a kink purity test for self-awareness instead of only chasing a score?",
];

const SCORE_MEANINGS = [
  { min: 90, max: 100, text: "Pure as vanilla" },
  { min: 70, max: 89, text: "Curiously exploring things" },
  { min: 40, max: 69, text: "You have a good spirit of adventure and have some experience." },
  { min: 20, max: 39, text: "You’re highly kinky, explored almost everything." },
  { min: 0, max: 19, text: "Kinkster, you dig deeper towards the end." },
];

function getScoreMeaning(score) {
  return SCORE_MEANINGS.find((r) => score >= r.min && score <= r.max)?.text || "";
}

export default function KinkRicePurityTestPage() {
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

  const handleToggle = useCallback((id) => setChecked((p) => ({ ...p, [id]: !p[id] })), []);
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
      <ArticleJsonLd slug="kink-rice-purity-test" />
      <Header />
      <main data-testid="main-content">
        <section className="mx-auto max-w-3xl px-4 pt-10 pb-10 sm:px-6 sm:pt-14 lg:px-8">
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl text-center">
            Kink Rice Purity Test
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[16px] leading-relaxed text-ink-700 text-center">
            The Kink Rice Purity Test is more personal and age-specific, created to explore personality, preferences, and desires related to relationships and intimacy. It’s made for educational purposes; the main idea is to give you the opportunity for self-assessment by asking questions about interest, boundaries, maturity, and mutual consent.
            <br /><br />
            It also consists of 100 questions, and only mature individuals or adults can take it. It involves questions related to BDSM, sexual practices, fetishes, and intimacy. The mechanism of the quiz remains the same; you’ll get a score out of 100, and each time you answer a question, one point is deducted from the total. Want to check how kinky you are? Take the test below:
          </p>
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
                {KINK_QUESTIONS.map((q, i) => (
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
                    Kink Rice Purity Test · Result Card
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
                    Kink Score Category
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
            How the Test Actually Works
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The core concept of the test is the same as the <a href="/" className="rpt-interlink">Rice purity Test</a>. You start with a score of 100, and each time you answer a question, one point is deducted from the total score. The process is pretty simple, but the questions are divided into different categories. Below, we have described each one:
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            <strong>BDSM:</strong> Out of the complete list, some questions are related to submission, restraints, and similar experiences.
          </p>
          <p className="mt-2 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            <strong>Cosplay and fantasy:</strong> Play or adopt some scripted scenes and characters.
          </p>
          <p className="mt-2 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            <strong>Taboo:</strong> Advanced exploration, such as breath play and a 24/7 lifestyle.
          </p>
          <p className="mt-2 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            <strong>Sensor Play:</strong> Sensor play includes blindfolds and other tactile exploration.
          </p>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">
            Difference Between a Kink Test and Rice Purity Test
          </h2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="py-2">Feature</th>
                  <th className="py-2">Kink Test</th>
                  <th className="py-2">Rice Purity Test</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2">Purpose</td>
                  <td className="py-2">Preferences</td>
                  <td className="py-2">personal experiences</td>
                </tr>
                <tr>
                  <td className="py-2">Tone</td>
                  <td className="py-2">Playful and educational</td>
                  <td className="py-2">Social and exploratory</td>
                </tr>
                <tr>
                  <td className="py-2">Results</td>
                  <td className="py-2">Personality-driven score</td>
                  <td className="py-2">Purity score</td>
                </tr>
                <tr>
                  <td className="py-2">Questions</td>
                  <td className="py-2">Relationship and intimacy-based</td>
                  <td className="py-2">social- and life experience-based</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">
            What your Kink Purity Score Means
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            It’s a fun and fully anonymous test you can take without giving your personal details. The score results are distributed into five simple levels. Here are all the levels :
          </p>
          <ul className="list-disc ml-6 mt-2 text-[16px] text-neutral-700">
            <li>90 to 100: Pure as vanilla</li>
            <li>70 to 89: Curiously exploring things</li>
            <li>40 to 69: You have a good spirit of adventure and have some experience.</li>
            <li>20 to 39: You’re highly kinky, explored almost everything.</li>
            <li>0 to 19: Kinkster, you dig deeper towards the end.</li>
          </ul>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">
            Final Thoughts
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The Kink Test is a popular test made for fun and entertainment, which provides an understanding of personality and self-identification in a completely simple way. It involves age-specific questions that you must keep in mind before taking the test. Whether you score higher, lower, or something in the middle, it doesn’t matter. The only thing that matters is your better understanding of yourself, knowing your boundaries, and drawing mutual respect for you and your partner.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
