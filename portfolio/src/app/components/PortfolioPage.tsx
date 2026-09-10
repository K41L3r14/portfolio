"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { Locale } from "@/i18n/config";
import { getTranslation } from "@/i18n/translations";

import AboutMeSection from "./sections/AboutMeSection";
import ContactMePage from "./sections/ContactMePage";
import ProjectsPage from "./sections/ProjectsPage";
import ServicesPage from "./sections/ServicesPage";

type PortfolioPageProps = { locale: Locale };

export default function PortfolioPage({ locale }: PortfolioPageProps) {
  const copy = getTranslation(locale);
  const [activeHash, setActiveHash] = useState("");
  const isSpanish = locale === "es";

  useEffect(() => {
    document.documentElement.lang = locale;
    const syncHash = () => setActiveHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [locale]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#faf9fc] text-[#181525]">
      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#080b16]/95 text-white backdrop-blur-xl">
        <div className="site-shell flex min-h-20 items-center justify-between gap-5 py-1">
          <a href="#home" className="brand-focus-ring flex items-center" aria-label="Yisel Software Solutions home">
            <span className="brand-logo-crop hidden sm:block">
              <Image src="/bnw-Logo.png" alt="Yisel Software Solutions" fill sizes="192px" priority />
            </span>
            <span className="title-font text-xl text-white sm:hidden">Katia Henrriquez</span>
          </a>

          <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
            {copy.navLinks.map((link) => (
              <a key={link.label} href={link.href} className="brand-focus-ring text-xs text-white/62 transition hover:text-[#B46781]">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex rounded-full border border-white/15 bg-white/5 p-1 text-[0.62rem] font-semibold">
              <a href={`/en${activeHash}`} aria-label={copy.languageSwitcher.english} aria-current={locale === "en" ? "page" : undefined} className={`rounded-full px-2.5 py-1 transition ${locale === "en" ? "bg-[#B46781] text-white" : "text-white/50 hover:text-white"}`}>EN</a>
              <a href={`/es${activeHash}`} aria-label={copy.languageSwitcher.spanish} aria-current={locale === "es" ? "page" : undefined} className={`rounded-full px-2.5 py-1 transition ${locale === "es" ? "bg-[#B46781] text-white" : "text-white/50 hover:text-white"}`}>ES</a>
            </div>
            <a href="#contactMe" className="brand-focus-ring hidden rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#080b16] transition hover:bg-[#B46781] hover:text-white sm:inline-flex">
              {isSpanish ? "Hablemos" : "Let’s talk"}
            </a>
          </div>
        </div>

        <nav aria-label="Mobile navigation" className="site-shell flex gap-5 overflow-x-auto border-t border-white/8 py-2 lg:hidden">
          {copy.navLinks.map((link) => <a key={link.label} href={link.href} className="shrink-0 text-[0.68rem] text-white/62 transition hover:text-[#B46781]">{link.label}</a>)}
        </nav>
      </header>

      <section id="home" className="relative isolate overflow-hidden bg-[#080b16] text-white">
        <div className="hero-orbit pointer-events-none absolute -left-40 top-1/2 h-[44rem] w-[44rem] -translate-y-1/2 rounded-full opacity-75" />
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 bg-[radial-gradient(circle,rgba(65,59,108,0.2),transparent_68%)]" />
        <div className="site-shell relative grid min-h-[42rem] items-center gap-14 py-20 lg:grid-cols-[1.15fr_0.75fr] lg:py-24">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-[#B46781]/30 bg-[#B46781]/12 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#B46781]">
              {isSpanish ? "Hola · Bienvenida" : "Welcome · Bienvenido"}
            </p>
            <h1 className="title-font max-w-3xl text-5xl leading-[0.96] tracking-[-0.035em] sm:text-6xl lg:text-[5.3rem]">
              {isSpanish ? "Hola, soy Katia Henrriquez." : "Hello there! I am Katia Henrriquez."}
            </h1>
            <p className="mt-7 break-words text-sm font-medium leading-6 text-[#B46781]">{copy.hero.role}</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">{copy.hero.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="mailto:henrriquezkatia7@gmail.com" className="brand-focus-ring rounded-full bg-[#B46781] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#413B6C]">{copy.hero.emailCta}</a>
              <a href="/My_resume.pdf" target="_blank" rel="noreferrer" className="brand-focus-ring rounded-full border border-white/18 px-6 py-3 text-xs font-semibold text-white transition hover:border-[#B46781] hover:text-[#B46781]">{copy.hero.resumeCta}</a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:justify-self-end">
            <div className="absolute -inset-6 rounded-[2.25rem] bg-[#413B6C]/18 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-[#413B6C]/35 bg-[#101426] p-3 shadow-2xl shadow-black/40">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-[#18162a]">
                <Image src="/profile.png" alt="Katia Henrriquez, software engineer and owner of Yisel Software Solutions LLC" fill sizes="(min-width: 1024px) 24rem, 80vw" className="object-cover" priority />
              </div>
              <div className="absolute bottom-5 left-0 flex items-center gap-2 rounded-r-full bg-[#080b16]/92 py-2 pl-4 pr-5 text-[0.58rem] uppercase tracking-[0.14em] text-white/75 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#B46781]" /> Omaha, NE · Worldwide
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutMeSection copy={copy.about} locale={locale} />
      <ServicesPage copy={copy.services} locale={locale} />
      <ProjectsPage copy={copy.projects} locale={locale} />

      <section className="bg-[#080b16] px-4 pb-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-[linear-gradient(135deg,#413B6C,#B46781)] px-6 py-16 text-center text-white sm:px-12 sm:py-20">
          <p className="eyebrow !text-white/65">{isSpanish ? "Construyamos algo" : "Let’s build something"}</p>
          <h2 className="title-font mt-3 text-4xl sm:text-5xl">{isSpanish ? "¿Lista para darle vida a tu idea?" : "Ready to bring your idea to life?"}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-white/75">
            {isSpanish ? "Hablemos de tus metas de software, sitio web o plataforma personalizada y creemos un plan claro para llevarlas a producción." : "Let’s discuss your software goals, custom website, or specialized platform and create a clear path from concept to production."}
          </p>
          <ol className="mx-auto mt-10 grid max-w-4xl gap-4 text-left md:grid-cols-3">
            {[
              isSpanish ? "Comparte tu visión" : "Share Your Vision",
              isSpanish ? "Dale forma al plan" : "Shape the Plan",
              isSpanish ? "Hazla realidad" : "Bring It to Life",
            ].map((step, index) => (
              <li key={step} className="relative flex min-h-32 items-center gap-4 rounded-2xl border border-white/20 bg-[#080b16]/25 px-5 py-6 backdrop-blur-sm">
                <span className="title-font flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-xl text-[#413B6C]">{index + 1}</span>
                <span className="text-sm font-semibold leading-6 text-white">{step}</span>
              </li>
            ))}
          </ol>
          <a href="#contactMe" className="brand-focus-ring mt-9 inline-flex text-sm font-semibold text-white transition hover:text-white/75 sm:text-base">
            {isSpanish ? "¿Lista para comenzar? Cuéntame sobre tu proyecto abajo ↓" : "Ready to get started? Tell me about your project below ↓"}
          </a>
        </div>
      </section>

      <ContactMePage copy={copy.contact} locale={locale} />

      <footer className="bg-[#080b16] text-white">
        <div className="site-shell grid gap-10 border-b border-white/10 py-14 md:grid-cols-[1fr_auto_auto]">
          <div>
            <div className="brand-logo-crop"><Image src="/bnw-Logo.png" alt="Yisel Software Solutions" fill sizes="192px" /></div>
            <p className="mt-2 max-w-xs text-xs leading-5 text-white/45">{isSpanish ? "Software profesional creado con intención." : "Professional software, thoughtfully created."}</p>
          </div>
          <div>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/80">{isSpanish ? "Mapa del sitio" : "Site map"}</p>
            <div className="mt-4 grid gap-2">{copy.navLinks.map((link) => <a key={link.label} href={link.href} className="text-xs text-white/45 hover:text-[#B46781]">{link.label}</a>)}</div>
          </div>
          <div>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/80">{isSpanish ? "Conectar" : "Connect"}</p>
            <div className="mt-4 grid gap-2">{copy.socialLinks.map((link) => <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="text-xs text-white/45 hover:text-[#B46781]">{link.label}</a>)}</div>
          </div>
        </div>
        <div className="site-shell flex flex-col gap-2 py-6 text-[0.66rem] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Katia Henrriquez. {isSpanish ? "Todos los derechos reservados." : "All rights reserved."}</p>
          <p>Omaha, Nebraska · Yisel Software Solutions LLC</p>
        </div>
      </footer>
    </main>
  );
}
