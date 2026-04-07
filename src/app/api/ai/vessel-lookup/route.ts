import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `Tu es un expert maritime spécialisé dans l'identification de navires pour Blue Cover, courtier en assurance yacht à Genève.

MISSION : À partir d'un numéro IMO, retrouve toutes les informations disponibles sur le navire.

UTILISE LA RECHERCHE GOOGLE pour trouver les données sur des sources comme MarineTraffic, EquasisWeb, FleetMon, VesselFinder, ou les registres maritimes officiels.

RÉPONDS UNIQUEMENT avec le JSON ci-dessous, sans markdown, sans backticks, sans texte avant ou après.

FORMAT DE RÉPONSE (objet JSON unique) :
{
  "found": true,
  "vesselName": "Nom du navire",
  "vesselType": "motor" ou "sail",
  "vesselBuilder": "Constructeur et modèle",
  "vesselYear": "Année de construction",
  "vesselFlag": "Pavillon (pays)",
  "vesselLength": "Longueur en mètres",
  "vesselBeam": "Largeur en mètres",
  "vesselTonnage": "Jauge brute (GT)",
  "vesselIMO": "Numéro IMO",
  "vesselPortRegistry": "Port d'immatriculation",
  "vesselHomePort": "Port d'attache si connu",
  "vesselMaterial": "Matériau de coque (Acier, Aluminium, Fibre de verre, Composite)",
  "vesselPassengers": "Nombre de passagers si connu",
  "vesselClass": "Registre de classification (Lloyd's, DNV, Bureau Veritas, etc.)",
  "vesselEngines": "Moteurs (type, puissance) si connu",
  "confidence": "high | medium | low"
}

SI LE NAVIRE N'EST PAS TROUVÉ :
{"found": false, "error": "Aucun navire trouvé pour ce numéro IMO."}

RÈGLES :
- Remplis autant de champs que possible
- Laisse une chaîne vide "" pour les champs non trouvés
- vesselType : "motor" pour yacht à moteur, "sail" pour voilier
- Longueur et largeur en mètres (nombre uniquement, ex: "83.5")
- Ne dépasse pas 15 secondes de recherche
- Ne donne JAMAIS tes étapes de réflexion`;

const PRIMARY_MODEL = "gemini-2.5-flash";
const FALLBACK_MODEL = "gemini-2.0-flash";

function isRetryableError(err: unknown): boolean {
  const status = (err as { status?: number })?.status || 0;
  return status === 429 || status === 503;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GOOGLE_AI_API_KEY not configured" },
      { status: 500 }
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  let body: { imo: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const imo = body.imo?.trim();
  if (!imo || !/^\d{7}$/.test(imo)) {
    return NextResponse.json(
      { error: "IMO number must be exactly 7 digits" },
      { status: 400 }
    );
  }

  try {
    const config = {
      config: {
        temperature: 0.1,
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json" as const,
        systemInstruction: [{ text: SYSTEM_PROMPT }],
      },
      contents: [
        {
          role: "user" as const,
          parts: [
            { text: `Recherche les informations du navire avec le numéro IMO ${imo}` },
          ],
        },
      ],
    };

    let response;
    try {
      response = await ai.models.generateContent({ model: PRIMARY_MODEL, ...config });
    } catch (err) {
      if (!isRetryableError(err)) throw err;
      console.warn(`[Vessel Lookup Fallback] ${PRIMARY_MODEL} failed, retrying with ${FALLBACK_MODEL}`);
      response = await ai.models.generateContent({ model: FALLBACK_MODEL, ...config });
    }

    const rawText =
      response.candidates?.[0]?.content?.parts
        ?.filter((p: { text?: string }) => p.text)
        ?.map((p: { text?: string }) => p.text)
        ?.join("") || "";

    const parsed = JSON.parse(rawText);
    return NextResponse.json(parsed);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Vessel Lookup Error]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
