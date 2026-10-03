import { buildMetadata, getPage } from "@/lib/seo";
import { ALL_QUESTIONS } from "@/data/questions";
import HomePageClient from "./HomePageClient";
import Quiz from "@/components/Quiz";
import Script from "next/script";
import HomeHeader from "@/components/HomeHeader";
import HomeFooter from "@/components/HomeFooter";
import Faq from "@/components/Faq";
import { HOME_FAQ } from "@/data/home-faq";
import SeoContent, { FinalWords } from "@/components/SeoContent";

// Homepage metadata for SEO

export const metadata = buildMetadata({ path: "/", absoluteTitle: true, type: "website" });

export default function HomePage() {
    const siteUrl = "https://ricepuritytestme.com/";
    const logoUrl = "https://ricepuritytestme.com/RicePurityTest.webp";
    const pageTitle = "The Rice Purity Test 2026";
    const pageDescription = getPage("/").description;

    const homeSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${siteUrl}#organization`,
                name: "Rice Purity Test",
                url: siteUrl,
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
                    name: "Rice Purity Test",
                    url: siteUrl,
                    publisher: {
                        "@id": `${siteUrl}#organization`,
                    },
                },
                publisher: {
                    "@id": `${siteUrl}#organization`,
                },
                mainEntity: {
                    "@id": `${siteUrl}#rice-purity-quiz`,
                },
            },
            {
                "@type": "Article",
                "@id": `${siteUrl}#article`,
                headline: pageTitle,
                name: pageTitle,
                description: pageDescription,
                url: siteUrl,
                datePublished: getPage("/").published,
                dateModified: getPage("/").modified,
                image: logoUrl,
                author: {
                    "@id": `${siteUrl}#organization`,
                },
                publisher: {
                    "@id": `${siteUrl}#organization`,
                },
                mainEntityOfPage: {
                    "@id": `${siteUrl}#webpage`,
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
                publisher: {
                    "@id": `${siteUrl}#organization`,
                },
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${siteUrl}#breadcrumb`,
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: "Home",
                        item: siteUrl,
                    },
                ],
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
                provider: {
                    "@id": `${siteUrl}#organization`,
                },
                hasPart: ALL_QUESTIONS.map((question, index) => ({
                    "@type": "Question",
                    position: index + 1,
                    name: question,
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
                <HomeHeader />
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
