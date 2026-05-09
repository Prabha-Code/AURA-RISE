"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { programs } from "@/lib/data";

const tabs = ["All", "Education", "Healthcare", "Nutrition", "Empowerment"] as const;

export default function ProgramsPageClient() {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("All");

  const filteredPrograms = useMemo(() => {
    if (activeTab === "All") return programs;
    return programs.filter((program) => program.title === activeTab);
  }, [activeTab]);

  return (
    <main className="px-5 pb-16 pt-24 md:px-10">
      <section className="mx-auto w-full max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl leading-[1.2] text-brand-forest sm:text-6xl"
        >
          Our Programs
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06 }}
          className="mt-3 max-w-2xl text-brand-earth"
        >
          Four pathways, one purpose: ensure every child has access to learning, health, nourishment, and opportunity.
        </motion.p>
        <div className="mt-4 h-1 w-32 bg-brand-ember" />
      </section>

      <section className="mx-auto mt-8 w-full max-w-7xl">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`min-h-11 border px-4 py-2 text-sm font-medium transition ${
                activeTab === tab
                  ? "border-brand-ember bg-brand-ember text-brand-cream"
                  : "border-brand-forest/30 text-brand-forest hover:border-brand-ember"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredPrograms.map((program) => (
              <motion.article
                key={program.slug}
                layout
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden border border-brand-forest/15 bg-white shadow-[0_12px_34px_var(--shadow-card)] transition-shadow hover:shadow-[0_18px_44px_var(--shadow-hover)]"
              >
                <div className="relative h-56">
                  <Image src={program.heroImage} alt={program.title} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <span className="inline-flex bg-brand-gold/20 px-2 py-1 font-mono text-xs uppercase tracking-[0.14em] text-brand-earth">
                    {program.title}
                  </span>
                  <h2 className="mt-3 font-display text-3xl leading-[1.2] text-brand-forest">{program.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm text-brand-earth">{program.description}</p>
                  <p className="mt-3 text-sm text-brand-charcoal">
                    <span className="font-semibold">{program.stats[0]?.value}</span> {program.stats[0]?.label}
                  </p>
                  <Link href={`/programs/${program.slug}`} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-ember">
                    Explore <span aria-hidden>→</span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mt-12 w-full max-w-7xl border border-brand-gold/40 bg-brand-forest p-8"
      >
        <h3 className="font-display text-3xl leading-[1.2] text-brand-gold">Start a Program in Your Community</h3>
        <p className="mt-2 max-w-2xl text-brand-cream/85">
          Partner with Aura Rise to co-create localized solutions for children and families in your region.
        </p>
        <Link href="/about#volunteer" className="mt-5 inline-flex min-h-11 items-center border border-brand-gold px-4 py-2 font-semibold text-brand-gold transition hover:bg-brand-gold hover:text-brand-forest">
          Partner With Us
        </Link>
      </motion.section>
    </main>
  );
}
