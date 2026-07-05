"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FORTNITE_QUESTIONS = [
  "Did you ever queue into a Fortnite Battle Royale match on day one?",
  "Were you playing before Chapter 2 launched?",
  "Ever attended a full live in-game event from start to finish?",
  "Reached Battle Pass level 100 without buying tiers, be honest?",
  "Ever matched outfits or emotes with a duo for a date night lobby screenshot?",
  "Completed all weekly quests in at least one season?",
  "Tried both Zero Build and Build modes for more than a week each?",
  "Changed sensitivity more than three times in a single day (and regretted it)?",
  "Warmed up in Creative (aim/edit maps) before matchmaking as a habit?",
  "Pulled an 8+ hour Fortnite session in one day?",
  "True or false: you won your very first match of a new chapter/season.",
  "Have you ever had an NSFW thought about a Fortnite character?",
  "Ever grabbed an exclusive or limited-time collab skin?",
  "Finished multiple Battle Passes all the way to 100?",
  "Purchased bonus/extra reward tiers beyond level 100?",
  "Bought a skin you instantly regretted?",
  "Did a teammate ever gift you a skin after some flirty banter?",
  "Refunded a cosmetic using a return ticket?",
  "Collected 10+ emotes you actively rotate?",
  "Favored a single main skin for an entire season?",
  "Name a time you staged a nightclub-style Creative screenshot with neon builds and emotes.",
  "Subscribed to Crew for at least one month?",
  "Spent the equivalent of $200+ on cosmetics overall?",
  "Have you roleplayed as a Fortnite character in an adult scenario?",
  "Wins in duos, trios, and squads at least once each?",
  "Clutched a 1v3 or 1v4 to save the squad?",
  "Reached top 5 with 0 eliminations (rat meta)?",
  "Dropped 10+ eliminations in a single match?",
  "Ever hosted a fashion show in Creative with playful themes and judging?",
  "Secured a Victory Royale without healing once?",
  "Won using only gray/green loot for the whole match?",
  "Took a win without placing a single build (pre-Zero Build)?",
  "Hit a legitimate no-scope from notable distance?",
  "Ended a match with a stylish trickshot finisher?",
  "Mastered 90s and clean double edits in public lobbies?",
  "Pulled off a piece-control sequence that felt pro-level?",
  "Be honest: chose a skin just to flirt via emotes in the pre-game lobby?",
  "Intentionally won a late-zone heal-off?",
  "Tarped and recycled mats efficiently in endgame rotates?",
  "Held high ground from half-half to moving zones?",
  "Retook height vs a competent builder mid-fight?",
  "Ran a utility-heavy loadout (pads/grapples/shockwaves) and it paid off?",
  "Won Zero Build relying on positioning and natural cover only?",
  "Broke enemy cover to force a perfect rotation elim?",
  "Clutched with frame-perfect splash/Med-Mist timing in storm?",
  "Built a consistent drop route with chest/path knowledge?",
  "Tagged early for surge or safety damage in sweaty lobbies?",
  "Rotated late game with mobility and took zero damage?",
  "Split mats/ammo efficiently mid-fight with a teammate?",
  "Third-partied at the perfect time without getting sandwiched?",
  "Hard-disengaged a doomed fight and still placed top 3?",
  "Predicted zone pulls and pre-positioned successfully?",
  "Played both edge zone and mid zone styles in the same event?",
  "Juggled heals across long storm distances efficiently?",
  "Would you build a cozy date spot on the map (campfire, lights) just for the vibes?",
  "Won off a clutch reboot timing in duos/trios/squads?",
  "Reached a high division in Ranked/Arena?",
  "Placed top 1% in any limited-time cup or tournament?",
  "Qualified to finals or final round in an in-game event?",
  "IGL'd your team with solid rotates and surge plans?",
  "Saved a too spicy for the lobby screenshot to your personal gallery?",
  "VOD-reviewed your games and fixed repeat mistakes?",
  "Scrimmed against better players and held your ground?",
  "Coached or gave structured feedback to a teammate?",
  "Played a full session doing with someone you met through remote chemistry?",
  "Adapted mid-event to a meta shift and improved results?",
  "Kept your mental after a griefed off-spawn and bounced back?",
  "Set goals (ELIMS/WINS/PLACEMENT) and actually hit them?",
  "Muted all voice/text for a full session due to toxicity?",
  "Asked teammates to report a toxic/cheating player?",
  "Received a chat/voice warning or temporary restriction?",
  "Tilted into repeated hot-drops then immediately regretted it?",
  "Focused a player or griefed a streamer out of spite?",
  "Spam-pinged a teammate purely from frustration?",
  "Left a match early while your squad still fought on?",
  "Ego-challenged instead of healing and threw the fight?",
  "Blamed lag when it was clearly your misplay?",
  "Hit requeue one more time after a loss streak, and made it worse?",
  "Learned multiple shotgun metas (pump/tac/maven etc.) across seasons?",
  "Dominated a season with a broken item pre-nerf?",
  "Ran off-meta loadouts and still performed well?",
  "Wore a cheeky combo (skin/back bling/pickaxe) purely to farm reactions?",
  "Chose utility over a second weapon and it won the match?",
  "Prioritized mobility over heals and paid the price?",
  "Fished endgame for heals and converted to a win?",
  "Used vehicles smartly for rotates or cover to win fights?",
  "Abused environmental destruction to flush enemies out?",
  "Mastered recoil and bloom control across AR variants?",
  "Swapped keybinds mid-season and successfully stuck with them?",
  "Visited every named POI during the first week of a season?",
  "Completed a season's full storyline/quest chain?",
  "True or false: you used heart or kiss emotes to defuse a fight, and it worked.",
  "Unlocked full map visuals early via purposeful exploration?",
  "Memorized chest spawns and mats at multiple POIs?",
  "Consistently conquered a hot-drop POI against multiple teams?",
  "Eliminated a roaming boss and used the mythic to win?",
  "Solved environmental puzzles for hidden loot efficiently?",
  "Escorted a reboot card through heat to revive safely?",
  "Used wildlife or NPCs strategically in a winning match?",
  "Clutched a 1 HP win thanks to perfect timing and mechanics?",
];

