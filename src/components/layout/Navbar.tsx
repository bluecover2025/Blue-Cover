"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";

function setLocaleCookie(locale: string) {
  document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=${365 * 24 * 60 * 60};samesite=lax`;
  window.location.reload();
}

export default function Navbar() {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();

  const isHome = pathname === "/yacht";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-white border-b border-navy/8">
      {/* Left side: back arrow (if not home) + logo */}
      <div className="flex items-center gap-3">
        {!isHome && (
          <Link
            href="/yacht"
            className="text-lg text-navy opacity-50 hover:opacity-100 transition-opacity"
            aria-label={t("brandName")}
          >
            &larr;
          </Link>
        )}
        <Logo />
      </div>

      {/* Right side: lang toggle + CTA */}
      <div className="flex items-center gap-3">
        <div className="flex items-center text-[10px] font-semibold tracking-[0.1em] uppercase">
          <button
            onClick={() => setLocaleCookie("fr")}
            className={`px-1.5 py-1 transition-colors cursor-pointer ${locale === "fr" ? "text-gold" : "text-navy/30 hover:text-navy/60"}`}
          >
            FR
          </button>
          <span className="text-navy/15">|</span>
          <button
            onClick={() => setLocaleCookie("en")}
            className={`px-1.5 py-1 transition-colors cursor-pointer ${locale === "en" ? "text-gold" : "text-navy/30 hover:text-navy/60"}`}
          >
            EN
          </button>
        </div>
        <Link
          href="/yacht/quote"
          className="text-[10px] font-semibold tracking-[0.15em] uppercase px-3.5 py-2.5 bg-navy text-white rounded-md hover:bg-blue transition-colors whitespace-nowrap no-underline"
        >
          {t("getQuote")}
        </Link>
      </div>
    </nav>
  );
}
