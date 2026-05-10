"use client";

import { motion, type Variants, useInView } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

/* ────────── Animation primitives ────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const viewportConfig = { once: true, amount: 0.2 } as const;

/* ────────── Atoms ────────── */

function Eyebrow({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className={`text-[11px] font-semibold tracking-[2px] uppercase mb-4 ${
        dark ? "text-[#5B7FB6]" : "text-[#2D5A9E]"
      }`}
    >
      {children}
    </p>
  );
}

function SectionHeading({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <h2
      className={`text-3xl sm:text-4xl md:text-[44px] md:leading-[52px] font-medium ${
        light ? "text-white" : "text-[#16242E]"
      }`}
      style={{ fontFamily: "Metropolis, Inter, sans-serif" }}
    >
      {children}
    </h2>
  );
}

function HighlightItalic({
  children,
  color = "#2D5A9E",
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <em
      className="not-italic italic"
      style={{
        fontFamily: "Metropolis, Inter, sans-serif",
        fontStyle: "italic",
        color,
      }}
    >
      {children}
    </em>
  );
}

function SectionDescription({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`text-base sm:text-lg leading-relaxed mt-6 ${
        light ? "text-[#94A0AA]" : "text-[#6B7B86]"
      }`}
    >
      {children}
    </p>
  );
}

/* ────────── Motion helpers ────────── */

function SectionIntro({
  eyebrow,
  heading,
  description,
  light = false,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  description: ReactNode;
  light?: boolean;
}) {
  return (
    <motion.div
      className="text-center max-w-[720px] mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={stagger}
    >
      <motion.div variants={fadeUp}>
        <Eyebrow dark={light}>{eyebrow}</Eyebrow>
      </motion.div>
      <motion.div variants={fadeUp}>
        <SectionHeading light={light}>{heading}</SectionHeading>
      </motion.div>
      <motion.div variants={fadeUp}>
        <SectionDescription light={light}>{description}</SectionDescription>
      </motion.div>
    </motion.div>
  );
}

function MotionGrid({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={stagger}
    >
      {children}
    </motion.div>
  );
}

/* ────────── Section 0a · Scene (emotional hook) ────────── */

