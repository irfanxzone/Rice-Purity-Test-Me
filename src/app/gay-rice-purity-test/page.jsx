"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const GAY_QUESTIONS = [
  "Caught yourself wondering \"am I gay?\"",
  "Googled that exact question late at night.",
  "Felt a crush on someone of the same sex and told no one.",
  "Assumed it was \"just admiration\" for way too long.",
  "Felt different from other kids without having the words for it.",
  "Related hard to a queer character before you understood why.",
  "Rewatched a scene because of how one character made you feel.",
  "Tried a label in your head (gay, bi, queer) to see if it fit.",
  "Changed which label you use as you figured things out.",
  "Felt actual relief the first time a word felt right.",
  "Practiced saying \"I'm gay\" out loud when you were alone.",
  "Wrote about your feelings somewhere private.",
  "Convinced yourself for a while that you were straight.",
  "Reached a point where you just knew, no proof needed.",
  "Decided labels don't really matter to you.",
  "Told your first person before anyone else knew.",
  "Came out to a best friend.",
  "Came out to a sibling.",
  "Came out to a parent.",
  "Came out to your whole family.",
  "Came out over text because saying it out loud was too hard.",
  "Been asked \"are you sure?\" right after telling someone.",
  "Had a coming out go better than you feared.",
  "Had a coming out go worse than you hoped.",
  "Been out online before you were out in real life.",
  "Been out to friends but not to family.",
  "Been out in one city and completely private in another.",
  "Chosen not to come out to someone to stay safe.",
  "Helped a friend come out.",
  "Come out more than once to the same person.",
  "Had your first same-sex crush.",
  "Flirted with someone of the same sex.",
  "Been unsure if they were flirting back.",
  "Downloaded a dating app to see who was out there.",
  "Deleted the app, then downloaded it again.",
  "Made a private or anonymous account to explore.",
  "Slid into someone's DMs.",
  "Had someone slide into yours.",
  "Met up in person with someone you met online.",
  "Been on a real date with someone of the same sex.",
  "Held hands with a same-sex partner in public.",
  "Had your first same-sex kiss.",
  "Been in a same-sex relationship.",
  "Said \"I love you\" and meant it.",
  "Introduced a partner to your friends.",
  "Introduced a partner to your family.",
  "Kept a relationship secret from people who'd disapprove.",
  "Been in love while still in the closet.",
  "Had a situationship you couldn't explain to anyone.",
  "Been ghosted by someone you actually liked.",
  "Ghosted someone yourself.",
  "Been through a same-sex breakup.",
  "Gotten back with an ex.",
  "Shared a bed with someone you were into.",
  "Had your first time with the same sex.",
  "Had a hookup that stayed just a hookup.",
  "Been with someone you'd met that same day.",
  "Been intimate with a friend.",
  "Stayed friends with them afterward.",
  "Talked openly with a partner about what you like.",
  "Set a boundary and had it respected.",
  "Said no and felt good about it.",
  "Told a friend the full story afterward.",
  "Gotten tested because you take care of yourself.",
  "Followed queer creators and felt seen by them.",
  "Found your community online before you found it in person.",
  "Been in a group chat that felt like a safe space.",
  "Made a real-life friend who started as an online one.",
  "Used the internet to ask what you couldn't ask a person.",
  "Posted something that quietly hinted at your identity.",
  "Been to a gay bar for the first time.",
  "Been to a queer club night.",
  "Been to a drag show.",
  "Been to Pride.",
  "Actually marched in a Pride parade.",
  "Worn something that showed who you are in public.",
  "Joined an LGBTQ+ group, club, or society.",
  "Been to a support group or community meetup.",
  "Found a chosen family that showed up for you.",
  "Had an older friend or mentor in the community.",
  "Volunteered or donated to an LGBTQ+ cause.",
  "Traveled somewhere because it was queer-friendly.",
  "Walked into a room and finally felt like you belonged.",
  "Felt safer around your queer friends than anywhere else.",
  "Cried happy tears at something queer for the first time.",
  "Been outed before you were ready.",
  "Lost a friend over your identity.",
  "Been rejected by a family member.",
  "Been treated differently once people knew.",
  "Hidden a partner from someone to avoid trouble.",
  "Heard a slur aimed at you.",
  "Felt unsafe holding hands in public.",
  "Held back from being yourself in a certain place.",
  "Moved, switched schools, or changed jobs for a fresh start.",
  "Struggled with your mental health around all of this.",
  "Reached out for help and actually got it.",
  "Found a doctor or therapist who understood queer people.",
  "Forgiven someone who came around late.",
  "Become the person younger-you needed to see.",
  "Come out the other side of a hard chapter still standing.",
];

