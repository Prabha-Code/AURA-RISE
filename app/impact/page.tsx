import Link from "next/link";
import { successStories, stats, testimonials } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Impact",
  description:
    "See the numbers, stories, and community outcomes powered by Aura Rise Foundation.",
  path: "/impact",
  image: "https://picsum.photos/seed/aura-impact-og/1200/630",
});

export default function ImpactPage() {
  return (
    <main className="px-5 pb-16 pt-24 md:px-10">
      <section className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-ember">
          Measured change
        </p>
        <h1 className="mt-3 font-display text-5xl leading-[1.2] text-brand-forest sm:text-6xl">
          Impact that grows with every act of care
        </h1>
        <p className="mt-4 max-w-3xl text-brand-earth">
          Aura Rise turns community trust into practical outcomes across learning,
          nourishment, health, and youth opportunity.
        </p>
      </section>

      <section className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <article
            key={item.label}
            className="border border-brand-earth/15 bg-white p-5 shadow-[0_12px_34px_var(--shadow-card)]"
          >
            <p className="font-mono text-3xl text-brand-ember">
              {item.value.toLocaleString()}
              {item.suffix ?? ""}
            </p>
            <p className="mt-2 text-sm text-brand-earth">{item.label}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-12 grid max-w-6xl gap-5 lg:grid-cols-3">
        {successStories.map((story) => (
          <article
            key={story.childName}
            className="border border-brand-earth/15 bg-white p-5 shadow-[0_12px_34px_var(--shadow-card)]"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-ember">
              {story.program}
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[1.2] text-brand-forest">
              {story.childName}, age {story.age}
            </h2>
            <p className="mt-3 text-sm leading-[1.6] text-brand-earth">{story.after}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-12 max-w-6xl">
        <h2 className="font-display text-4xl leading-[1.2] text-brand-forest">
          What families say
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial) => (
            <article
              key={testimonial.name}
              className="border border-brand-earth/15 bg-white p-5 shadow-[0_12px_34px_var(--shadow-card)]"
            >
              <p className="font-display text-5xl leading-none text-brand-gold">"</p>
              <p className="mt-2 text-sm leading-[1.6] text-brand-earth">
                {testimonial.quote}
              </p>
              <p className="mt-4 font-semibold text-brand-charcoal">{testimonial.name}</p>
              <p className="text-xs text-brand-earth">{testimonial.location}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl bg-brand-forest px-6 py-10 text-brand-cream">
        <h2 className="font-display text-4xl leading-[1.2] text-brand-gold">
          Ready to make the next story possible?
        </h2>
        <p className="mt-3 max-w-2xl">
          Support the programs that communities are already using to reshape what
          childhood can look like.
        </p>
        <Link
          href="/donate"
          className="mt-6 inline-flex min-h-11 items-center border border-brand-gold px-5 py-3 font-semibold text-brand-gold transition hover:bg-brand-gold hover:text-brand-forest"
        >
          Give Today
        </Link>
      </section>
    </main>
  );
}
