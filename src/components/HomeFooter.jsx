import Link from "next/link";

const PAGES = [
  { label: "About Us", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "DMCA", to: "/dmca" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms-and-conditions" },
];

const SOCIALS = [
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/ricepuritytestme/" },
  { key: "x", label: "X / Twitter", href: "https://x.com/Rpuritytestme" },
  { key: "facebook", label: "Facebook", href: "https://www.facebook.com/ricepuritytestme" },
];

export default function HomeFooter() {
  return (
    <footer data-testid="site-footer" className="mt-16 bg-[#1A1A14] text-cream-100">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <Link prefetch={false} href="/" className="flex items-center gap-3">
              <span aria-hidden="true" className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-cream-100/30 bg-[#FACC15] shadow-[0_2px_0_#000]">
                <span className="text-lg font-extrabold text-ink-900">R</span>
              </span>
              <div className="leading-tight">
                <p className="text-lg font-bold text-cream-50">Rice Purity Test</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-400/80">100 items</p>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-100/75">
              <span className="font-semibold text-[#FACC15]">RicePurityTest</span> is a simple, anonymous, 100-question purity score test. Free forever. Runs entirely in your browser.
            </p>
            <a href="/#test" data-testid="footer-cta" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#FACC15] px-5 py-2.5 text-sm font-semibold text-ink-900 shadow-[0_2px_0_#000] transition-transform hover:-translate-y-0.5">
              Take the test <span aria-hidden="true">-&gt;</span>
            </a>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FACC15]">Pages</p>
            <ul className="mt-5 space-y-3">
              {PAGES.map((p) => (
                <li key={p.label}>
                  <Link prefetch={false} href={p.to} className="text-sm text-cream-100/80 transition-colors hover:text-[#FACC15]">{p.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FACC15]">Follow</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {SOCIALS.map((s) => (
                <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#FACC15] px-3.5 py-2.5 text-xs font-semibold text-ink-900 shadow-[0_2px_0_#000] transition-transform hover:-translate-y-0.5">
                  {s.label}
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-cream-100/60">Not affiliated with Rice University. For entertainment purposes only.</p>
          </div>
        </div>
      </div>

      <div className="border-t border-cream-100/10 bg-black/50">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream-100/60">
            © {new Date().getFullYear()} RicePurityTestMe · All Rights Reserved
          </p>
          <div className="flex items-center gap-5">
            <Link prefetch={false} href="/privacy-policy" className="font-mono text-[11px] uppercase tracking-[0.15em] text-cream-100/60 transition-colors hover:text-[#FACC15]">Privacy</Link>
            <Link prefetch={false} href="/terms-and-conditions" className="font-mono text-[11px] uppercase tracking-[0.15em] text-cream-100/60 transition-colors hover:text-[#FACC15]">Terms</Link>
            <a href="#top" aria-label="Back to top" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream-100/20 bg-cream-100/5 text-[#FACC15] transition-colors hover:bg-[#FACC15] hover:text-ink-900">↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
