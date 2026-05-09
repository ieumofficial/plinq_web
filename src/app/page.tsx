import Header from "@/components/Header";

function WindowsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 2.3L6.5 1.4V7.5H0V2.3ZM7.3 1.3L16 0V7.5H7.3V1.3ZM16 8.5V16L7.3 14.7V8.5H16ZM6.5 14.6L0 13.7V8.5H6.5V14.6Z" fill="currentColor"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.5 9C11.5 7.1 13 6.2 13.1 6.1C12 4.5 10.3 4.3 9.7 4.3C8.3 4.2 6.9 5.2 6.2 5.2C5.5 5.2 4.3 4.3 3.1 4.3C1.6 4.4 0.2 5.3 0 7.1C-0.4 10.7 2.2 16.1 3.6 16.1C4.1 16.1 4.8 15.5 5.9 15.5C7 15.5 7.5 16.1 8.3 16.1C9.8 16 11.1 12.2 11.5 9ZM9.3 2.8C10.1 1.8 10.1 0.9 10.1 0.5C9.3 0.5 8.4 1.1 7.9 1.6C7.3 2.2 6.9 3 7 3.8C7.8 3.9 8.6 3.4 9.3 2.8Z" fill="currentColor"/>
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 0L7.4 4.6L12 6L7.4 7.4L6 12L4.6 7.4L0 6L4.6 4.6L6 0Z" fill="#2D5A9E"/>
    </svg>
  );
}

