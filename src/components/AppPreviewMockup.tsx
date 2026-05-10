"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SIDEBAR_ITEMS = ["Dashboard", "Projects", "Messages", "Calendar", "Actions"];

const PROJECTS = [
  { name: "Apollo", pct: 72, tagColor: "#2D5A9E", tagBg: "#DDE7F4" },
  { name: "Pricing V2", pct: 48, tagColor: "#8A5A1E", tagBg: "#F4E6CD" },
  { name: "Design System", pct: 91, tagColor: "#2F6B45", tagBg: "#DCEBE0" },
];

const TASKS = [
  { text: "Review site safety protocols", dot: "#9B3838" },
  { text: "Approve Q4 resource allocation", dot: "#2D5A9E" },
  { text: "Draft client feedback response", dot: "#2F6B45" },
];

type FollowUpKind = "Risk" | "Draft" | "Brief";

type FollowUp = {
  tag: FollowUpKind;
  text: string;
  tagColor: string;
  tagBg: string;
};

const FOLLOW_UP_POOL: FollowUp[] = [
  { tag: "Risk", text: "Auth migration · 4d slip", tagColor: "#9B3838", tagBg: "#F2DEDE" },
  { tag: "Draft", text: "Reply to Hannah's spec", tagColor: "#2D5A9E", tagBg: "#DDE7F4" },
  { tag: "Brief", text: "Q2 retro · 6 bullets", tagColor: "#455E6A", tagBg: "#DCEBE0" },
  { tag: "Risk", text: "Stripe webhook · still failing", tagColor: "#9B3838", tagBg: "#F2DEDE" },
  { tag: "Draft", text: "Investor update · Friday 4pm", tagColor: "#2D5A9E", tagBg: "#DDE7F4" },
  { tag: "Brief", text: "Onboarding flow · 9 issues", tagColor: "#455E6A", tagBg: "#DCEBE0" },
  { tag: "Risk", text: "GDPR docs · legal review late", tagColor: "#9B3838", tagBg: "#F2DEDE" },
  { tag: "Brief", text: "Customer call · 4 themes", tagColor: "#455E6A", tagBg: "#DCEBE0" },
  { tag: "Draft", text: "Roadmap · ready for Mon", tagColor: "#2D5A9E", tagBg: "#DDE7F4" },
];

type LiveItem = FollowUp & { id: string };

