"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const TOTAL_STEPS = 7;

const VESSEL_FIELDS = [
  "vesselName", "vesselType", "vesselBuilder", "vesselYear", "vesselFlag",
  "vesselLength", "vesselBeam", "vesselTonnage", "vesselIMO", "vesselPortRegistry",
  "vesselHomePort", "vesselMaterial", "vesselPassengers", "vesselClass", "vesselEngines",
] as const;

function StepHeader({ num, title }: { num: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div
        className="w-9 h-9 rounded-[10px] flex items-center justify-center text-white text-sm font-bold"
        style={{ background: "linear-gradient(135deg, var(--color-navy), var(--color-blue))" }}
      >
        {num}
      </div>
      <h3 className="text-lg font-bold text-navy">{title}</h3>
    </div>
  );
}

function FormField({
  label,
  required,
  children,
  full,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "col-span-full" : ""}>
      <label className="block text-[13px] font-semibold text-dark mb-1.5">
        {label}
        {required && <span className="text-gold ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-[10px] border border-stone text-sm outline-none transition-all focus:border-blue focus:shadow-[0_0_0_3px_rgba(36,63,116,0.1)] bg-white";

const selectClass = inputClass;

export default function QuoteForm() {
  const t = useTranslations("quote");
  const tc = useTranslations("common");
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Record<string, string | string[] | boolean>>({
    coverages: [],
    claimsHas: "no",
    financingType: "own",
    declaration: false,
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const [imoLookup, setImoLookup] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [imoError, setImoError] = useState("");
  const [filledFields, setFilledFields] = useState<string[]>([]);

  const update = (key: string, val: string | string[] | boolean) =>
    setData((prev) => ({ ...prev, [key]: val }));

  const toggleCoverage = (cov: string) => {
    const current = (data.coverages as string[]) || [];
    update(
      "coverages",
      current.includes(cov) ? current.filter((c) => c !== cov) : [...current, cov]
    );
  };

  const lookupIMO = async () => {
    const imo = ((data.vesselIMO as string) || "").trim();
    if (!/^\d{7}$/.test(imo)) {
      setImoError("Le numéro IMO doit contenir exactement 7 chiffres.");
      return;
    }
    setImoLookup("loading");
    setImoError("");
    setFilledFields([]);
    try {
      const resp = await fetch("/api/ai/vessel-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imo }),
      });
      const result = await resp.json();
      if (!resp.ok || result.error || result.found === false) {
        setImoError(result.error || "Navire non trouvé pour ce numéro IMO.");
        setImoLookup("error");
        return;
      }
      const filled: string[] = [];
      for (const field of VESSEL_FIELDS) {
        if (result[field] && result[field] !== "") {
          update(field, result[field]);
          filled.push(field);
        }
      }
      setFilledFields(filled);
      setImoLookup("success");
    } catch {
      setImoError("Erreur de connexion. Réessayez.");
      setImoLookup("error");
    }
  };

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    const ref = `QR-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`;
    setReference(ref);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-5">
          <span className="text-green text-3xl">&#10003;</span>
        </div>
        <h2 className="font-serif text-2xl font-bold text-navy mb-3">{t("successTitle")}</h2>
        <p className="text-dark/50 mb-2">{t("successMsg")}</p>
        <p className="text-sm text-dark font-semibold mb-8">
          {t("successRef")}: <span className="text-blue">{reference}</span>
        </p>
        <Link
          href="/yacht"
          className="inline-flex px-7 py-3.5 rounded-[10px] text-xs font-semibold uppercase tracking-[0.15em] text-white no-underline"
          style={{ background: "linear-gradient(135deg, var(--color-navy), var(--color-blue))" }}
        >
          {t("successBack")}
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="flex gap-1 mb-8">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <div
            key={i}
            className="flex-1 h-1 rounded-sm transition-colors"
            style={{
              background:
                i < step
                  ? "linear-gradient(90deg, var(--color-navy), var(--color-blue))"
                  : "var(--color-stone)",
            }}
          />
        ))}
      </div>

      {/* Step 1: Assured & Owner */}
      {step === 1 && (
        <div>
          <StepHeader num={1} title={t("step1Title")} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label={t("assuredName")} required full>
              <input className={inputClass} value={(data.assuredName as string) || ""} onChange={(e) => update("assuredName", e.target.value)} />
            </FormField>
            <FormField label={t("assuredAddress")} required full>
              <input className={inputClass} value={(data.assuredAddress as string) || ""} onChange={(e) => update("assuredAddress", e.target.value)} />
            </FormField>
            <FormField label={t("assuredCity")} required>
              <input className={inputClass} value={(data.assuredCity as string) || ""} onChange={(e) => update("assuredCity", e.target.value)} />
            </FormField>
            <FormField label={t("assuredCountry")} required>
              <input className={inputClass} value={(data.assuredCountry as string) || ""} onChange={(e) => update("assuredCountry", e.target.value)} />
            </FormField>
          </div>

          <div className="mt-8 mb-4 text-sm font-bold text-navy">{t("uboTitle")}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label={t("uboName")} required>
              <input className={inputClass} value={(data.uboName as string) || ""} onChange={(e) => update("uboName", e.target.value)} />
            </FormField>
            <FormField label={t("uboDob")} required>
              <input type="date" className={inputClass} value={(data.uboDob as string) || ""} onChange={(e) => update("uboDob", e.target.value)} />
            </FormField>
            <FormField label={t("uboNationality")} required>
              <input className={inputClass} value={(data.uboNationality as string) || ""} onChange={(e) => update("uboNationality", e.target.value)} />
            </FormField>
            <FormField label={t("uboEmail")} required>
              <input type="email" className={inputClass} value={(data.uboEmail as string) || ""} onChange={(e) => update("uboEmail", e.target.value)} />
            </FormField>
            <FormField label={t("uboPhone")} required>
              <input type="tel" className={inputClass} value={(data.uboPhone as string) || ""} onChange={(e) => update("uboPhone", e.target.value)} />
            </FormField>
          </div>
        </div>
      )}

      {/* Step 2: The Vessel */}
      {step === 2 && (
        <div>
          <StepHeader num={2} title={t("step2Title")} />

          {/* IMO Lookup */}
          <div className="mb-6 p-5 rounded-xl border border-gold/30 bg-gold/5">
            <p className="text-[13px] font-semibold text-dark mb-3">
              {t("imoLookupTitle")}
            </p>
            <div className="flex gap-3 items-start">
              <div className="flex-1">
                <input
                  className={inputClass}
                  value={(data.vesselIMO as string) || ""}
                  onChange={(e) => { update("vesselIMO", e.target.value); setImoLookup("idle"); setImoError(""); }}
                  placeholder="Ex: 1012345"
                  maxLength={7}
                />
              </div>
              <button
                onClick={lookupIMO}
                disabled={imoLookup === "loading"}
                className="px-5 py-3 rounded-[10px] text-xs font-semibold uppercase tracking-[0.1em] text-white cursor-pointer transition-all disabled:opacity-50 whitespace-nowrap"
                style={{ background: "var(--color-gold)" }}
              >
                {imoLookup === "loading" ? "Recherche..." : t("imoLookupBtn")}
              </button>
            </div>
            {imoError && (
              <p className="mt-2 text-xs text-red">{imoError}</p>
            )}
            {imoLookup === "success" && (
              <p className="mt-2 text-xs text-green">
                {t("imoLookupSuccess", { count: filledFields.length })}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label={t("vesselName")} required>
              <input className={`${inputClass} ${filledFields.includes("vesselName") ? "border-green/50 bg-green/5" : ""}`} value={(data.vesselName as string) || ""} onChange={(e) => update("vesselName", e.target.value)} />
            </FormField>
            <FormField label={t("vesselType")} required>
              <select className={`${selectClass} ${filledFields.includes("vesselType") ? "border-green/50 bg-green/5" : ""}`} value={(data.vesselType as string) || ""} onChange={(e) => update("vesselType", e.target.value)}>
                <option value="">—</option>
                <option value="motor">{t("vesselTypeMotor")}</option>
                <option value="sail">{t("vesselTypeSail")}</option>
              </select>
            </FormField>
            <FormField label={t("vesselBuilder")} required>
              <input className={`${inputClass} ${filledFields.includes("vesselBuilder") ? "border-green/50 bg-green/5" : ""}`} value={(data.vesselBuilder as string) || ""} onChange={(e) => update("vesselBuilder", e.target.value)} />
            </FormField>
            <FormField label={t("vesselYear")} required>
              <input className={`${inputClass} ${filledFields.includes("vesselYear") ? "border-green/50 bg-green/5" : ""}`} value={(data.vesselYear as string) || ""} onChange={(e) => update("vesselYear", e.target.value)} />
            </FormField>
            <FormField label={t("vesselFlag")} required>
              <input className={`${inputClass} ${filledFields.includes("vesselFlag") ? "border-green/50 bg-green/5" : ""}`} value={(data.vesselFlag as string) || ""} onChange={(e) => update("vesselFlag", e.target.value)} />
            </FormField>
            <FormField label={t("vesselLength")} required>
              <input className={`${inputClass} ${filledFields.includes("vesselLength") ? "border-green/50 bg-green/5" : ""}`} value={(data.vesselLength as string) || ""} onChange={(e) => update("vesselLength", e.target.value)} />
            </FormField>
            <FormField label={t("vesselBeam")} required>
              <input className={`${inputClass} ${filledFields.includes("vesselBeam") ? "border-green/50 bg-green/5" : ""}`} value={(data.vesselBeam as string) || ""} onChange={(e) => update("vesselBeam", e.target.value)} />
            </FormField>
            <FormField label={t("vesselTonnage")}>
              <input className={`${inputClass} ${filledFields.includes("vesselTonnage") ? "border-green/50 bg-green/5" : ""}`} value={(data.vesselTonnage as string) || ""} onChange={(e) => update("vesselTonnage", e.target.value)} />
            </FormField>
            <FormField label={t("vesselPortRegistry")}>
              <input className={`${inputClass} ${filledFields.includes("vesselPortRegistry") ? "border-green/50 bg-green/5" : ""}`} value={(data.vesselPortRegistry as string) || ""} onChange={(e) => update("vesselPortRegistry", e.target.value)} />
            </FormField>
            <FormField label={t("vesselHomePort")} required>
              <input className={`${inputClass} ${filledFields.includes("vesselHomePort") ? "border-green/50 bg-green/5" : ""}`} value={(data.vesselHomePort as string) || ""} onChange={(e) => update("vesselHomePort", e.target.value)} />
            </FormField>
            <FormField label={t("vesselMaterial")} required>
              <input className={`${inputClass} ${filledFields.includes("vesselMaterial") ? "border-green/50 bg-green/5" : ""}`} value={(data.vesselMaterial as string) || ""} onChange={(e) => update("vesselMaterial", e.target.value)} />
            </FormField>
            <FormField label={t("vesselValue")} required>
              <input className={inputClass} value={(data.vesselValue as string) || ""} onChange={(e) => update("vesselValue", e.target.value)} placeholder="€" />
            </FormField>
            <FormField label={t("vesselPassengers")}>
              <input className={`${inputClass} ${filledFields.includes("vesselPassengers") ? "border-green/50 bg-green/5" : ""}`} value={(data.vesselPassengers as string) || ""} onChange={(e) => update("vesselPassengers", e.target.value)} />
            </FormField>
            <FormField label={t("vesselClass")}>
              <input className={`${inputClass} ${filledFields.includes("vesselClass") ? "border-green/50 bg-green/5" : ""}`} value={(data.vesselClass as string) || ""} onChange={(e) => update("vesselClass", e.target.value)} />
            </FormField>
            <FormField label={t("vesselEngines")} full>
              <input className={`${inputClass} ${filledFields.includes("vesselEngines") ? "border-green/50 bg-green/5" : ""}`} value={(data.vesselEngines as string) || ""} onChange={(e) => update("vesselEngines", e.target.value)} />
            </FormField>
          </div>
        </div>
      )}

      {/* Step 3: Use & Coverages */}
      {step === 3 && (
        <div>
          <StepHeader num={3} title={t("step3Title")} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label={t("cruisingRange")} required>
              <select className={selectClass} value={(data.cruisingRange as string) || ""} onChange={(e) => update("cruisingRange", e.target.value)}>
                <option value="">—</option>
                <option value="mediterranean">{t("cruisingMed")}</option>
                <option value="caribbean">{t("cruisingCarib")}</option>
                <option value="worldwide">{t("cruisingWorld")}</option>
                <option value="other">{t("cruisingOther")}</option>
              </select>
            </FormField>
            <FormField label={t("usageType")} required>
              <select className={selectClass} value={(data.usageType as string) || ""} onChange={(e) => update("usageType", e.target.value)}>
                <option value="">—</option>
                <option value="private">{t("usagePrivate")}</option>
                <option value="charter">{t("usageCharter")}</option>
                <option value="other">{t("usageOther")}</option>
              </select>
            </FormField>
            {data.cruisingRange === "other" && (
              <FormField label={t("cruisingOtherDetail")} full>
                <textarea className={`${inputClass} min-h-[80px] resize-y`} value={(data.cruisingOtherDetail as string) || ""} onChange={(e) => update("cruisingOtherDetail", e.target.value)} />
              </FormField>
            )}
          </div>

          <div className="mt-6">
            <p className="text-[13px] font-semibold text-dark mb-3">
              {t("coveragesTitle")} <span className="text-gold">*</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(["covHM", "covPI", "covCrew", "covCharter", "covMedevac"] as const).map((cov) => (
                <label
                  key={cov}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-[10px] border border-stone cursor-pointer transition-all hover:border-opal text-[13px] font-medium text-dark"
                >
                  <input
                    type="checkbox"
                    checked={(data.coverages as string[]).includes(cov)}
                    onChange={() => toggleCoverage(cov)}
                    className="accent-blue"
                  />
                  {t(cov)}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Claims History */}
      {step === 4 && (
        <div>
          <StepHeader num={4} title={t("step4Title")} />
          <div className="grid grid-cols-1 gap-4">
            <FormField label={t("claimsHas")} required>
              <div className="flex gap-3">
                {(["yes", "no"] as const).map((val) => (
                  <label
                    key={val}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-[10px] border border-stone cursor-pointer transition-all hover:border-opal text-sm"
                  >
                    <input
                      type="radio"
                      name="claimsHas"
                      value={val}
                      checked={data.claimsHas === val}
                      onChange={(e) => update("claimsHas", e.target.value)}
                      className="accent-blue"
                    />
                    {val === "yes" ? tc("yes") : tc("no")}
                  </label>
                ))}
              </div>
            </FormField>
            {data.claimsHas === "yes" && (
              <FormField label={t("claimsDetail")}>
                <textarea
                  className={`${inputClass} min-h-[120px] resize-y`}
                  value={(data.claimsDetail as string) || ""}
                  onChange={(e) => update("claimsDetail", e.target.value)}
                />
              </FormField>
            )}
          </div>
        </div>
      )}

      {/* Step 5: Crew */}
      {step === 5 && (
        <div>
          <StepHeader num={5} title={t("step5Title")} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label={t("crewPermanent")} required>
              <input className={inputClass} value={(data.crewPermanent as string) || ""} onChange={(e) => update("crewPermanent", e.target.value)} />
            </FormField>
            <FormField label={t("crewTemporary")}>
              <input className={inputClass} value={(data.crewTemporary as string) || ""} onChange={(e) => update("crewTemporary", e.target.value)} />
            </FormField>
          </div>
        </div>
      )}

      {/* Step 6: Tenders & Financing */}
      {step === 6 && (
        <div>
          <StepHeader num={6} title={t("step6Title")} />
          <div className="grid grid-cols-1 gap-4">
            <FormField label={t("tendersDesc")} full>
              <textarea
                className={`${inputClass} min-h-[80px] resize-y`}
                value={(data.tendersDesc as string) || ""}
                onChange={(e) => update("tendersDesc", e.target.value)}
              />
            </FormField>
            <FormField label={t("financingType")} required>
              <div className="flex gap-3">
                {([
                  { val: "own", label: t("financingOwn") },
                  { val: "leased", label: t("financingLeased") },
                ] as const).map((opt) => (
                  <label
                    key={opt.val}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-[10px] border border-stone cursor-pointer transition-all hover:border-opal text-sm"
                  >
                    <input
                      type="radio"
                      name="financingType"
                      value={opt.val}
                      checked={data.financingType === opt.val}
                      onChange={(e) => update("financingType", e.target.value)}
                      className="accent-blue"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </FormField>
            {data.financingType === "leased" && (
              <FormField label={t("financingBank")}>
                <input className={inputClass} value={(data.financingBank as string) || ""} onChange={(e) => update("financingBank", e.target.value)} />
              </FormField>
            )}
          </div>
        </div>
      )}

      {/* Step 7: Documents & Declaration */}
      {step === 7 && (
        <div>
          <StepHeader num={7} title={t("step7Title")} />

          {/* File upload */}
          <div className="mb-6">
            <p className="text-[13px] font-semibold text-dark mb-2">{t("uploadCert")}</p>
            <div className="border-2 border-dashed border-stone rounded-2xl p-8 text-center bg-cream/50 transition-colors hover:border-opal">
              <p className="text-sm text-dark/50 mb-2">{t("uploadCertHint")}</p>
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="text-sm" />
            </div>
          </div>

          {/* Declaration checkboxes */}
          <div className="flex flex-col gap-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={!!data.declaration}
                onChange={(e) => update("declaration", e.target.checked)}
                className="accent-blue mt-1"
              />
              <span className="text-sm text-dark">{t("declaration")}</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={!!data.consent}
                onChange={(e) => update("consent", e.target.checked)}
                className="accent-blue mt-1"
              />
              <span className="text-sm text-dark">{t("consent")}</span>
            </label>
          </div>

          <div className="mt-4 p-4 rounded-[10px] text-xs text-dark leading-relaxed" style={{ background: "rgba(168,197,184,0.12)" }}>
            Blue Cover SA est un courtier ind&eacute;pendant enregistr&eacute; FINMA F01445236 et ORIAS 24000663.
            Vos donn&eacute;es sont trait&eacute;es conform&eacute;ment au RGPD et &agrave; la LPD suisse.
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-7 pt-5 border-t border-stone">
        {step > 1 ? (
          <button
            onClick={prev}
            className="px-7 py-3 rounded-[10px] text-sm font-bold bg-stone/50 text-dark cursor-pointer hover:bg-stone transition-colors"
          >
            {tc("previous")}
          </button>
        ) : (
          <div />
        )}

        {step < TOTAL_STEPS ? (
          <button
            onClick={next}
            className="px-7 py-3 rounded-[10px] text-sm font-bold text-white cursor-pointer transition-all hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, var(--color-navy), var(--color-blue))" }}
          >
            {tc("next")}
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!data.declaration || !data.consent}
            className="px-7 py-3 rounded-[10px] text-sm font-bold text-white cursor-pointer transition-all hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, var(--color-navy), var(--color-blue))" }}
          >
            {t("submitBtn")}
          </button>
        )}
      </div>
    </div>
  );
}
