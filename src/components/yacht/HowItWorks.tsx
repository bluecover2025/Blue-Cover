"use client";

import { useTranslations } from "next-intl";

export default function HowItWorks() {
  const t = useTranslations("home");

  const steps = ["01", "02", "03", "04"] as const;

  return (
    <section id="how-it-works" className="px-6 py-20 bg-white border-t border-navy/6">
      <div className="mx-auto max-w-[1100px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: Steps */}
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold mb-3.5">
              {t("howLabel")}
            </div>
            <h2 className="font-serif text-[clamp(24px,3vw,36px)] font-normal leading-tight text-navy mb-9">
              {t("howTitle")}
            </h2>

            <div className="flex flex-col gap-7">
              {steps.map((n) => (
                <div key={n} className="flex gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ background: "linear-gradient(135deg, var(--color-navy), var(--color-blue))" }}
                  >
                    {n}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-navy mb-1">
                      {t(`step${n}Title`)}
                    </h4>
                    <p className="text-sm text-dark/50">
                      {t(`step${n}Desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Mock comparison card */}
          <div className="bg-white rounded-2xl shadow-lg p-7 border border-stone">
            <div className="flex items-center gap-2 mb-5">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[9px] font-bold"
                style={{ background: "linear-gradient(135deg, var(--color-blue), var(--color-opal))" }}
              >
                BC
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-blue">
                Comparaison des offres
              </span>
            </div>

            {[
              { name: "Pantaenius", initials: "PA", price: "€12,400", best: false },
              { name: "Zurich Marine", initials: "ZM", price: "€11,850", best: true },
              { name: "Beazley", initials: "BE", price: "€13,200", best: false },
            ].map((offer) => (
              <div
                key={offer.name}
                className="flex items-center justify-between py-3 border-b border-stone/50 last:border-none"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-navy flex items-center justify-center text-white text-[11px] font-bold">
                    {offer.initials}
                  </div>
                  <span className="text-[13px] font-semibold text-navy">{offer.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {offer.best && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full text-white bg-opal">
                      Best
                    </span>
                  )}
                  <span className="text-[13px] font-bold text-navy">{offer.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
