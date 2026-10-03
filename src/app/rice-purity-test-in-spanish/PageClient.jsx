"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SPANISH_QUESTIONS = [
  "¿Has tomado a alguien de la mano de forma romántica?",
  "¿Has tenido una cita?",
  "¿Has estado en una relación?",
  "¿Has bailado sin dejar espacio para Jesús?",
  "¿Has besado a alguien que no sea de tu familia?",
  "¿Has besado en los labios a alguien que no sea de tu familia?",
  "¿Has dado un beso con lengua?",
  "¿Has dado un beso con lengua en público?",
  "¿Has besado a alguien en el cuello?",
  "¿Has besado a alguien estando en posición horizontal?",
  "¿Has hecho o recibido un chupetón?",
  "¿Has besado un seno o te han besado en un seno?",
  "¿Has besado a alguien por debajo de la cintura?",
  "¿Has besado durante más de dos horas seguidas?",
  "¿Has jugado a un juego que implique quitarse la ropa?",
  "¿Has visto a otra persona o te ha visto otra persona en un contexto sensual?",
  "¿Te has masturbado?",
  "¿Te has masturbado mirando una imagen o un video?",
  "¿Te has masturbado mientras había otra persona en la habitación?",
  "¿Te han sorprendido masturbándote?",
  "¿Te has masturbado con un objeto inanimado?",
  "¿Has visto o leído material pornográfico?",
  "¿Has dado o recibido un masaje sensual?",
  "¿Has simulado los movimientos del coito sin quitarte la ropa?",
  "¿Has desvestido a una persona del sexo de tu preferencia (MSP) o esa persona te ha desvestido?",
  "¿Te has duchado con una persona del sexo de tu preferencia (MSP)?",
  "¿Has acariciado las nalgas de alguien o te han acariciado las tuyas?",
  "¿Has acariciado los senos de alguien o te han acariciado los tuyos?",
  "¿Has acariciado los genitales de alguien o te han acariciado los tuyos?",
  "¿Has sentido o provocado en alguien dolor testicular por excitación sexual sin orgasmo («blue balls»)?",
  "¿Has tenido un orgasmo debido a la estimulación de otra persona?",
  "¿Has enviado un mensaje de texto o un mensaje instantáneo sexualmente explícito?",
  "¿Has enviado o recibido fotografías sexualmente explícitas?",
  "¿Has participado en una actividad sexualmente explícita por videollamada?",
  "¿Le has sido infiel a tu pareja durante una relación?",
  "¿Has comprado anticonceptivos?",
  "¿Has practicado sexo oral a alguien?",
  "¿Has recibido sexo oral?",
  "¿Has ingerido secreciones genitales de otra persona?",
  "¿Has usado un juguete sexual con una pareja?",
  "¿Has pasado la noche con una persona del sexo de tu preferencia (MSP)?",
  "¿Ha entrado alguien mientras realizabas un acto sexual?",
  "¿Has echado a un compañero de habitación para realizar un acto sexual?",
  "¿Has consumido alcohol en un contexto no religioso?",
  "¿Has participado en un juego de beber alcohol?",
  "¿Te has emborrachado?",
  "¿Has fingido estar sobrio ante tus padres o profesores?",
  "¿Has sufrido una pérdida grave de memoria debido al alcohol?",
  "¿Has consumido tabaco?",
  "¿Has consumido marihuana?",
  "¿Has consumido una droga más fuerte que la marihuana?",
  "¿Has consumido metanfetamina, crack, PCP, tranquilizantes para caballos o heroína?",
  "¿Te han enviado al despacho de un director, decano o representante de asuntos judiciales por una infracción disciplinaria?",
  "¿Te han puesto en período de prueba disciplinaria o te han suspendido?",
  "¿Has orinado en público?",
  "¿Te has bañado desnudo en el agua?",
  "¿Has corrido desnudo en público?",
  "¿Has visto a una persona haciendo un estriptis?",
  "¿Alguien ha llamado a la policía por ti?",
  "¿Has huido de la policía?",
  "¿Te ha interrogado la policía?",
  "¿Te ha esposado la policía?",
  "¿Te han arrestado?",
  "¿Te han condenado por un delito?",
  "¿Te han condenado por un delito grave?",
  "¿Has cometido un acto de vandalismo?",
  "¿Has tenido relaciones sexuales?",
  "¿Has tenido relaciones sexuales tres o más veces en una noche?",
  "?",
  "¿Has tenido relaciones sexuales diez o más veces?",
  "¿Has tenido relaciones sexuales en cuatro o más posiciones?",
  "¿Has tenido relaciones sexuales con una persona desconocida o a la que habías conocido en las últimas 24 horas?",
  "¿Has tenido relaciones sexuales en un vehículo motorizado?",
  "¿Has tenido relaciones sexuales al aire libre?",
  "¿Has tenido relaciones sexuales en público?",
  "¿Has tenido relaciones sexuales en una piscina o un jacuzzi?",
  "¿Has tenido relaciones sexuales en una cama que no fuera tuya ni de tu pareja?",
  "¿Has tenido relaciones sexuales mientras tus padres o los de tu pareja estaban en la misma casa?",
  "¿Has tenido relaciones sexuales con una tercera persona en la misma habitación que no participaba?",
  "¿Has tenido relaciones sexuales a bordo de un avión durante un vuelo?",
  "¿Has participado en un encuentro organizado para tener sexo con alguien con quien no tenías una relación?",
  "¿Has viajado 100 millas o más con el propósito principal de tener relaciones sexuales?",
  "¿Has tenido relaciones sexuales con alguien con quien tenías una diferencia de edad de tres años o más?",
  "¿Has tenido relaciones sexuales con una persona virgen?",
  "¿Has tenido relaciones sexuales sin preservativo?",
  "¿Te has hecho una prueba de detección de infecciones de transmisión sexual (ITS) debido a una sospecha razonable?",
  "¿Has tenido una infección de transmisión sexual (ITS)?",
  "¿Has participado en un trío sexual?",
  "¿Has asistido a una orgía?",
  "¿Has tenido dos o más actos distintos de relaciones sexuales con dos o más personas en un período de 24 horas?",
  "¿Has tenido relaciones sexuales con cinco o más parejas?",
  "¿Te has fotografiado o grabado, o lo han hecho otras personas, mientras tenías relaciones sexuales?",
  "¿Has tenido relaciones sexuales durante la menstruación?",
  "¿Has tenido sexo anal?",
  "¿Has tenido un susto por un posible embarazo?",
  "¿Has dejado embarazada a alguien o te has quedado embarazada?",
  "¿Has pagado o recibido dinero por un acto sexual?",
  "¿Has cometido un acto de voyeurismo?",
  "¿Has cometido un acto de incesto?",
  "¿Has practicado la bestialidad?"
];



