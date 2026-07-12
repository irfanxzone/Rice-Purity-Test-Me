"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BDSM_QUESTIONS = [
  "Do you feel more drawn to giving control or receiving it?",
  "How comfortable are you giving direct orders to a partner?",
  "Do you enjoy being told exactly what to do, step by step?",
  "Would you want a partner to make decisions for you outside the bedroom too?",
  "How important is a formal power exchange structure, such as rules or protocols, to you?",
  "Do you prefer switching roles depending on mood, or staying consistent?",
  "How do you feel about kneeling, or other physical displays of submission?",
  "Does praise from a partner in a dominant role affect you strongly?",
  "Would you enjoy being given tasks or homework between scenes?",
  "How much do you enjoy the responsibility of caring for a submissive's wellbeing, if dominant?",
  "Are you drawn to pain as part of pleasure, and to what degree?",
  "Do you enjoy temperature play, such as ice, wax, or warmth?",
  "How do you feel about impact play, such as spanking, paddling, or flogging?",
  "Do you enjoy sensory deprivation, such as blindfolds or earplugs?",
  "Are you interested in scratching, biting, or other marking play?",
  "How do you feel about texture play, such as feathers, fur, or rough fabric?",
  "Do you enjoy overstimulation as part of a scene?",
  "How important is build-up and anticipation versus immediate intensity?",
  "Are you curious about tools or toys designed for sensation play?",
  "Do you prefer light teasing sensations or more intense ones?",
  "How comfortable are you negotiating limits before a scene?",
  "Do you prefer a formal safeword system or reading nonverbal cues?",
  "How important is checking in during a scene to you?",
  "Do you like discussing fantasies openly, or prefer they stay private?",
  "How do you handle it when a partner sets a boundary you did not expect?",
  "Would you want a written or verbal agreement about limits with a partner?",
  "How comfortable are you saying no or stop mid-scene?",
  "Do you enjoy debriefing conversations after a scene?",
  "How do you feel about renegotiating limits over time as trust grows?",
  "Is ongoing consent-checking arousing to you, or does it feel disruptive?",
  "Do you enjoy taking on a character or persona during play?",
  "Are you drawn to specific role-play scenarios?",
  "Do you enjoy costumes or props to enhance role-play?",
  "How important is storyline or narrative versus physical sensation for you?",
  "Would you enjoy improvised role-play or prefer planned scripts?",
  "Are you interested in exploring a fantasy you have never told anyone about?",
  "Do age-based dynamics, like caregiver or little, appeal to you?",
  "Are you interested in stranger or first meeting role-play scenarios?",
  "Do you enjoy playful humiliation as part of role-play?",
  "How do you feel about incorporating public or semi-public fantasy elements safely?",
  "Do you feel emotionally closer to a partner after intense scenes?",
  "How important is trust-building before trying new things?",
  "Are you drawn to psychological dynamics like mind control fantasies or head space?",
  "Do you experience subspace or a similar altered mental state during scenes?",
  "How do you handle vulnerability that comes up during play?",
  "Does jealousy or possessiveness play a role in your dynamic preferences?",
  "Do you enjoy a partner expressing pride or disappointment in you, if submissive?",
  "How much do you crave structure and predictability versus spontaneity?",
  "Do you feel a need to let go of control in daily life through play?",
  "How do intense emotional states during a scene affect your mood afterward?",
  "How important is physical aftercare, such as cuddling or holding, to you?",
  "Do you need verbal reassurance after an intense scene?",
  "How long do you typically need to come down after play?",
  "Do you prefer aftercare done quietly, or with conversation?",
  "How do you like to give aftercare to a partner?",
  "Do you ever experience a drop, or emotional low, after scenes?",
  "What helps you most when you are in emotional drop, space or closeness?",
  "How important is checking in the next day after an intense scene?",
  "Do you like small rituals, such as specific words or gestures, as part of aftercare?",
  "How comfortable are you asking for aftercare explicitly?",
  "Are you interested in physical restraint, such as rope or cuffs?",
  "How do you feel about being immobilized for extended periods?",
  "Does the aesthetic of rope or bondage appeal to you beyond function?",
  "Are you interested in learning rope-tying techniques yourself?",
  "How important is the feeling of being trapped versus held?",
  "Do you enjoy suspension-style bondage, or prefer floor-based restraint?",
  "How do you feel about being restrained while receiving other sensations?",
  "Are you drawn to self-bondage or solo restraint experiences?",
  "Does restricted movement heighten arousal for you, or feel more anxiety-inducing?",
  "How important is a partner's skill and safety knowledge with restraint tools?",
  "Do you enjoy verbal degradation or humiliation as dirty talk, consensually?",
  "Do you prefer praise-based verbal dynamics instead?",
  "How important is a partner narrating what they are doing during play?",
  "Do you like being asked questions during a scene?",
  "Are pet names or honorifics meaningful to you?",
  "Do you enjoy silence during scenes more than verbal exchange?",
  "How comfortable are you vocalizing your own pleasure loudly?",
  "Do you enjoy being told what to say during a scene?",
  "Are commanding, authoritative tones arousing to you?",
  "Do you prefer gentle, soothing verbal tones during intense moments?",
  "How confident are you in your knowledge of physical safety for impact play?",
  "Do you know CPR or basic first aid relevant to intense scenes?",
  "How comfortable are you setting hard limits with a new partner?",
  "Do you research new activities before trying them?",
  "How do you handle it if a scene needs to stop unexpectedly?",
  "Are you comfortable using a safeword system with color codes?",
  "How important is having safety tools nearby, such as scissors or water, during scenes?",
  "Do you prefer trying new activities with an experienced partner first?",
  "How do you check a partner's physical or emotional state during intense play?",
  "Would you want a formal negotiation checklist before new scenes?",
  "Are you drawn to a particular visual aesthetic, such as leather, latex, or lace?",
  "Does the environment or setting matter to your arousal?",
  "Do you enjoy dressing up specifically for scenes?",
  "How important is lighting and mood-setting to you?",
  "Are you drawn to a soft and romantic kink style, or a harsher, intense one?",
  "Do you enjoy collecting or owning specific kink-related items or toys?",
  "How do you feel about symbolic items, such as collars or cuffs, as relationship markers?",
  "Does a partner's appearance or costume affect your engagement in a scene?",
  "Do you prefer minimalist scenes or elaborate setups?",
  "How much does aesthetic or style matter to you compared to the physical acts themselves?",
];