const SCORE_MEANINGS = [
  { min: 90, max: 100, text: "Beginner or pure player." },
  { min: 70, max: 89, text: "Balanced player." },
  { min: 40, max: 69, text: "Competitive player." },
  { min: 0, max: 39, text: "Hard-core Fortnite player." },
];

function getScoreMeaning(score) {
  return SCORE_MEANINGS.find((range) => score >= range.min && score <= range.max)?.text || "";
}

export default function FortniteRicePurityTestClient() {
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
            Fortnite Rice Purity Test
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[16px] leading-relaxed text-ink-700 text-center">
            Are you a Fortnite player who wants to check how pure your Fortnite habits are? The Fortnite Rice Purity Test is not just about measuring the players skills or who is the best player; it's a joyful way to assess your Fortnite experience and gameplay. It's a simple game where you land, grab a weapon, and try to survive as long as possible. Soon you realize it's more than just a game. You become attached to it and buy skins and build a personality around your gameplay.
            <br /><br />
            The Fortnite Purity Test is highly inspired by the original <a href="/" className="rpt-interlink">Rice Purity Test</a>, where questions revolve around innocence and life experiences. In this version, however, questions are totally about gameplay habits and in-game choices. The best part about this test is that it relates closely to a regular player, that's the beauty of it.
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
                {FORTNITE_QUESTIONS.map((question, index) => (
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
                    Fortnite Rice Purity Test - Result Card
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
                    Fortnite Score Category
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
            What is Fortnite?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Fortnite is one of the most famous and free-to-play online video games. It was designed and developed by Epic Games and released to the digital world in 2017. It offers multiple game modes, including:
          </p>
          <ol className="list-decimal ml-6 mt-4 text-[16px] text-neutral-700">
            <li><span className="font-bold">Fortnite Battle Royale:</span> This one is the most notable and famous game mode, where 100 players drop onto an island, gather weapons, and fight till last standing.</li>
            <li><span className="font-bold">Fortnite Save the World:</span> A survival mode in which up to four players team up for a fight with shooting defence, fighting with zombie-like creatures, and defending their objects using the objects they build by themselves.</li>
            <li><span className="font-bold">Fortnite Creative:</span> This mode gives players complete freedom where players build their own maps, game modes, and arenas.</li>
          </ol>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The game is a mix of shooting, resource gathering, and construction. The game is available on almost all major gaming platforms.
          </p>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">
            What Parts of Fortnite Does This Test Cover?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Here are the five key areas that the Fortnite Rice Purity Test covers:
          </p>
          <ul className="list-disc ml-6 mt-2 text-[16px] text-neutral-700">
            <li><span className="font-bold">Map:</span> Questions will test your knowledge about all Fortnite drop points.</li>
            <li><span className="font-bold">Weapons:</span> Do you know all the weapons used in the game?</li>
            <li><span className="font-bold">Gameplay:</span> Asks about real game experiences.</li>
            <li><span className="font-bold">Skins:</span> This section checks how familiar you are with Fortnite outfits.</li>
            <li><span className="font-bold">Dances:</span> Dances are "Emotes" and the most interesting part of the game. Explores the fun side of the game.</li>
          </ul>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">
            How Your Score Is Calculated
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            Score calculation is easy and follows the same procedure as the original version. You start at 100. Each time you answer "Yes" to a question, the number decreases. Here's the rough idea about the score:
          </p>
          <ul className="list-disc ml-6 mt-2 text-[16px] text-neutral-700">
            <li><span className="font-bold">90 to 100:</span> Beginner or pure player.</li>
            <li><span className="font-bold">70 to 89:</span> Balanced player.</li>
            <li><span className="font-bold">40 to 69:</span> Competitive player.</li>
            <li><span className="font-bold">Below 40:</span> Hard-core Fortnite player.</li>
          </ul>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl mt-10">
            Conclusion
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">
            The Fortnite Rice Purity test is a tremendous way to reflect upon the time you spent playing Fortnite. It brings back memories of amazing, funny, annoying, and wild experiences across Fortnite's various locations and maps. Answer the questions honestly and share your score with friends and team members, and find out who has had the most unique Fortnite experiences.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