export default function SpanishRicePurityTestPage() {
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
    setFinalScore(null);
    setStage("taking");
  }, []);

  const handleReset = useCallback(() => { setChecked({}); setFinalScore(null); setStage("taking"); }, []);

  const handleCalculate = useCallback(() => {
    const score = SPANISH_QUESTIONS.length - checkedCount;
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
          <h1 className="mt-5 text-center text-4xl font-extrabold text-ink-900 sm:text-5xl">Rice Purity Test in Spanish</h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-[16px] leading-relaxed text-ink-700">{"There are multiple Spanish versions available on the internet named \"test de pureza\", \"test de pureza Rice\", or simply \"Rice Purity Test en español\". If you’re confused about which one is the real test, cause all tests pose the same idea, but they’re not the same."}</p>
          <p className="mx-auto mt-3 max-w-xl text-center text-[16px] leading-relaxed text-ink-700">{"Before taking any Spanish version, check that the list of questions shouldn’t be changed. Multiple websites offer it; some provide a direct translation of the original version, and others make it from scratch. So if two friends take the test on different sites, their scores might be based on different questions and cannot even be comparable."}</p>
          <p className="mx-auto mt-3 max-w-xl text-center text-[16px] leading-relaxed text-ink-700">{"This below guide give the best Spanish version of the Rice Purity Test and explains the score levels and different questions people ask about the Purity Test."}</p>
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
            <ul lang="es" className="mb-6 divide-y divide-ink-200 rounded-lg border bg-cream-50">
              {SPANISH_QUESTIONS.map((q, i) => (
                <li key={i} className="flex items-center px-4 py-3">
                  <input
                    id={`q${i}`}
                    type="checkbox"
                    checked={!!checked[i]}
                    onChange={() => handleToggle(i)}
                    className="mr-3 h-5 w-5 shrink-0 accent-[#FACC15]"
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
                  Rice Purity Test in Spanish Result Card
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <span className="h-px w-10 bg-ink-300" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">your score</span>
                  <span className="h-px w-10 bg-ink-300" />
                </div>
                <div className="mx-auto mt-2 flex items-baseline justify-center gap-2">
                  <span className="text-[96px] font-extrabold leading-none text-ink-900 sm:text-[160px]">
                    {finalScore}
                  </span>
                  <span className="shrink-0 font-mono text-sm font-semibold text-ink-500 sm:text-base">/ {SPANISH_QUESTIONS.length}</span>
                </div>
                <h2 className="mt-2 text-3xl font-bold text-ink-900 sm:text-4xl">Your Purity Score</h2>
                <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-ink-700 sm:text-base">
                  A high score means fewer experiences, and lower scores describe more. There is no pass or fail.
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
          <h2 className="font-heading mt-10 text-2xl font-bold text-neutral-900 sm:text-3xl">What is the test called in Spanish?</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">{"The most common name used is “test de pureza,” which is famous in Spanish; it means “Purity Test” in English. Here are some of the other name variants you might see on different sites."}</p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-neutral-700"><li>{"Test de pureza Rice, this one keeps the name of Rice University and actually means “Rice Purity Test”"}</li>
<li>{"Prueba de pureza, it uses a different word for the test."}</li>
<li>{"Rice Purity Test en español kept the original name and added Spanish flavour."}</li></ol>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">Among all of the above, there is no authorized Spanish edition. The original <a href="https://ricepuritytestme.com/" className="rpt-interlink">Rice Purity Test</a> is in the English language. It began as a student newspaper questionnaire at Rice University and spread from there.</p>
          <img src="/rice-purity-test-in-spanish.webp" alt="Rice Purity Test in Spanish: 100-question test de pureza" className="mt-6 h-auto w-full rounded-lg border border-ink-200 object-cover" />
          <h2 className="font-heading mt-10 text-2xl font-bold text-neutral-900 sm:text-3xl">What stays exactly the same</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">{"Whichever edition you take, the core never changes:"}</p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-neutral-700"><li>{"You read a list of questions about life experiences, relationships, intimacy, alcohol, drugs, and encounters with the police."}</li>
<li>{"You mark each one you have done as available in the list."}</li>
<li>{"Every marked item deducts one point from 100."}</li>
<li>{"The number left at the end is your final score."}</li></ol>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">{"A high score means fewer experiences, and lower scores describe more. There is no pass or fail; the scoring concept remains almost the same. You can take the English version of “Rice Purity Test” as well if you want."}</p>
          <h2 className="font-heading mt-10 text-2xl font-bold text-neutral-900 sm:text-3xl">How to Take the Test Without Confusing Your Answers</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">{"First of all, understand the instructions. If you check any box for any statement that is present on the list, that directly means that you have had the experience described. So, keeping in mind that the order and questions are the same, you might do well on the test."}</p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">{"Follow these steps to take the test effectively:"}</p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-neutral-700"><li>{"Read the whole question attentively."}</li>
<li>{"Check unfamiliar expressions for better answering."}</li>
<li>{"Answer the experience described only."}</li>
<li>{"Review your choices before clicking calculate."}</li>
<li>{"Calculate your score once you’re sure."}</li></ol>
          <h2 className="font-heading mt-10 text-2xl font-bold text-neutral-900 sm:text-3xl">How Does Spanish Rice Purity Test Scoring Work?</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">{"For a Classic 100-statement version that subtracts one point per checked experience, the calculation is:"}</p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">{"Score = 100 − number of checked items"}</p>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">{"Here are worked examples using that rule:"}</p>
          <div className="mt-5 overflow-x-auto rounded-lg border border-ink-200"><table className="w-full text-left text-sm text-neutral-700"><thead className="bg-[#FACC15]/25 text-ink-900"><tr><th scope="col" className="px-4 py-3">Checked items</th><th scope="col" className="px-4 py-3">Calculation</th><th scope="col" className="px-4 py-3">Score</th></tr></thead><tbody className="divide-y divide-ink-200 bg-cream-50"><tr><td className="px-4 py-3">8</td><td className="px-4 py-3">100 − 8</td><td className="px-4 py-3">92</td></tr>
<tr><td className="px-4 py-3">25</td><td className="px-4 py-3">100 − 25</td><td className="px-4 py-3">75</td></tr>
<tr><td className="px-4 py-3">46</td><td className="px-4 py-3">100 − 46</td><td className="px-4 py-3">54</td></tr>
<tr><td className="px-4 py-3">70</td><td className="px-4 py-3">100 − 70</td><td className="px-4 py-3">30</td></tr></tbody></table></div>
          <h2 className="font-heading mt-10 text-2xl font-bold text-neutral-900 sm:text-3xl">Conclusion</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-700 sm:text-base">{"Taking the Rice Purity Test in Spanish can make the questions easier to understand if Spanish is your preferred language. Read each item carefully, check unfamiliar phrases, and remember that different versions may use different questions. If you compare results with friends, use the same version so the scoring stays consistent."}</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
