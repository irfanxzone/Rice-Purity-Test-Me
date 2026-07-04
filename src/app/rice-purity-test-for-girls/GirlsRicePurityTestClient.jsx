"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const GIRLS_QUESTIONS = [
  "Ever held hands romantically?",
  "Ever kissed someone on the lips?",
  "Kissed someone passionately?",
  "Ever had a boyfriend?",
  "Ever been in love?",
  "Been on a date?",
  "Been proposed to?",
  "Gone on a double date?",
  "Sent a romantic text message?",
  "Received a love letter or message?",
  "Lost a friend due to a misunderstanding?",
  "Ever lied to a friend?",
  "Ever had a falling out with a close friend?",
  "Spread a rumor about someone?",
  "Experienced jealousy in a friendship?",
  "Given or received a makeover from a friend?",
  "Had a crush on a friend's boyfriend?",
  "Gone on a shopping trip with friends?",
  "Been in a fight with a friend?",
  "Ever made a friend online?",
  "Cheated on a test?",
  "Skipped school?",
  "Been sent to detention?",
  "Lied to a teacher?",
  "Ever failed a class?",
  "Pulled an all-nighter to study?",
  "Been involved in a school prank?",
  "Been a part of a school club?",
  "Lied to your parents about your grades?",
  "Have you ever been suspended from school?",
  "Ever broken a law?",
  "Ever been arrested?",
  "Ever shoplifted?",
  "Driven without a license?",
  "Gotten a speeding ticket?",
  "Snuck out of your house?",
  "Ever vandalized property?",
  "Lied to a police officer?",
  "Been involved in a physical altercation?",
  "Committed a crime and not been caught?",
  "Lied to your parents?",
  "Snuck out to meet someone?",
  "Had a major argument with a family member?",
  "Kept a secret from your family?",
  "Borrowed something without asking?",
  "Have you ever been grounded?",
  "Taken care of a younger sibling?",
  "Disobeyed your parents?",
  "Missed a family event for personal reasons?",
  "Helped out with household chores without being asked?",
  "Skipped a meal intentionally?",
  "Ever followed a strict diet?",
  "Exercised regularly for more than a month?",
  "Ever fainted or passed out?",
  "Been hospitalized?",
  "Struggled with mental health?",
  "Ever smoked a cigarette?",
  "Ever consumed alcohol?",
  "Have you ever used drugs?",
  "Have you ever lied to your doctor?",
  "Ever dyed your hair?",
  "Worn makeup regularly?",
  "Spent more than $100 on a single outfit?",
  "Gone a day without wearing makeup?",
  "Been to a salon for a beauty treatment?",
  "Worn high heels for more than 6 hours?",
  "Regretted a fashion purchase?",
  "Been complimented on your style by a stranger?",
  "Dressed up for a themed party?",
  "Changed your appearance for someone else?",
  "Posted a selfie on social media?",
  "Ever used a filter on a photo?",
  "Spent more than 4 hours on social media in a day?",
  "Deleted a post because it didn't get enough likes?",
  "Have you ever cyberstalked someone?",
  "Been cyberbullied?",
  "Blocked someone on social media?",
  "Created a fake profile online?",
  "Ever lied about your age online?",
  "Posted something online that you later regretted?",
  "Traveled to a different country?",
  "Gone on a road trip?",
  "Have you ever camped outdoors?",
  "Have you ever stayed in a hostel?",
  "Missed a flight or train?",
  "Gotten lost while travelling?",
  "Have you ever traveled alone?",
  "Lied to your parents about where you were travelling?",
  "Tried a risky activity like bungee jumping or skydiving?",
  "Stayed out all night while travelling?",
  "Have you ever donated to charity?",
  "Have you ever volunteered for a cause?",
  "Participated in a talent show?",
  "Performed in front of an audience?",
  "Have you ever learned a new language?",
  "Have you ever met a celebrity?",
  "Have you ever been on TV or in a newspaper?",
  "Have you ever written a story, poem, or song?",
  "Have you ever participated in a protest?",
  "Have you ever won an award or competition?",
];

