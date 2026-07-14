"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AI_QUESTIONS = [
  "Heard of AI?",
  "Used an AI chatbot?",
  "Used 2 different AI chatbots?",
  "Used more than 3 AI chatbots?",
  "Used AI instead of Googling something?",
  "Used AI instead of hiring a professional?",
  "Used AI for ideas while brainstorming?",
  "Used AI for homework or professional work?",
  "Used AI for social media?",
  "Used AI to write a resume or cover letter?",
  "Used AI to write legal documents?",
  "Used AI to write an email, message, or text to be read by a human?",
  "Used AI to cheat on an assignment?",
  "Used AI in a video call secretly?",
  "Used AI to catfish someone or been catfished?",
  "Used AI to write a birthday card, eulogy, or wedding vows?",
  "Taught someone how to use AI?",
  "Hidden your AI usage from colleagues, family, or friends?",
  "Been caught red-handed using AI?",
  "Had a conversation with an AI chatbot that lasted 10+ messages?",
  "Had a conversation with an AI chatbot that lasted 100+ messages?",
  "Said please and thank you to an AI chatbot?",
  "Threatened harm to encourage an AI model to complete your task?",
  "Tried to make AI say something it refused to say?",
  "Been offended by an AI chatbot's response?",
  "Had an AI chatbot gaslight you?",
  "Had an emotional reaction to a specific AI chatbot or model being down or unavailable?",
  "Paid for an AI model, experience, or chatbot?",
  "Spent more than $100 on AI?",
  "Spent more than $1000 on AI?",
  "Waited for a model to launch?",
  "Watched a live model demo?",
  "Attended an AI-related event?",
  "Learned prompting techniques?",
  "Used an AI API?",
  "Used function calling?",
  "Fine-tuned a model?",
  "Trained your own model?",
  "Vibe coded?",
  "Bought or worn merchandise from an AI company?",
  "Generated an image?",
  "Edited an image with AI?",
  "Posted an AI-generated image on social media?",
  "Posted AI-generated content without disclosing that it was AI?",
  "Used AI-generated images of yourself for a profile picture, dating site, or job board?",
  "Generated a lewd image?",
  "Generated an image to use as evidence?",
  "Generated a video?",
  "Generated a video of yourself or someone you know personally?",
  "Generated a video of a celebrity or historical figure?",
  "Generated a video of a deceased person?",
  "Generated a video depicting nudity?",
  "Used AI-generated videos in court?",
  "Watched an AI-generated movie?",
  "Generated AI music or sound effects?",
  "Listened to AI-generated music?",
  "Bought something through an AI chatbot?",
  "Asked for or followed AI instructions on making food?",
  "Used an AI chatbot to tell you what to wear?",
  "Used an AI chatbot to tell you how to vote?",
  "Used AI to plan a vacation?",
  "Asked AI for medical advice?",
  "Used AI to make financial decisions or investment advice?",
  "Believed AI's answer without verifying the information?",
  "Used AI to practice social skills or conversations?",
  "Preferred talking to AI over talking to a human?",
  "Asked AI what it thinks of you?",
  "Asked AI to rate your attractiveness?",
  "Tweeted @grok?",
  "Asked AI how you could improve?",
  "Used AI to roast you or someone else?",
  "Used AI to interpret your dreams?",
  "Asked AI to predict your future?",
  "Told an AI chatbot a secret you did not want to tell a human?",
  "Used AI to solve problems in your real relationships?",
  "Used AI for therapy, self-help, or wellness?",
  "Designed an AI character?",
  "Referred to an AI chatbot as your friend?",
  "Had sex with an AI chatbot?",
  "Had sex with multiple AI chatbots?",
  "Fell in love with an AI chatbot?",
  "Been in a relationship with an AI chatbot?",
  "Been engaged to or married an AI chatbot?",
  "Bought AI hardware?",
  "Worn an AI-powered device?",
  "Worn an AI-powered device in public?",
  "Worn an AI-powered device in the bedroom?",
  "Worn an AI-powered device without disclosing it to others?",
  "Given an AI product access to your emails, texts, calendars, or other personal accounts or data?",
  "Credited AI in your academic work?",
  "Supported a pro-AI policy?",
  "Used AI to make key military command decisions?",
  "Used AI to create misinformation or fake news?",
  "Asked AI about its feelings?",
  "Asked for or followed AI instructions on making drugs?",
  "Asked for or followed AI instructions on making weapons or explosives?",
  "Used AI to commit a crime?",
  "Had an AI chatbot call the cops on you?",
  "Been institutionalized over an AI chatbot's response?",
  "Believed an AI chatbot had consciousness?",
];

