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
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(140deg, rgba(26,47,83,0.92) 0%, rgba(36,63,116,0.85) 45%, rgba(8,97,168,0.8) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-[2] mx-auto max-w-[1100px] px-6 py-32">
        {/* Badge */}
        <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-opal" />
          <span className="text-xs font-semibold text-white/80">{t("heroBadge")}</span>
        </div>

        {/* Headline */}
        <h1 className="mb-5 max-w-[600px] font-serif text-[clamp(36px,5vw,56px)] font-bold leading-[1.15] text-white">
          {t("heroTitle")}
        </h1>

        {/* Subtitle */}
        <p className="mb-9 max-w-[480px] text-lg font-light leading-relaxed text-white/70">
          {t("heroSubtitle")}
        </p>

        {/* CTAs */}
        <div className="flex gap-4 flex-wrap">
          <Link href="/yacht/quote">
            <Button variant="gold">{t("heroCta")}</Button>
          </Link>
          <a href="#how-it-works">
            <Button variant="outline-light">{t("heroLearnMore")}</Button>
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 flex gap-12 flex-wrap">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-serif text-[22px] font-bold text-white">{s.value}</p>
              <p className="text-xs text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Wave SVG */}
      <svg
        className="absolute bottom-0 left-0 right-0 z-[3]"
        viewBox="0 0 1440 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 60V20C240 45 480 0 720 20C960 40 1200 10 1440 30V60H0Z"
          fill="var(--color-cream)"
        />
      </svg>
    </section>
  );
}