function SceneSection() {
  const meetings = [
    {
      day: "Tue",
      time: "9:00 AM",
      name: "Standup",
      flag: "Auth deadline?",
      tag: "First raised",
      tagShow: false,
    },
    {
      day: "Wed",
      time: "3:00 PM",
      name: "Engineering Review",
      flag: "Auth deadline?",
      tag: "Same blocker",
      tagShow: true,
    },
    {
      day: "Fri",
      time: "4:00 PM",
      name: "Sprint Retro",
      flag: "Auth — no owner",
      tag: "Still nothing",
      tagShow: true,
    },
  ];

  return (
    <section className="bg-white px-6 sm:px-10 py-20 sm:py-28">
      <div className="max-w-[1100px] mx-auto">
        <SectionIntro
          eyebrow="If you've been there"
          heading={
            <>
              Same blocker,{" "}
              <HighlightItalic>three</HighlightItalic> meetings.{" "}
              <br className="hidden sm:block" />
              Still no owner.
            </>
          }
          description={
            <>
              Tuesday standup → Wednesday review → Friday retro. The same item
              has been &ldquo;discussed&rdquo; in four places — and done in
              none.
            </>
          }
        />

        <div className="mt-14 sm:mt-16 relative">
          <div
            className="hidden md:block absolute top-[60%] left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-[#9B3838]/40 to-transparent"
            aria-hidden
          />
          <MotionGrid className="grid grid-cols-1 md:grid-cols-3 gap-3 relative">
            {meetings.map((m, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="relative bg-white border border-[#E6EAEE] rounded-2xl p-5 shadow-[0_2px_12px_rgba(22,36,46,0.04)]"
              >
                {m.tagShow && (
                  <span className="absolute -top-2.5 left-5 bg-[#9B3838] text-white text-[9px] font-bold tracking-[1px] uppercase rounded-full px-2 py-0.5">
                    {m.tag}
                  </span>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#2D5A9E] text-[10px] font-bold tracking-[1.5px] uppercase">
                    {m.day}
                  </span>
                  <span className="text-[#94A0AA] text-[10px] tracking-[1.5px] uppercase">
                    {m.time}
                  </span>
                </div>
                <p
                  className="text-[#16242E] text-[20px] sm:text-[22px] font-medium mb-4 leading-tight"
                  style={{ fontFamily: "Metropolis, Inter, sans-serif" }}
                >
                  {m.name}
                </p>
                <div className="inline-flex items-center gap-1.5 bg-[#F2DEDE] rounded-full px-2.5 py-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9B3838] animate-pulse-glow" />
                  <span className="text-[#9B3838] text-[10px] font-semibold tracking-wide">
                    {m.flag}
                  </span>
                </div>
              </motion.div>
            ))}
          </MotionGrid>
        </div>
      </div>
    </section>
  );
}

/* ────────── Section 0b · The cost (stats) ────────── */

function StatNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1800;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <span ref={ref}>{n}</span>;
}

function StatsSection() {
  const stats = [
    {
      value: 60,
      suffix: "%",
      label:
        "of knowledge workers' time goes to 'work about work' — chasing context, not doing the work.",
      source: "Asana, Anatomy of Work Index",
    },
    {
      value: 209,
      suffix: "h",
      label:
        "lost per worker every year to duplicated effort — the same decisions, in different tools.",
      source: "Asana, Anatomy of Work Index",
    },
    {
      value: 106,
      suffix: "",
      label:
        "SaaS apps in the average company's stack — most never talk to each other.",
      source: "BetterCloud, State of SaaS 2025",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#16242E] px-6 sm:px-10 py-20 sm:py-28">
      <div
        className="absolute top-[-10%] left-[15%] w-[60%] h-[60%] rounded-[40%] opacity-30 pointer-events-none animate-blob-slow"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(45,90,158,0.5) 0%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute bottom-[-15%] right-[-5%] w-[45%] h-[55%] rounded-[40%] opacity-20 pointer-events-none animate-blob-slower"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(155,56,56,0.45) 0%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      <div className="relative max-w-[1100px] mx-auto">
        <SectionIntro
          light
          eyebrow="The cost"
          heading={
            <>
              Lost decisions{" "}
              <HighlightItalic color="#5B7FB6">add up</HighlightItalic> —
              fast.
            </>
          }
          description={
            <>
              The economics of &ldquo;we&apos;ll figure it out later&rdquo; —
              quietly bleeding hours every week.
            </>
          }
        />
        <MotionGrid className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14 sm:mt-16">
          {stats.map((s) => (
            <motion.div
              variants={fadeUp}
              key={s.value}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="bg-white/[0.04] border border-white/10 rounded-2xl p-7 backdrop-blur-sm"
            >
              <div className="flex items-baseline gap-1">
                <span
                  className="text-white text-[64px] sm:text-[72px] leading-none font-semibold tabular-nums"
                  style={{ fontFamily: "Metropolis, Inter, sans-serif" }}
                >
                  <StatNumber value={s.value} />
                </span>
                <span
                  className="text-[#5B7FB6] text-[40px] font-semibold"
                  style={{ fontFamily: "Metropolis, Inter, sans-serif" }}
                >
                  {s.suffix}
                </span>
              </div>
              <p className="text-[#94A0AA] text-[14px] leading-relaxed mt-4">
                {s.label}
              </p>
            </motion.div>
          ))}
        </MotionGrid>
        <p className="text-[#6B7B86] text-[11px] mt-10 text-center">
          Sources · Asana Anatomy of Work Index · BetterCloud State of SaaS 2025
        </p>
      </div>
    </section>
  );
}

/* ────────── Section 1 · The problem ────────── */

function ProblemSection() {
  const fragmented = [
    { name: "Zoom AI", caption: "Transcribes" },
    { name: "Google Meet", caption: "Records" },
    { name: "Notion AI", caption: "Summarizes" },
    { name: "Slack", caption: "Archives" },
  ];

  return (
    <section className="bg-[#F8F9FA] border-t border-[#E6EAEE] px-6 sm:px-10 py-20 sm:py-28">
      <div className="max-w-[1100px] mx-auto">
        <SectionIntro
          eyebrow="The problem"
          heading={
            <>
              Your meetings end. <br className="hidden sm:block" />
              Your <HighlightItalic>work </HighlightItalic> doesn&apos;t start.
            </>
          }
          description={
            <>
              Every tool transcribes, summarizes, or archives. None of them finish
              what was decided — so the same blocker shows up in three meetings,
              and nobody owns it.
            </>
          }
        />

        <div className="mt-14 sm:mt-16">
          <MotionGrid className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {fragmented.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-white border border-[#E6EAEE] rounded-2xl p-5 text-center"
              >
                <p className="text-[#16242E] text-sm font-semibold">{t.name}</p>
                <p className="text-[#94A0AA] text-xs mt-1">{t.caption}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 bg-[#F2DEDE] rounded-full px-2.5 py-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9B3838] animate-pulse-glow" />
                  <span className="text-[#9B3838] text-[10px] font-semibold tracking-wide uppercase">
                    not shipped
                  </span>
                </div>
              </motion.div>
            ))}
          </MotionGrid>

          <div className="flex justify-center my-3 h-12">
            <motion.div
              className="w-px bg-gradient-to-b from-[#E6EAEE] to-[#94A0AA] origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              style={{ height: "100%" }}
            />
          </div>

          <motion.div
            className="bg-gradient-to-br from-[#2E434E] to-[#1F2F38] rounded-2xl p-7 sm:p-8 text-center shadow-[0_8px_40px_rgba(31,47,56,0.25)]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            <p className="text-white text-base font-semibold tracking-tight">
              plinq
            </p>
            <p className="text-[#DDE7F4]/80 text-xs mt-1.5">
              Reads, reconciles, and ships what was decided.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 bg-[#2F6B45]/25 border border-[#2F6B45]/40 rounded-full px-3 py-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#7BCB94] animate-pulse-glow" />
              <span className="text-[#DCEBE0] text-[10px] font-semibold tracking-wide uppercase">
                decisions → shipped work
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ────────── Section 2 · How it works ────────── */

function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Listen",
      summary: "Joins your meetings — Zoom, Meet, Teams.",
      detail:
        "Captures decisions, blockers, owners, and deadlines. Knows the difference between a passing comment and a real commitment.",
    },
    {
      num: "02",
      title: "Reconcile",
      summary: "Cross-checks every meeting against your roadmap.",
      detail:
        "Surfaces conflicts. Flags stale tasks. Connects today's discussion to yesterday's decision and last sprint's commitment.",
    },
    {
      num: "03",
      title: "Ship",
      summary: "Tells you exactly what to do today.",
      detail:
        "A morning brief: what to send, what to push back on, what to wait on. Auto-creates tasks in your project space.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1F2F38] to-[#2E434E] px-6 sm:px-10 py-20 sm:py-28">
      <div
        className="absolute top-[-15%] right-[-10%] w-[55%] h-[60%] rounded-[40%] opacity-30 pointer-events-none animate-blob-slow"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(45, 90, 158, 0.6) 0%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute bottom-[-15%] left-[-10%] w-[45%] h-[50%] rounded-[40%] opacity-20 pointer-events-none animate-blob-slower"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(120, 80, 180, 0.5) 0%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      <div className="relative max-w-[1100px] mx-auto">
        <SectionIntro
          light
          eyebrow="How it works"
          heading={
            <>
              Listen. Reconcile.{" "}
              <HighlightItalic color="#5B7FB6">Ship.</HighlightItalic>
            </>
          }
          description={
            <>
              Three steps that turn every meeting into shipped work — without
              changing how you run them.
            </>
          }
        />

        <MotionGrid className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14 sm:mt-16">
          {steps.map((s) => (
            <motion.div
              key={s.num}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 flex flex-col gap-4 hover:bg-white/[0.08] hover:border-white/20"
            >
              <div className="flex items-center justify-between">
                <span className="text-[#5B7FB6] text-xs font-semibold tracking-[2px]">
                  {s.num}
                </span>
                <motion.div
                  className="h-px bg-[#5B7FB6]/40 origin-right"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
                  style={{ width: 40 }}
                />
              </div>
              <h3
                className="text-white text-2xl font-medium"
                style={{ fontFamily: "Metropolis, Inter, sans-serif" }}
              >
                {s.title}
              </h3>
              <p className="text-[#DDE7F4] text-sm font-semibold">{s.summary}</p>
              <p className="text-[#94A0AA] text-sm leading-relaxed">{s.detail}</p>
            </motion.div>
          ))}
        </MotionGrid>
      </div>
    </section>
  );
}

/* ────────── Section 3 · Features ────────── */

function FollowUpVisual() {
  const items = [
    { tag: "Risk", text: "Auth migration · 4d slip", color: "#9B3838", bg: "#F2DEDE" },
    { tag: "Draft", text: "Reply to Hannah's spec", color: "#2D5A9E", bg: "#DDE7F4" },
    { tag: "Brief", text: "Q2 retro · 6 bullets", color: "#455E6A", bg: "#DCEBE0" },
  ];
  return (
    <div className="w-full max-w-[260px] bg-[#1F2F38] rounded-xl p-3.5 flex flex-col gap-3 shadow-[0_4px_20px_rgba(31,47,56,0.2)]">
      <div className="flex items-center gap-1.5">
        <div className="w-4 h-4 rounded bg-[#2D5A9E] flex items-center justify-center">
          <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 0L7.4 4.6L12 6L7.4 7.4L6 12L4.6 7.4L0 6L4.6 4.6L6 0Z"
              fill="white"
            />
          </svg>
        </div>
        <span className="text-white text-[10px] font-semibold">AI Follow-up</span>
      </div>
      {items.map((it, i) => (
        <motion.div
          key={it.tag}
          className="flex flex-col gap-1"
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 + i * 0.12 }}
        >
          <span
            className="self-start text-[8px] font-bold tracking-[0.5px] rounded px-1.5 py-0.5 uppercase"
            style={{ color: it.color, backgroundColor: it.bg }}
          >
            {it.tag}
          </span>
          <p className="text-[9.5px] text-white/85 leading-snug">{it.text}</p>
        </motion.div>
      ))}
    </div>
  );
}

function ProjectVisual() {
  const projects = [
    { name: "Apollo", pct: 72, color: "#2D5A9E", bg: "#DDE7F4" },
    { name: "Pricing V2", pct: 48, color: "#8A5A1E", bg: "#F4E6CD" },
    { name: "Design System", pct: 91, color: "#2F6B45", bg: "#DCEBE0" },
  ];
  return (
    <div className="w-full max-w-[260px] flex flex-col gap-2">
      {projects.map((p) => (
        <div
          key={p.name}
          className="bg-[#F4F6F8] rounded-lg border border-[#E6EAEE] p-2.5"
        >
          <span
            className="inline-block text-[8px] font-bold tracking-[0.5px] rounded px-1.5 py-0.5 mb-1.5 uppercase"
            style={{ color: p.color, backgroundColor: p.bg }}
          >
            Exec
          </span>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-[#16242E]">
              {p.name}
            </span>
            <span className="text-[11px] font-bold text-[#16242E]">
              {p.pct}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ConversationVisual() {
  return (
    <div className="w-full max-w-[280px] flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-sm bg-[#2D5A9E]" />
        <span className="text-[9px] text-[#6B7B86] font-semibold tracking-wide uppercase">
          #apollo · Engineering
        </span>
      </div>
      <motion.div
        className="bg-[#F4F6F8] rounded-md px-2.5 py-1.5 max-w-[80%]"
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewportConfig}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <p className="text-[8px] text-[#94A0AA] font-semibold mb-0.5">Sarah</p>
        <p className="text-[10px] text-[#16242E] leading-snug">
          Should we ship auth before pricing?
        </p>
      </motion.div>
      <motion.div
        className="bg-[#DDE7F4] rounded-md px-2.5 py-1.5 max-w-[80%] self-end"
        initial={{ opacity: 0, x: 8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewportConfig}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <p className="text-[10px] text-[#2D5A9E] leading-snug">
          Calling now — joining link below
        </p>
      </motion.div>
      <motion.div
        className="flex items-center gap-1.5 self-end mt-0.5 bg-[#2D5A9E] rounded-md px-2 py-1"
        initial={{ opacity: 0, y: 4 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportConfig}
        transition={{ duration: 0.4, delay: 0.55 }}
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" />
        </svg>
        <span className="text-[9px] text-white font-semibold">Join call</span>
      </motion.div>
    </div>
  );
}

function KnowledgeVisual() {
  const tiers = [
    {
      label: "Org · plinq",
      indent: "ml-0",
      bg: "bg-white",
      border: "border-[#E6EAEE]",
      dot: "bg-[#94A0AA]",
      text: "text-[#6B7B86]",
    },
    {
      label: "Team · Engineering",
      indent: "ml-3",
      bg: "bg-white",
      border: "border-[#E6EAEE]",
      dot: "bg-[#5B7FB6]",
      text: "text-[#6B7B86]",
    },
    {
      label: "Project · Apollo",
      indent: "ml-6",
      bg: "bg-[#DDE7F4]",
      border: "border-[#5B7FB6]/40",
      dot: "bg-[#2D5A9E]",
      text: "text-[#2D5A9E]",
    },
  ];
  return (
    <div className="w-full max-w-[260px] flex flex-col gap-1.5">
      {tiers.map((t, i) => (
        <motion.div
          key={t.label}
          className={`${t.indent} ${t.bg} border ${t.border} rounded-md px-2.5 py-1.5 flex items-center gap-2`}
          initial={{ opacity: 0, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.4, delay: 0.15 + i * 0.12 }}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${t.dot}`} />
          <p
            className={`text-[9px] uppercase tracking-wide font-semibold ${t.text}`}
          >
            {t.label}
          </p>
        </motion.div>
      ))}
      <motion.div
        className="mt-2 bg-[#1F2F38] rounded-md px-2.5 py-2 flex items-center gap-1.5"
        initial={{ opacity: 0, y: 4 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportConfig}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeOpacity="0.6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <span className="text-[9px] text-white/60">
          Why did we pick Q3 for auth?
        </span>
      </motion.div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  visual,
}: {
  title: string;
  description: string;
  visual: ReactNode;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="bg-white border border-[#E6EAEE] rounded-2xl overflow-hidden flex flex-col hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
    >
      <div className="aspect-[16/9] bg-[#F4F6F8] border-b border-[#E6EAEE] p-5 flex items-center justify-center">
        {visual}
      </div>
      <div className="p-6 flex flex-col gap-2">
        <h3
          className="text-[#16242E] text-xl font-medium"
          style={{ fontFamily: "Metropolis, Inter, sans-serif" }}
        >
          {title}
        </h3>
        <p className="text-[#6B7B86] text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

function SolutionSection() {
  return (
    <section
      id="solution"
      className="bg-white px-6 sm:px-10 py-20 sm:py-28 scroll-mt-8"
    >
      <div className="max-w-[1100px] mx-auto">
        <SectionIntro
          eyebrow="Solution"
          heading={
            <>
              Meetings shouldn&apos;t{" "}
              <HighlightItalic>stop</HighlightItalic> when the call ends.
            </>
          }
          description={
            <>
              plinq turns conversation into a single execution system — from
              before the meeting, through every decision, to long after the
              project ends.
            </>
          }
        />

        <MotionGrid className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-14 sm:mt-16">
          <FeatureCard
            title="Conversation, internalized"
            description="Group chat and video calls live inside your project space. Discussions become structured project data the moment they happen — no more switching tabs to find what was decided."
            visual={<ConversationVisual />}
          />
          <FeatureCard
            title="AI meeting automation"
            description="Before · plinq suggests an agenda from open work. During · STT with speaker separation. After · decisions, open questions, and action items extracted into a structured follow-up."
            visual={<FollowUpVisual />}
          />
          <FeatureCard
            title="Decisions become tasks"
            description="Approve an action item once, and plinq creates a task with owner, deadline, and priority — synced across personal and project spaces in real time. Meeting notes become execution data."
            visual={<ProjectVisual />}
          />
          <FeatureCard
            title="Knowledge that compounds"
            description="Every meeting, doc, and decision accumulates in a hierarchy: organization → team → project. An AI agent searches, summarizes, and answers questions across the entire history."
            visual={<KnowledgeVisual />}
          />
        </MotionGrid>
      </div>
    </section>
  );
}

/* ────────── Section 4 · Built for ────────── */

function CapIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10L12 5L2 10L12 15L22 10Z" />
      <path d="M6 12V17C6 17 8.5 19 12 19C15.5 19 18 17 18 17V12" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function FlaskIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 3H15" />
      <path d="M10 3V9.5L4 21H20L14 9.5V3" />
      <path d="M7 16H17" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function SegmentCard({
  icon,
  title,
  description,
  scenario,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  scenario: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="bg-white border border-[#E6EAEE] rounded-2xl p-6 sm:p-7 flex flex-col gap-3 hover:border-[#5B7FB6]/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)]"
    >
      <motion.div
        whileHover={{ rotate: 6, scale: 1.08 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-10 h-10 rounded-xl bg-[#DDE7F4] flex items-center justify-center text-[#2D5A9E]"
      >
        {icon}
      </motion.div>
      <h3
        className="text-[#16242E] text-lg font-medium"
        style={{ fontFamily: "Metropolis, Inter, sans-serif" }}
      >
        {title}
      </h3>
      <p className="text-[#6B7B86] text-sm leading-relaxed">{description}</p>
      <div className="border-t border-[#EBEFF2] pt-3 mt-1">
        <p className="text-[#94A0AA] text-xs leading-relaxed">
          <span className="text-[#2D5A9E] font-semibold">For example, </span>
          {scenario}
        </p>
      </div>
    </motion.div>
  );
}

function BuiltForSection() {
  return (
    <section
      id="built-for"
      className="bg-[#F4F6F8] border-t border-[#E6EAEE] px-6 sm:px-10 py-20 sm:py-28 scroll-mt-8"
    >
      <div className="max-w-[1100px] mx-auto">
        <SectionIntro
          eyebrow="Built for"
          heading={
            <>
              Teams that can&apos;t afford{" "}
              <HighlightItalic>lost decisions.</HighlightItalic>
            </>
          }
          description={
            <>
              From a six-person hackathon team to a research lab juggling four
              grants — plinq is built for groups where every meeting matters.
            </>
          }
        />

        <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14 sm:mt-16">
          <SegmentCard
            icon={<CapIcon />}
            title="Student & comp teams"
            description="Hackathons, capstones, club projects. High velocity, no PM."
            scenario="A six-person NEXT Contest team turns weekly syncs into a real Gantt — without a project manager."
          />
          <SegmentCard
            icon={<TrendIcon />}
            title="Early-stage startups"
            description="Three founders, fifty meetings a week, no time to document."
            scenario="Founders catch the moment a customer interview contradicts last week's roadmap call."
          />
          <SegmentCard
            icon={<FlaskIcon />}
            title="Research labs"
            description="PIs, students, four grants — different timelines, same calendar."
            scenario="A KAIST lab tracks paper deadlines, advisor commitments, and student handoffs in one space."
          />
          <SegmentCard
            icon={<BriefcaseIcon />}
            title="Consulting & ops"
            description="Client calls become decks become billable hours."
            scenario="Strategy consultants turn three discovery calls into a single, owner-tagged plan by Friday."
          />
        </MotionGrid>
      </div>
    </section>
  );
}

/* ────────── Section 5 · CTA ────────── */

function WindowsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M0 2.3L6.5 1.4V7.5H0V2.3ZM7.3 1.3L16 0V7.5H7.3V1.3ZM16 8.5V16L7.3 14.7V8.5H16ZM6.5 14.6L0 13.7V8.5H6.5V14.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="14" height="17" viewBox="0 0 14 17" fill="none">
      <path
        d="M11.5 9C11.5 7.1 13 6.2 13.1 6.1C12 4.5 10.3 4.3 9.7 4.3C8.3 4.2 6.9 5.2 6.2 5.2C5.5 5.2 4.3 4.3 3.1 4.3C1.6 4.4 0.2 5.3 0 7.1C-0.4 10.7 2.2 16.1 3.6 16.1C4.1 16.1 4.8 15.5 5.9 15.5C7 15.5 7.5 16.1 8.3 16.1C9.8 16 11.1 12.2 11.5 9ZM9.3 2.8C10.1 1.8 10.1 0.9 10.1 0.5C9.3 0.5 8.4 1.1 7.9 1.6C7.3 2.2 6.9 3 7 3.8C7.8 3.9 8.6 3.4 9.3 2.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CtaSection() {
  return (
    <section
      className="relative overflow-hidden px-6 sm:px-10 py-20 sm:py-28"
      style={{
        background:
          "linear-gradient(166deg, rgb(46, 67, 78) 0%, rgb(31, 47, 56) 100%)",
      }}
    >
      <div
        className="absolute top-[-20%] right-[-10%] w-[55%] h-[60%] rounded-[40%] opacity-40 pointer-events-none animate-blob-slow"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(45, 90, 158, 0.6) 0%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-[40%] opacity-25 pointer-events-none animate-blob-slower"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(120, 80, 180, 0.5) 0%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      <motion.div
        className="relative max-w-[800px] mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <Eyebrow dark>Ready</Eyebrow>
        </motion.div>
        <motion.div variants={fadeUp}>
          <SectionHeading light>
            Stop summarizing meetings. <br className="hidden sm:block" />
            Start <HighlightItalic color="#5B7FB6">finishing</HighlightItalic>{" "}
            them.
          </SectionHeading>
        </motion.div>
        <motion.p
          variants={fadeUp}
          className="text-[#94A0AA] text-base sm:text-lg leading-relaxed mt-6 mb-10"
        >
          14-day trial · No credit card · Cancel anytime
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2.5 bg-white text-[#16242E] rounded-[5px] px-6 py-3 text-sm font-semibold hover:bg-[#F4F6F8] w-full sm:w-auto justify-center"
          >
            <WindowsIcon />
            Download for Windows
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2.5 bg-white text-[#16242E] rounded-[5px] px-6 py-3 text-sm font-semibold hover:bg-[#F4F6F8] w-full sm:w-auto justify-center"
          >
            <AppleIcon />
            Download for MacOS
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ────────── Export ────────── */

export default function ProductSection() {
  return (
    <div id="product" className="scroll-mt-8">
      <SceneSection />
      <StatsSection />
      <ProblemSection />
      <HowItWorksSection />
      <SolutionSection />
      <BuiltForSection />
      <CtaSection />
    </div>
  );
}