const SCORE_MEANINGS = [
  { min: 90, max: 100, text: "Very AI-pure. You have barely let AI into your daily life." },
  { min: 70, max: 89, text: "Casual AI user. You know the basics and use AI in a balanced way." },
  { min: 40, max: 69, text: "AI-integrated. AI is already part of your work, creativity, or decisions." },
  { min: 20, max: 39, text: "Deep AI user. You have explored many advanced, personal, and experimental AI uses." },
  { min: 0, max: 19, text: "Fully AI-experienced. AI is deeply woven into your online and offline life." },
];

function getScoreMeaning(score) {
  return SCORE_MEANINGS.find((range) => score >= range.min && score <= range.max)?.text || "";
}

export default function AIPurityTestClient() {
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
            AI Purity Test
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-[16px] leading-relaxed text-ink-700">
            AI Purity Test is a self-assessment or self-graded quiz that measures the person's relationship with AI. How well do you know the latest AI models, and how aware are you of upcoming developments in AI? This quiz will elevate your knowledge about AI and help you discover areas you may never have considered.
            <br /><br />
            The test is made up of 100 questions, and each question is related to how you have integrated AI in your work, daily and personal lives, creativity, and even in intimate aspects of your life. So take the test and understand how deeply AI is integrated into your life.
          </p>
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-10 sm:px-6 lg:px-8">
          <h2 className="font-heading mt-10 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
            Questions
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Check every AI-related experience that applies to you. Each checked answer subtracts one point from your full 100 score.
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
                {AI_QUESTIONS.map((question, index) => (
                  <li key={`${index}-${question}`} className="flex items-start gap-3 px-4 py-3">
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
                    AI Purity Test - Result Card
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
                    AI Purity Score Category
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
            What is The AI Purity Test?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The AI Purity Test is a humorous assessment of your interactions with artificial intelligence, whether you use AI for work, advice, research, or for learning about a specific topic. As AI technology continues to evolve and becomes increasingly the top choice of internet users in 2025, this test was officially created for entertainment and self-reflection.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            This test has taken inspiration from the <Link href="/" className="rpt-interlink">Rice Purity Test</Link> to check your purity in how you use artificial intelligence. This test explores the creative, educational, and modern side of technology as well as highlights the negative usage of the highly emerging technology.
          </p>

          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Why Take the AI Purity Test?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Here are some of the reasons why you must take the AI purity test:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-[16px] leading-relaxed text-neutral-700">
            <li>Based on 100 questions covering all aspects of AI in depth.</li>
            <li>Gives you results with just one click and a personalized assessment.</li>
            <li>Completely anonymous and protects your privacy.</li>
            <li>You can share your scores with friends, peers, and colleagues easily.</li>
          </ul>

          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            How Question Categorized in the AI Purity Test?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Below is the complete breakdown of categories of the test:
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            <strong>Basic AI Use:</strong> Covers basic AI questions like how you started with AI.
          </p>
          <p className="mt-2 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            <strong>Personal:</strong> How you use AI for personal advice or health tips.
          </p>
          <p className="mt-2 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            <strong>Creative:</strong> How people use artificial intelligence for creative tasks.
          </p>
          <p className="mt-2 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            <strong>Ethical:</strong> Some extensive questions about ethical concerns and AI boundaries.
          </p>

          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Who Should Take This?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Anyone can take this test, whether you are just starting with AI or have been using it since its emergence; it caters to all types of users. The questions range from basic to advanced. If any applies to you, answer by checking the box and one point will be deducted from 100.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The best part of this test is being an anonymous participant, so take the test freely because no one is here to judge you.
          </p>

          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Final Words
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            AI Purity Test is a fun way to understand your interests and usage of artificial intelligence. You will discover where you use AI the most, whether it is research, personal care, or studies. So, go ahead, take the test and unlock the full potential of Artificial Intelligence.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
