"use client";

import { useTranslations } from "next-intl";

const PARTNER_LOGOS = [
  { name: "Beazley", src: "/logos/logos assureurs/beazley.png" },
  { name: "Zurich", src: "/logos/logos assureurs/zurich.png" },
  { name: "Generali", src: "/logos/logos assureurs/generali.png" },
  { name: "Allianz", src: "/logos/logos assureurs/allianz.png" },
  { name: "Helvetia", src: "/logos/logos assureurs/helvetia.png" },
  { name: "Lloyd's", src: "/logos/logos assureurs/lloyds.png" },
  { name: "AXA", src: "/logos/logos assureurs/axa.png" },
  { name: "Hiscox", src: "/logos/logos assureurs/hiscox.png" },
  { name: "Chubb", src: "/logos/logos assureurs/chubb.png" },
  { name: "HDI", src: "/logos/logos assureurs/hdi.png" },
  { name: "AIG", src: "/logos/logos assureurs/aig.png" },
  { name: "Liberty", src: "/logos/logos assureurs/liberty.png" },
  { name: "Vaudoise", src: "/logos/logos assureurs/vaudoise.png" },
];

export default function Partners() {
  const t = useTranslations("home");

  return (
    <section id="partners" className="overflow-hidden border-t border-navy/6 py-10 text-center bg-white">
      <div className="mb-7 text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
        {t("partnersLabel")}
      </div>
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max animate-scroll items-center">
          {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="mx-6 flex h-[60px] w-[120px] shrink-0 items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.name}
                title={logo.name}
                className="max-w-full h-[36px] object-contain opacity-70 transition-opacity duration-300 hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
