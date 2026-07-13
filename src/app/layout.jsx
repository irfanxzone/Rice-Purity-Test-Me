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
        "Take the Rice Purity test and evaluate your personality by answering 100 online questions.",
    keywords: [
        "rice purity test",
        "the rice purity test",
        "the official rice purity test",
        "rice purity test score meaning",
        "purity rice test",
        "rice purity test 2026",
        "rice purity test score",
    ],
    robots: { index: true, follow: true },
    alternates: { canonical: "/" },
    icons: {
        icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
        shortcut: [{ url: "/favicon.svg", type: "image/svg+xml" }],
        apple: [{ url: "/RicePurityTest.webp", type: "image/webp" }],
    },
    openGraph: {
        type: "website",
        title: "The Rice Purity Test",
        description:
            "Take the Rice Purity Test and evaluate your personality by answering 100 online questions.",
        url: "/",
        siteName: "Rice Purity Test",
    },
    twitter: {
        card: "summary_large_image",
        title: "The Rice Purity Test",
        description:
            "Take the Rice Purity Test and evaluate your personality by answering 100 online questions.",
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
                    <meta name="google-site-verification" content="jFv4AUzgLzT_F6biCRTUz2vVSyRhfSoP5T5b87jRqLw" />
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
