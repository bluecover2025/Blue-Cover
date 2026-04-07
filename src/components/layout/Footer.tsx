"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import Logo from "@/components/ui/Logo";

const footerLinks = [
  { labelKey: "about", href: "#" },
  { labelKey: "coverages", href: "#coverages" },
  { labelKey: "faq", href: "#faq" },
  { labelKey: "contact", href: "mailto:hello@bluecover.ch" },
  { labelKey: "legal", href: "#" },
] as const;

export default function Footer() {
  const t = useTranslations("common");

  return (
    <footer
      className="px-6 pt-14 pb-8 text-white"
      style={{ background: "linear-gradient(135deg, var(--color-navy), var(--color-blue))" }}
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 mb-10">
          {/* Brand column */}
          <div>
            <div className="mb-3 font-serif text-lg font-bold">Blue Cover</div>
            <p className="text-[13px] opacity-55 leading-relaxed max-w-[300px]">
              Courtier indépendant en assurance yacht. Comparaison des meilleures offres du marché international.
            </p>
            <div className="flex gap-2 flex-wrap mt-4">
              <span className="text-[11px] px-3 py-1 rounded-full bg-white/10">Yacht Insurance</span>
              <span className="text-[11px] px-3 py-1 rounded-full bg-white/10">Luxury Goods</span>
            </div>
            <p className="mt-3 text-[11px] opacity-35 leading-relaxed">
              FINMA F01445236 &middot; ORIAS 24000663<br />
              Route de Florissant 8, 1206 Gen&egrave;ve
            </p>
          </div>

          {/* Links column */}
          <div>
            <h4 className="text-[13px] font-bold opacity-75 mb-3">Navigation</h4>
            <div className="flex flex-col gap-2">
              {footerLinks.map((item) => (
                <Link
                  key={item.labelKey}
                  href={item.href}
                  className="text-[13px] text-white opacity-45 no-underline hover:opacity-80 transition-opacity"
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="text-[13px] font-bold opacity-75 mb-3">Contact</h4>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:hello@bluecover.ch"
                className="text-[13px] text-white opacity-45 no-underline hover:opacity-80 transition-opacity"
              >
                hello@bluecover.ch
              </a>
              <a
                href="https://bluecover.ch"
                className="text-[13px] text-white opacity-45 no-underline hover:opacity-80 transition-opacity"
              >
                bluecover.ch
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex justify-between flex-wrap gap-3">
          <p className="text-[11px] opacity-35">
            &copy; {new Date().getFullYear()} Blue Cover SA &mdash; Tous droits r&eacute;serv&eacute;s
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-[11px] text-white opacity-35 no-underline hover:opacity-60 transition-opacity">
              {t("privacy")}
            </Link>
            <Link href="#" className="text-[11px] text-white opacity-35 no-underline hover:opacity-60 transition-opacity">
              {t("legal")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
