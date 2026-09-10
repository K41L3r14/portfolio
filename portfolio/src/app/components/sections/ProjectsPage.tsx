"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";

import type { Locale } from "@/i18n/config";
import type { ProjectsCopy } from "@/i18n/translations";

type ProjectsPageProps = { copy: ProjectsCopy; locale: Locale };
type DisplayProject = {
  title: string;
  subtitle: string;
  summary: string;
  tags: string[];
  media?: string;
  mediaType: "image" | "video";
  website?: string;
  status?: string;
};

export default function ProjectsPage({ copy, locale }: ProjectsPageProps) {
  const isSpanish = locale === "es";
  const projects = useMemo<DisplayProject[]>(() => [
    ...copy.projects.map((project) => ({
      title: project.title,
      subtitle: project.stack,
      summary: project.summary,
      tags: project.technologies,
      media: project.video ?? project.slideshow?.[0],
      mediaType: project.video ? "video" as const : "image" as const,
      website: project.website,
      status: project.status,
    })),
    ...copy.otherProjects.map((project) => ({
      title: project.title,
      subtitle: isSpanish ? "Proyecto adicional" : "Additional project",
      summary: project.summary,
      tags: project.skills,
      media: project.video ?? project.slideshow?.[0],
      mediaType: project.video ? "video" as const : "image" as const,
    })),
  ], [copy.otherProjects, copy.projects, isSpanish]);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const selected = projects.find((project) => project.title === selectedTitle);

  const scrollProjects = (direction: -1 | 1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.scrollBy({
      left: direction * scroller.clientWidth * 0.85,
      behavior: "smooth",
    });
  };

  return (
    <section id="projects" className="bg-[#080b16] py-20 text-white sm:py-28">
      <div className="site-shell">
        <div className="text-center">
          <p className="eyebrow">{isSpanish ? "Portafolio" : "Portfolio"}</p>
          <h2 className="title-font mt-3 text-4xl sm:text-5xl">{isSpanish ? "Trabajo destacado" : "Featured work"}</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/50">
            {isSpanish ? "Desliza o usa las flechas para explorar todos los proyectos." : "Swipe or use the arrows to explore every project."}
          </p>
        </div>

        <div className="mt-7 flex justify-end gap-3" aria-label={isSpanish ? "Controles del carrusel" : "Carousel controls"}>
          <button type="button" onClick={() => scrollProjects(-1)} aria-label={isSpanish ? "Proyectos anteriores" : "Previous projects"} className="brand-focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-xl text-white transition hover:border-[#B46781] hover:bg-[#B46781]">
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" onClick={() => scrollProjects(1)} aria-label={isSpanish ? "Proyectos siguientes" : "Next projects"} className="brand-focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-xl text-white transition hover:border-[#B46781] hover:bg-[#B46781]">
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div
          ref={scrollerRef}
          role="region"
          aria-label={isSpanish ? "Todos los proyectos destacados" : "All featured projects"}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.key === "ArrowLeft") scrollProjects(-1);
            if (event.key === "ArrowRight") scrollProjects(1);
          }}
          className="project-scroller mt-5 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-5"
        >
          {projects.map((project) => (
            <article key={project.title} className="w-[86vw] max-w-[34rem] shrink-0 snap-start overflow-hidden rounded-3xl border border-[#413B6C]/28 bg-[#101426] transition hover:border-[#B46781]/50 sm:w-[72vw] lg:w-[calc((100%-1.5rem)/2)]">
              <div className="relative aspect-[16/8] overflow-hidden bg-[#f1eff6]">
                {project.status && (
                  <span className="absolute right-4 top-4 z-10 rounded-full bg-[#B46781] px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-white shadow-lg">
                    {project.status}
                  </span>
                )}
                {project.mediaType === "video" && project.media ? (
                  <video
                    className="h-full w-full bg-black object-contain"
                    controls
                    playsInline
                    preload="metadata"
                    aria-label={`${project.title} ${isSpanish ? "demostración" : "demo"}`}
                  >
                    <source src={encodeURI(project.media)} type="video/mp4" />
                    {copy.videoFallback}
                  </video>
                ) : project.media ? (
                  <Image
                    src={encodeURI(project.media)}
                    alt={`${project.title} project preview`}
                    fill
                    sizes="(min-width: 1024px) 34rem, 86vw"
                    className={project.website ? "object-cover object-top" : "object-contain p-5"}
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center bg-[linear-gradient(135deg,#faf9fc,#ece8f2)] px-8 text-center">
                    <span className="title-font text-3xl text-[#413B6C]">{project.title}</span>
                    <span className="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#B46781]">{project.subtitle}</span>
                  </div>
                )}
              </div>
              <div className="p-7">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#B46781]">{project.subtitle}</p>
                <h3 className="title-font mt-3 text-3xl">{project.title}</h3>
                <p className="project-card-summary mt-3 text-sm leading-6 text-white/55">{project.summary}</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <button type="button" onClick={() => setSelectedTitle(selectedTitle === project.title ? null : project.title)} className="brand-focus-ring inline-flex items-center gap-2 text-xs font-semibold text-white transition hover:text-[#B46781]">
                    {selectedTitle === project.title ? (isSpanish ? "Cerrar detalles" : "Close details") : (isSpanish ? "Ver caso de estudio" : "View case study")}
                    <span className="text-[#B46781]">→</span>
                  </button>
                  {project.website && (
                    <a href={project.website} target="_blank" rel="noreferrer" className="brand-focus-ring inline-flex rounded-full bg-[#B46781] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#413B6C]">
                      {isSpanish ? "Visitar sitio" : "Visit website"}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {selected && (
          <article className="mt-6 rounded-3xl border border-[#B46781]/35 bg-[#101426] p-7 sm:p-9">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="eyebrow">{selected.subtitle}</p>
                <h3 className="title-font mt-2 text-3xl sm:text-4xl">{selected.title}</h3>
                {selected.status && <p className="mt-3 inline-flex rounded-full bg-[#B46781] px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-white">{selected.status}</p>}
              </div>
              <button type="button" onClick={() => setSelectedTitle(null)} className="brand-focus-ring self-start rounded-full border border-white/15 px-4 py-2 text-xs text-white/65 hover:text-white">{isSpanish ? "Cerrar" : "Close"}</button>
            </div>
            <p className="mt-6 max-w-4xl text-sm leading-7 text-white/65 sm:text-base">{selected.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {selected.tags.map((tag) => <span key={tag} className="rounded-full border border-[#413B6C]/35 bg-[#413B6C]/15 px-3 py-1.5 text-[0.65rem] text-white/70">{tag}</span>)}
            </div>
            {selected.website && (
              <a href={selected.website} target="_blank" rel="noreferrer" className="brand-focus-ring mt-7 inline-flex rounded-full bg-[#B46781] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#413B6C]">
                {isSpanish ? "Visitar el sitio en desarrollo" : "Visit the website in development"}
              </a>
            )}
          </article>
        )}

      </div>
    </section>
  );
}
