"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, Camera, MessageCircle, PlayCircle } from "lucide-react";
import { programs, stats } from "@/lib/data";

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [isSubmitted, setSubmitted] = useState(false);
  const [statIndex, setStatIndex] = useState(0);
  const impactStat = stats[statIndex % stats.length];

  useEffect(() => {
    const timer = setInterval(() => setStatIndex((v) => (v + 1) % stats.length), 2800);
    return () => clearInterval(timer);
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setEmail("");
    window.setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <footer className="relative mt-16 overflow-hidden bg-brand-forest text-brand-cream">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='%23FAF3E8' fill-opacity='0.22'%3E%3Ccircle cx='8' cy='11' r='1'/%3E%3Ccircle cx='40' cy='34' r='1'/%3E%3Ccircle cx='92' cy='16' r='1'/%3E%3Ccircle cx='64' cy='88' r='1'/%3E%3Ccircle cx='102' cy='74' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Link href="/" className="mb-4 inline-flex min-h-11 items-center gap-3">
            <svg viewBox="0 0 100 100" className="h-10 w-10">
              <circle cx="50" cy="50" r="24" fill="var(--color-secondary)" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="var(--color-bg)" strokeWidth="4" strokeDasharray="4 10" />
            </svg>
            <span className="font-display text-2xl text-brand-cream">Aura Rise</span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-brand-cream/85">
            We build pathways to education, health, nutrition, and opportunity so every child can grow with dignity and hope.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {[
              { name: "Instagram", Icon: Camera },
              { name: "Twitter", Icon: MessageCircle },
              { name: "LinkedIn", Icon: Briefcase },
              { name: "YouTube", Icon: PlayCircle },
            ].map(({ name, Icon }) => (
              <motion.a
                key={name}
                href="#"
                aria-label={name}
                whileHover={shouldReduceMotion ? undefined : { y: -2, backgroundColor: "var(--color-secondary)", color: "var(--color-bg-dark)" }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex min-h-11 min-w-11 items-center justify-center border border-brand-sage/70 text-brand-sage transition-colors"
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="grid grid-cols-2 gap-6"
        >
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand-sage">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {["Home", "About", "Impact", "Donate", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : item === "Contact" ? "/about#volunteer" : `/${item.toLowerCase()}`}
                    className="inline-flex min-h-11 items-center transition-colors hover:text-brand-gold"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand-sage">Programs</h3>
            <ul className="space-y-2 text-sm">
              {programs.map((program) => (
                <li key={program.id}>
                  <Link href={`/programs/${program.slug}`} className="inline-flex min-h-11 items-center transition-colors hover:text-brand-gold">
                    {program.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14 }}
        >
          <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand-sage">Newsletter</h3>
          <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="w-full border border-brand-sage/60 bg-brand-cream/10 px-4 py-3 text-sm text-brand-cream placeholder:text-brand-cream/65 focus:border-brand-gold focus:outline-none"
            />
            <motion.button
              whileHover={shouldReduceMotion ? undefined : { backgroundColor: "var(--color-secondary)", color: "var(--color-bg-dark)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="min-h-11 border border-brand-ember bg-brand-ember px-4 py-3 text-sm font-semibold uppercase tracking-wide text-brand-cream"
            >
              Subscribe
            </motion.button>
          </form>
          <p className="mt-2 text-xs text-brand-cream/70">{isSubmitted ? "Thanks for subscribing." : "Monthly field updates. No spam."}</p>

          <motion.div
            key={impactStat.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-6 border border-brand-sage/45 bg-brand-cream/5 p-4"
          >
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-brand-sage">Impact this month</p>
            <p className="mt-2 font-display text-3xl text-brand-cream">
              {impactStat.value.toLocaleString()}
              {impactStat.suffix ?? ""}
            </p>
            <p className="text-sm text-brand-cream/80">{impactStat.label}</p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative border-t border-brand-sage/35 px-5 py-5 text-xs text-brand-cream/85 md:px-8"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Aura Rise Foundation. All rights reserved.</p>
          <p>Made with &hearts; for children everywhere</p>
        </div>
      </motion.div>
    </footer>
  );
}
