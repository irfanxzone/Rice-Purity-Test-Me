import Header from "./Header";
import Footer from "./Footer";

// Shared shell for non-home pages — same Header + Footer, page hero, content slot.
export default function PageLayout({ eyebrow, title, subtitle, children, wide = false }) {
    return (
        <div className="App">
            <Header />
            <main data-testid="page-main">
                <section className="mx-auto max-w-5xl px-4 pt-10 pb-10 text-center sm:px-6 sm:pt-14 lg:px-8">
                    {eyebrow && (
                        <span
                            data-testid="page-eyebrow"
                            className="inline-flex items-center gap-2 rounded-full border border-ink-300/60 bg-cream-50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-700"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
                            {eyebrow}
                        </span>
                    )}
                    <h1
                        data-testid="page-title"
                        className="mt-5 text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl"
                    >
                        {title}
                    </h1>
                    {subtitle && (
                        <p
                            data-testid="page-subtitle"
                            className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-700 sm:text-base"
                        >
                            {subtitle}
                        </p>
                    )}
                </section>

                <section
                    className={
                        "mx-auto px-4 pb-20 sm:px-6 lg:px-8 " +
                        (wide ? "max-w-5xl" : "max-w-3xl")
                    }
                >
                    {children}
                </section>
            </main>
            <Footer />
        </div>
    );
}
