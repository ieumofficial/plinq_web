import { ReactNode } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Docs · plinq",
  description: "Documentation for plinq — AI follow-up for every meeting.",
};

const SECTIONS = [
  { id: "introduction", title: "Introduction" },
  { id: "quickstart", title: "Quickstart" },
  { id: "core-concepts", title: "Core concepts" },
  { id: "integrations", title: "Integrations" },
  { id: "privacy", title: "Privacy & data" },
  { id: "faq", title: "FAQ" },
];

/* ────────── Atoms ────────── */

function H1({ children }: { children: ReactNode }) {
  return (
    <h2
      className="text-3xl sm:text-4xl font-medium text-[#16242E] mb-4"
      style={{ fontFamily: "Metropolis, Inter, sans-serif" }}
    >
      {children}
    </h2>
  );
}

function H2({ children }: { children: ReactNode }) {
  return (
    <h3
      className="text-xl sm:text-2xl font-medium text-[#16242E] mt-12 mb-3"
      style={{ fontFamily: "Metropolis, Inter, sans-serif" }}
    >
      {children}
    </h3>
  );
}

function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-[15px] leading-[1.75] text-[#3A4A55] mb-4">{children}</p>
  );
}

function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="text-[15px] leading-[1.75] text-[#3A4A55] mb-4 pl-5 list-disc marker:text-[#94A0AA] space-y-1">
      {children}
    </ul>
  );
}

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="bg-[#F4F6F8] border border-[#E6EAEE] text-[#16242E] rounded px-1.5 py-0.5 text-[13px] font-mono">
      {children}
    </code>
  );
}

function Callout({
  kind = "tip",
  title,
  children,
}: {
  kind?: "tip" | "warning" | "note";
  title: string;
  children: ReactNode;
}) {
  const styles = {
    tip: {
      bg: "bg-[#DDE7F4]/40",
      border: "border-[#2D5A9E]",
      label: "text-[#2D5A9E]",
    },
    warning: {
      bg: "bg-[#F2DEDE]/50",
      border: "border-[#9B3838]",
      label: "text-[#9B3838]",
    },
    note: {
      bg: "bg-[#F4E6CD]/40",
      border: "border-[#8A5A1E]",
      label: "text-[#8A5A1E]",
    },
  }[kind];

  return (
    <div
      className={`${styles.bg} border-l-2 ${styles.border} rounded-r-lg p-4 my-5`}
    >
      <p
        className={`${styles.label} text-[10px] uppercase font-semibold tracking-[1.5px] mb-1`}
      >
        {title}
      </p>
      <div className="text-[14px] leading-[1.7] text-[#16242E] [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}

function DocSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 mb-20">
      <p className="text-[#2D5A9E] text-[11px] font-semibold tracking-[2px] uppercase mb-3">
        {eyebrow}
      </p>
      <H1>{title}</H1>
      {children}
    </section>
  );
}

function Sidebar() {
  return (
    <aside className="hidden lg:block w-[240px] shrink-0">
      <div className="sticky top-8">
        <p className="text-[#2D5A9E] text-[10px] tracking-[2px] uppercase font-semibold mb-4">
          Documentation
        </p>
        <nav className="flex flex-col gap-1 border-l border-[#E6EAEE]">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-[#6B7B86] text-[13px] hover:text-[#2D5A9E] hover:border-[#2D5A9E] border-l border-transparent -ml-px pl-4 py-1.5 transition-colors"
            >
              {s.title}
            </a>
          ))}
        </nav>

        <div className="mt-10 pt-6 border-t border-[#E6EAEE]">
          <p className="text-[#94A0AA] text-[11px] mb-2">Need help?</p>
          <a
            href="mailto:hello@plinq.app"
            className="text-[#2D5A9E] text-[12px] font-semibold hover:underline"
          >
            hello@plinq.app
          </a>
        </div>
      </div>
    </aside>
  );
}

function MobileTOC() {
  return (
    <details className="lg:hidden mb-10 bg-[#F8F9FA] border border-[#E6EAEE] rounded-xl">
      <summary className="cursor-pointer px-4 py-3 text-[#16242E] text-sm font-semibold flex items-center justify-between">
        On this page
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M3 5L7 9L11 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </summary>
      <nav className="flex flex-col px-4 pb-3 gap-1">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="text-[#6B7B86] text-[13px] py-1 hover:text-[#2D5A9E]"
          >
            {s.title}
          </a>
        ))}
      </nav>
    </details>
  );
}

/* ────────── Sections ────────── */

