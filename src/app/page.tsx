import {
  ArrowRight,
  ArrowUpRight,
  Database,
  FileText,
  GitBranch,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

const TICKER = [
  "Health report",
  "Grounded chat",
  "Issue roadmap",
  "Tree-sitter chunks",
  "pgvector recall",
  "Groq answers",
];

const COLLECTIONS = [
  {
    index: "C.01",
    title: "Architecture, read properly",
    text: "Module map, entry points, and data flow — summarized so onboarding takes minutes, not sprints.",
    meta: "12 views · folders → graph",
    icon: GitBranch,
  },
  {
    index: "C.02",
    title: "Security with receipts",
    text: "Auth, sessions, and route guards traced to real files. Every claim carries a path and line range.",
    meta: "9 checks · auth → proxy",
    icon: ShieldCheck,
  },
  {
    index: "C.03",
    title: "Chat that cites source",
    text: "Ask in plain English. Answers quote src/lib/auth.ts and friends instead of guessing.",
    meta: "82 / 100 · cited replies",
    icon: MessagesSquare,
  },
];

const STEPS = [
  {
    n: "01",
    title: "Connect",
    text: "Link GitHub or drop a ZIP. Noise is filtered before anything is embedded.",
    snippet: 'project.connect("github.com/you/app")',
    icon: Database,
  },
  {
    n: "02",
    title: "Index",
    text: "Tree-sitter chunks JS/TS into 148 retrievable pieces with framework detection.",
    snippet: "→ chunks: 148 · Next.js ✓",
    icon: FileText,
  },
  {
    n: "03",
    title: "Ask",
    text: "Chat, scan the report, and work a prioritized roadmap of what matters.",
    snippet: 'ask("Explain the auth flow")',
    icon: Sparkles,
  },
];

const SCORES = [
  { label: "Architecture", value: 88 },
  { label: "Security", value: 74 },
  { label: "Performance", value: 86 },
  { label: "Quality", value: 79 },
  { label: "Testing", value: 68 },
];

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-xs">
        <span className="font-medium">{label}</span>
        <span className="font-mono opacity-70">{value}</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-(--landing-line)">
        <div
          className="h-full rounded-full bg-(--landing-accent)"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function LinkedinMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <title>LinkedIn</title>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="landing-shell min-h-screen">
      {/* Utility strip — new thin ticker above everything */}
      <div className="border-b border-(--landing-line)">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 overflow-hidden px-5 py-2 font-mono text-[11px] tracking-wide text-(--landing-muted) uppercase sm:px-8">
          <span className="truncate">
            Collection 001 — Code health, composed as objects
          </span>
          <span className="hidden shrink-0 sm:block">
            Free to try · No credit card
          </span>
        </div>
      </div>

      {/* Header — full-width sticky bar, not a floating pill */}
      <header className="sticky top-0 z-40 border-b border-(--landing-line) bg-(--landing-paper)/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-(--landing-ink) font-mono text-sm font-bold text-(--landing-paper)">
              R
            </span>
            <span className="leading-tight">
              <span className="landing-brand block text-[15px] text-(--landing-ink)">
                Ragnalizer
              </span>
              <span className="block font-mono text-[10px] tracking-[0.18em] text-(--landing-muted) uppercase">
                AI Codebase Auditor
              </span>
            </span>
          </a>
          <nav
            aria-label="Sections"
            className="hidden items-center gap-6 text-sm text-(--landing-muted) lg:flex"
          >
            {[
              { href: "#collections", label: "Collections" },
              { href: "#process", label: "Process" },
              { href: "#report", label: "Report" },
              { href: "#demo", label: "Demo" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="underline-offset-8 transition-colors hover:text-(--landing-ink) hover:underline"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <ModeToggle className="border-(--landing-line) bg-transparent hover:bg-(--landing-fog)" />
            <Link
              href="/login"
              className="hidden text-sm text-(--landing-muted) transition-colors hover:text-(--landing-ink) sm:block"
            >
              Sign in
            </Link>
            <Link
              href="/login"
              className="landing-btn-primary rounded-full px-4 py-2 text-sm font-semibold"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero — editorial ledger: headline ledger left, stacked object cards right */}
        <section className="mx-auto grid max-w-7xl gap-8 px-5 pt-12 pb-14 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:pt-16">
          <div className="lg:col-span-7">
            <p className="landing-kicker">
              New collection · RAG over your repo
            </p>
            <h1 className="landing-title mt-4 text-5xl leading-[1.02] text-(--landing-ink) sm:text-6xl lg:text-7xl">
              Good code
              <span className="block">isn&apos;t loud.</span>
              <span className="block">It&apos;s well indexed.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-(--landing-muted) sm:text-lg">
              Ragnalizer reads your repository like a workshop reads solid oak —
              grain, joints, weak spots — then answers questions with citations
              to the exact files.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/login"
                className="landing-btn-primary rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                Analyze my repository
                <ArrowRight className="ml-2 inline size-4" />
              </Link>
              <a
                href="#demo"
                className="landing-btn-secondary rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                View demo
              </a>
            </div>
            <dl className="mt-10 grid grid-cols-3 divide-x divide-(--landing-line) overflow-hidden rounded-2xl border border-(--landing-line) bg-(--landing-fog)/60">
              {[
                { k: "148", v: "code chunks" },
                { k: "82/100", v: "health score" },
                { k: "± cited", v: "every answer" },
              ].map((s) => (
                <div key={s.v} className="px-4 py-4 sm:px-6">
                  <dt className="landing-title text-2xl text-(--landing-ink) sm:text-3xl">
                    {s.k}
                  </dt>
                  <dd className="mt-1 font-mono text-[11px] tracking-wide text-(--landing-muted) uppercase">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right — stacked "product" cards, Arbora-style but for code */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 xl:grid-cols-2">
            <figure className="rounded-[1.75rem] border border-(--landing-line) bg-(--landing-fog) p-6">
              <p className="font-mono text-[11px] tracking-[0.16em] text-(--landing-muted) uppercase">
                Loved in real repos
              </p>
              <p className="landing-title mt-3 text-6xl text-(--landing-ink)">
                98%
              </p>
              <figcaption className="mt-3 text-sm leading-relaxed text-(--landing-muted)">
                of reviewers said cited answers beat generic chat for unfamiliar
                code.
              </figcaption>
              <div className="mt-4 flex items-center gap-1 text-(--landing-accent-deep)">
                {["a", "b", "c", "d", "e"].map((dot) => (
                  <span
                    key={dot}
                    aria-hidden
                    className="inline-block size-2 rounded-full bg-current"
                  />
                ))}
                <span className="ml-2 font-mono text-[11px] text-(--landing-muted)">
                  4.9 / 5
                </span>
              </div>
            </figure>

            <figure className="rounded-[1.75rem] bg-(--landing-ink) p-6 text-(--landing-paper)">
              <p className="font-mono text-[11px] tracking-[0.16em] uppercase opacity-70">
                Built from solid context
              </p>
              <div className="mx-auto mt-4 max-w-[180px] rounded-full border border-current/30 p-4 opacity-90">
                <pre className="text-center font-mono text-[11px] leading-5">
                  src/lib/auth.ts
                  {"\n"}src/proxy.ts
                  {"\n"}app/(dash)/page
                </pre>
              </div>
              <figcaption className="mt-4 text-xs leading-relaxed opacity-70">
                Tree-sitter grain, vector finish. No veneer, no particle board.
              </figcaption>
            </figure>

            <figure className="rounded-[1.75rem] border border-(--landing-line) bg-(--landing-paper) p-6 sm:col-span-2 lg:col-span-1 xl:col-span-2">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[11px] tracking-[0.16em] text-(--landing-muted) uppercase">
                  Latest audit
                </p>
                <span className="rounded-full bg-(--landing-fog) px-2.5 py-1 font-mono text-[11px] text-(--landing-accent-deep)">
                  payment-api · 2m ago
                </span>
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-(--landing-ink)">
                “Explain the authentication flow.”
              </blockquote>
              <p className="mt-2 text-sm leading-relaxed text-(--landing-muted)">
                → Sessions are issued after credential checks, then the proxy
                guards dashboard routes.{" "}
                <span className="font-mono text-xs text-(--landing-accent-deep)">
                  src/lib/auth.ts · src/proxy.ts
                </span>
              </p>
            </figure>
          </div>
        </section>

        {/* Ticker divider */}
        <div className="overflow-hidden border-y border-(--landing-line) bg-(--landing-fog)/50">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-2 px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-(--landing-muted) uppercase sm:px-8">
            {TICKER.map((t) => (
              <span key={t} className="flex items-center gap-8">
                <span>{t}</span>
                <span aria-hidden className="text-(--landing-accent)">
                  ·
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Collections — three shoppable tiles instead of a band */}
        <section
          id="collections"
          className="mx-auto max-w-7xl scroll-mt-28 px-5 py-16 sm:px-8 sm:py-20"
        >
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="landing-kicker">The collection</p>
              <h2 className="landing-title mt-4 max-w-xl text-3xl text-(--landing-ink) sm:text-5xl">
                Three objects for unfamiliar code.
              </h2>
            </div>
            <Link
              href="/login"
              className="group flex items-center gap-2 text-sm font-medium text-(--landing-accent-deep)"
            >
              Browse the full report
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {COLLECTIONS.map((c) => (
              <article
                key={c.title}
                className="group flex flex-col rounded-[1.75rem] border border-(--landing-line) bg-(--landing-paper) p-6 transition-shadow hover:shadow-[0_24px_60px_-24px_var(--landing-accent)]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-(--landing-muted)">
                    {c.index}
                  </span>
                  <span className="grid size-10 place-items-center rounded-full bg-(--landing-fog) text-(--landing-accent-deep)">
                    <c.icon className="size-5" />
                  </span>
                </div>
                <h3 className="landing-title mt-6 text-2xl text-(--landing-ink)">
                  {c.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-(--landing-muted)">
                  {c.text}
                </p>
                <p className="mt-6 border-t border-(--landing-line) pt-4 font-mono text-[11px] tracking-wide text-(--landing-muted) uppercase">
                  {c.meta}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Process — inverted oak panel with horizontal steps */}
        <section
          id="process"
          className="mx-auto max-w-7xl scroll-mt-28 px-5 sm:px-8"
        >
          <div className="overflow-hidden rounded-[2rem] bg-(--landing-ink) p-6 text-(--landing-paper) sm:p-10 lg:p-12">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="font-mono text-xs tracking-[0.2em] uppercase opacity-60">
                  How it works
                </p>
                <h2 className="landing-title mt-4 max-w-lg text-3xl sm:text-4xl">
                  From repository to insight in three passes.
                </h2>
              </div>
              <Link
                href="/login"
                className="rounded-full bg-(--landing-paper) px-5 py-2.5 text-sm font-semibold text-(--landing-ink) transition-opacity hover:opacity-90"
              >
                Start pass 01
              </Link>
            </div>
            <ol className="mt-10 grid gap-4 lg:grid-cols-3">
              {STEPS.map((s) => (
                <li
                  key={s.n}
                  className="rounded-3xl border border-(--landing-paper)/30 bg-(--landing-paper)/10 p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm opacity-60">{s.n}</span>
                    <s.icon className="size-5 opacity-70" />
                  </div>
                  <h3 className="landing-title mt-5 text-2xl">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed opacity-70">
                    {s.text}
                  </p>
                  <pre className="mt-5 overflow-x-auto rounded-2xl border border-(--landing-paper)/20 bg-(--landing-paper)/10 px-4 py-3 font-mono text-xs opacity-90">
                    {s.snippet}
                  </pre>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Report + demo — bento grid */}
        <section
          id="report"
          className="mx-auto max-w-7xl scroll-mt-28 px-5 py-16 sm:px-8 sm:py-20"
        >
          <p className="landing-kicker">The report</p>
          <h2 className="landing-title mt-4 max-w-2xl text-3xl text-(--landing-ink) sm:text-5xl">
            A score you can defend in review.
          </h2>
          <div
            id="demo"
            className="mt-10 grid scroll-mt-28 gap-4 lg:grid-cols-5"
          >
            <div className="rounded-[1.75rem] border border-(--landing-line) bg-(--landing-fog) p-6 sm:p-8 lg:col-span-2">
              <p className="font-mono text-[11px] tracking-[0.16em] text-(--landing-muted) uppercase">
                project / payment-api
              </p>
              <p className="landing-title mt-4 text-7xl text-(--landing-ink)">
                82
                <span className="text-2xl text-(--landing-muted)"> / 100</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-(--landing-muted)">
                Weighted across five dimensions. Critical issues ship with file
                paths, not vibes.
              </p>
              <div className="mt-6 space-y-4">
                {SCORES.map((s) => (
                  <ScoreBar key={s.label} label={s.label} value={s.value} />
                ))}
              </div>
            </div>
            <div className="grid gap-4 lg:col-span-3">
              <div className="rounded-[1.75rem] border border-(--landing-line) bg-(--landing-paper) p-6 sm:p-8">
                <p className="font-mono text-[11px] tracking-[0.16em] text-(--landing-muted) uppercase">
                  Grounded chat
                </p>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="rounded-2xl bg-(--landing-fog) px-4 py-3 text-(--landing-ink)">
                    You — Explain the authentication flow.
                  </div>
                  <div className="rounded-2xl border border-(--landing-line) px-4 py-3 leading-relaxed text-(--landing-muted)">
                    Auth starts in{" "}
                    <span className="font-mono text-xs text-(--landing-accent-deep)">
                      src/lib/auth.ts
                    </span>
                    . Sessions are issued after credential checks, then the
                    proxy guards dashboard routes.
                    <span className="mt-2 block font-mono text-[11px] opacity-70">
                      Sources: src/lib/auth.ts · src/proxy.ts
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.75rem] bg-(--landing-accent) p-6 text-(--landing-paper)">
                  <p className="font-mono text-[11px] tracking-[0.16em] uppercase opacity-80">
                    Critical · 1
                  </p>
                  <p className="landing-title mt-3 text-xl">
                    Session cookie missing Secure flag
                  </p>
                  <p className="mt-2 font-mono text-[11px] opacity-80">
                    src/lib/auth.ts:42
                  </p>
                </div>
                <div className="rounded-[1.75rem] border border-(--landing-line) bg-(--landing-paper) p-6">
                  <p className="font-mono text-[11px] tracking-[0.16em] text-(--landing-muted) uppercase">
                    Roadmap
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-(--landing-ink)">
                    <li>→ Harden session cookies</li>
                    <li>→ Split oversized route handlers</li>
                    <li>→ Add coverage for proxy guards</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            id="features"
            className="mt-4 scroll-mt-28 rounded-[1.75rem] border border-(--landing-line) px-6 py-5 text-sm text-(--landing-muted) sm:px-8"
          >
            <span className="font-medium text-(--landing-ink)">Includes: </span>
            progress tracking, explorer, settings seats, and daily analysis
            limits on the free plan.
          </div>
        </section>

        {/* CTA — centered poster */}
        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20">
          <div className="landing-cta overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-12">
            <p className="font-mono text-xs tracking-[0.2em] text-white/60 uppercase">
              Free to try · Upgrade in settings
            </p>
            <h2 className="landing-title mx-auto mt-4 max-w-2xl text-3xl text-white sm:text-5xl">
              Furnish your mind with the whole repository.
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/login"
                className="landing-btn-primary rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                Create account
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white"
              >
                Analyze my repository
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer — oversized wordmark */}
      <footer className="border-t border-(--landing-line)">
        <div className="mx-auto max-w-7xl overflow-hidden px-5 py-10 sm:px-8">
          <p
            aria-hidden
            className="landing-title leading-none whitespace-nowrap text-(--landing-fog) select-none text-[12vw] tracking-tight sm:text-[6rem] lg:text-[8rem]"
          >
            RAGNALIZER
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-(--landing-muted)">
            <div>
              <p className="landing-brand text-(--landing-ink)">Ragnalizer</p>
              <p className="mt-1 font-mono text-xs">
                © {new Date().getFullYear()} Argha Chandra Das · AI code
                analyzer
              </p>
            </div>
            <a
              href="https://www.linkedin.com/in/argha-chandra-das-b487a1215/"
              target="_blank"
              rel="noreferrer"
              aria-label="Argha Chandra Das on LinkedIn"
              className="flex items-center gap-2 rounded-full border border-(--landing-line) px-4 py-2 font-medium text-(--landing-ink) transition-colors hover:bg-(--landing-fog)"
            >
              <LinkedinMark className="size-4" />
              Argha Chandra Das
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
