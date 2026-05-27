import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { BUSINESS } from "@/lib/business";
import { serializeSchemaForScript } from "@/lib/schema";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: `${BUSINESS.name} | Power Washing, Painting, Lawn Care | Macomb County MI`,
    template: `%s | ${BUSINESS.name}`,
  },
  description: BUSINESS.tagline,
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.owner }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${BUSINESS.name} — Macomb County, MI`,
    description: BUSINESS.tagline,
    url: BUSINESS.url,
    siteName: BUSINESS.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS.name} — Macomb County, MI`,
    description: BUSINESS.tagline,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {/* LocalBusiness structured data (JSON-LD). Payload is built from
            compile-time constants and `<`-escaped in serializeSchemaForScript,
            per Next.js's JSON-LD guidance. */}
        {/* eslint-disable-next-line react/no-danger */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeSchemaForScript() }}
        />
        {children}
      </body>
    </html>
  );
}
