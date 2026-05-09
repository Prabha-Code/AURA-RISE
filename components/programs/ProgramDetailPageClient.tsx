"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, HeartPulse, Leaf, Sparkles, Users } from "lucide-react";
import type { Program } from "@/lib/data";
import { programs } from "@/lib/data";

const iconMap = {
  education: BookOpen,
  healthcare: HeartPulse,
  nutrition: Leaf,
  empowerment: Users,
};

const steps = [
  "Community needs mapping with local leaders and caregivers",
  "Program setup with trained field teams and local volunteers",
  "Weekly delivery cycles with real-time support and monitoring",
  "Outcome tracking and iteration for long-term sustainability",
];

export default function ProgramDetailPageClient({ program }: { program: Program }) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = iconMap[program.slug as keyof typeof iconMap] ?? Sparkles;
  const related = programs.filter((item) => item.slug !== program.slug).slice(0, 2);

  return (
    <main className="pb-16">
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <Image src={program.heroImage} alt={program.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="absolute inset-x-0 bottom-10 mx-auto w-full max-w-7xl px-5 md:px-10"
        >
          <h1 className="font-display text-5xl leading-[1.2] text-white sm:text-6xl">{program.title}</h1>
          <p className="mt-2 text-lg text-white/90">{program.tagline}</p>
        </motion.div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-14 md:grid-cols-2 md:px-10">
        <motion.div initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl leading-[1.2] text-brand-forest">Overview</h2>
          <p className="mt-4 leading-relaxed text-brand-earth">{program.description}</p>
          <p className="mt-3 leading-relaxed text-brand-earth">
            We co-design every intervention with communities so support remains relevant, measurable, and built to last beyond individual project cycles.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 }} className="grid gap-3 sm:grid-cols-2">
          {program.stats.map((stat) => (
            <div key={stat.label} className="border border-white/35 bg-[var(--glass-bg)] p-4 shadow-[0_12px_34px_var(--shadow-card)]" style={{ backdropFilter: "var(--glass-blur)" }}>
              <p className="font-mono text-2xl text-brand-forest">{stat.value}</p>
              <p className="text-sm text-brand-earth">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-8 md:px-10">
        <motion.h3 initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl leading-[1.2] text-brand-forest">
          How It Works
        </motion.h3>
        <div className="relative mt-7 space-y-8">
          <div className="absolute left-6 top-3 h-[calc(100%-1.5rem)] w-px bg-brand-ember/50" />
          {steps.map((step, index) => (
            <motion.div key={step} initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="relative flex items-start gap-4">
              <div className="z-10 inline-flex h-12 w-12 items-center justify-center border border-brand-ember bg-brand-cream text-brand-ember">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-mono text-sm text-brand-ember">Step {index + 1}</p>
                <p className="mt-1 text-brand-earth">{step}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-12 md:px-10">
        <motion.h3 initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl leading-[1.2] text-brand-forest">
          Success Stories
        </motion.h3>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {program.stories.slice(0, 3).map((story, index) => (
            <motion.article key={story.title} initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="overflow-hidden border border-brand-forest/20 bg-white shadow-[0_12px_34px_var(--shadow-card)] transition-shadow hover:shadow-[0_18px_44px_var(--shadow-hover)]">
              <div className="relative h-44">
                <Image src={program.gallery[index % program.gallery.length]?.src ?? program.heroImage} alt={story.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <p className="font-display text-2xl leading-[1.2] text-brand-forest">{story.childName}</p>
                <p className="mt-1 text-sm italic text-brand-earth">"{story.summary}"</p>
                <Link href="/about" className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-brand-ember">
                  Read Full Story
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10">
        <motion.h3 initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl leading-[1.2] text-brand-forest">
          Gallery
        </motion.h3>
        <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {program.gallery.map((image) => (
            <motion.div key={image.src} initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-4 overflow-hidden shadow-[0_12px_34px_var(--shadow-card)]">
              <Image src={image.src} alt={image.alt} width={900} height={700} className="h-auto w-full transition duration-500 hover:scale-105" />
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mt-4 w-full max-w-7xl bg-brand-sage px-6 py-10 text-center md:px-10">
        <h3 className="font-display text-4xl leading-[1.2] text-brand-cream">Join This Program as a Volunteer</h3>
        <p className="mx-auto mt-2 max-w-2xl text-brand-cream/90">
          Your time, skills, and heart can directly support children and families through this program.
        </p>
        <Link href="/about#volunteer" className="mt-5 inline-flex min-h-11 items-center border border-brand-cream px-5 py-3 font-semibold text-brand-cream transition hover:bg-brand-cream hover:text-brand-sage">
          Become a Volunteer
        </Link>
      </motion.section>

      <section className="mx-auto w-full max-w-7xl px-5 pt-12 md:px-10">
        <motion.h3 initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl leading-[1.2] text-brand-forest">
          Related Programs
        </motion.h3>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {related.map((item) => (
            <motion.article key={item.slug} initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="overflow-hidden border border-brand-forest/20 bg-white shadow-[0_12px_34px_var(--shadow-card)] transition-shadow hover:shadow-[0_18px_44px_var(--shadow-hover)]">
              <div className="relative h-48">
                <Image src={item.heroImage} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <p className="font-display text-2xl leading-[1.2] text-brand-forest">{item.title}</p>
                <p className="mt-1 line-clamp-2 text-sm text-brand-earth">{item.tagline}</p>
                <Link href={`/programs/${item.slug}`} className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-brand-ember">
                  Explore Program
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
