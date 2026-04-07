import { useTranslations } from "next-intl";
import QuoteForm from "@/components/yacht/QuoteForm";

export default function QuotePage() {
  const t = useTranslations("quote");

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-cream">
      <div className="mx-auto max-w-[800px]">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-[clamp(28px,3.5vw,38px)] font-bold text-navy mb-3">
            {t("pageTitle")}
          </h1>
          <p className="text-base text-dark/50 font-light">{t("pageSubtitle")}</p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-lg border border-stone p-8 md:p-10">
          <QuoteForm />
        </div>
      </div>
    </div>
  );
}
