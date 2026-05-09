"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeSwitcher";

function LoadingScreen() {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<"visible" | "exiting" | "hidden">("visible");
  const [mounted, setMounted] = useState(false);
  const progress = useMotionValue(0);
  const progressWidth = useTransform(progress, [0, 100], ["0%", "100%"]);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;

    const seen = window.sessionStorage.getItem("aura-rise-loader-seen");
    if (seen) {
      setPhase("hidden");
      return;
    }

    window.sessionStorage.setItem("aura-rise-loader-seen", "1");
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setPhase("exiting");
      document.body.style.overflow = "";
      window.setTimeout(() => setPhase("hidden"), shouldReduceMotion ? 80 : 420);
    }, shouldReduceMotion ? 700 : 2100);

    if (!shouldReduceMotion) {
      const interval = window.setInterval(() => {
        const current = progress.get();
        progress.set(Math.min(100, current + 12));
      }, 180);

      return () => {
        window.clearInterval(interval);
        window.clearTimeout(timer);
        document.body.style.overflow = "";
      };
    }

    progress.set(100);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [progress, shouldReduceMotion]);

  if (!mounted || phase === "hidden") return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "exiting" ? 0 : 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-forest px-6"
      aria-label="Loading Aura Rise Foundation"
    >
      <div className="w-full max-w-md text-center">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92, y: 16 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="inline-flex flex-col items-center"
        >
          <svg viewBox="0 0 100 100" className="h-20 w-20">
            <defs>
              <linearGradient id="loaderSunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-secondary)" />
                <stop offset="100%" stopColor="var(--color-primary)" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="24" fill="url(#loaderSunGradient)" />
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="var(--color-bg)"
              strokeWidth="4"
              strokeDasharray="4 10"
            />
          </svg>
          <p className="mt-5 font-display text-4xl text-brand-cream">Aura Rise</p>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.22em] text-brand-gold">
            Building futures with care
          </p>
        </motion.div>
        <div className="mt-8 h-1.5 w-full overflow-hidden bg-brand-cream/15">
          <motion.div className="h-full bg-brand-gold" style={{ width: progressWidth }} />
        </div>
      </div>
    </motion.div>
  );
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.22,
  });

  return <motion.div className="fixed left-0 right-0 top-0 z-[90] h-1 origin-left bg-brand-ember" style={{ scaleX }} />;
}

function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 280, damping: 24, mass: 0.3 });
  const smoothY = useSpring(y, { stiffness: 280, damping: 24, mass: 0.3 });

  useEffect(() => {
    if (shouldReduceMotion || typeof window === "undefined") return;

    const media = window.matchMedia("(pointer: fine)");
    if (!media.matches) return;
    setEnabled(true);

    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const interactiveSelector = "a, button, input, select, textarea, label";
    const handleOver = (event: Event) => {
      const target = event.target;
      if (target instanceof Element && target.closest(interactiveSelector)) {
        setExpanded(true);
      }
    };
    const handleOut = (event: Event) => {
      const target = event.target;
      if (target instanceof Element && target.closest(interactiveSelector)) {
        setExpanded(false);
      }
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver, true);
    document.addEventListener("mouseout", handleOut, true);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver, true);
      document.removeEventListener("mouseout", handleOut, true);
    };
  }, [expanded, shouldReduceMotion, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[95] hidden rounded-full border border-brand-ember mix-blend-multiply md:block"
      style={{
        x: smoothX,
        y: smoothY,
        width: expanded ? 34 : 16,
        height: expanded ? 34 : 16,
        translateX: "-50%",
        translateY: "-50%",
        backgroundColor: expanded ? "var(--color-card-bg)" : "var(--color-glass)",
      }}
    />
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Link
        href="#main-content"
        className="skip-link fixed left-4 top-4 z-[110] -translate-y-20 bg-brand-ember px-4 py-3 font-mono text-xs uppercase tracking-[0.18em] text-brand-cream transition focus:translate-y-0"
      >
        Skip to content
      </Link>
      <LoadingScreen />
      <ScrollProgressBar />
      <CustomCursor />
      <Navbar />
      <div id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </div>
      <Footer />
    </ThemeProvider>
  );
}