const SCORE_MEANINGS = [
  { min: 90, max: 100, text: "Goddess of purity." },
  { min: 70, max: 89, text: "Mild experiences." },
  { min: 50, max: 69, text: "Experienced." },
  { min: 30, max: 49, text: "Fully adventurous life." },
  { min: 0, max: 29, text: "Pure baddie." },
];

function getScoreMeaning(score) {
  return SCORE_MEANINGS.find((range) => score >= range.min && score <= range.max)?.text || "";
}

export default function GirlsRicePurityTestClient() {
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
        <section className="mx-auto max-w-3xl px-4 pt-6 pb-10 sm:px-6 sm:pt-14 lg:px-8">
          <h1 className="mt-0 text-4xl font-extrabold tracking-tight text-ink-900 sm:mt-5 sm:text-5xl text-center">
            Rice Purity Test for Girls
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[16px] leading-relaxed text-ink-700 text-center">
            Have you ever felt that a gender-specific version of the <a href="/" className="rpt-interlink">Rice Purity Test</a> is needed? Especially for girls, because their experiences, behaviours, and personal moments are quite different from those of other genders. The Rice Purity Test for Girls is not just a quiz for many girls; it serves as a mirror reflecting what they experienced, avoided, and learned throughout their lives.
            <br /><br />
            Below, we have provided the list of 100 questions related to girls. The questions may ask about your personal life, school life, relationships, partying, and dating. The questions are a mix, some might make you laugh, some make you think, and others may remind you of moments you have actually experienced.
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
                {GIRLS_QUESTIONS.map((question, index) => (
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
                    Rice Purity Test for Girls - Result Card
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
                    Girls Purity Score Category
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
            What Makes the Rice Purity Test for Girls Different?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            If you've taken the official Rice Purity Test, which was originally made for college students and has evolved over time. The questions in that test are general and can be applied to everyone. On the other hand, this version is specially designed and carefully created for girls only, which is what makes it different from other test variants. It asks about those experiences and amazing moments that only relate to girls.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            One thing to keep in mind is that maybe some questions may not relate to you, that is absolutely normal. Some girls are more social, while others are shy due to their culture and environment. That's why take this very lightly, rather than as a judgmental or serious test.
          </p>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">
            How the Purity Score Works
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            When we initiate the test, it starts from 100. Each "Yes" answer to a question usually subtracts a point from 100. This simply means that your score decreases each time you select an item that applies to you. As this test completely follows the mechanism of the official version, higher scores mean less experience and lower scores mean a more experienced person.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            However, the purpose is not to determine who is more pure than others because two girls can have the same score, but still hold totally different personalities. So instead of looking at whether your score is good or bad, just reflect on whether the score relates to your life or personality. Below are score levels:
          </p>
          <ul className="list-disc ml-6 mt-2 text-[16px] text-neutral-700">
            <li><span className="font-bold">100-90:</span> Goddess of purity</li>
            <li><span className="font-bold">89-70:</span> Mild Experiences</li>
            <li><span className="font-bold">69-50:</span> Experienced</li>
            <li><span className="font-bold">49-30:</span> Fully adventurous life</li>
            <li><span className="font-bold">29-0:</span> Pure baddie</li>
          </ul>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">
            How to Take the Test in a Safe Way
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Here are a few things you should keep in mind before taking the test:
          </p>
          <ul className="list-disc ml-6 mt-2 text-[16px] text-neutral-700">
            <li>Do not provide any details on any website, such as your name, address, or photos. Keep your privacy your priority and never compromise it.</li>
            <li>Answer questions honestly and do not lie about your score in any way to look cool.</li>
            <li>Don't post your test results online if it feels personal, and never take the test if pressured by anyone.</li>
            <li>If any question makes you feel embarrassed or uncomfortable, you can skip it.</li>
          </ul>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">
            Final Thoughts
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The Purity Test for Girls is a modern and special version that can be viewed lightly and as a fun and personal experience. The score doesn't define your character or purity; it just gives an idea of reflecting your life based on your past experiences. Take the test and make fun and enjoyable moments with your fellow girls.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
