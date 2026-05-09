import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-brand-cream px-5 pb-20 pt-28 md:px-10">
      <section className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-ember">
            404
          </p>
          <h1 className="mt-3 font-display text-5xl leading-[1.2] text-brand-forest sm:text-6xl">
            The path faded, but the mission did not
          </h1>
          <p className="mt-4 max-w-xl text-brand-earth">
            The page you were looking for is not here right now. Let&apos;s get you
            back to the work that matters.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex min-h-11 items-center border border-brand-ember bg-brand-ember px-5 py-3 font-semibold text-brand-cream transition hover:bg-brand-gold hover:text-brand-forest"
          >
            Return Home
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden border border-brand-gold/30 bg-[var(--gradient-hero)]">
          <svg viewBox="0 0 420 320" className="h-full w-full">
            <circle cx="120" cy="110" r="44" fill="var(--color-secondary)" opacity="0.8" />
            <path
              d="M190 240c22-36 48-54 78-54 32 0 60 17 85 51"
              fill="none"
              stroke="var(--color-bg-dark)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M54 238c18-28 39-42 63-42 22 0 42 12 59 36"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <circle cx="265" cy="120" r="18" fill="var(--color-accent)" opacity="0.7" />
            <rect
              x="96"
              y="170"
              width="62"
              height="62"
              fill="var(--color-bg)"
              stroke="var(--color-text-muted)"
              strokeWidth="6"
            />
          </svg>
        </div>
      </section>
    </main>
  );
}
