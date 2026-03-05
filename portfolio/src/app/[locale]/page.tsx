import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PortfolioPage from "@/app/components/PortfolioPage";
import { isLocale, locales } from "@/i18n/config";
import { getTranslation } from "@/i18n/translations";

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
    title: translation.metadata.title,
    description: translation.metadata.description,
  };
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <PortfolioPage locale={locale} />;
}
