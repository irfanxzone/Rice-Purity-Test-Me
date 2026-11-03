import { buildMetadata, getPage, org, SITE_NAME } from "@/lib/seo";
import { ALL_QUESTIONS, QUESTION_ITEMS } from "@/data/questions";
import HomePageClient from "../HomePageClient";
import Quiz from "@/components/Quiz";
import Script from "next/script";

import HomeFooter from "@/components/HomeFooter";
import Faq from "@/components/Faq";
import { HOME_FAQ } from "@/data/home-faq";
import SeoContent, { FinalWords } from "@/components/SeoContent";

// Homepage metadata for SEO

export const metadata = buildMetadata({ path: "/", absoluteTitle: true, type: "website" });

export default function HomePage() {
    const siteUrl = "https://ricepuritytestme.com/";
    const logoUrl = "https://ricepuritytestme.com/RicePurityTest.webp";
    const pageTitle = getPage("/").title;
    const pageDescription = getPage("/").description;

    const homeSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                ...org,
                "@id": `${siteUrl}#organization`,
                logo: {
                    "@type": "ImageObject",
                    url: logoUrl,
                    contentUrl: logoUrl,
                    caption: "Rice Purity Test logo",
                },
            },
            {
                "@type": "WebPage",
                "@id": `${siteUrl}#webpage`,
                url: siteUrl,
                name: pageTitle,
                headline: pageTitle,
                description: pageDescription,
                datePublished: getPage("/").published,
                dateModified: getPage("/").modified,
                isPartOf: {
                    "@type": "WebSite",
                    "@id": `${siteUrl}#website`,
                    name: SITE_NAME,
                    url: siteUrl,
                    publisher: org,
                },
                publisher: org,
                mainEntity: {
                    "@id": `${siteUrl}#rice-purity-quiz`,
                },
            },
            {
                "@type": "WebApplication",
                "@id": `${siteUrl}#web-application`,
                name: "Rice Purity Test Online",
                url: siteUrl,
                applicationCategory: "LifestyleApplication",
                operatingSystem: "Any",
                browserRequirements: "Requires JavaScript",
                description: "A free, anonymous online Rice Purity Test calculator with 100 self-assessment questions and an instant score.",
                offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                },
                publisher: org,
            },
            {
                "@type": "Quiz",
                "@id": `${siteUrl}#rice-purity-quiz`,
                name: "Rice Purity Test",
                headline: "Rice Purity Test",
                description: "A 100-question self-assessment quiz that calculates a Rice Purity score from 0 to 100 based on checked life experiences.",
                url: `${siteUrl}#test`,
                educationalUse: "Self assessment",
                learningResourceType: "Quiz",
                assesses: "Life experiences and personal reflection",
                numberOfQuestions: ALL_QUESTIONS.length,
                isAccessibleForFree: true,
                provider: org,
                hasPart: QUESTION_ITEMS.map((question, index) => ({
                    "@type": "Question",
                    position: index + 1,
                    name: typeof question === "string" ? question : question.schemaName ?? question.text,
                })),
            },
        ],
    };


    return (
        <>
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-63FWXHHNZR" strategy="lazyOnload" />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-63FWXHHNZR');
                `}
            </Script>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
            />
            <div className="App">
                <header data-testid="site-header" className="relative mx-auto mt-2 w-[98%] max-w-[1200px] overflow-hidden sm:w-[90%]" style={{ aspectRatio: "2172 / 292" }}>
                    <img src="/rice-purity-test-me.webp" alt="Rice Purity Test" width={2172} height={724} fetchPriority="high" className="absolute left-0 top-0 block h-auto w-full" style={{ transform: "translateY(-32.32%)" }} />
                </header>
                <main data-testid="main-content">
                    <HomePageClient totalQuestions={ALL_QUESTIONS.length}><Quiz /></HomePageClient>
                    <SeoContent />
                    <Faq items={HOME_FAQ} />
                    <FinalWords />
                </main>
                <HomeFooter />
            </div>
        </>
    );
}
