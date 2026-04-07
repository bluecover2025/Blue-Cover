"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";

function setLocaleCookie(locale: string) {
  document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=${365 * 24 * 60 * 60};samesite=lax`;
  window.location.reload();
}

export default function Navbar() {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/yacht";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkColor = isHome && !scrolled ? "text-white/85 hover:text-white" : "text-navy hover:text-blue";
  const navBg = isHome && !scrolled
    ? "bg-transparent"
    : "bg-white/97 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.06)]";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="mx-auto max-w-[1100px] flex items-center justify-between px-6 py-4">
        {/* Left: Logo */}
        <Logo size={scrolled || !isHome ? "md" : "lg"} variant={isHome && !scrolled ? "light" : "dark"} />

        {/* Center: Nav links (desktop) */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#coverages" className={`text-sm font-semibold transition-colors no-underline ${linkColor}`}>
            {t("coverages")}
          </a>
          <a href="#how-it-works" className={`text-sm font-semibold transition-colors no-underline ${linkColor}`}>
            {t("howItWorks")}
          </a>
          <a href="#partners" className={`text-sm font-semibold transition-colors no-underline ${linkColor}`}>
            {t("partners")}
          </a>
          <a href="#faq" className={`text-sm font-semibold transition-colors no-underline ${linkColor}`}>
            {t("faq")}
          </a>
        </div>

        {/* Right: Lang + CTAs */}
        <div className="flex items-center gap-3">
          <div className="flex items-center text-[10px] font-semibold tracking-[0.1em] uppercase">
            <button
              onClick={() => setLocaleCookie("fr")}
              className={`px-1.5 py-1 transition-colors cursor-pointer ${locale === "fr" ? "text-gold" : isHome && !scrolled ? "text-white/40 hover:text-white/70" : "text-navy/30 hover:text-navy/60"}`}
            >
              FR
            </button>
            <span className={isHome && !scrolled ? "text-white/20" : "text-navy/15"}>|</span>
            <button
              onClick={() => setLocaleCookie("en")}
              className={`px-1.5 py-1 transition-colors cursor-pointer ${locale === "en" ? "text-gold" : isHome && !scrolled ? "text-white/40 hover:text-white/70" : "text-navy/30 hover:text-navy/60"}`}
            >
              EN
            </button>
          </div>
          <Link
            href="/yacht/quote"
            className="text-[10px] font-semibold tracking-[0.15em] uppercase px-5 py-2.5 rounded-[8px] text-white no-underline whitespace-nowrap transition-all"
            style={{ background: "linear-gradient(135deg, var(--color-navy), var(--color-blue))" }}
          >
            {t("getQuote")}
          </Link>
        </div>
      </div>
    </nav>
  );
}
