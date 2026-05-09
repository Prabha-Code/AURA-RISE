"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "framer-motion";
import { faqItems, galleryImages, stats, team, testimonials } from "@/lib/data";

function CountUp({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (shouldReduceMotion) {
      setCount(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate(latest) {
        setCount(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [inView, shouldReduceMotion, value]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-mono text-4xl text-brand-gold sm:text-5xl">
        {count.toLocaleString()}
        {suffix ?? ""}
      </p>
      <p className="mt-2 text-sm text-brand-cream/80">{label}</p>
    </div>
  );
}

const milestones = [
  {
    year: "2016",
    title: "A Small Beginning",
    description:
      "Aura Rise began as a weekend volunteer effort in two villages. A handful of mentors started literacy circles under open sky classrooms.",
  },
  {
    year: "2018",
    title: "Nutrition at Scale",
    description:
      "After seeing hunger disrupt learning, we launched community nutrition hubs. Local mothers led kitchen and growth-monitoring initiatives.",
  },
  {
    year: "2021",
    title: "Integrated Health Outreach",
    description:
      "Mobile clinics and tele-consult pathways expanded child care access. Preventive screenings became a regular part of community life.",
  },
  {
    year: "2024",
    title: "Community-Led Impact",
    description:
      "Programs matured into community-owned systems with measurable outcomes. Youth leaders and caregivers now co-design local solutions.",
  },
];

export default function AboutPageClient() {
  const shouldReduceMotion = useReducedMotion();
  const [slide, setSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [volunteerSent, setVolunteerSent] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((s) => (s + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const visibleTestimonials = [
    testimonials[slide % testimonials.length],
    testimonials[(slide + 1) % testimonials.length],
    testimonials[(slide + 2) % testimonials.length],
  ];

  const onVolunteerSubmit = (e: FormEvent) => {
    e.preventDefault();
    setVolunteerSent(true);
    window.setTimeout(() => setVolunteerSent(false), 3000);
  };

  return (
    <main className="overflow-x-hidden">
      <section className="relative bg-brand-forest px-5 py-24 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <p className="max-w-4xl font-display text-4xl italic leading-[1.2] text-brand-cream sm:text-5xl">
            We believe no child should suffer simply because of where they were born.
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-brand-gold">Founder, Aura Rise Foundation</p>
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-70">
          {[...Array(24)].map((_, i) => (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-brand-gold"
              style={{
                left: `${(i * 19) % 100}%`,
                top: `${(i * 37) % 100}%`,
                animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </section>

      <section className="px-5 py-16 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="font-display text-4xl leading-[1.2] text-brand-forest">Our Story</h2>
          <div className="relative mt-10">
            <div className="absolute left-1/2 top-0 hidden h-full w-px bg-brand-ember/40 md:block" />
            <div className="space-y-8">
              {milestones.map((milestone, i) => (
                <motion.article
                  key={milestone.year}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  className={`relative md:grid md:grid-cols-2 md:gap-10 ${i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}
                >
                  <div className="rounded border border-brand-earth/20 bg-white p-5 shadow-[0_12px_34px_var(--shadow-card)] transition-shadow hover:shadow-[0_18px_44px_var(--shadow-hover)]">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-ember">{milestone.year}</p>
                    <p className="mt-2 font-display text-3xl leading-[1.2] text-brand-forest">{milestone.title}</p>
                    <p className="mt-2 leading-[1.6] text-brand-earth">{milestone.description}</p>
                  </div>
                  <div className="hidden md:block" />
                  <span className="absolute left-1/2 top-8 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-brand-gold md:block" />
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-charcoal px-5 py-16 md:px-10">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s) => (
            <CountUp key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </section>

      <section className="px-5 py-16 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="font-display text-4xl leading-[1.2] text-brand-forest">Meet The Team</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {team.map((member, idx) => (
              <div key={member.name} className="group [perspective:1000px]">
                <div className="relative h-[300px] transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  <div className="absolute inset-0 border border-brand-earth/20 bg-white p-4 shadow-[0_12px_34px_var(--shadow-card)] [backface-visibility:hidden]">
                    <Image src={member.image} alt={member.name} width={120} height={120} className="mx-auto h-24 w-24 rounded-full object-cover" />
                    <p className="mt-4 text-center font-display text-xl leading-[1.2] text-brand-forest">{member.name}</p>
                    <p className="mt-1 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-brand-ember">{member.role}</p>
                    <p className="mt-3 line-clamp-2 text-center text-sm leading-[1.6] text-brand-earth">{member.bio}</p>
                  </div>
                  <div className="absolute inset-0 border border-brand-gold/40 bg-brand-forest p-5 text-brand-cream [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <p className="font-display text-xl leading-[1.2]">Why I serve</p>
                    <p className="mt-3 text-sm leading-[1.6]">
                      "{idx % 2 === 0 ? "Every child deserves dignity, not chance." : "Service is how we turn empathy into action."}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream px-5 py-16 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="font-display text-4xl leading-[1.2] text-brand-forest">Voices From The Ground</h2>
          <div className="mt-8 overflow-x-auto md:overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide}
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -24 }}
                className="grid min-w-[960px] gap-4 md:min-w-0 md:grid-cols-3"
              >
                {visibleTestimonials.map((item) => (
                  <article key={`${item.name}-${item.quote}`} className="border border-brand-earth/15 bg-white p-5 shadow-[0_12px_34px_var(--shadow-card)] transition-shadow hover:shadow-[0_18px_44px_var(--shadow-hover)]">
                    <p className="font-display text-5xl leading-none text-brand-gold">"</p>
                    <p className="mt-2 text-sm leading-[1.6] text-brand-earth">{item.quote}</p>
                    <div className="mt-4 flex items-center gap-3">
                      <Image src={item.avatar} alt={item.name} width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold text-brand-charcoal">{item.name}</p>
                        <p className="text-xs text-brand-earth">{item.location}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-5 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`h-3 w-3 rounded-full ${slide === i ? "bg-brand-ember" : "bg-brand-earth/30"}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="font-display text-4xl leading-[1.2] text-brand-forest">Moments of Change</h2>
          <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {galleryImages.map((img) => (
              <div key={img.src} className="group relative mb-4 overflow-hidden shadow-[0_12px_34px_var(--shadow-card)]">
                <Image src={img.src} alt={img.alt} width={900} height={700} className="h-auto w-full transition duration-500 group-hover:scale-105" />
                <span className="absolute bottom-2 left-2 bg-brand-forest/80 px-2 py-1 text-xs text-brand-cream">{img.program}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:px-10">
        <div className="mx-auto w-full max-w-4xl">
          <h2 className="font-display text-4xl leading-[1.2] text-brand-forest">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-2">
            {faqItems.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={item.question} className={`border ${open ? "border-brand-ember" : "border-brand-earth/20"}`}>
                  <button onClick={() => setOpenFaq(open ? null : i)} className="flex min-h-11 w-full items-center justify-between px-4 py-3 text-left">
                    <span className={`font-medium ${open ? "text-brand-ember" : "text-brand-charcoal"}`}>{item.question}</span>
                    <span className="text-brand-ember">{open ? "-" : "+"}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-sm leading-[1.6] text-brand-earth">{item.answer}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="volunteer" className="bg-brand-sage px-5 py-16 md:px-10">
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl leading-[1.2] text-brand-cream">Volunteer With Us</h2>
            <form onSubmit={onVolunteerSubmit} className="mt-5 space-y-3">
              <input placeholder="Name" required className="w-full border border-brand-cream/30 bg-brand-cream/10 px-4 py-3 text-brand-cream placeholder:text-brand-cream/70" />
              <input type="email" placeholder="Email" required className="w-full border border-brand-cream/30 bg-brand-cream/10 px-4 py-3 text-brand-cream placeholder:text-brand-cream/70" />
              <select required className="w-full border border-brand-cream/30 bg-brand-cream/10 px-4 py-3 text-brand-cream">
                <option value="">Select skills</option>
                <option>Teaching and Mentoring</option>
                <option>Healthcare Support</option>
                <option>Community Outreach</option>
                <option>Media and Storytelling</option>
              </select>
              <textarea placeholder="Message" rows={4} className="w-full border border-brand-cream/30 bg-brand-cream/10 px-4 py-3 text-brand-cream placeholder:text-brand-cream/70" />
              <button className="inline-flex min-h-11 items-center border border-brand-cream bg-brand-cream px-5 py-3 font-semibold text-brand-sage">Submit</button>
            </form>
            <AnimatePresence>
              {volunteerSent ? (
                <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-3 text-sm text-brand-cream">
                  Thanks for stepping up. Our team will contact you soon.
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
          <div className="text-brand-cream">
            <h3 className="font-display text-3xl leading-[1.2]">Why Volunteer</h3>
            <ul className="mt-4 space-y-3 text-sm leading-[1.6]">
              <li>Work directly with communities and see impact unfold in real time.</li>
              <li>Contribute your professional skills to meaningful, measurable outcomes.</li>
              <li>Join a compassionate network committed to child dignity and equity.</li>
              <li>Grow as a leader while helping young people discover their potential.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
