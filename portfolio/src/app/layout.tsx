import type { Metadata } from "next";
import { Bodoni_Moda, Geist_Mono, Inter } from "next/font/google";
import { COMPANY_NAME, PERSON_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PERSON_NAME} | Software Engineer & Owner`,
    template: `%s | ${PERSON_NAME}`,
  },
  description: `${PERSON_NAME} is a software engineer and owner of ${COMPANY_NAME}, creating professional websites and custom software for businesses in Omaha and worldwide.`,
  applicationName: COMPANY_NAME,
  manifest: "/manifest.webmanifest",
  authors: [{ name: PERSON_NAME, url: SITE_URL }],
  creator: PERSON_NAME,
  publisher: COMPANY_NAME,
  category: "Software Development",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: COMPANY_NAME,
    title: `${PERSON_NAME} | Software Engineer & Owner`,
    description: `Professional websites and custom software for businesses and organizations in Omaha and worldwide.`,
    locale: "en_US",
    alternateLocale: ["es_US"],
    images: [
      {
        url: "/profile.png",
        alt: `${PERSON_NAME}, software engineer and owner of ${COMPANY_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSON_NAME} | Software Engineer & Owner`,
    description: `Professional websites and custom software for businesses and organizations in Omaha and worldwide.`,
    images: ["/profile.png"],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${bodoni.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