function IntroductionSection() {
  return (
    <DocSection id="introduction" eyebrow="Get started" title="Introduction">
      <P>
        plinq is an AI assistant that turns meetings into shipped work. Today&apos;s
        meeting tools transcribe (Zoom AI), summarize (Notion AI), or archive
        (Slack) — but none of them finish what was decided. plinq does.
      </P>

      <H2>Three things plinq does that other tools don&apos;t</H2>
      <UL>
        <li>
          <strong>Reconciles meetings with your roadmap.</strong> If
          Tuesday&apos;s plan contradicts Monday&apos;s promise, plinq flags it
          before you ship the wrong thing.
        </li>
        <li>
          <strong>Generates a today brief.</strong> Not a transcript, not a
          summary — three priorities ranked by what changes if you don&apos;t
          act.
        </li>
        <li>
          <strong>Auto-creates tasks in your project space.</strong> Owner,
          deadline, and blocker tagged.
        </li>
      </UL>

      <H2>Who plinq is for</H2>
      <UL>
        <li>Student & competition teams (hackathons, capstones)</li>
        <li>Early-stage startups</li>
        <li>Research labs juggling multiple grants</li>
        <li>Consulting & ops teams</li>
      </UL>

      <Callout kind="note" title="Status">
        <p className="mb-0">
          plinq is in private beta. To request access, download the desktop
          app and sign up with your work email.
        </p>
      </Callout>
    </DocSection>
  );
}

function QuickstartSection() {
  return (
    <DocSection id="quickstart" eyebrow="Get started" title="Quickstart">
      <P>Get running in five minutes.</P>

      <H2>1. Download the desktop app</H2>
      <UL>
        <li>Windows 10 or later</li>
        <li>macOS 12 (Monterey) or later</li>
      </UL>

      <H2>2. Sign in</H2>
      <P>
        Use your work email. plinq sends a six-digit code that expires in ten
        minutes.
      </P>

      <H2>3. Connect your calendar</H2>
      <P>
        Open <Code>Settings → Integrations</Code> and connect Google Calendar
        or Outlook 365. plinq reads your calendar to know which meetings to
        attend.
      </P>

      <H2>4. Start your first meeting</H2>
      <P>
        When a connected meeting starts, plinq joins as a silent participant.
        You&apos;ll see the AI Follow-up indicator in the side panel.
      </P>

      <H2>5. Review your today brief</H2>
      <P>
        After the meeting, open the <Code>Today</Code> tab. Your three
        priorities for the day will be listed, with the source meeting linked.
      </P>

      <Callout kind="tip" title="Tip">
        <p className="mb-0">
          Want plinq to skip a meeting? Add <Code>[no-plinq]</Code> anywhere in
          the calendar event title. plinq will respect it and stay out.
        </p>
      </Callout>
    </DocSection>
  );
}

function CoreConceptsSection() {
  return (
    <DocSection id="core-concepts" eyebrow="Concepts" title="Core concepts">
      <P>
        plinq is built around four ideas. Each one shows up everywhere in the
        product, so it&apos;s worth understanding them up front.
      </P>

      <H2>AI Follow-up</H2>
      <P>
        After every meeting, plinq generates a structured follow-up: each
        decision, the owner, the deadline, and any blockers. You can edit
        anything inline — corrections feed back into how plinq parses your
        future meetings.
      </P>
      <P>
        Follow-ups live in the <Code>Meetings</Code> tab and are linked from
        every related task in your project space.
      </P>

      <H2>Project space</H2>
      <P>
        A project space is a workspace for one initiative — a feature, a
        client, a paper, a hackathon entry. Tasks created from meetings land
        in the matching project automatically; you can also drag them between
        projects.
      </P>
      <P>
        Each task has an owner, a deadline, a status
        (<Code>To do</Code> · <Code>Doing</Code> · <Code>Blocked</Code> ·{" "}
        <Code>Done</Code>), and a link back to the meeting it came from.
      </P>

      <H2>Today brief</H2>
      <P>
        The Today brief is plinq&apos;s opinion on what to ship right now.
        Three items, ranked by what changes if you don&apos;t act:
      </P>
      <UL>
        <li>
          <strong>Ship.</strong> The thing only you can do today.
        </li>
        <li>
          <strong>Push back.</strong> A request that conflicts with a prior
          commitment — say no, or renegotiate.
        </li>
        <li>
          <strong>Wait on.</strong> Something blocked by someone else; a
          one-line nudge is suggested.
        </li>
      </UL>

      <H2>Cross-meeting reconcile</H2>
      <P>
        plinq compares every new meeting against your existing roadmap. If
        Tuesday&apos;s scope discussion contradicts Monday&apos;s commitment,
        a conflict card appears in your Today panel before you ship the wrong
        thing.
      </P>

      <Callout kind="tip" title="Tip">
        <p className="mb-0">
          Conflicts are surfaced, not auto-resolved. plinq shows both sides and
          lets you decide.
        </p>
      </Callout>
    </DocSection>
  );
}