const SCORE_MEANINGS = [
  { min: 90, max: 100, text: "Light curiosity and mostly vanilla preferences." },
  { min: 70, max: 89, text: "Curious, cautious, and interested in exploring boundaries." },
  { min: 40, max: 69, text: "Open-minded and adventurous with a clear interest in kink dynamics." },
  { min: 20, max: 39, text: "Highly exploratory, with strong interest in BDSM themes and experiences." },
  { min: 0, max: 19, text: "Deeply experienced or intensely curious about BDSM-style exploration." },
];

function getScoreMeaning(score) {
  return SCORE_MEANINGS.find((range) => score >= range.min && score <= range.max)?.text || "";
}

export default function BDSMTestClient() {
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
            Updated BDSM Test
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-[16px] leading-relaxed text-ink-700">
            The BDSM Test is a unique and modern way to check how kinky you really are and it is specially made for adults who want to understand personal experience and curiosity related to bdsm. It does not mean it is made for those who are deeply involved in BDSM. Rather, people take this test out of curiosity. Many of them take it for fun, some want to share their scores with friends, and others take it with their partner as a fun conversation starter.
            <br /><br />
            It is inspired by the <Link href="/" className="rpt-interlink">Rice purity Test</Link> which asks general questions about dating, relationships, and life experiences, but this version focuses on kink, power dynamics, and everything that falls under the BDSM umbrella. The questions included in the test are very personal and related to your intimacy with your partner. One important thing to remember before taking the test: this is made for fun and entertainment. Your score is not a label or diagnosis of your personality.
          </p>
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-10 sm:px-6 lg:px-8">
          <h2 className="font-heading mt-10 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
            Questions
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Here are 100 original kink/BDSM self-assessment questions, grouped into dimensions similar to what a comprehensive test would cover. Answer honestly by checking the questions that apply to you.
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
              <ul className="mb-6 divide-y divide-ink-200 rounded-xl border bg-cream-50">
                {BDSM_QUESTIONS.map((question, index) => (
                  <li key={question} className="flex items-start gap-3 px-4 py-3">
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
                    BDSM Test · Result Card
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
                    BDSM Score Category
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
            What is BDSM?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            BDSM is a broad term used for consensual sexual or relationship practices. It involves roleplay, sensorplay, bondage, and power dynamics. The exact meaning of BDSM is Bondage & Discipline, Dominance & Submission, and Sadism & Masochism. This extreme sexual practice is done by mutual consent of two partners.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            <strong>Bondage (B) & Discipline (D):</strong> Bondage means using restraints such as ropes, cuffs, or other items to limit movement. Discipline means agreed rewards, rules, and structure.
          </p>
          <p className="mt-2 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            <strong>Dominance (D) & Submission (S):</strong> This is about dominant and submissive roles. One partner takes the dominant role, also called top, while the other takes the submissive role, also called bottom. People who alternate between roles are known as switches.
          </p>
          <p className="mt-2 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            <strong>Sadism (S) & Masochism (M):</strong> Sadism involves obtaining pleasure from pain or physical sensations. Masochism can range from light spanking to intense impact play.
          </p>

          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            What is BDSM Test?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            BDSM Test is a pure kink style quiz consisting of 100 questions related to sadism, masochism, bondage, and dominance. As we know, this test follows the pattern of the Rice purity test; it is also known as the BDSM Rice purity test. This solely focuses on one specific area, not whole-life experiences.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Questions are specific and to the point, which is why they are popular with adults. It provides a chance for users to explore a topic they might have been curious about without pressure and anonymously. It does not ask you to explain your answers.
          </p>

          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Can Couples Take the Test Together?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Absolutely yes, and many users do take it along with their partner. Some take it separately and compare scores. Most importantly, the score is not the only interesting thing. The conversation that begins after that is much more valuable for any couple.
          </p>

          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Is the BDSM Rice Purity Test Completely Private?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Yes, privacy is highly maintained on this platform. There is no login, signup, or form filling required. You take this test completely anonymously. However, avoid sites that ask for login, signup, or other personal information in order to take the test.
          </p>

          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Final Thoughts
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The BDSM Test is as popular as the Rice Purity Test. It caters to the curiosity of users regarding a sensitive topic with entertainment. It provides a better and easier way to understand and explore an extreme topic, compare scores, or simply get an idea about kink. Whether you score high, low, or somewhere in between, it does not define who you are.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
