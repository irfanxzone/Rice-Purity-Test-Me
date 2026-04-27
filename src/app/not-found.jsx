import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
    title: "Page not found",
    description: "The page you are looking for could not be found.",
};

export default function NotFound() {
    return (
        <div className="App">
            <Header />
            <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">
                    Error · 404
                </p>
                <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-ink-900 sm:text-6xl">
                    Page not found
                </h1>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-700">
                    The page you are looking for has moved or never existed.
                    Try heading back home and taking the test instead.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-full bg-[#FACC15] px-6 py-3 text-sm font-bold text-ink-900 shadow-[0_2px_0_#1A1A14] ring-1 ring-ink-900 transition-transform hover:-translate-y-0.5"
                    >
                        Back to Home →
                    </Link>
                    <Link
                        href="/about"
                        className="inline-flex items-center gap-2 rounded-full border border-ink-900 bg-cream-50 px-6 py-3 text-sm font-semibold text-ink-900 transition-colors hover:bg-cream-200"
                    >
                        Learn About
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
