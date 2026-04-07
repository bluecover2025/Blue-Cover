import type { YachtQuoteData } from "./schemas/yacht";

export async function submitYachtQuote(formData: YachtQuoteData) {
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_YACHT;
  if (!endpoint) {
    throw new Error("Formspree endpoint not configured");
  }

  const ref = `QR-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`;

  const payload = {
    _subject: `BC Yacht — Nouvelle demande — ${formData.assuredName} — ${formData.vesselName}`,
    reference: ref,
    submitted_at: new Date().toISOString(),
    source: "BC Yachting",

    assured_name: formData.assuredName,
    assured_address: formData.assuredAddress,
    assured_city: formData.assuredCity,
    assured_country: formData.assuredCountry,

    ubo_name: formData.uboName,
    ubo_dob: formData.uboDob,
    ubo_nationality: formData.uboNationality,
    ubo_email: formData.uboEmail,
    ubo_phone: formData.uboPhone,

    vessel_name: formData.vesselName,
    vessel_type: formData.vesselType,
    vessel_builder: formData.vesselBuilder,
    vessel_year: formData.vesselYear,
    vessel_flag: formData.vesselFlag,
    vessel_length: formData.vesselLength,
    vessel_beam: formData.vesselBeam,
    vessel_tonnage: formData.vesselTonnage || "",
    vessel_imo: formData.vesselIMO || "",
    vessel_port_registry: formData.vesselPortRegistry || "",
    vessel_home_port: formData.vesselHomePort,
    vessel_material: formData.vesselMaterial,
    vessel_value: formData.vesselValue,
    vessel_passengers: formData.vesselPassengers || "",
    vessel_class: formData.vesselClass || "",
    vessel_engines: formData.vesselEngines || "",

    cruising_range: formData.cruisingRange,
    cruising_other_detail: formData.cruisingOtherDetail || "",
    usage_type: formData.usageType,
    coverages: formData.coverages.join(", "),

    claims_has: formData.claimsHas,
    claims_detail: formData.claimsDetail || "",

    crew_permanent: formData.crewPermanent,
    crew_temporary: formData.crewTemporary || "",

    tenders_desc: formData.tendersDesc || "",
    financing_type: formData.financingType,
    financing_bank: formData.financingBank || "",

    consent_rgpd: formData.consent ? "Oui" : "Non",
  };

  const resp = await fetch(`https://formspree.io/f/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    throw new Error(`Erreur serveur (${resp.status})`);
  }

  return { ok: true, reference: ref };
}
