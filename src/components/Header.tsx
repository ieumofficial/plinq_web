"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";

const navItems: { label: string; href: string }[] = [
  { label: "Product", href: "/#product" },
  { label: "Solutions", href: "/#solution" },
  { label: "Pricing", href: "#" },
  { label: "Docs", href: "/docs" },
];

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    lastYRef.current = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastYRef.current;

      if (currentY <= 0) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }

      lastYRef.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full px-6 sm:px-10 py-5 flex items-center justify-between transition-transform duration-300 ease-out ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{ backgroundColor: "var(--header-bg, #F4F6F8)" }}
      >
        <Link href="/">
          <Logo variant="dark" size={28} />
        </Link>

        <nav className="hidden md:flex items-center gap-[60px]">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[#6B7B86] text-sm font-semibold hover:text-[#16242E] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Link
          href="/login"
          className="bg-white border border-[#E6EAEE] rounded-[5px] px-[25px] py-[10px] text-[#16242E] text-[12px] hover:bg-[#F8F9FA] transition-colors"
        >
          Sign in
        </Link>
      </header>
      <div aria-hidden className="h-[68px] shrink-0" />
    </>
  );
}