"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import type { Locale } from "@/i18n/config";
import { getTranslation } from "@/i18n/translations";

import AboutMeSection from "./sections/AboutMeSection";
import TypingText from "./TypingText";
import ContactMePage from "./sections/ContactMePage";
import ProjectsPage from "./sections/ProjectsPage";
import ServicesPage from "./sections/ServicesPage";

type PortfolioPageProps = {
  locale: Locale;
};

export default function PortfolioPage({ locale }: PortfolioPageProps) {
  const copy = getTranslation(locale);
  const mainRef = useRef<HTMLElement | null>(null);
  const homeSectionRef = useRef<HTMLElement | null>(null);
  const aboutSectionRef = useRef<HTMLElement | null>(null);
  const hasSeenHomeSectionRef = useRef(false);
  const [isAboutInView, setIsAboutInView] = useState(false);
  const [startSecondLineTyping, setStartSecondLineTyping] = useState(false);
  const [titleAnimationKey, setTitleAnimationKey] = useState(0);
  const [activeHash, setActiveHash] = useState("");

  const handleFirstLineComplete = useCallback(() => {
    setStartSecondLineTyping(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const syncHash = () => {
      setActiveHash(window.location.hash);
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => {
      window.removeEventListener("hashchange", syncHash);
    };
  }, []);

  useEffect(() => {
    const mainElement = mainRef.current;
    const homeElement = homeSectionRef.current;
    const aboutElement = aboutSectionRef.current;

    if (!mainElement || !homeElement || !aboutElement) {
      return;
    }

    const aboutObserver = new IntersectionObserver(
      ([entry]) => {
        setIsAboutInView(entry.isIntersecting);
      },
      {
        root: mainElement,
        threshold: 0.45,
      }
    );
    const homeObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        if (hasSeenHomeSectionRef.current) {
          setStartSecondLineTyping(false);
          setTitleAnimationKey((current) => current + 1);
          return;
        }

        hasSeenHomeSectionRef.current = true;
      },
      {
        root: mainElement,
        threshold: 0.55,
      }
    );

    aboutObserver.observe(aboutElement);
    homeObserver.observe(homeElement);

    return () => {
      aboutObserver.disconnect();
      homeObserver.disconnect();
    };
  }, []);

  return (
    <main
      ref={mainRef}
      className={`relative isolate min-h-screen h-screen overflow-x-clip overflow-y-auto scroll-smooth text-[#10363b] ${
        isAboutInView ? "mesh-mixing" : ""
      }`}
      style={{
        backgroundColor: "#e7f4f2",
        backgroundImage: "url('/website-art/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      } as CSSProperties}
    >
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-black/10" />

      <header
        className="fixed left-0 right-0 top-0 z-30"
        style={{
          backgroundColor: "rgba(231, 244, 242, 0.82)",
          backdropFilter: "blur(6px)",
        }}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-2 sm:flex-row sm:justify-between sm:py-3">
          <span className="description-font text-sm font-medium tracking-[0.18em] text-[#ff5ca8]">
            {copy.headerName}
          </span>
          <nav className="description-font flex flex-wrap items-center justify-center text-[0.7rem] uppercase tracking-[0.35em] text-[#ff5ca8]">
            {copy.navLinks.map((link, index) => (
              <span key={link.label} className="flex items-center">
                <a
                  href={link.href}
                  className="px-2 transition-colors hover:text-[#2d9f95]"
                >
                  {link.label}
                </a>
                {index < copy.navLinks.length - 1 && (
                  <span className="mx-2 h-3 w-px bg-[#1d555b]/60" />
                )}
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="description-font flex items-center gap-2">
              <span className="text-[0.58rem] uppercase tracking-[0.22em] text-[#2d666c]">
                {copy.languageSwitcher.label}
              </span>
              <div className="inline-flex overflow-hidden rounded-full border-2 border-[#10363b] bg-white/80 shadow-[0_6px_18px_rgba(16,54,59,0.2)]">
                <a
                  href={`/en${activeHash}`}
                  aria-label={copy.languageSwitcher.english}
                  aria-current={locale === "en" ? "page" : undefined}
                  className={`px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] transition-colors ${
                    locale === "en"
                      ? "bg-[#1f7f78] text-[#eefbfa]"
                      : "text-[#10363b] hover:bg-[#10363b] hover:text-[#e7f4f2]"
                  }`}
                >
                  EN
                </a>
                <a
                  href={`/es${activeHash}`}
                  aria-label={copy.languageSwitcher.spanish}
                  aria-current={locale === "es" ? "page" : undefined}
                  className={`border-l-2 border-[#10363b] px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] transition-colors ${
                    locale === "es"
                      ? "bg-[#1f7f78] text-[#eefbfa]"
                      : "text-[#10363b] hover:bg-[#10363b] hover:text-[#e7f4f2]"
                  }`}
                >
                  ES
                </a>
              </div>
            </div>
            {copy.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="transition-transform hover:scale-110"
              >
                <Image
                  src={link.icon}
                  alt={link.label}
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </header>

      <div className="relative z-10">
        <section
          id="home"
          ref={homeSectionRef}
          className="min-h-screen px-4 py-16 flex items-center"
        >
          <div className="mx-auto grid w-full max-w-6xl items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div className="space-y-8">
              <div className="w-full max-w-[23rem] border border-[#8eb8b5] bg-[#f2fbfa] p-4 pb-7 shadow-[0_20px_40px_rgba(16,54,59,0.22)] sm:max-w-[25rem]">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#e7f4f2]">
                  <Image
                    src="/profile.png"
                    alt="Profile"
                    fill
                    sizes="(min-width: 1024px) 24rem, (min-width: 640px) 20rem, 16rem"
                    className="object-cover"
                    priority
                  />
                </div>
                <p className="description-font pt-4 text-center text-xs uppercase tracking-[0.28em] text-[#2d666c]">
                  {copy.hero.photoTag}
                </p>
              </div>
              <p className="description-font text-xs uppercase tracking-[0.35em] text-white">
                {copy.hero.role}
              </p>
            </div>

            <div className="space-y-6 pt-8 sm:pt-12 lg:pt-14">
              <h1 className="w-full max-w-md space-y-2">
                <span className="title-font block w-fit whitespace-nowrap bg-white/90 px-3 py-1.5 text-2xl font-semibold leading-tight text-[#ff5ca8] shadow-[0_8px_20px_rgba(37,65,52,0.12)] backdrop-blur-[1px] sm:px-4 sm:py-2 sm:text-4xl">
                  <TypingText
                    key={`hero-line-1-${titleAnimationKey}-${locale}`}
                    text={copy.hero.line1}
                    speed={72}
                    className="!whitespace-nowrap"
                    showCursor={!startSecondLineTyping}
                    onComplete={handleFirstLineComplete}
                  />
                </span>
                {startSecondLineTyping && (
                  <span className="title-font block w-fit whitespace-nowrap bg-white/90 px-3 py-1.5 text-2xl font-semibold leading-tight text-[#ff5ca8] shadow-[0_8px_20px_rgba(37,65,52,0.12)] backdrop-blur-[1px] sm:px-4 sm:py-2 sm:text-4xl">
                    <TypingText
                      key={`hero-line-2-${titleAnimationKey}-${locale}`}
                      text={copy.hero.line2}
                      speed={84}
                      className="!whitespace-nowrap"
                      isActive={startSecondLineTyping}
                      showCursor={startSecondLineTyping}
                    />
                  </span>
                )}
              </h1>
              <div className="pt-6 sm:pt-10">
                <p className="description-font max-w-md text-sm leading-relaxed text-white sm:text-base">
                  {copy.hero.intro}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-4 sm:mt-8">
                <a
                  href="mailto:henrriquezkatia7@gmail.com"
                  className="inline-flex items-center justify-center border-2 border-[#10363b] px-6 py-2 text-[0.7rem] uppercase tracking-[0.35em] transition-colors hover:bg-[#10363b] hover:text-[#e7f4f2]"
                >
                  {copy.hero.emailCta}
                </a>
                <a
                  href="/My_resume.pdf"
                  className="inline-flex items-center justify-center border-2 border-[#10363b] px-6 py-2 text-[0.7rem] uppercase tracking-[0.35em] transition-colors hover:bg-[#10363b] hover:text-[#e7f4f2]"
                  target="_blank"
                  rel="noreferrer"
                >
                  {copy.hero.resumeCta}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="aboutMe"
          ref={aboutSectionRef}
          className="min-h-screen px-4 py-16 text-[#10363b] flex items-center justify-center"
          style={{ backgroundColor: "transparent" }}
        >
          <div className="mx-auto flex w-full max-w-[88rem] items-center justify-center text-center lg:text-left">
            <AboutMeSection copy={copy.about} />
          </div>
        </section>

        <section
          id="services"
          className="min-h-screen px-4 py-16 text-[#10363b] flex items-center justify-center"
          style={{ backgroundColor: "transparent" }}
        >
          <div className="mx-auto flex w-full max-w-4xl items-center justify-center">
            <ServicesPage copy={copy.services} />
          </div>
        </section>

        <section
          id="projects"
          className="min-h-screen px-4 py-16 text-[#10363b] flex items-center justify-center"
          style={{ backgroundColor: "transparent" }}
        >
          <div className="mx-auto flex w-full max-w-4xl items-center justify-center">
            <ProjectsPage copy={copy.projects} />
          </div>
        </section>

        <section
          id="contactMe"
          className="min-h-screen px-4 py-16 text-[#10363b] flex items-center justify-center"
          style={{ backgroundColor: "transparent" }}
        >
          <div className="mx-auto flex w-full max-w-6xl items-center justify-center">
            <ContactMePage copy={copy.contact} />
          </div>
        </section>
      </div>
    </main>
  );
}
