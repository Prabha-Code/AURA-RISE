"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { BookOpen, ChevronDown, HandHeart, HeartPulse, Menu, Utensils, Users, X } from "lucide-react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { programs } from "@/lib/data";

const iconMap = {
  BookOpen,
  Utensils,
  HeartPulse,
  Users,
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Impact", href: "/impact" },
  { label: "Donate", href: "/donate" },
];

export default function Navbar() {
  const [isProgramsOpen, setProgramsOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const bg = useTransform(scrollY, [0, 120], ["var(--nav-bg-start)", "var(--nav-bg-end)"]);
  const border = useTransform(scrollY, [0, 120], ["var(--nav-border-start)", "var(--nav-border-end)"]);
  const blur = useTransform(scrollY, [0, 120], [0, 20]);
  const backdropFilter = useMotionTemplate`blur(${blur}px)`;

  const programCards = useMemo(
    () =>
      programs.map((program) => {
        const Icon = iconMap[program.icon as keyof typeof iconMap] ?? HandHeart;
        return { ...program, Icon };
      }),
    [],
  );

  return (
    <motion.header
      style={{ backgroundColor: bg, borderColor: border, backdropFilter }}
      className="sticky top-0 z-50 border-b"
    >
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="group inline-flex min-h-11 items-center gap-3">
          <svg viewBox="0 0 100 100" className="h-10 w-10">
            <defs>
              <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-secondary)" />
                <stop offset="100%" stopColor="var(--color-primary)" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="24" fill="url(#sunGradient)" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="var(--color-secondary)" strokeWidth="4" strokeDasharray="4 10" />
          </svg>
          <span className="font-display text-2xl text-brand-charcoal">Aura Rise</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="nav-link inline-flex min-h-11 items-center text-sm font-medium text-brand-charcoal transition-colors hover:text-brand-ember">
            Home
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setProgramsOpen(true)}
            onMouseLeave={() => setProgramsOpen(false)}
          >
            <button
              onClick={() => setProgramsOpen((open) => !open)}
              className="nav-link inline-flex min-h-11 items-center gap-2 text-sm font-medium text-brand-charcoal transition-colors hover:text-brand-ember"
              aria-expanded={isProgramsOpen}
              aria-haspopup="true"
            >
              Programs
              <ChevronDown className="h-4 w-4" />
            </button>
            <AnimatePresence>
              {isProgramsOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 top-12 w-[38rem] -translate-x-1/2 border border-white/30 bg-[var(--glass-bg)] p-4 shadow-2xl"
                  style={{ backdropFilter: "var(--glass-blur)" }}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {programCards.map((program, index) => (
                      <motion.div
                        key={program.id}
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={`/programs/${program.slug}`}
                          className="block border border-brand-gold/25 bg-brand-cream/90 p-3 shadow-[0_10px_26px_var(--shadow-card)] transition hover:bg-brand-gold/20 hover:shadow-[0_16px_38px_var(--shadow-hover)]"
                        >
                          <div className="mb-2 inline-flex h-9 w-9 items-center justify-center bg-brand-forest text-brand-cream">
                            <program.Icon className="h-5 w-5" />
                          </div>
                          <p className="font-display text-lg text-brand-forest">{program.title}</p>
                          <p className="text-xs text-brand-earth">{program.tagline}</p>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          {navLinks.slice(1).map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="nav-link inline-flex min-h-11 items-center text-sm font-medium text-brand-charcoal transition-colors hover:text-brand-ember"
            >
              {item.label}
            </Link>
          ))}
          <ThemeSwitcher />
        </div>

        <div className="hidden md:block">
          <motion.div whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/donate"
              className="donate-pulse inline-flex min-h-11 items-center border border-brand-ember bg-brand-ember px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-brand-cream transition-colors hover:border-brand-gold hover:bg-brand-gold hover:text-brand-forest"
            >
              Donate Now
            </Link>
          </motion.div>
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setDrawerOpen(true)}
          className="inline-flex min-h-11 min-w-11 items-center justify-center text-brand-charcoal md:hidden"
        >
          <Menu className="h-7 w-7" />
        </button>
      </nav>

      <AnimatePresence>
        {isDrawerOpen ? (
          <>
            <motion.button
              aria-label="Close menu overlay"
              className="fixed inset-0 z-40 bg-black/45 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 z-50 flex h-dvh w-[84%] max-w-sm flex-col border-l border-white/30 bg-[var(--glass-bg)] p-6 md:hidden"
              style={{ backdropFilter: "var(--glass-blur)" }}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-xl text-brand-cream">Menu</span>
                <button aria-label="Close menu" onClick={() => setDrawerOpen(false)} className="inline-flex min-h-11 min-w-11 items-center justify-center text-brand-cream">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <ThemeSwitcher mobile />
                {["Home", "Programs", "About", "Impact", "Donate"].map((label, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * index }}
                  >
                    <Link
                      href={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                      className="block min-h-11 border-b border-white/20 pb-3 font-display text-2xl text-brand-cream"
                      onClick={() => setDrawerOpen(false)}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-auto">
                <Link
                  href="/donate"
                  onClick={() => setDrawerOpen(false)}
                  className="inline-flex min-h-11 w-full justify-center border border-brand-ember bg-brand-ember px-5 py-3 text-sm font-semibold uppercase tracking-wide text-brand-cream hover:border-brand-gold hover:bg-brand-gold hover:text-brand-forest"
                >
                  Donate Now
                </Link>
              </motion.div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
