"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  CheckCircle2,
  CircleDollarSign,
  HandHeart,
  HeartPulse,
  ShieldCheck,
  Sprout,
  Users,
} from "lucide-react";

type ProgramKey = "where-needed" | "education" | "nutrition" | "healthcare" | "empowerment";
type Frequency = "one-time" | "monthly";

const amountTiles = [
  { value: 500, label: "500", impact: "Feeds a child for a month" },
  { value: 1000, label: "1,000", impact: "Provides school supplies for one learner" },
  { value: 2500, label: "2,500", impact: "Supports a health check camp day" },
  { value: 5000, label: "5,000", impact: "Funds nutrition kits for 10 families" },
  { value: 10000, label: "10,000", impact: "Sponsors after-school support for a class" },
  { value: -1, label: "Custom", impact: "Choose your own impact contribution" },
];

const programOptions: Array<{
  key: ProgramKey;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { key: "where-needed", label: "Where needed most", description: "Directed to highest-priority child needs", icon: HandHeart },
  { key: "education", label: "Education", description: "Learning access, tutoring, and school support", icon: Sprout },
  { key: "nutrition", label: "Nutrition", description: "Daily meals and growth tracking for children", icon: CircleDollarSign },
  { key: "healthcare", label: "Healthcare", description: "Screenings, mobile camps, and preventive care", icon: HeartPulse },
  { key: "empowerment", label: "Empowerment", description: "Life-skills and youth leadership pathways", icon: Users },
];

const donors = [
  { name: "Ananya R.", amount: 2500, time: "2h ago" },
  { name: "Rahul M.", amount: 1000, time: "5h ago" },
  { name: "Kavita S.", amount: 5000, time: "9h ago" },
  { name: "Imran K.", amount: 500, time: "1d ago" },
  { name: "Neha P.", amount: 10000, time: "1d ago" },
];

function currency(value: number) {
  return `INR ${value.toLocaleString("en-IN")}`;
}

