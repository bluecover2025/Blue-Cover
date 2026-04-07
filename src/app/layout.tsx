import type { Metadata } from "next";
import { Cormorant_Garamond, Barlow, Barlow_Condensed } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { cookies } from "next/headers";
import frMessages from "@/messages/fr.json";
import enMessages from "@/messages/en.json";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blue Cover — Yacht Insurance | Assurance Yacht",
  description:
    "Blue Cover compare les offres des meilleurs assureurs internationaux de yachts. Devis gratuit sous 48h. Courtier agréé FINMA F01445236 / ORIAS 24000663.",
};

const messagesMap: Record<string, Record<string, unknown>> = {
  fr: frMessages as unknown as Record<string, unknown>,
  en: enMessages as unknown as Record<string, unknown>,
};

async function resolveLocale(): Promise<string> {
  try {
    const c = await cookies();
    const val = c.get("NEXT_LOCALE")?.value;
    if (val && messagesMap[val]) return val;
  } catch {}
  return "fr";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await resolveLocale();
  const messages = messagesMap[locale];

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${barlow.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
