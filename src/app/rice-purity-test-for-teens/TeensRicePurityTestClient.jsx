"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TEENS_QUESTIONS = [
  "Held hands with someone?",
  "Been on a date?",
  "Had a crush on someone?",
  "Received a love note or text?",
  "Written a love note or text?",
  "Kissed someone on the cheek?",
  "Kissed someone on the lips?",
  "Been to a school dance?",
  "Danced with someone at a party?",
  "Gone to a party without adult supervision?",
  "Snuck out of the house?",
  "Stayed out past curfew?",
  "Lied to your parents about where you were going?",
  "Been grounded?",
  "Had a sleepover with friends?",
  "Gone to a concert?",
  "Participated in a school play or musical?",
  "Joined a school club or team?",
  "Won a school award or recognition?",
  "Been sent to the principal's office?",
  "Failed a class or test?",
  "Gotten an A in a challenging class?",
  "Had a summer job or internship?",
  "Volunteered for a cause or charity?",
  "Babysat for a sibling or neighbor?",
  "Learned to drive?",
  "Got your driver's license?",
  "Gone on a road trip with friends or family?",
  "Visited a college campus?",
  "Applied for a college or scholarship?",
  "Had a social media account?",
  "Posted a photo on social media?",
  "Sent a Snapchat or Instagram story?",
  "Had an online friend?",
  "Played an online multiplayer game?",
  "Stayed up all night playing video games?",
  "Watched a TV series marathon in one sitting?",
  "Read a book series?",
  "Written in a journal or diary?",
  "Started a blog or YouTube channel?",
  "Tried a new hobby or sport?",
  "Learned to cook or bake something new?",
  "Traveled to another state or country?",
  "Gone camping or hiking?",
  "Taken a family vacation?",
  "Visited an amusement park?",
  "Been to the beach or a lake?",
  "Swam in a pool or ocean?",
  "Built a snowman or had a snowball fight?",
  "Ridden a bike or skateboard?",
  "Gone fishing or hunting?",
  "Adopted or cared for a pet?",
  "Had a part-time job?",
  "Bought something with your own money?",
  "Made a big purchase (like a phone or computer)?",
  "Tried a new hairstyle or hair color?",
  "Worn makeup or new fashion for the first time?",
  "Attended a religious or cultural ceremony?",
  "Celebrated a milestone birthday (like 16)?",
  "Helped a friend through a tough time?",
  "Confided in a friend about a personal issue?",
  "Apologized to someone for a mistake?",
  "Forgiven someone who hurt you?",
  "Made a new friend?",
  "Lost touch with an old friend?",
  "Stood up for someone being bullied?",
  "Been bullied or teased?",
  "Shared a secret with a friend?",
  "Kept a friend's secret?",
  "Had a best friend?",
  "Stayed friends with someone for 5+ years?",
  "Made a group of friends with similar interests?",
  "Been part of a study group?",
  "Worked on a group project at school?",
  "Helped organize a school event or fundraiser?",
  "Participated in a talent show or competition?",
  "Played a prank on someone?",
  "Had a prank played on you?",
  "Experienced a natural disaster (like a hurricane)?",
  "Visited a museum or historical site?",
  "Learned about your family history or heritage?",
  "Attended a wedding or family reunion?",
  "Experienced a significant family change (like moving)?",
  "Dealt with a serious illness or injury?",
  "Supported someone through a serious illness?",
  "Lost a loved one or pet?",
  "Experienced a major life event (like a sibling's birth)?",
  "Written a poem, story, or song?",
  "Entered a contest or competition?",
  "Created a piece of art (drawing, painting, sculpture)?",
  "Performed in front of an audience?",
  "Played a musical instrument?",
  "Sang in a choir or band?",
  "Learned a new language or skill?",
  "Traveled by plane, train, or bus?",
  "Met someone famous or a celebrity?",
  "Done something you were really proud of?",
  "Overcome a fear or challenge?",
  "Made a positive impact on someone else's life?",
  "Felt truly happy or content with yourself?",
];

const SCORE_MEANINGS = [
  { min: 85, max: 100, text: "Pure as an angel." },
  { min: 70, max: 84, text: "Innocent and still on the safer side." },
  { min: 40, max: 69, text: "Experienced person." },
  { min: 0, max: 39, text: "Fully experienced." },
];

