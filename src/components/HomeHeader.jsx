import { getMenuItems } from "@/lib/seo";
import StaticImage from "./StaticImage";
import Link from "next/link";

const MORE_TESTS = getMenuItems("tests");

const ABOUT_ITEMS = getMenuItems("about");

function DesktopDropdown({ label, items, testid }) {
  return (
    <div className="group relative">
      <button
        type="button"
        data-testid={`nav-dropdown-${testid}`}
        className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-900/5 hover:text-ink-900"
      >
        {label}
        <span aria-hidden="true" className="text-xs transition-transform group-hover:rotate-180">
          v
        </span>
      </button>
      <div
        data-testid={`dropdown-${testid}`}
        className="invisible absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-2 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
      >
        <div className="relative rounded-2xl border border-ink-300/60 bg-cream-50 p-2 shadow-[0_12px_40px_-12px_rgba(26,26,20,0.2)]">
          <div className="pointer-events-none absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-ink-300/60 bg-cream-50" />
          {items.map((it) => (
            <Link prefetch={false}
              key={it.label}
              href={it.to}
              data-testid={`dd-item-${it.label.toLowerCase().replace(/\s/g, "-")}`}
              className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-[#FACC15]/30 hover:text-ink-900"
            >
              <span>{it.label}</span>
              <span aria-hidden="true" className="text-ink-300">
                -&gt;
              </span>
            </Link>
          ))}
          {testid === "more-tests" && (
            <Link prefetch={false}
              href="/blog"
              className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-cream-50 transition-colors hover:bg-ink-800"
            >
              Explore more <span aria-hidden="true" className="ml-2">-&gt;</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HomeHeader() {
  return (
    <header data-testid="site-header" className="sticky top-0 z-40 w-full px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="mx-auto max-w-6xl">
        <div className="rpt-header-shell relative">
          <div className="rpt-header-glow" aria-hidden="true" />
          <div className="relative z-10 flex h-16 items-center justify-between px-4 sm:h-[68px] sm:px-6">
            <Link prefetch={false} href="/" data-testid="site-logo" className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[1px] border-ink-900 bg-cream-50"
              >
                <StaticImage
                  src="/RicePurityTest.webp"
                  alt="Rice Purity Test logo"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                  sizes="40px"
                  loading="eager"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-[15px] font-bold tracking-tight text-ink-900 sm:text-[17px]">
                  Rice Purity Test
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              <Link prefetch={false} href="/" data-testid="nav-home" className="rounded-full px-4 py-2 text-sm font-medium text-ink-900 transition-colors hover:bg-ink-900/5">
                Home
              </Link>
              <DesktopDropdown label="More Tests" items={MORE_TESTS} testid="more-tests" />
              <DesktopDropdown label="About" items={ABOUT_ITEMS} testid="about" />
              <Link prefetch={false} href="/blog" data-testid="nav-blog" className="rounded-full px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-900/5 hover:text-ink-900">
                Blog
              </Link>
              <a href="#test" data-testid="header-take-test" className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-5 py-2 text-sm font-semibold text-cream-50 shadow-[0_2px_0_#000] transition-transform hover:-translate-y-0.5 active:translate-y-0">
                Take Test <span aria-hidden="true">-&gt;</span>
              </a>
            </nav>

            <details className="relative md:hidden">
              <summary data-testid="mobile-menu-toggle" aria-label="Toggle menu" className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-ink-300 bg-cream-50 text-ink-900 [&::-webkit-details-marker]:hidden">
                <span aria-hidden="true" className="text-xl leading-none">=</span>
              </summary>
              <nav data-testid="mobile-nav" className="absolute right-0 top-12 max-h-[calc(100dvh-100px)] overflow-y-auto overscroll-contain w-[min(82vw,320px)] rounded-2xl border border-ink-300/60 bg-cream-50 p-3 text-left shadow-lg">
                <Link prefetch={false} href="/" className="block rounded-xl px-4 py-3 text-sm font-medium text-ink-700 hover:bg-[#FACC15]/30">Home</Link>
                <p className="mt-1 px-4 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">More Tests</p>
                {MORE_TESTS.map((t) => <Link prefetch={false} key={t.label} href={t.to} className="block rounded-xl px-4 py-2.5 text-sm font-medium text-ink-700 hover:bg-[#FACC15]/30">{t.label}</Link>)}
                <p className="mt-1 px-4 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">About</p>
                {ABOUT_ITEMS.map((it) => <Link prefetch={false} key={it.label} href={it.to} className="block rounded-xl px-4 py-2.5 text-sm font-medium text-ink-700 hover:bg-[#FACC15]/30">{it.label}</Link>)}
                <Link prefetch={false} href="/blog" className="mt-1 block rounded-xl px-4 py-3 text-sm font-medium text-ink-700 hover:bg-[#FACC15]/30">Blog</Link>
                <a href="#test" className="mt-2 block rounded-xl bg-ink-900 px-4 py-3 text-center text-sm font-semibold text-cream-50">Take Test -&gt;</a>
              </nav>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
