import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-poppins",
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    variable: "--font-jetbrains",
    display: "swap",
});

export const metadata = {
    metadataBase: new URL("https://ricepuritytestme.com"),
    title: {
        default: "The Rice Purity Test",
        template: "%s · The Rice Purity Test",
    },
    description:
        "Take the official 100-question Rice Purity Test online. Get your instant purity score from 0 to 100 with clear interpretation. Free, anonymous, no sign-up.",
    keywords: [
        "rice purity test",
        "rice purity test 100 questions",
        "official rice purity test",
        "rice purity score meaning",
        "purity test",
    ],
    robots: { index: true, follow: true },
    alternates: { canonical: "/" },
    openGraph: {
        type: "website",
        title: "Rice Purity Test – Check Your Score Instantly",
        description:
            "Take the 100-question Rice Purity Test and see how pure you are. Free, anonymous, instant result.",
        url: "/",
        siteName: "Rice Purity Test",
    },
    twitter: {
        card: "summary_large_image",
        title: "Rice Purity Test – Check Your Score Instantly",
        description:
            "Take the 100-question Rice Purity Test and see how pure you are.",
    },
};

export const viewport = {
    themeColor: "#FEFBE9",
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({ children }) {
    const webpageLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Rice Purity Test",
        description:
            "Take the 100-question Rice Purity Test and see your purity score from 0 to 100. Free, anonymous, instant result.",
        url: "https://ricepuritytestme.com/",
    };

    return (
        <html lang="en" className={`${poppins.variable} ${jetbrainsMono.variable}`}>
            <head>
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageLd) }}
                />
            </head>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