function CountUp({ value }: { value: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const dur = 1500;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return (
    <p className="text-[#16242E] text-[12px] font-semibold font-mono tracking-[-0.37px] tabular-nums">
      {n}%
    </p>
  );
}

export default function AppPreviewMockup() {
  const [items, setItems] = useState<LiveItem[]>(() =>
    FOLLOW_UP_POOL.slice(0, 3).map((it, i) => ({ ...it, id: `init-${i}` }))
  );

  useEffect(() => {
    let counter = 3;
    const id = setInterval(() => {
      const next = FOLLOW_UP_POOL[counter % FOLLOW_UP_POOL.length];
      const newItem: LiveItem = { ...next, id: `live-${counter}` };
      setItems((prev) => [newItem, ...prev.slice(0, 2)]);
      counter += 1;
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="w-full max-w-[1054px] mx-auto mt-10 sm:mt-12"
      initial={{ opacity: 0, y: 36, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="bg-[#F8FAFB] rounded-[20px] overflow-hidden"
        style={{
          boxShadow:
            "0px 5px 8px rgba(22,36,46,0.06), 0px 32px 42px rgba(22,36,46,0.1)",
        }}
      >
        {/* Browser chrome */}
        <div className="px-[12px] pt-[9px] pb-[5px] flex items-center gap-[15px]">
          <div className="flex gap-[5px] shrink-0">
            <div className="w-[9px] h-[9px] rounded-full bg-[#9B3838] opacity-60" />
            <div className="w-[9px] h-[9px] rounded-full bg-[#8A5A1E] opacity-60" />
            <div className="w-[9px] h-[9px] rounded-full bg-[#2F6B45] opacity-60" />
          </div>
          <div className="flex-1 bg-white rounded-[16px] px-[12px] py-[3px]">
            <span className="text-[#94A0AA] text-[12px] font-mono tracking-[-0.28px]">
              plinq.app/personal
            </span>
          </div>
        </div>

        {/* Inner panel */}
        <div className="bg-white rounded-[10px] mx-[8px] mb-[8px] relative">
          <div className="flex p-[16px] gap-[6px] min-h-[260px]">
            {/* Sidebar */}
            <div className="hidden sm:flex flex-col gap-[5px] w-[180px] shrink-0 pt-[2px]">
              <p className="text-[#6B7B86] text-[8px] tracking-[1.5px] uppercase font-medium font-display px-[10px] mb-[2px]">
                Project Space
              </p>
              {SIDEBAR_ITEMS.map((item, i) => (
                <motion.div
                  key={item}
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.18 }}
                  className={`flex items-center gap-[10px] px-[10px] py-[5px] rounded-[5px] cursor-default ${
                    i === 0 ? "bg-[#F8FAFB]" : ""
                  }`}
                >
                  <div className="w-[9px] h-[9px] bg-[#EEF1F4] rounded-[2px] shrink-0" />
                  <span
                    className={`text-[10px] font-display ${
                      i === 0
                        ? "text-[#16242E] font-semibold"
                        : "text-[#6B7B86]"
                    }`}
                  >
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Active Projects */}
              <p className="text-[#2D5A9E] text-[8px] tracking-[1.5px] uppercase font-medium font-display mb-[10px]">
                Active Projects
              </p>
              <div className="grid grid-cols-3 gap-[5px]">
                {PROJECTS.map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                    whileHover={{ y: -2 }}
                    className="bg-[#F8F9FA] rounded-[10px] px-[12px] py-[9px] flex flex-col gap-[5px] cursor-default"
                  >
                    <span
                      className="self-start text-[8px] font-semibold font-display tracking-[1px] uppercase px-[6px] py-[1px]"
                      style={{ color: p.tagColor, backgroundColor: p.tagBg }}
                    >
                      Exec
                    </span>
                    <p className="text-[#16242E] text-[10px] font-semibold font-display leading-tight">
                      {p.name}
                    </p>
                    <CountUp value={p.pct} />
                  </motion.div>
                ))}
              </div>

              {/* Pending Tasks */}
              <p className="text-[#8A5A1E] text-[8px] tracking-[1.5px] uppercase font-medium font-display mt-[18px] mb-[8px]">
                Pending tasks
              </p>
              <div className="flex flex-col gap-[5px]">
                {TASKS.map((t, i) => (
                  <motion.div
                    key={t.text}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    whileHover={{ x: 3 }}
                    className="bg-[#F8F9FA] flex items-center justify-between px-[10px] py-[6px] rounded-[5px] cursor-default"
                  >
                    <div className="flex items-center gap-[8px] min-w-0">
                      <div className="w-[12px] h-[12px] bg-white border border-[#EBEFF2] rounded-[2px] shrink-0" />
                      <span className="text-[#2B3A45] text-[10px] font-display truncate">
                        {t.text}
                      </span>
                    </div>
                    <div
                      className="w-[6px] h-[6px] rounded-[2px] shrink-0 animate-pulse-glow"
                      style={{ backgroundColor: t.dot }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* AI Follow-up panel — LIVE */}
            <div
              className="hidden md:flex flex-col gap-[8px] w-[200px] shrink-0 px-[11px] pt-[11px] pb-[16px] rounded-[26px] relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(164.78deg, #2E434E 0%, #1F2F38 100%)",
              }}
            >
              <div
                className="absolute inset-0 opacity-40 pointer-events-none animate-blob-slow"
                style={{
                  background:
                    "radial-gradient(circle at 30% 20%, rgba(45,90,158,0.45) 0%, transparent 55%)",
                  mixBlendMode: "screen",
                }}
              />

              <div className="relative flex items-center gap-[5px]">
                <div className="w-[16px] h-[16px] rounded-[5px] bg-white/15 flex items-center justify-center animate-sparkle">
                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M6 0L7.4 4.6L12 6L7.4 7.4L6 12L4.6 7.4L0 6L4.6 4.6L6 0Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <span className="text-white text-[12px] font-semibold font-display">
                  AI Follow-up
                </span>
                <span className="ml-auto flex items-center gap-[3px]">
                  <span className="w-[5px] h-[5px] rounded-full bg-[#7BCB94] animate-pulse-glow" />
                  <span className="text-white/45 text-[7.5px] font-semibold uppercase tracking-[0.8px]">
                    Live
                  </span>
                </span>
              </div>
              <p className="relative text-[#B5C2CC] text-[8px] font-display leading-snug mb-[2px]">
                I read 14 messages and 3 transcripts this morning.
              </p>
              <div className="relative flex flex-col gap-[8px]">
                <AnimatePresence mode="popLayout" initial={false}>
                  {items.map((f) => (
                    <motion.div
                      key={f.id}
                      layout
                      initial={{ opacity: 0, y: -18, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 18, scale: 0.94 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="bg-white/[0.08] rounded-[5px] p-[7px] flex flex-col gap-[5px]"
                    >
                      <span
                        className="self-start text-[8px] font-semibold font-display tracking-[1.5px] uppercase px-[3px] py-[1px]"
                        style={{ color: f.tagColor, backgroundColor: f.tagBg }}
                      >
                        {f.tag}
                      </span>
                      <p className="text-white text-[10px] font-display">
                        {f.text}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
