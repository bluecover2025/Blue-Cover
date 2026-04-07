import { useTranslations } from "next-intl";

const PARTNER_NAMES = [
  "Pantaenius",
  "Howden",
  "Beazley",
  "Zurich",
  "Generali",
  "Allianz",
  "Helvetia",
  "RSA",
  "Lloyd's",
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
          {[...PARTNER_NAMES, ...PARTNER_NAMES].map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="mx-5 flex h-[60px] w-[140px] shrink-0 items-center justify-center rounded-xl border border-stone px-5 transition-all hover:shadow-md"
            >
              <span className="text-sm font-semibold text-navy/50 hover:text-navy/80 transition-colors">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