function getScoreMeaning(score) {
  for (const range of SCORE_MEANINGS) {
    if (score >= range.min && score <= range.max) return range.text;
  }
  return "";
}

export default function TeensRicePurityTestClient() {
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
            Rice Purity Test for Teens
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[16px] leading-relaxed text-ink-700 text-center">
            The Rice Purity Test for teens is an age-specific version of the famous Purity Test, which young people take for fun, curiosity, and self-reflection. This test is best for teens between the ages of 13 and 17, and the questions are specifically tailored to this age group. Adults and extreme questions have been excluded from this test; as it focuses on the life experiences of teenagers.
            <br /><br />
            Teen years are full of new experiences, and you start exploring things like friendship, relationships, social life, independence, and personal choices. This version of the test helps you understand yourself and what you need to focus on in the coming years. It follows the same structure as the typical viral Rice Purity Test, but the questions are lighthearted and relevant to the age group. So take the test below and get to know your purity:
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
                100 Questions:
              </h2>
              <ul className="mb-6 divide-y divide-ink-200 border rounded-xl bg-cream-50">
                {TEENS_QUESTIONS.map((q, i) => (
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
                    Rice Purity Test for Teens - Result Card
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
                    Teen Purity Score Category
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
            What Is the Rice Purity Test for Teens?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The <a href="/" className="rpt-interlink">Rice Purity Test</a> for teens is dedicated for a younger audience, and it includes questions about relationships, friendships, behaviours, social life, and everyday experiences. The core idea of creating this age-specific version is to provide an educational guide in a safer and playful way. The goal is to give a way to reflect upon your life instead of assigning labels based on low or high purity.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            A higher score indicates you have had fewer experiences in life, and a lower score refers to a greater number of experiences. The score result should never be treated like a personality score or a life ranking, whether it's low or high.
          </p>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">
            Why Teens Are So Curious About Their Score
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            At a young age, teens have the curiosity to explore new things as soon as they hear about anything. The social media trends and a curiosity about their own purity scores are common reasons why teens become interested in taking the test. Teens wonder: Am I behind everyone else? Or is my life normal? That's why they remain curious about their scores. Also, it creates an opportunity to laugh about the results and share them with friends.
          </p>

          <h3 className="font-heading text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl mt-10">
            Is the Rice Purity Test Safe for Teens?
          </h3>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The test provided above is totally safe, age-specific, and fully anonymous, and doesn't ask for any personal details. Avoid taking tests on any platforms that asks for your name, address, or any other personal or confidential information about yourself. There are multiple sites available on the internet that might include questions about adult experiences. If you encounter a question that makes you feel unsafe or uncomfortable, just leave the platform immediately.
          </p>

          <h3 className="font-heading text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl mt-10">
            Tips Before Taking the Test
          </h3>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Here are a few things you should keep in mind before taking the test:
          </p>
          <ul className="list-disc ml-6 mt-2 text-[16px] text-neutral-700">
            <li>Never share your score publicly if it feels personal or if you're not comfortable.</li>
            <li>Do not let your friends, partner, or family members pressure you to reveal your score.</li>
            <li>Never lie about your score to look more experienced.</li>
            <li>Do not judge yourself or anybody else based on a high or low score.</li>
            <li>If you feel any confusion regarding a question, you must talk about it with an adult or family member.</li>
          </ul>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">
            Purity Score Breakdown for Teens
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The score levels and ranges are the same as the original test. Here is the brief overview of the score ranges:
          </p>
          <ul className="list-disc ml-6 mt-2 text-[16px] text-neutral-700">
            <li><span className="font-bold">100-85 Score:</span> Pure as an angel.</li>
            <li><span className="font-bold">84-70 Score:</span> Innocent and still on the safer side.</li>
            <li><span className="font-bold">69-40 Score:</span> Experienced person.</li>
            <li><span className="font-bold">Below 39 Score:</span> Fully experienced.</li>
          </ul>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">
            Final Thoughts
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            If you use the Rice Purity Test for Teens with the right approach, it can be a fun and useful quiz. It allows teens to learn more about life experiences, boundaries, and personal growth in a non-judgmental and relaxed way.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
