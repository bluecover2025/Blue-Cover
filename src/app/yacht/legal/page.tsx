"use client";

import { useTranslations } from "next-intl";

const SECTION_KEYS = ["s1", "s2", "s3"] as const;
const PRIVACY_KEYS = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10", "p11"] as const;

export default function LegalPage() {
  const t = useTranslations("legal");

  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-16 pb-14 mt-[52px]">
        <div className="mx-auto max-w-[700px] px-4 text-center">
          <div className="mb-3.5 text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
            {t("label")}
          </div>
          <h1 className="font-serif text-[clamp(26px,4vw,40px)] font-normal leading-tight text-white">
            {t("title")}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="border-t border-navy/6 bg-white px-4 py-12">
        <div className="mx-auto max-w-[700px]">
          {SECTION_KEYS.map((key) => (
            <div key={key} className="mb-10">
              <h2 className="mb-3.5 font-serif text-[22px] font-medium text-navy">
                {t(`${key}Title`)}
              </h2>
              <p className="whitespace-pre-line text-sm font-light leading-[1.8] text-navy/50">
                {t(`${key}Text`)}
              </p>
            </div>
          ))}

          <div className="my-10 h-px bg-navy/8" />

          {PRIVACY_KEYS.map((key, i) => (
            <div key={key} className="mb-10">
              <h2
                className={`mb-3.5 font-serif font-medium text-navy ${i === 0 ? "text-2xl" : "text-[22px]"}`}
              >
                {t(`${key}Title`)}
              </h2>
              <p className="whitespace-pre-line text-sm font-light leading-[1.8] text-navy/50">
                {t(`${key}Text`)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
