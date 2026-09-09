import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PortfolioPage from "@/app/components/PortfolioPage";
import { isLocale, locales } from "@/i18n/config";
import { getTranslation } from "@/i18n/translations";
import {
  COMPANY_NAME,
  CONTACT_EMAIL,
  PERSON_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/lib/seo";

type LocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const translation = getTranslation(locale);

  return {
    title: { absolute: translation.metadata.title },
    description: translation.metadata.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        es: "/es",
        "x-default": "/en",
      },
    },
    openGraph: {
      url: `/${locale}`,
      title: translation.metadata.title,
      description: translation.metadata.description,
      locale: locale === "es" ? "es_US" : "en_US",
      alternateLocale: [locale === "es" ? "en_US" : "es_US"],
    },
    twitter: {
      title: translation.metadata.title,
      description: translation.metadata.description,
    },
  };
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const description =
    locale === "es"
      ? `${COMPANY_NAME} ayuda a empresas y organizaciones a establecer su presencia en linea mediante sitios web profesionales y software personalizado.`
      : `${COMPANY_NAME} helps businesses and organizations establish an online presence through professional websites and custom software.`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: COMPANY_NAME,
        alternateName: "Create with Katia",
        inLanguage: ["en", "es"],
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: COMPANY_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        description,
        email: CONTACT_EMAIL,
        founder: { "@id": `${SITE_URL}/#katia-henrriquez` },
        areaServed: [
          { "@type": "City", name: "Omaha" },
          { "@type": "AdministrativeArea", name: "Nebraska" },
          { "@type": "Place", name: "Worldwide" },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: CONTACT_EMAIL,
          contactType: "customer service",
          availableLanguage: ["English", "Spanish"],
          areaServed: "Worldwide",
        },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#katia-henrriquez`,
        name: PERSON_NAME,
        url: `${SITE_URL}/${locale}`,
        image: `${SITE_URL}/profile.png`,
        jobTitle: "Software Engineer and Owner",
        email: CONTACT_EMAIL,
        worksFor: { "@id": `${SITE_URL}/#organization` },
        sameAs: SOCIAL_LINKS,
        knowsAbout: [
          "Full-stack web development",
          "Custom software development",
          "Artificial intelligence integration",
          "Backend API development",
          "User interface development",
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <PortfolioPage locale={locale} />
    </>
  );
}
