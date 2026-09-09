import Image from "next/image";

import type { Locale } from "@/i18n/config";
import type { AboutCopy } from "@/i18n/translations";

type AboutMeSectionProps = { copy: AboutCopy; locale: Locale };

export default function AboutMeSection({ copy, locale }: AboutMeSectionProps) {
  const isSpanish = locale === "es";

  return (
    <section id="aboutMe" className="bg-[#faf9fc] py-20 sm:py-28">
      <div className="site-shell grid items-center gap-12 lg:grid-cols-[0.72fr_1.2fr] lg:gap-20">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[45%_45%_42%_42%/28%_28%_32%_32%] bg-[#ece8f2] shadow-[0_25px_70px_rgba(65,59,108,0.18)]">
          <Image src={copy.images[0].src} alt={copy.images[0].alt} fill sizes="(min-width: 1024px) 24rem, 80vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_65%,rgba(65,59,108,0.18))]" />
        </div>

        <div>
          <p className="eyebrow">{isSpanish ? "Sobre mí" : "About me"}</p>
          <h2 className="title-font mt-3 max-w-3xl text-4xl leading-[1.02] tracking-[-0.025em] text-[#181525] sm:text-5xl lg:text-6xl">
            {isSpanish
              ? "Creo experiencias que conectan arquitectura backend y diseño frontend."
              : "Crafting experiences that bridge backend architecture and frontend design."}
          </h2>
          <div className="mt-7 max-w-3xl space-y-4 text-sm leading-7 text-[#736e82] sm:text-base">
            {copy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            {(isSpanish ? ["Español · Nativo", "Inglés · Fluido", "Japonés · Estudiando"] : ["Spanish · Native", "English · Fluent", "Japanese · Studying"]).map((language) => (
              <span key={language} className="rounded-full border border-[#ded9e8] bg-white px-3 py-1.5 text-[0.65rem] font-semibold text-[#413B6C] shadow-sm">{language}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
