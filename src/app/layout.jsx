import { SITE_URL } from "@/lib/seo";
import { Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-poppins",
    display: "swap",
});

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: { default: "RicePurityTestMe", template: "%s · RicePurityTestMe" },
    robots: { index: true, follow: true },
    icons: {
        icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
        shortcut: [{ url: "/favicon.svg", type: "image/svg+xml" }],
        apple: [{ url: "/RicePurityTest.webp", type: "image/webp" }],
    },
};

export const viewport = {
    themeColor: "#FEFBE9",
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={poppins.variable}>
            <head>
                <meta name="google-site-verification" content="jFv4AUzgLzT_F6biCRTUz2vVSyRhfSoP5T5b87jRqLw" />
                <Script strategy="lazyOnload" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2310430198181820" crossOrigin="anonymous" />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
