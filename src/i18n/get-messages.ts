import { headers, cookies } from "next/headers";
import frMessages from "@/messages/fr.json";
import enMessages from "@/messages/en.json";

const messagesMap: Record<string, Record<string, unknown>> = {
  fr: frMessages,
  en: enMessages,
};

export async function getLocaleFromRequest(): Promise<string> {
  // Try proxy header first
  try {
    const h = await headers();
    const fromProxy = h.get("x-next-intl-locale");
    if (fromProxy && messagesMap[fromProxy]) return fromProxy;
  } catch {}

  // Try cookie
  try {
    const c = await cookies();
    const fromCookie = c.get("NEXT_LOCALE")?.value;
    if (fromCookie && messagesMap[fromCookie]) return fromCookie;
  } catch {}

  return "fr";
}

export function getMessagesForLocale(locale: string): Record<string, unknown> {
  return messagesMap[locale] || messagesMap.fr;
}
