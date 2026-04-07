"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const faqKeys = ["faq1", "faq2", "faq3", "faq4", "faq5"] as const;

export default function FAQ() {
  const t = useTranslations("home");
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 py-20 bg-cream border-t border-navy/6">
      <div className="mx-auto max-w-[800px]">
        <div className="text-center mb-14">
          <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-blue mb-2">
            {t("faqLabel")}
          </p>
          <h2 className="font-serif text-[clamp(28px,3.5vw,38px)] font-bold text-navy">
            {t("faqTitle")}
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqKeys.map((key, i) => (
            <div
              key={key}
              className="bg-white rounded-2xl border border-stone overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
              >
                <span className="text-[15px] font-semibold text-navy pr-4">
                  {t(`${key}Q`)}
                </span>
                <span
                  className="text-blue text-lg transition-transform shrink-0"
                  style={{ transform: open === i ? "rotate(45deg)" : "rotate(0)" }}
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: open === i ? "200px" : "0",
                  opacity: open === i ? 1 : 0,
                }}
              >
                <p className="px-5 pb-5 text-sm text-dark/50 leading-relaxed">
                  {t(`${key}A`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
