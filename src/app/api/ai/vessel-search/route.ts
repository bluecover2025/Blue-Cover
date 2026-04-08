import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `Tu es un expert maritime spécialisé dans l'identification de navires pour Blue Cover, courtier en assurance yacht à Genève.

MISSION : À partir d'une recherche libre (nom de navire, numéro IMO, MMSI, ou toute autre information), retrouve les navires correspondants.

UTILISE LA RECHERCHE GOOGLE pour trouver les données sur des sources comme MarineTraffic, EquasisWeb, FleetMon, VesselFinder, ou les registres maritimes officiels.

RÉPONDS UNIQUEMENT avec le JSON ci-dessous, sans markdown, sans backticks, sans texte avant ou après.

FORMAT DE RÉPONSE (objet JSON unique avec un tableau "results") :
{
  "results": [
    {
      "vesselName": "Nom du navire",
      "vesselType": "motor" ou "sail",
      "vesselBuilder": "Constructeur et modèle",
      "vesselYear": "Année de construction",
      "vesselFlag": "Pavillon (pays en français)",
      "vesselFlagCode": "Code ISO 2 lettres du pays (ex: FR, MT, KY, GR)",
      "vesselLength": "Longueur en mètres",
      "vesselBeam": "Largeur en mètres",
      "vesselTonnage": "Jauge brute (GT)",
      "vesselIMO": "Numéro IMO",
      "vesselMMSI": "Numéro MMSI si connu",
      "vesselPortRegistry": "Port d'immatriculation",
      "vesselHomePort": "Port d'attache si connu",
      "vesselMaterial": "Matériau de coque (Acier, Aluminium, Fibre de verre, Composite)",
      "vesselPassengers": "Nombre de passagers si connu",
      "vesselClass": "Registre de classification (Lloyd's, DNV, Bureau Veritas, etc.)",
      "vesselEngines": "Moteurs (type, puissance) si connu",
      "confidence": "high | medium | low"
    }
  ]
}

SI AUCUN NAVIRE N'EST TROUVÉ :
{"results": [], "error": "Aucun navire trouvé pour cette recherche."}

RÈGLES :
- Retourne jusqu'à 5 résultats maximum, triés par pertinence
- Remplis autant de champs que possible pour chaque résultat
- Laisse une chaîne vide "" pour les champs non trouvés
- vesselType : "motor" pour yacht à moteur, "sail" pour voilier
- vesselFlagCode : TOUJOURS le code ISO 3166-1 alpha-2 en MAJUSCULES (ex: FR pour France, MT pour Malte, KY pour Îles Caïmans, GR pour Grèce, GB pour Royaume-Uni, IT pour Italie, US pour États-Unis, etc.)
- Longueur et largeur en mètres (nombre uniquement, ex: "83.5")
- Ne dépasse pas 15 secondes de recherche
- Ne donne JAMAIS tes étapes de réflexion
- Concentre-toi sur les yachts et navires de plaisance`;

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

  let body: { query: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const query = body.query?.trim();
  if (!query || query.length < 2) {
    return NextResponse.json(
      { error: "Search query must be at least 2 characters" },
      { status: 400 }
    );
  }

  // Detect query type for better search prompt
  const isIMO = /^\d{7}$/.test(query);
  const isMMSI = /^\d{9}$/.test(query);

  let searchPrompt: string;
  if (isIMO) {
    searchPrompt = `Recherche les informations du navire avec le numéro IMO ${query}`;
  } else if (isMMSI) {
    searchPrompt = `Recherche les informations du navire avec le numéro MMSI ${query}`;
  } else {
    searchPrompt = `Recherche les yachts et navires de plaisance correspondant à "${query}". Trouve les résultats les plus pertinents.`;
  }

  try {
    const config = {
      config: {
        temperature: 0.1,
        tools: [{ googleSearch: {} }],
        systemInstruction: [{ text: SYSTEM_PROMPT }],
      },
      contents: [
        {
          role: "user" as const,
          parts: [{ text: searchPrompt }],
        },
      ],
    };

    let response;
    try {
      response = await ai.models.generateContent({ model: PRIMARY_MODEL, ...config });
    } catch (err) {
      if (!isRetryableError(err)) throw err;
      console.warn(`[Vessel Search Fallback] ${PRIMARY_MODEL} failed, retrying with ${FALLBACK_MODEL}`);
      response = await ai.models.generateContent({ model: FALLBACK_MODEL, ...config });
    }

    const rawText =
      response.candidates?.[0]?.content?.parts
        ?.filter((p: { text?: string }) => p.text)
        ?.map((p: { text?: string }) => p.text)
        ?.join("") || "";

    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ results: [], error: "Impossible de parser la réponse AI." }, { status: 500 });
    }
    const parsed = JSON.parse(jsonMatch[0]);

    // Normalize: ensure results is always an array
    if (parsed.results && Array.isArray(parsed.results)) {
      return NextResponse.json(parsed);
    }
    // If the AI returned a single object with "found" (legacy format), wrap it
    if (parsed.found !== undefined) {
      if (parsed.found) {
        return NextResponse.json({ results: [parsed] });
      }
      return NextResponse.json({ results: [], error: parsed.error });
    }
    return NextResponse.json({ results: [], error: "Format de réponse inattendu." });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Vessel Search Error]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
