"use client";

import { useTranslations } from "next-intl";

const services = [
  {
    key: "svc1",
    icon: "🛡️",
    image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=600&q=80",
  },
  {
    key: "svc2",
    icon: "⚖️",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
  },
  {
    key: "svc3",
    icon: "👥",
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=600&q=80",
  },
  {
    key: "svc4",
    icon: "📊",
    image: "https://images.unsplash.com/photo-1605281317010-fe5fffff7eb1?w=600&q=80",
  },
  {
    key: "svc5",
    icon: "🚁",
    image: "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=600&q=80",
  },
];

export default function Services() {
  const t = useTranslations("home");

  return (
    <section id="coverages" className="px-6 py-20 bg-cream">
      <div className="mx-auto max-w-[1100px]">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-blue mb-2">
            {t("servicesLabel")}
          </p>
          <h2 className="font-serif text-[clamp(28px,3.5vw,38px)] font-bold text-navy mb-3">
            {t("servicesTitle")}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.key}
              className="bg-white rounded-2xl overflow-hidden border border-stone transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div
                className="h-[180px] relative"
                style={{
                  backgroundImage: `url('${svc.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(180deg, transparent 40%, rgba(26,47,83,0.6))",
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-[17px] font-bold text-navy mb-2">
                  {t(`${svc.key}Title` as "svc1Title")}
                </h3>
                <p className="text-sm text-dark/50 leading-relaxed">
                  {t(`${svc.key}Desc` as "svc1Desc")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