function AppPreviewMockup() {
  return (
    <div className="w-full max-w-[900px] mx-auto mt-12 sm:mt-16">
      <div className="bg-[#F8FAFB] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-[#E6EAEE] overflow-hidden">
        <div className="flex min-h-[400px] sm:min-h-[480px]">
          {/* Sidebar */}
          <div className="hidden sm:flex w-[200px] bg-[#2E434E] flex-col p-4 gap-3 shrink-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#6BA7CC] flex items-center justify-center">
                <span className="text-white text-xs font-semibold">T</span>
              </div>
              <span className="text-white text-sm font-semibold">plinq</span>
            </div>
            <div className="flex flex-col gap-1">
              {["Dashboard", "Projects", "Calendar", "Meetings", "Tasks"].map((item, i) => (
                <div
                  key={item}
                  className={`px-3 py-2 rounded-lg text-xs font-medium ${
                    i === 0
                      ? "bg-white/15 text-white"
                      : "text-white/60 hover:text-white/80"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-1">
              <div className="px-3 py-2 text-white/40 text-xs">Settings</div>
              <div className="px-3 py-2 text-white/40 text-xs">Help</div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-4 sm:p-6 flex flex-col gap-4 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-[#16242E]">Good morning, Alex</h3>
                <p className="text-xs text-[#94A0AA] mt-0.5">3 tasks need your attention today</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#DDE7F4] flex items-center justify-center">
                <span className="text-xs font-semibold text-[#2D5A9E]">A</span>
              </div>
            </div>

            {/* Active Projects */}
            <div>
              <p className="text-xs font-semibold text-[#6B7B86] uppercase tracking-wide mb-3">Active Projects</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { name: "Apollo", progress: 72, color: "#2D5A9E" },
                  { name: "Pricing V2", progress: 48, color: "#8A5A1E" },
                  { name: "Design System", progress: 91, color: "#2F6B45" },
                ].map((project) => (
                  <div key={project.name} className="bg-white rounded-xl p-3 border border-[#E6EAEE]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-[#16242E]">{project.name}</span>
                      <span className="text-xs font-semibold" style={{ color: project.color }}>
                        {project.progress}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#EBEFF2] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${project.progress}%`,
                          backgroundColor: project.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Tasks */}
            <div>
              <p className="text-xs font-semibold text-[#6B7B86] uppercase tracking-wide mb-3">Pending Tasks</p>
              <div className="flex flex-col gap-2">
                {[
                  { task: "Finalize API contracts for auth module", dot: "#2D5A9E", tag: "Apollo" },
                  { task: "Review pricing tier comparison table", dot: "#8A5A1E", tag: "Pricing V2" },
                  { task: "Update color token documentation", dot: "#2F6B45", tag: "Design System" },
                  { task: "Schedule sprint retrospective", dot: "#9B3838", tag: "Apollo" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2 border border-[#E6EAEE]">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.dot }} />
                    <span className="text-xs text-[#16242E] flex-1 min-w-0 truncate">{item.task}</span>
                    <span className="text-[10px] text-[#94A0AA] font-medium shrink-0">{item.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Follow-up panel */}
          <div className="hidden md:flex w-[220px] bg-[#1F2F38] flex-col p-4 gap-3 shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded bg-[#2D5A9E] flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M6 0L7.4 4.6L12 6L7.4 7.4L6 12L4.6 7.4L0 6L4.6 4.6L6 0Z" fill="white"/>
                </svg>
              </div>
              <span className="text-white text-xs font-semibold">AI Follow-up</span>
            </div>
            <div className="flex flex-col gap-2">
              {[
                "From yesterday's standup: API auth deadline moved to Friday",
                "Pricing V2 meeting had 3 unresolved items",
                "Design System tokens updated by Sarah — review pending",
              ].map((msg, i) => (
                <div key={i} className="bg-white/8 rounded-lg p-2.5">
                  <p className="text-[10px] text-white/70 leading-relaxed">{msg}</p>
                </div>
              ))}
            </div>
            <div className="mt-auto">
              <div className="bg-white/8 rounded-lg p-2.5 flex items-center gap-2">
                <span className="text-[10px] text-white/40 flex-1">Ask about your projects...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex-1 flex flex-col bg-[#F4F6F8] min-h-screen">
      <Header />

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-10 py-12 sm:py-16">
        <div className="flex flex-col items-center text-center max-w-[800px]">
          {/* Badge */}
          <div className="flex flex-col items-center gap-2 mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 bg-[#DDE7F4] rounded-full px-4 py-1.5">
              <SparkleIcon />
              <span className="text-[#2D5A9E] text-xs font-semibold tracking-wide">NOW IN PRIVATE BETA</span>
            </div>
            <p className="text-[#6B7B86] text-sm tracking-wide">AI FOLLOW-UP FOR EVERY MEETING</p>
          </div>

          {/* Hero heading */}
          <h1
            className="text-3xl sm:text-4xl md:text-[48px] md:leading-[56px] font-medium text-[#16242E] mb-5 sm:mb-6"
            style={{ fontFamily: "Metropolis, Inter, sans-serif" }}
          >
            The dashboard that{" "}
            <em className="not-italic italic text-[#2D5A9E]" style={{ fontFamily: "Metropolis, Inter, sans-serif", fontStyle: "italic" }}>
              actually
            </em>{" "}
            finishes the work after the meeting.
          </h1>

          {/* Subtitle */}
          <p className="text-[#6B7B86] text-sm sm:text-base leading-relaxed max-w-[640px] mb-8 sm:mb-10">
            plinq reads your meetings, reconciles them with your roadmap, and tells you exactly what to ship today
            — across personal, team, project, and organization views.
          </p>

          {/* Download buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-5">
            <button className="flex items-center gap-2.5 bg-[#2E434E] text-white rounded-[5px] px-6 py-3 text-sm font-semibold hover:bg-[#3A5162] transition-colors w-full sm:w-auto justify-center">
              <WindowsIcon />
              Download for Windows
            </button>
            <button className="flex items-center gap-2.5 bg-[#2E434E] text-white rounded-[5px] px-6 py-3 text-sm font-semibold hover:bg-[#3A5162] transition-colors w-full sm:w-auto justify-center">
              <AppleIcon />
              Download for MacOS
            </button>
          </div>

          {/* Small text */}
          <p className="text-[#94A0AA] text-[10px] tracking-widest uppercase">
            NO CREDIT CARD &middot; 14-DAY TRIAL &middot; CANCEL ANYTIME
          </p>
        </div>

        {/* App preview mockup */}
        <AppPreviewMockup />
      </div>

      {/* Copyright */}
      <footer className="pb-8 text-center">
        <p className="text-[#6B7B86] text-[10px]">
          © 2026 plinq. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
