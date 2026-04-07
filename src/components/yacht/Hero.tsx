"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";

export default function Hero() {
  const t = useTranslations("home");

  const stats = [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
    { value: t("stat4Value"), label: t("stat4Label") },
  ];

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-navy mt-[52px]">
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/savannah.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Gradient overlay — same style as luxury_goods */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to right, #243F74 0%, #243F74 35%, rgba(36,63,116,0.85) 50%, rgba(36,63,116,0.5) 65%, rgba(36,63,116,0.2) 80%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-[2] max-w-[720px] px-5 py-12 pl-10">
        {/* Gold label — same as luxury_goods */}
        <div className="mb-5 flex items-center gap-3.5 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          <span className="inline-block h-px w-8 bg-gold" />
          Blue Cover Yachting
        </div>

        {/* Headline */}
        <h1 className="mb-5 max-w-[580px] font-serif text-[28px] md:text-[34px] lg:text-[40px] font-normal leading-[1.15] tracking-[-0.02em] text-white">
          {t("heroTitle")}
        </h1>

        {/* Subtitle */}
        <p className="mb-8 max-w-[440px] text-[15px] font-light leading-relaxed text-white/70">
          {t("heroSubtitle")}
        </p>

        {/* CTA */}
        <Link href="/yacht/quote">
          <Button variant="gold">{t("heroCta")}</Button>
        </Link>

        {/* Stats */}
        <div className="mt-12 flex gap-10 flex-wrap">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-serif text-[20px] font-semibold text-white">{s.value}</p>
              <p className="text-[11px] text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
