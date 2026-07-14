
// Homepage metadata for SEO
const HOME_SEO_TIMESTAMP = "2026-07-15T02:51:16+05:00";

export const metadata = {
    title: "The Rice Purity Test",
    description: "Take the Rice Purity Test and evaluate your personality by answering 100 online questions.",
    other: {
        "article:published_time": HOME_SEO_TIMESTAMP,
        "article:modified_time": HOME_SEO_TIMESTAMP,
    },
};

import HomePageClient from "./HomePageClient";

export default function HomePage() {
    const homeSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "The Rice Purity Test",
        headline: "The Rice Purity Test",
        description: "Take the Rice Purity Test and evaluate your personality by answering 100 online questions.",
        url: "https://ricepuritytestme.com/",
        datePublished: HOME_SEO_TIMESTAMP,
        dateModified: HOME_SEO_TIMESTAMP,
        publisher: {
            "@type": "Organization",
            name: "Rice Purity Test",
            url: "https://ricepuritytestme.com/",
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
            />
            <div className="sr-only" itemScope itemType="https://schema.org/WebPage">
                <meta itemProp="headline" content="The Rice Purity Test" />
                <meta itemProp="description" content="Take the Rice Purity Test and evaluate your personality by answering 100 online questions." />
                <meta itemProp="url" content="https://ricepuritytestme.com/" />
                <time itemProp="datePublished" dateTime={HOME_SEO_TIMESTAMP}>
                    Published {HOME_SEO_TIMESTAMP}
                </time>
                <time itemProp="dateModified" dateTime={HOME_SEO_TIMESTAMP}>
                    Modified {HOME_SEO_TIMESTAMP}
                </time>
            </div>
            <HomePageClient />
        </>
    );
}