const SCORE_MEANINGS = [
  { min: 90, max: 100, text: "The beginning of exploring queer life, with very few experiences or nearly none." },
  { min: 75, max: 89, text: "Some real experiences behind you, and still looking ahead. Normal for people who came out recently." },
  { min: 55, max: 74, text: "A balanced personality with some dating, relationships, and LGBTQ+ experiences. The majority of people belong to this band." },
  { min: 35, max: 54, text: "A full queer social life. You have been to the events, had the relationships, and made friends who are just like you." },
  { min: 15, max: 34, text: "Deeply bound into community life, and a regular member of it, usually over many years of experience." },
  { min: 0, max: 14, text: "You have covered almost everything from the culture. Very rare, and usually a long connection with queer life." },
];

function getScoreMeaning(score) {
  for (const range of SCORE_MEANINGS) {
    if (score >= range.min && score <= range.max) return range.text;
  }
  return "";
}

export default function GayRicePurityTestPage() {
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
          <h1 className="mt-5 text-center text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">Gay Rice Purity Test</h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-[16px] leading-relaxed text-ink-700">
            The gay rice purity test is a complete checklist of 100 questions that revolve around queer life instead of straight life. It is a comprehensive quiz about dating, attraction, relationships, identity, and LGBTQ+ experiences. Each time you answer a question, your total score decreases by one point.
            <br /><br />
            This particular test cannot define whether you're gay or not; nothing is stored or shared, so answer honestly. There is no ideal score that proves you belong to a particular identity. It's simply a wonderful way to look back on the journey of experiences you've made so far. Answer each question honestly and get a clearer idea of your true self.
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
            <h2 className="sr-only">100 Questions</h2>
            <ul className="mb-6 divide-y divide-ink-200 rounded-xl border bg-cream-50">
              {GAY_QUESTIONS.map((q, i) => (
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
                  Gay Rice Purity Test Result Card
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
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">Gay Purity Score Category</h2>
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
          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">What Is the Gay Rice Purity Test?</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            We all know the <a href="/" className="rpt-interlink">Rice Purity Test</a> is simpler in meaning and based on the general life of college and university students. It normally asks about things like boy meets girl, prom, college dorms, and first drinks. The gay version is a whole different thing, with questions that go deeper into gay, queer, and bisexual experiences.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">Here are some of the topics the gay rice purity test covers:</p>
          <ul className="ml-6 mt-2 list-disc text-[16px] text-neutral-700">
            <li>Same-gender attraction</li>
            <li>First crushes and relationships</li>
            <li>Dating and romantic experiences</li>
            <li>Understanding your identity</li>
            <li>LGBTQ+ life</li>
            <li>Personal confidence and acceptance</li>
          </ul>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Before taking the test, there are a few things to keep in mind. This quiz is not about "are you gay?" or proving your identity, so take it fearlessly nobody is watching you.
          </p>
          <img
            src="/gay-rice-purity-test.webp"
            alt="Gay Rice Purity Test LGBTQ self assessment quiz featured image"
            className="mt-6 h-auto w-full rounded-lg border border-ink-200 object-cover"
          />

          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">How This Quiz Works</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            It works just like the viral purity test. Below is a clear demonstration of how it works.
          </p>
          <div className="mt-5 overflow-hidden rounded-lg border border-ink-200">
            <table className="w-full text-left text-sm text-neutral-700">
              <thead className="bg-[#FACC15]/25 text-ink-900">
                <tr><th className="px-4 py-3">Step</th><th className="px-4 py-3">What happens</th></tr>
              </thead>
              <tbody className="divide-y divide-ink-200 bg-cream-50">
                <tr><td className="px-4 py-3 font-semibold">1</td><td className="px-4 py-3">You start at 100 points.</td></tr>
                <tr><td className="px-4 py-3 font-semibold">2</td><td className="px-4 py-3">You read each of the 100 questions one by one.</td></tr>
                <tr><td className="px-4 py-3 font-semibold">3</td><td className="px-4 py-3">Tick it if you have done it. Leave it blank if you have not.</td></tr>
                <tr><td className="px-4 py-3 font-semibold">4</td><td className="px-4 py-3">Each tick removes one point.</td></tr>
                <tr><td className="px-4 py-3 font-semibold">5</td><td className="px-4 py-3">You hit the Calculate Score button and get your number instantly.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            There is no sign-up, no email, and no name required. It's completely anonymous unless you share it with your friends. The whole thing takes around three to five minutes.
          </p>

          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">What Does Your Gay Purity Score Mean?</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The score is based on how many boxes you check and how many you leave empty. So we made a tier of scores based on users' average experiences. Find out which category your score belongs to.
          </p>
          <div className="mt-5 overflow-hidden rounded-lg border border-ink-200">
            <table className="w-full text-left text-sm text-neutral-700">
              <thead className="bg-[#FACC15]/25 text-ink-900">
                <tr><th className="px-4 py-3">Score</th><th className="px-4 py-3">What it usually reflects</th></tr>
              </thead>
              <tbody className="divide-y divide-ink-200 bg-cream-50">
                <tr><td className="px-4 py-3 font-semibold">90-100</td><td className="px-4 py-3">The beginning of exploring queer life, with very few experiences or nearly none.</td></tr>
                <tr><td className="px-4 py-3 font-semibold">75-89</td><td className="px-4 py-3">Some real experiences behind you, and still looking ahead. Normal for people who came out recently.</td></tr>
                <tr><td className="px-4 py-3 font-semibold">55-74</td><td className="px-4 py-3">A balanced personality with some dating, relationships, and LGBTQ+ experiences. The majority of people belong to this band.</td></tr>
                <tr><td className="px-4 py-3 font-semibold">35-54</td><td className="px-4 py-3">A full queer social life. You have been to the events, had the relationships, and made friends who are just like you.</td></tr>
                <tr><td className="px-4 py-3 font-semibold">15-34</td><td className="px-4 py-3">Deeply bound into community life, and a regular member of it, usually over many years of experience.</td></tr>
                <tr><td className="px-4 py-3 font-semibold">0-14</td><td className="px-4 py-3">You have covered almost everything from the culture. Very rare, and usually a long connection with queer life.</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">How Do I Know If I'm Gay?</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            If someone regularly experiences physical, emotional, and romantic attraction toward the same gender, they might be gay. But there is no single thing that can prove whether someone is gay or not. To get a clearer picture of yourself, consider who you naturally:
          </p>
          <ul className="ml-6 mt-2 list-disc text-[16px] text-neutral-700">
            <li>Develop crushes on</li>
            <li>Imagine dating</li>
            <li>Feel emotionally close to</li>
            <li>Want to kiss or hold</li>
            <li>Picture in a future relationship</li>
            <li>Feel romantic or physical excitement around</li>
          </ul>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            These considerations will likely give you an idea about your true identity.
          </p>

          <h2 className="font-heading mt-10 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">Final Thoughts</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The gay rice purity test is just a hundred-question list answer each one that relates to you and leave the ones that don't. It doesn't simply give you the label of being gay or not; it just tries to help you understand your experiences in a better way. So take the test honestly, and if you feel safe, share it with your friends and community members.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
