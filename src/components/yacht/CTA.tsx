import Link from "next/link";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";

export default function CTA() {
  const t = useTranslations("home");

  return (
    <section className="px-6 py-20 bg-white border-t border-navy/6">
      <div className="mx-auto max-w-[700px] text-center">
        <h2 className="font-serif text-[clamp(28px,3.5vw,38px)] font-bold text-navy mb-4">
          {t("ctaTitle")}
        </h2>
        <p className="text-base text-dark/50 mb-8 max-w-[500px] mx-auto font-light">
          {t("ctaSubtitle")}
        </p>
        <Link href="/yacht/quote">
          <Button variant="navy">{t("heroCta")}</Button>
        </Link>
      </div>
    </section>
  );
}
