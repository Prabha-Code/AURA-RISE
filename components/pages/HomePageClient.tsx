"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { programs, stats, successStories } from "@/lib/data";

function CounterStat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      setCount(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(latest) {
        setCount(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [isInView, shouldReduceMotion, value]);

  return (
    <div ref={ref} className="border-l-2 border-brand-ember/60 pl-4">
      <p className="font-mono text-4xl text-brand-forest sm:text-5xl">
        {count.toLocaleString()}
        {suffix ?? ""}
      </p>
      <p className="mt-2 text-sm text-brand-earth">{label}</p>
    </div>
  );
}

export default function HomePageClient() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -100]);
  const story = successStories[0];

  return (
    <main className="overflow-x-hidden">
      <section className="relative min-h-screen px-5 pb-14 pt-24 md:px-10">
        <div className="absolute inset-0 -z-10 bg-[var(--gradient-hero)]" />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-5">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.12 } } }}
            className="lg:col-span-3"
          >
            <motion.h1
              variants={{ hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 }, show: { opacity: 1, y: 0 } }}
              className="font-display text-5xl leading-[1.2] text-brand-charcoal sm:text-6xl lg:max-w-2xl lg:text-[72px]"
            >
              Every Child Deserves a Future Worth Living
            </motion.h1>
            <motion.p
              variants={{ hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 }, show: { opacity: 1, y: 0 } }}
              className="mt-6 max-w-xl text-base leading-[1.6] text-brand-earth sm:text-lg"
            >
              Across villages and city edges, children are still fighting for basics most of us take for granted.
              Together, we can turn fragile beginnings into lifelong possibility.
            </motion.p>
            <motion.div
              variants={{ hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 }, show: { opacity: 1, y: 0 } }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link href="/donate" className="inline-flex min-h-11 items-center border border-brand-ember bg-brand-ember px-6 py-3 font-semibold text-brand-cream transition hover:bg-brand-gold hover:text-brand-forest">
                Start Giving
              </Link>
              <Link href="/impact" className="inline-flex min-h-11 items-center border border-brand-forest px-6 py-3 font-semibold text-brand-forest transition hover:bg-brand-forest hover:text-brand-cream">
                See Our Work
              </Link>
            </motion.div>
          </motion.div>

          <motion.div style={{ y: parallaxY }} className="relative h-[460px] lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="absolute left-2 top-4 w-[58%] -rotate-6 overflow-hidden border-4 border-brand-cream shadow-2xl">
              <Image src={programs[0].gallery[0].src} alt={programs[0].gallery[0].alt} width={600} height={780} className="h-[250px] w-full object-cover sm:h-[290px]" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="absolute right-2 top-16 w-[52%] rotate-6 overflow-hidden border-4 border-brand-cream shadow-2xl">
              <Image src={programs[1].gallery[0].src} alt={programs[1].gallery[0].alt} width={540} height={720} className="h-[230px] w-full object-cover sm:h-[270px]" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16 }} className="absolute bottom-8 left-1/2 w-[62%] -translate-x-1/2 -rotate-2 overflow-hidden border-4 border-brand-cream shadow-2xl">
              <Image src={programs[2].gallery[0].src} alt={programs[2].gallery[0].alt} width={760} height={520} className="h-[200px] w-full object-cover sm:h-[220px]" />
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="absolute left-0 top-0 border border-white/30 bg-[var(--glass-bg)] px-4 py-3 text-brand-forest shadow-xl" style={{ backdropFilter: "var(--glass-blur)" }}>
              <p className="font-mono text-sm">47,000 Children</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="absolute bottom-2 right-3 border border-white/30 bg-[var(--glass-bg)] px-4 py-3 text-brand-forest shadow-xl" style={{ backdropFilter: "var(--glass-blur)" }}>
              <p className="font-mono text-sm">8 Years of Impact</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-brand-charcoal py-3" aria-label="Trust areas">
        <div className="marquee whitespace-nowrap">
          <div className="marquee-track font-mono text-sm uppercase tracking-[0.18em] text-brand-gold">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="mx-6">
                Education / Healthcare / Nutrition / Empowerment / 47K+ Lives
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10">
        <div className="mx-auto grid w-full max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <CounterStat value={item.value} suffix={item.suffix} label={item.label} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-5 py-12 md:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <motion.h2 initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-4xl leading-[1.2] text-brand-forest">
            Where Your Support Goes
          </motion.h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-2">
            {programs.map((program, index) => {
              const layout = [
                "md:col-span-4 md:row-span-1 h-[320px]",
                "md:col-span-2 md:row-span-1 h-[320px]",
                "md:col-span-2 md:row-span-1 h-[260px]",
                "md:col-span-4 md:row-span-1 h-[260px]",
              ][index];

              return (
                <motion.article
                  key={program.id}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                  className={`group relative overflow-hidden shadow-[0_12px_30px_var(--shadow-soft)] transition-shadow hover:shadow-[0_18px_44px_var(--shadow-hover)] ${layout}`}
                >
                  <Image src={program.heroImage} alt={program.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10 transition group-hover:from-black/80" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-brand-cream">
                    <p className="font-display text-3xl leading-[1.2]">{program.title}</p>
                    <p className="mt-1 text-sm text-brand-cream/85">{program.stats[0]?.value} impacted</p>
                    <Link href={`/programs/${program.slug}`} className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold">
                      Learn More
                      <ArrowRight className="h-4 w-4 translate-x-0 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-forest px-5 py-16 md:px-10">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-[380px] overflow-hidden shadow-[0_20px_50px_var(--shadow-strong)]">
            <Image src={programs[0].heroImage} alt="Featured child story" fill className="object-cover" />
          </motion.div>
          <motion.article initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col justify-center text-brand-cream">
            <h3 className="font-display text-4xl italic leading-[1.2]">One Story Can Rewrite a Generation</h3>
            <div className="relative mt-6 border-l-2 border-brand-gold pl-6">
              <span className="absolute -left-1 top-[-14px] font-display text-6xl text-brand-gold">"</span>
              <p className="text-lg leading-[1.6]">
                {story.childName}, age {story.age}, once faced {story.before.toLowerCase()} Today, {story.after.toLowerCase()}
              </p>
            </div>
            <Link href="/about" className="mt-8 inline-flex min-h-11 w-fit items-center border border-brand-gold px-5 py-3 font-semibold text-brand-gold transition hover:bg-brand-gold hover:text-brand-forest">
              Read More Stories
            </Link>
          </motion.article>
        </div>
      </section>

      <section className="bg-gradient-to-br from-brand-ember/20 via-brand-gold/20 to-brand-cream px-5 py-20 md:px-10">
        <motion.div initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <h3 className="font-display text-4xl leading-[1.2] text-brand-earth">Change a Life Today</h3>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {[500, 1000, 2500].map((amount) => (
              <Link key={amount} href={`/donate?amount=${amount}`} className="inline-flex min-h-11 items-center border border-brand-ember bg-brand-cream px-6 py-3 font-mono text-lg text-brand-ember transition hover:bg-brand-ember hover:text-brand-cream">
                <span aria-hidden="true">&#8377;</span>
                {amount}
              </Link>
            ))}
          </div>
          <Link href="/donate" className="mt-5 text-sm font-semibold text-brand-forest underline underline-offset-4">
            Custom amount
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
