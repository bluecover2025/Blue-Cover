"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import Logo from "@/components/ui/Logo";

const footerLinks = [
  { labelKey: "about", href: "#" },
  { labelKey: "coverages", href: "#coverages" },
  { labelKey: "faq", href: "#faq" },
  { labelKey: "contact", href: "mailto:hello@bluecover.ch" },
  { labelKey: "legal", href: "/yacht/legal" },
] as const;

export default function Footer() {
  const t = useTranslations("common");

  return (
    <footer className="border-t border-navy/8 px-8 pt-12 pb-6 text-xs">
      <div className="mx-auto max-w-[900px]">
        {/* Logo + Swiss Made */}
        <div className="mb-6 flex items-center justify-center gap-3.5">
          <Logo size="sm" />
          <div className="h-[22px] w-px bg-navy/12" />
          <img
            src="/images/swiss-made.png"
            alt="Swiss Made"
            className="h-4 object-contain"
          />
        </div>

        {/* Nav links */}
        <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
          {footerLinks.map((item, i) => (
            <span key={item.labelKey} className="inline-flex items-center gap-3">
              {i > 0 && (
                <span className="text-[10px] text-stone">·</span>
              )}
              <Link
                href={item.href}
                className="text-xs text-navy/65 hover:text-navy transition-colors whitespace-nowrap no-underline"
              >
                {t(item.labelKey)}
              </Link>
            </span>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-center text-[11px] text-navy/40 leading-relaxed">
          © {new Date().getFullYear()} Blue Cover SA
        </p>
      </div>
    </footer>
  );
}
