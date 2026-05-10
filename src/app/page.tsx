import Link from "next/link";
import Header from "@/components/Header";
import Logo from "@/components/Logo";
import ProductSection from "@/components/ProductSection";
import AppPreviewMockup from "@/components/AppPreviewMockup";

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


export default function Home() {
  return (
    <main className="flex-1 flex flex-col bg-[#F4F6F8] min-h-screen">
      <Header />

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-10 py-12 sm:py-16">
        <div className="flex flex-col items-center text-center max-w-[1054px]">
          {/* Badge row — chip + AI follow-up label inline */}
          <div
            className="hero-rise flex flex-col sm:flex-row items-center gap-3 sm:gap-[15px] mb-5 sm:mb-6"
            style={{ animationDelay: "0ms" }}
          >
            <div className="inline-flex items-center gap-[3px] bg-[#DDE7F4] rounded-[2px] px-[5px] py-[3px]">
              <span className="animate-sparkle inline-flex">
                <SparkleIcon />
              </span>
              <span className="text-[#2D5A9E] text-[9.16px] font-semibold tracking-[0.916px] uppercase whitespace-nowrap">
                Now in private beta
              </span>
            </div>
            <p className="text-[#94A0AA] text-[12px] tracking-[2px] uppercase whitespace-nowrap font-medium">
              AI follow-up for every meeting
            </p>
          </div>

          {/* Hero heading */}
          <h1
            className="hero-rise text-[34px] leading-[1.15] sm:text-[44px] sm:leading-[1.18] md:text-[55px] md:leading-[1.2] font-medium text-[#16242E] tracking-[-0.04em] mb-8 sm:mb-10"
            style={{
              fontFamily: "Metropolis, Inter, sans-serif",
              animationDelay: "90ms",
            }}
          >
            <span className="block">
              The dashboard that{" "}
              <em
                className="not-italic italic text-[#2D5A9E]"
                style={{
                  fontFamily: "Metropolis, Inter, sans-serif",
                  fontStyle: "italic",
                }}
              >
                actually
              </em>{" "}
              finishes
            </span>
            <span className="block">the work after the meeting.</span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-rise text-[#6B7B86] text-base sm:text-[18px] leading-[1.5] max-w-[820px] mb-7 sm:mb-8 tracking-[0.18px]"
            style={{ animationDelay: "180ms" }}
          >
            plinq reads your meetings, reconciles them with your roadmap, and tells you exactly what to ship today
            — across personal, team, project, and organization views.
          </p>

          {/* Download buttons */}
          <div
            className="hero-rise flex flex-col sm:flex-row items-center gap-3 sm:gap-[20px] mb-5 sm:mb-6"
            style={{ animationDelay: "270ms" }}
          >
            <button className="btn-sweep flex items-center gap-[5px] bg-[#2E434E] text-[#F8F9FA] rounded-[5px] px-[15px] py-[10px] text-[12px] font-semibold hover:bg-[#3A5162] transition-colors justify-center min-w-[180px]">
              <WindowsIcon />
              Download for Windows
            </button>
            <button className="btn-sweep flex items-center gap-[5px] bg-[#2E434E] text-[#F8F9FA] rounded-[5px] px-[15px] py-[10px] text-[12px] font-semibold hover:bg-[#3A5162] transition-colors justify-center min-w-[180px]">
              <AppleIcon />
              Download for MacOS
            </button>
          </div>

          {/* Small text */}
          <p
            className="hero-rise text-[#94A0AA] text-[12px] tracking-[1.5px] uppercase font-medium"
            style={{ animationDelay: "360ms" }}
          >
            No credit card &middot; 14-day trial &middot; Cancel anytime
          </p>
        </div>

        {/* App preview mockup */}
        <AppPreviewMockup />
      </div>

      {/* Product landing sections */}
      <ProductSection />

      {/* Brand footer */}
      <footer className="bg-[#16242E] text-white pt-16 sm:pt-20 pb-10 px-6 sm:px-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 pb-12 border-b border-white/10">
            <div className="flex flex-col gap-5 max-w-[460px]">
              <Logo variant="light" size={42} />
              <p
                className="text-white text-[22px] sm:text-[26px] leading-[1.25] font-medium"
                style={{ fontFamily: "Metropolis, Inter, sans-serif" }}
              >
                Your AI co-pilot for{" "}
                <em
                  className="not-italic italic text-[#5B7FB6]"
                  style={{
                    fontFamily: "Metropolis, Inter, sans-serif",
                    fontStyle: "italic",
                  }}
                >
                  every project.
                </em>
              </p>
              <p className="text-[#94A0AA] text-[14px] leading-relaxed">
                plinq turns conversation into a single execution system —
                meetings, decisions, and tasks in one place.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-[13px]">
              <div className="flex flex-col gap-2">
                <p className="text-[#5B7FB6] text-[10px] uppercase tracking-[1.5px] font-semibold mb-1">
                  Product
                </p>
                <Link href="/#product" className="text-[#94A0AA] hover:text-white transition-colors">Overview</Link>
                <Link href="/#solution" className="text-[#94A0AA] hover:text-white transition-colors">Solution</Link>
                <Link href="/#built-for" className="text-[#94A0AA] hover:text-white transition-colors">Built for</Link>
                <Link href="/docs" className="text-[#94A0AA] hover:text-white transition-colors">Docs</Link>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[#5B7FB6] text-[10px] uppercase tracking-[1.5px] font-semibold mb-1">
                  Contact
                </p>
                <a href="mailto:hello@plinq.app" className="text-[#94A0AA] hover:text-white transition-colors">hello@plinq.app</a>
                <a href="#" className="text-[#94A0AA] hover:text-white transition-colors">Privacy</a>
                <a href="#" className="text-[#94A0AA] hover:text-white transition-colors">Terms</a>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[12px] text-[#6B7B86]">
            <p>© 2026 plinq. All rights reserved.</p>
            <p>
              Built by{" "}
              <span className="text-[#94A0AA]">ieum</span> · KAIST MLAI Lab
              · LLM Agent research
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
