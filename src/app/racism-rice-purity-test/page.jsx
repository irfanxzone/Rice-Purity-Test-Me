"use client";
import { useCallback, useMemo, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RACISM_QUESTIONS = [
  "I have assumed someone's intelligence based on their race",
  "I have assumed someone's income level based on their race",
  "I have assumed someone was dangerous based on their race",
  "I have assumed someone was less educated based on their race or accent",
  "I have assumed someone's nationality based on their appearance",
  "I have assumed a person of color was an employee rather than a customer",
  "I have assumed someone was not the expert in the room because of their race",
  "I have assumed someone was lying because of their race",
  "I have assumed a person's food preferences based on their ethnicity",
  "I have assumed someone was an immigrant based on how they look",
  "I have assumed someone was a criminal based on their race",
  "I have judged someone's parenting based on their race",
  "I have assumed someone was athletic or not based on their race",
  "I have assumed a person of color was not the boss or manager",
  "I have assumed someone was not a native English speaker based on their appearance",
  "I have laughed at a racial or ethnic joke",
  "I have made a racial joke myself",
  "I have used a racial slur, even casually",
  "I have used someone's race as a punchline",
  "I have stayed silent when someone made a racist remark",
  "I have told someone their name is 'too hard to pronounce'",
  "I have commented on someone 'speaking well' as if it were surprising",
  "I have asked someone 'where are you really from?' after they said they were local",
  "I have used phrases like 'you people' directed at a racial group",
  "I have described someone's hair, skin or features with a tone of exoticism",
  "I have made a backhanded compliment about someone's race",
  "I have used someone's ethnicity as a label before their name (e.g. 'the Black guy')",
  "I have called something 'ghetto' to mean low-quality",
  "I have dismissed a racist remark as 'just a joke'",
  "I have used a word from another culture mockingly",
  "I have crossed the street or changed direction to avoid someone because of their race",
  "I have avoided sitting next to someone of a different race if I had a choice",
  "I have felt uncomfortable in a space where I was a racial minority",
  "I have felt relieved when the person accused of a crime was not my race",
  "I have avoided a neighborhood because of who lives there",
  "I have gripped my bag tighter near someone of a certain race",
  "I have had a friend group that is entirely one race",
  "I have never had a close friend of a different race",
  "I have avoided making eye contact with someone of a different race",
  "I have felt suspicious of someone in a store based on their race",
  "I have locked my car door when passing someone of a certain race",
  "I have left a restaurant or space early due to the racial makeup",
  "I have not introduced myself to a neighbor of a different race",
  "I have treated a service worker differently based on their race",
  "I have avoided inviting someone to a social event due to their race",
  "I believe some races are naturally smarter than others",
  "I believe some races are more naturally criminal than others",
  "I think interracial relationships are unusual or wrong",
  "I believe certain cultures are simply inferior",
  "I believe racism is mostly over and no longer a serious issue",
  "I believe affirmative action is reverse racism",
  "I believe people of color are too sensitive about race",
  "I believe media attention to racism is exaggerated",
  "I believe racial disparities in wealth are due to personal choices, not systemic factors",
  "I believe immigrants should fully abandon their culture to fit in",
  "I think diversity initiatives do more harm than good",
  "I believe racial profiling is sometimes justified",
  "I have doubted someone's achievement thinking their race helped them get it",
  "I believe race should not be discussed in schools",
  "I believe 'not seeing color' is the best approach to racism",
  "I have treated a colleague differently at work because of their race",
  "I have interrupted or talked over a person of color more than I would a white person",
  "I have taken credit for or dismissed the ideas of a person of color",
  "I have questioned a person of color's credentials more than a white person's",
  "I have avoided recommending a person of color for a role due to 'culture fit'",
  "I have assumed a person of color got hired due to diversity quotas",
  "I have not advocated for equal pay for a colleague of a different race",
  "I have made someone feel unwelcome in a space due to their race",
  "I have not spoken up when a colleague made a racist remark at work",
  "I have evaluated creative or professional work more critically based on the creator's race",
  "I have excluded someone from a meeting or decision because of their race",
  "I have made assumptions about a client's preferences based on race",
  "I have dismissed a complaint of racism from a coworker",
  "I have given harsher feedback to someone of a different race",
  "I have not mentored someone because of their race",
  "I have rolled my eyes at a story about racial injustice",
  "I have called a person of color 'articulate' as a compliment",
  "I have described a Black or brown neighborhood as 'sketchy' without reason",
  "I have consumed media that demeans a racial or ethnic group for entertainment",
  "I have followed or unfollowed someone on social media primarily due to their race",
  "I have been surprised when a person of color excelled in a field",
  "I have praised a person of color for being 'not like the others'",
  "I have shared content that mocked a racial group",
  "I have worn a cultural costume that was not my own culture",
  "I have appropriated a cultural practice without understanding or respect",
  "I have dismissed a historical atrocity as irrelevant today",
  "I have challenged the accuracy of a lived racial experience I have not had",
  "I have not believed someone who said they experienced racism",
  "I have never discussed race or racism with friends or family",
  "I honestly believe I carry no racial bias whatsoever",
  "I have felt annoyed when racial issues were brought up in conversation",
  "I have said 'I don't have a racist bone in my body'",
  "I have defended a racist action by saying 'I didn't mean it that way'",
  "I have made assumptions about someone based on their skin color",
  "I have felt uneasy if my neighborhood became more racially diverse",
  "I have not acknowledged the advantages or disadvantages race has given me",
  "I have felt guilty about something I said and never addressed it",
  "I have never read a book or watched a documentary about racial history",
  "I have used my own experience to dismiss systemic racism",
  "I have avoided acknowledging racism to avoid conflict"
];

const SCORE_MEANINGS = [
  { min: 80, max: 100, text: "You’re highly aware of racial bias and have never crossed the line." },
  { min: 60, max: 79, text: "Partially aware of racial biases, but a little. It is mostly considered safe." },
  { min: 40, max: 59, text: "You fall into the safer zone below. Your beliefs and behaviours or experiences fall into racism, but not overt or subtle." },
  { min: 20, max: 39, text: "You’re deep into racism and need to slow it down." },
  { min: 0, max: 19, text: "You are observing racial discrimination or unconscious stereotypes." },
];

function getScoreMeaning(score) {
  for (const range of SCORE_MEANINGS) {
    if (score >= range.min && score <= range.max) return range.text;
  }
  return "";
}

export default function RacismRicePurityTestPage() {
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
        {/* Only show intro and questions until test is completed */}
        <section className="mx-auto max-w-3xl px-4 pt-10 pb-10 sm:px-6 sm:pt-14 lg:px-8">
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl text-center">Racism Rice Purity Test</h1>
          <p className="mx-auto mt-3 max-w-xl text-[16px] leading-relaxed text-ink-700 text-center">
            Have you ever felt that you are a racist? Check your racial bias by taking the Racism Rice Purity Test, a completely anonymous test. The purpose of this test is to explore an idea about racial biases and self-awareness. It aims to identify discriminatory behaviour that a person may hold.<br /><br />
            This test consists of 100 questions; it is a quiz that determines whether you are a racist. The questions include your beliefs and behaviours related to a particular race, which can be a certain bias or complete discrimination. Take this test to understand your beliefs, behaviours, and experiences related to racism.
          </p>
        </section>
        <section id="test" className="mx-auto max-w-3xl px-4 pt-2 pb-10 sm:px-6 lg:px-8">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleCalculate();
            }}
            className="space-y-6"
          >
            <ul className="mb-6 divide-y divide-ink-200 border rounded-xl bg-cream-50">
              {RACISM_QUESTIONS.map((q, i) => (
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
        </section>
        {stage === "done" && finalScore !== null && (
          <section
            id="result"
            data-testid="result-section"
            className="mx-auto max-w-3xl px-4 pt-10 pb-24 sm:px-6 sm:pt-16 lg:px-8"
          >
            <div className="rpt-certificate animate-pop-in relative p-8 sm:p-12">
              <div className="text-center">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-ink-500">
                  Racism Rice Purity Test · Result Card
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
                  Racism Score Category
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
        {/* Always show informational content below questions, like other test pages */}
        <section id="about" data-testid="seo-content" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 rpt-prose">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-4">What is Racism?</h1>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Racism is the belief or behaviour of treating people differently based on their race. By all means, racism considers certain groups superior to others, and some are inferior. Racism might be personal, institutional, or cultural; it has different variants. It can be overt or subtle, this racism purity test is designed to reflect attitudes and experiences related to racial bias.
          </p>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">What is the Racism Rice Purity Test?</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The Racism Rice purity Test became popular online as a part of the broader trend of self-assessment quizzes. Since people often follow trends, online trends often spread rapidly through social media. The same happened in the case of the Rice purity score. A random person on X posted about the racism purity test, and it went viral and became a popular trend. The racism rice purity test is a 100-question quiz asking questions about beliefs, behaviours, and experiences related to racial bias.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The core idea of this test is very similar to the <a href="/" className="rpt-interlink">rice purity test</a>; actually, it’s a parody of the official test. A complete 100-question list is provided, answered by checking the boxes, and if your answer is No, leave the box unchecked. At last, you’ll get the racism purity score out of 100.
          </p>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">What Do Your Racism Purity Test Scores Mean?</h2>
          <ul className="list-disc ml-6 mt-2 text-[16px] text-neutral-700">
            <li><span className="font-bold">80–100 score:</span> This score range indicates that you’re highly aware of racial bias and have never crossed the line.</li>
            <li><span className="font-bold">60–80 Score:</span> Partially aware of racial biases, but a little.  It is mostly considered safe.</li>
            <li><span className="font-bold">40–60 Score:</span> You fall into the safer zone below. Your beliefs and behaviours or experiences fall into racism, but not overt or subtle.</li>
            <li><span className="font-bold">20–40 Score:</span> This shows you’re deep into racism and needs to slow it down.</li>
            <li><span className="font-bold">0–20 Score:</span> This score range indicates you are observing racial discrimination or unconscious stereotypes.</li>
          </ul>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Not all score ranges are scientifically proven. It's just fun and anonymous. Take the test and forget about it.
          </p>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">Am I Racist If I Score High on the Racism Test?</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            If you score high on the test, that does not necessarily mean you are racist, but it may reflect certain biased attitudes and behaviors. You need to examine your thoughts, behaviours towards other people and need to improve them. These ideas can harm others' self-confidence, identity, and self-respect. However, it’s not a final judgment of your character. You're a racist. This test might be the start of your self-reflection and improving your life by reducing such ideas.
          </p>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">Conclusion</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The Racism Rice purity Test is an amazing tool to describe one’s racial bias. The results of the test do not prove you’re racist or pure, but it’s just for educational and self-reflection purposes. Students, adults, and people of different age groups can take this and get to know their race purity score. This is already a trend, so take the test and share it with your friends to know their experiences and discussions.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