function IntegrationsSection() {
  const rows = [
    {
      tool: "Zoom",
      status: "Available",
      desc: "Joins meetings, captures audio, generates follow-ups.",
    },
    {
      tool: "Google Meet",
      status: "Available",
      desc: "Same as Zoom. Works with Workspace and personal Google accounts.",
    },
    {
      tool: "Microsoft Teams",
      status: "Available",
      desc: "Joins via the Teams desktop client.",
    },
    {
      tool: "Google Calendar",
      status: "Available",
      desc: "Reads upcoming meetings to schedule plinq attendance.",
    },
    {
      tool: "Outlook 365",
      status: "Available",
      desc: "Reads upcoming meetings to schedule plinq attendance.",
    },
    {
      tool: "Slack",
      status: "Coming Q3 2026",
      desc: "Posts AI Follow-up summaries to channels you choose.",
    },
    {
      tool: "Notion",
      status: "Coming Q3 2026",
      desc: "Two-way sync between Project space and a Notion database.",
    },
  ];

  return (
    <DocSection id="integrations" eyebrow="Reference" title="Integrations">
      <P>
        plinq integrates with the tools you already use. Connect them under{" "}
        <Code>Settings → Integrations</Code>. Read-only scopes are requested
        wherever possible.
      </P>

      <div className="border border-[#E6EAEE] rounded-xl overflow-hidden mt-6">
        <table className="w-full text-[14px]">
          <thead className="bg-[#F8F9FA]">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-[#16242E] w-[160px]">
                Tool
              </th>
              <th className="text-left px-4 py-3 font-semibold text-[#16242E] w-[140px]">
                Status
              </th>
              <th className="text-left px-4 py-3 font-semibold text-[#16242E]">
                What it does
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={r.tool}
                className={i !== rows.length - 1 ? "border-b border-[#E6EAEE]" : ""}
              >
                <td className="px-4 py-3 font-semibold text-[#16242E]">
                  {r.tool}
                </td>
                <td className="px-4 py-3">
                  {r.status === "Available" ? (
                    <span className="inline-flex items-center gap-1.5 bg-[#DCEBE0] text-[#2F6B45] text-[11px] font-semibold px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2F6B45]" />
                      Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 bg-[#F4E6CD] text-[#8A5A1E] text-[11px] font-semibold px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8A5A1E]" />
                      {r.status}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-[#3A4A55]">{r.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout kind="note" title="Need another integration?">
        <p className="mb-0">
          Email{" "}
          <a
            href="mailto:hello@plinq.app"
            className="text-[#2D5A9E] underline font-semibold"
          >
            hello@plinq.app
          </a>{" "}
          — we ship integrations roughly in the order users ask for them.
        </p>
      </Callout>
    </DocSection>
  );
}

function PrivacySection() {
  return (
    <DocSection id="privacy" eyebrow="Reference" title="Privacy & data">
      <P>
        plinq listens to your meetings. We take that responsibility
        seriously.
      </P>

      <H2>Where audio goes</H2>
      <P>
        Audio streams to plinq&apos;s servers (AWS Seoul region) for
        real-time transcription. We do not store the audio after the meeting
        ends — only the transcript.
      </P>

      <H2>What we store</H2>
      <UL>
        <li>
          Transcripts (encrypted at rest, retained 90 days by default; you can
          shorten this in <Code>Settings</Code>)
        </li>
        <li>
          Decisions, action items, and project links (kept until you delete
          them)
        </li>
        <li>
          Calendar metadata — title, time, attendees — never the body of
          calendar invites
        </li>
      </UL>

      <H2>Who can see your data</H2>
      <P>
        Only you and the workspace members you explicitly invite. plinq
        employees access user data only to debug specific support tickets,
        and only with your written consent.
      </P>

      <H2>Deletion</H2>
      <P>
        <Code>Settings → Account → Delete data</Code> permanently removes all
        transcripts and follow-ups within 24 hours. Backups purge within 30
        days.
      </P>

      <H2>Encryption</H2>
      <UL>
        <li>In transit: TLS 1.3</li>
        <li>At rest: AES-256</li>
      </UL>

      <Callout kind="warning" title="Compliance">
        <p className="mb-0">
          plinq is not yet HIPAA or SOC 2 certified. If you handle protected
          health information or are subject to regulated compliance frameworks,
          contact us before connecting plinq to those calls.
        </p>
      </Callout>
    </DocSection>
  );
}

function FaqItem({
  q,
  children,
}: {
  q: string;
  children: ReactNode;
}) {
  return (
    <details className="group bg-white border border-[#E6EAEE] rounded-xl mb-3 open:bg-[#F8F9FA]">
      <summary className="cursor-pointer px-5 py-4 text-[#16242E] text-[15px] font-semibold flex items-center justify-between gap-4">
        <span>{q}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="shrink-0 transition-transform group-open:rotate-180 text-[#6B7B86]"
        >
          <path
            d="M3 5L7 9L11 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </summary>
      <div className="px-5 pb-4 text-[14px] leading-[1.7] text-[#3A4A55] [&>p:last-child]:mb-0">
        {children}
      </div>
    </details>
  );
}

function FaqSection() {
  return (
    <DocSection id="faq" eyebrow="Reference" title="FAQ">
      <FaqItem q="Does plinq work if my team isn't using it?">
        <p>
          Yes. plinq creates a personal follow-up for you regardless of who
          else is in the meeting. Team features — shared project space and
          cross-team reconcile — require everyone to have plinq.
        </p>
      </FaqItem>

      <FaqItem q="Can I use plinq for client meetings?">
        <p>
          Yes, but disclose to clients that an AI is taking notes. Some
          jurisdictions require explicit consent — check your local laws
          before turning plinq on for external calls.
        </p>
      </FaqItem>

      <FaqItem q="What languages does plinq support?">
        <p>
          Korean and English at launch. Japanese and Spanish are in beta and
          accuracy will improve through 2026.
        </p>
      </FaqItem>

      <FaqItem q="How accurate is the transcription?">
        <p>
          Around 94% on clear audio with native speakers. Lower in noisy
          rooms or with strong accents. plinq highlights low-confidence
          phrases so you know what to double-check.
        </p>
      </FaqItem>

      <FaqItem q="What does plinq cost after the beta?">
        <p>
          Pricing isn&apos;t finalized. Beta users get a 50% discount on
          whichever tier they choose for the first year. We&apos;ll email you
          30 days before billing starts so there are no surprises.
        </p>
      </FaqItem>

      <FaqItem q="What happens if I delete plinq?">
        <p>
          Your transcripts and follow-ups stay in your account for 30 days,
          then are permanently deleted. Reinstalling within that window
          restores everything.
        </p>
      </FaqItem>
    </DocSection>
  );
}

/* ────────── Page ────────── */

export default function DocsPage() {
  return (
    <main
  className="flex-1 flex flex-col bg-white min-h-screen"
  style={{ ["--header-bg" as string]: "#ffffff" }}
    >
      <Header />

      <div className="max-w-[1200px] w-full mx-auto px-6 sm:px-10 pt-6 sm:pt-10">
        <div className="mb-10 sm:mb-14">
          <p className="text-[#2D5A9E] text-[11px] font-semibold tracking-[2px] uppercase mb-3">
            plinq docs
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-[56px] md:leading-[64px] font-medium text-[#16242E]"
            style={{ fontFamily: "Metropolis, Inter, sans-serif" }}
          >
            Everything you need to{" "}
            <em
              className="not-italic italic text-[#2D5A9E]"
              style={{
                fontFamily: "Metropolis, Inter, sans-serif",
                fontStyle: "italic",
              }}
            >
              ship
            </em>{" "}
            with plinq.
          </h1>
          <p className="text-[#6B7B86] text-base sm:text-lg leading-relaxed mt-4 max-w-[640px]">
            Setup, core concepts, integrations, and the answers to the
            questions everyone asks. Five minutes from here to your first
            shipped meeting.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] w-full mx-auto px-6 sm:px-10 pb-24 flex gap-12">
        <Sidebar />
        <article className="flex-1 max-w-[760px] min-w-0">
          <MobileTOC />
          <IntroductionSection />
          <QuickstartSection />
          <CoreConceptsSection />
          <IntegrationsSection />
          <PrivacySection />
          <FaqSection />

          <div className="mt-10 pt-8 border-t border-[#E6EAEE] flex items-center justify-between text-[13px]">
            <p className="text-[#94A0AA]">Last updated · 2026-05-10</p>
            <a
              href="mailto:hello@plinq.app"
              className="text-[#2D5A9E] font-semibold hover:underline"
            >
              Suggest an edit →
            </a>
          </div>
        </article>
      </div>

      <footer className="pb-8 pt-10 text-center bg-white border-t border-[#E6EAEE]">
        <p className="text-[#6B7B86] text-[10px]">
          © 2026 plinq. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
