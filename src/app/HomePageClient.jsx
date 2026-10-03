"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Result = dynamic(() => import("@/components/Result"), {
    ssr: false,
    loading: () => (
        <section id="result" role="status" aria-live="polite" className="mx-auto min-h-[32rem] max-w-3xl px-4 pt-10 sm:px-6 sm:pt-16 lg:px-8">
            Loading your score...
        </section>
    ),
});

export default function HomePageClient({ children, totalQuestions }) {
    const quizRef = useRef(null);
    const [score, setScore] = useState(null);

    useEffect(() => {
        if (score !== null) {
            document.getElementById("result")?.scrollIntoView({ block: "start", behavior: "instant" });
        }
    }, [score]);

    function handleAction(event) {
        const action = event.target.closest("[data-quiz-action]")?.dataset.quizAction;
        if (!action) return;
        const checked = quizRef.current.querySelectorAll('input[type="checkbox"]:checked');
        if (action === "calculate") {
            setScore(totalQuestions - checked.length);
        } else if (action === "clear") {
            if (!checked.length) return;
            checked.forEach(input => { input.checked = false; });
            const notice = quizRef.current.querySelector("[data-reset-notice]");
            notice.getAnimations().forEach(animation => animation.cancel());
            notice.animate([
                { opacity: 0, transform: "rotate(-14deg) scale(1.6)" },
                { opacity: 0.95, transform: "rotate(-8deg) scale(1)", offset: 0.25 },
                { opacity: 0.9, transform: "rotate(-8deg) scale(1)", offset: 0.7 },
                { opacity: 0, transform: "rotate(-8deg) scale(0.95)" },
            ], { duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 1400 });
        }
    }

    if (score !== null) {
        return <Result score={score} onRetake={() => {
            setScore(null);
            window.scrollTo({ top: 0, behavior: "instant" });
        }} />;
    }

    // Native checkboxes respond immediately, without rerendering 100 React rows.
    // There is deliberately no form submission: answers never leave the browser.
    return <div ref={quizRef} onClick={handleAction}>{children}</div>;
}