export default function DonatePageClient() {
  const params = useSearchParams();
  const shouldReduceMotion = useReducedMotion();
  const parsedAmount = Number(params.get("amount"));

  const [selectedAmount, setSelectedAmount] = useState<number>(2500);
  const [isCustom, setIsCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [program, setProgram] = useState<ProgramKey>("where-needed");
  const [frequency, setFrequency] = useState<Frequency>("one-time");
  const [anonymous, setAnonymous] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!Number.isNaN(parsedAmount) && parsedAmount > 0) {
      setSelectedAmount(parsedAmount);
      setIsCustom(!amountTiles.some((tile) => tile.value === parsedAmount));
      if (!amountTiles.some((tile) => tile.value === parsedAmount)) {
        setCustomAmount(String(parsedAmount));
      }
    }
  }, [parsedAmount]);

  const effectiveAmount = isCustom ? Math.max(0, Number(customAmount || 0)) : selectedAmount;
  const monthlyChildren = Math.max(1, Math.floor(effectiveAmount / 500));
  const yearlyChildren = monthlyChildren * 12;
  const goal = 50000;
  const progress = Math.min(100, Math.round((effectiveAmount / goal) * 100));
  const impactLines = [
    `${Math.max(1, Math.floor(effectiveAmount / 125))} nutritious meal servings for children`,
    `${Math.max(1, Math.floor(effectiveAmount / 500))} learning or care support kits distributed`,
    `${Math.max(1, Math.floor(effectiveAmount / 1000))} primary health consultations enabled`,
  ];

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  return (
    <main className="bg-brand-cream px-5 pb-16 pt-24 md:px-10">
      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.12fr_0.88fr]">
        <section>
          <motion.h1 initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl leading-[1.2] text-brand-forest sm:text-6xl">
            Make Your Gift Count
          </motion.h1>
          <p className="mt-3 max-w-2xl text-brand-earth">
            Every contribution creates immediate, measurable change for children and families. Choose how you want your impact to flow.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-9">
            <motion.div layout className="space-y-4">
              <h2 className="font-display text-2xl leading-[1.2] text-brand-charcoal">Step 1 - Choose Amount</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {amountTiles.map((tile) => {
                  const active = tile.value === -1 ? isCustom : !isCustom && selectedAmount === tile.value;
                  return (
                    <motion.button
                      key={tile.label}
                      type="button"
                      whileTap={{ scale: 0.98 }}
                      animate={{ scale: active && !shouldReduceMotion ? 1.02 : 1 }}
                      onClick={() => {
                        if (tile.value === -1) {
                          setIsCustom(true);
                          setSelectedAmount(0);
                        } else {
                          setIsCustom(false);
                          setSelectedAmount(tile.value);
                        }
                      }}
                      className={`min-h-28 border p-4 text-left transition ${
                        active
                          ? "border-brand-ember bg-brand-ember text-white shadow-[0_14px_36px_var(--shadow-hover)]"
                          : "border-brand-earth/25 bg-white text-brand-charcoal hover:border-brand-ember hover:shadow-[0_14px_36px_var(--shadow-soft)]"
                      }`}
                    >
                      <p className="font-mono text-xl">
                        {tile.value === -1 ? tile.label : <><span aria-hidden="true">&#8377;</span>{tile.label}</>}
                      </p>
                      <p className={`mt-2 text-xs ${active ? "text-white/90" : "text-brand-earth"}`}>{tile.impact}</p>
                    </motion.button>
                  );
                })}
              </div>
              <AnimatePresence>
                {isCustom ? (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                    <input
                      type="number"
                      min={1}
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="Enter custom amount in INR"
                      className="w-full border border-brand-earth/25 bg-white px-4 py-3 font-body text-brand-charcoal outline-none focus:ring-2 focus:ring-brand-ember"
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>

            <motion.div layout className="space-y-4">
              <h2 className="font-display text-2xl leading-[1.2] text-brand-charcoal">Step 2 - Program (Optional)</h2>
              <div className="space-y-2">
                {programOptions.map((option) => {
                  const Icon = option.icon;
                  const active = program === option.key;
                  return (
                    <label key={option.key} className={`flex cursor-pointer items-start gap-3 border p-3 ${active ? "border-brand-ember bg-brand-ember/10" : "border-brand-earth/20 bg-white"}`}>
                      <input type="radio" name="program" className="mt-1" checked={active} onChange={() => setProgram(option.key)} />
                      <Icon className="mt-0.5 h-5 w-5 text-brand-ember" />
                      <span>
                        <span className="block font-medium text-brand-charcoal">{option.label}</span>
                        <span className="text-sm text-brand-earth">{option.description}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </motion.div>

            <motion.div layout className="space-y-4">
              <h2 className="font-display text-2xl leading-[1.2] text-brand-charcoal">Step 3 - Donor Details</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <input value={name} onChange={(e) => setName(e.target.value)} required={!anonymous} placeholder="Full Name" className="border border-brand-earth/25 bg-white px-4 py-3 font-body outline-none focus:ring-2 focus:ring-brand-ember sm:col-span-2" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email Address" className="border border-brand-earth/25 bg-white px-4 py-3 font-body outline-none focus:ring-2 focus:ring-brand-ember" />
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="Phone Number" className="border border-brand-earth/25 bg-white px-4 py-3 font-body outline-none focus:ring-2 focus:ring-brand-ember" />
              </div>
              <label className="inline-flex min-h-11 items-center gap-2 text-sm text-brand-earth">
                <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
                Donate Anonymously
              </label>
            </motion.div>

            <motion.div layout className="space-y-4">
              <h2 className="font-display text-2xl leading-[1.2] text-brand-charcoal">Step 4 - Frequency</h2>
              <div className="inline-flex border border-brand-earth/20 bg-white p-1">
                {(["one-time", "monthly"] as Frequency[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFrequency(item)}
                    className={`min-h-11 px-5 py-2 text-sm font-semibold capitalize transition ${frequency === item ? "bg-brand-ember text-white" : "text-brand-earth"}`}
                  >
                    {item.replace("-", " ")}
                  </button>
                ))}
              </div>
              <AnimatePresence>
                {frequency === "monthly" ? (
                  <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-brand-earth">
                    You&apos;ll impact approximately <span className="font-semibold text-brand-ember">{yearlyChildren}</span> children per year.
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </motion.div>

            <motion.button whileHover={{ scale: shouldReduceMotion ? 1 : 1.01 }} whileTap={{ scale: 0.99 }} type="submit" className="w-full border border-brand-ember bg-brand-ember px-6 py-4 text-left text-lg font-semibold text-white transition hover:bg-brand-gold hover:text-brand-forest">
              Complete My Donation →
            </motion.button>
          </form>

          <section className="mt-10">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, title: "100% Transparent" },
                { icon: BadgeCheck, title: "Tax Exempt 80G" },
                { icon: CheckCircle2, title: "Audited Annually" },
              ].map((item) => (
                <div key={item.title} className="border border-brand-earth/20 bg-white p-4 text-center shadow-[0_10px_28px_var(--shadow-card)]">
                  <item.icon className="mx-auto h-5 w-5 text-brand-ember" />
                  <p className="mt-2 text-sm font-semibold text-brand-charcoal">{item.title}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5].map((logo) => (
                <div key={logo} className="inline-flex h-10 w-20 items-center justify-center border border-brand-earth/20 bg-white">
                  <svg width="48" height="16" viewBox="0 0 48 16" className="text-brand-sage">
                    <rect x="1" y="1" width="14" height="14" fill="currentColor" opacity="0.2" />
                    <circle cx="26" cy="8" r="6" fill="currentColor" opacity="0.35" />
                    <polygon points="36,14 46,14 41,2" fill="currentColor" opacity="0.5" />
                  </svg>
                </div>
              ))}
            </div>
          </section>
        </section>

        <motion.aside layout className="lg:sticky lg:top-24 lg:h-fit">
          <div className="border border-white/35 bg-[var(--glass-bg)] p-6 shadow-[0_22px_50px_var(--shadow-hover)]" style={{ backdropFilter: "var(--glass-blur)" }}>
            <h2 className="font-display text-3xl leading-[1.2] text-brand-forest">Your Impact Preview</h2>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${effectiveAmount}-${frequency}`}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
                className="mt-4"
              >
                <p className="text-brand-earth">
                  With <span className="font-semibold text-brand-ember">{currency(effectiveAmount || 0)}</span>, you can...
                </p>
                <ul className="mt-3 space-y-2 text-sm text-brand-charcoal">
                  {impactLines.map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 bg-brand-ember" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6">
              <p className="font-mono text-sm text-brand-earth">
                {currency(effectiveAmount || 0)} of {currency(goal)} monthly goal
              </p>
              <div className="mt-2 h-2 w-full bg-brand-earth/15">
                <motion.div
                  className="h-full bg-brand-ember"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            <div className="mt-7">
              <h3 className="font-display text-xl leading-[1.2] text-brand-forest">Recent Donors</h3>
              <div className="mt-3 space-y-2">
                {donors.map((donor) => (
                  <div key={donor.name} className="flex items-center justify-between gap-2 border border-white/30 bg-white/60 px-3 py-2 text-sm">
                    <p className="text-brand-charcoal">{donor.name}</p>
                    <p className="font-mono text-brand-ember">{currency(donor.amount)}</p>
                    <p className="font-mono text-brand-earth">{donor.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>
      </div>

      <AnimatePresence>
        {showSuccess ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
            <motion.div initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-md border border-brand-gold/40 bg-white p-6 text-center shadow-[0_28px_70px_var(--shadow-strong)]">
              <motion.div initial={{ scale: 0.6, rotate: -14 }} animate={{ scale: 1, rotate: 0 }} className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-ember/10 text-brand-ember">
                <CheckCircle2 className="h-8 w-8" />
              </motion.div>
              <h3 className="mt-4 font-display text-3xl leading-[1.2] text-brand-forest">Thank You</h3>
              <p className="mt-2 text-brand-earth">
                Your {frequency} gift of {currency(effectiveAmount || 0)} has been recorded. Together, we are changing futures.
              </p>
              <div className="mt-5 flex justify-center gap-2">
                <button type="button" className="min-h-11 border border-brand-forest/20 px-3 py-2 text-sm text-brand-forest">
                  Share on WhatsApp
                </button>
                <button type="button" className="min-h-11 border border-brand-forest/20 px-3 py-2 text-sm text-brand-forest">
                  Share on X
                </button>
              </div>
              <button type="button" onClick={() => setShowSuccess(false)} className="mt-5 min-h-11 w-full border border-brand-ember bg-brand-ember px-4 py-3 font-semibold text-white">
                Close
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
