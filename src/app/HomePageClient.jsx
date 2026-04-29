"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import Header from "@/components/Header";
import Quiz from "@/components/Quiz";
import Result from "@/components/Result";
import SeoContent from "@/components/SeoContent";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { TOTAL_QUESTIONS } from "@/data/questions";

export default function HomePageClient() {
    const [stage, setStage] = useState("taking"); // "taking" | "done"
    const [checked, setChecked] = useState({});
    const [finalScore, setFinalScore] = useState(null);

    const checkedCount = useMemo(
        () => Object.values(checked).filter(Boolean).length,
        [checked]
    );

    // Scroll to #test if user lands with a hash
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
        const score = TOTAL_QUESTIONS - checkedCount;
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

    // Single FAQPage JSON-LD (merged all questions)
    const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            // Main homepage FAQs
            {
                "@type": "Question",
                "name": "What Is a Good Rice Purity Test Score?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "There is no objectively good or bad score. A higher score (closer to 100) means fewer experiences, while a lower score reflects a more adventurous life. It is meant entirely for fun."
                }
            },
            {
                "@type": "Question",
                "name": "Are Rice Purity Test results anonymous?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Everything runs in your browser. We do not store your answers or your score on any server."
                }
            },
            {
                "@type": "Question",
                "name": "Can I retake the Rice Purity Test?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. You can retake the test as many times as you want. Just click Retake Test after you see your score."
                }
            },
            {
                "@type": "Question",
                "name": "Where can I take the Rice Purity Test online?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Right here on this page. Click Start Test, check the items that apply to you, and get your score instantly."
                }
            },
            {
                "@type": "Question",
                "name": "How many questions are there in the Rice Purity Test?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Rice Purity Test has 100 questions covering innocent, relationship, experience and extreme life experiences."
                }
            },
            // FAQ from Faq.jsx (for schema completeness)
            {
                "@type": "Question",
                "name": "Is the Rice Purity Test suitable for a 14-year-old?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Preferably not, but some students voluntarily take the test. Certain questions may not be appropriate for a 14-year-old, so it is recommended not to answer anything that makes you uncomfortable."
                }
            },
            {
                "@type": "Question",
                "name": "Is the Rice Purity Test accurate?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "It depends entirely on your answers. If you answer all questions honestly, the score will be accurate. Incorrect answers will lead to inaccurate results."
                }
            },
            {
                "@type": "Question",
                "name": "Why is it called the Rice Test?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The test is named after Rice University, where it originally started. That is why it is known as the Rice Purity Test."
                }
            }
        ]
    };

    return (
        <div className="App">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
            />
            <Header />
            <main data-testid="main-content">
                {stage === "taking" && (
                    <Quiz
                        checked={checked}
                        onToggle={handleToggle}
                        onCalculate={handleCalculate}
                        onReset={handleReset}
                    />
                )}
                {stage === "done" && finalScore !== null && (
                    <Result score={finalScore} onRetake={handleRetake} />
                )}
                <SeoContent />
                <Faq />
            </main>
            <Footer />
        </div>
    );
}