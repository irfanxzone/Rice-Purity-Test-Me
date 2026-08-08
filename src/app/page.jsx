import { ALL_QUESTIONS } from "@/data/questions";
import HomePageClient from "./HomePageClient";

// Homepage metadata for SEO
const HOME_SEO_TIMESTAMP = "2026-08-08T13:24:59+05:00";

export const metadata = {
    title: "The Rice Purity Test",
    description: "Take the Rice Purity Test and evaluate your personality by answering 100 online questions.",
    other: {
        "article:published_time": HOME_SEO_TIMESTAMP,
        "article:modified_time": HOME_SEO_TIMESTAMP,
    },
};

export default function HomePage() {
    const siteUrl = "https://ricepuritytestme.com/";
    const logoUrl = "https://ricepuritytestme.com/RicePurityTest.webp";
    const pageTitle = "The Rice Purity Test";
    const pageDescription = "Take the Rice Purity Test and evaluate your personality by answering 100 online questions.";

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
                datePublished: HOME_SEO_TIMESTAMP,
                dateModified: HOME_SEO_TIMESTAMP,
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
                datePublished: HOME_SEO_TIMESTAMP,
                dateModified: HOME_SEO_TIMESTAMP,
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
            />
            <HomePageClient />
        </>
    );
}
