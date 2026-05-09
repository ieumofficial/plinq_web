import Link from "next/link";
import Logo from "./Logo";

const navItems = ["Product", "Solutions", "Pricing", "Docs"];

export default function Header() {
  return (
    <header className="w-full px-6 sm:px-10 py-5 flex items-center justify-between">
      <Link href="/">
        <Logo variant="dark" size={28} />
      </Link>

      <nav className="hidden md:flex items-center gap-[60px]">
        {navItems.map((item) => (
          <a
            key={item}
            href="#"
            className="text-[#6B7B86] text-sm font-semibold hover:text-[#16242E] transition-colors"
          >
            {item}
          </a>
        ))}
      </nav>

      <Link
        href="/login"
        className="bg-white border border-[#E6EAEE] rounded-[10px] px-[25px] py-[10px] text-[#16242E] text-xs hover:bg-[#F8F9FA] transition-colors"
      >
        Sign in
      </Link>
    </header>
  );
}
