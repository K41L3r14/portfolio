"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import type { Locale } from "@/i18n/config";
import type { ProjectsCopy } from "@/i18n/translations";

type ProjectsPageProps = { copy: ProjectsCopy; locale: Locale };
type DisplayProject = { title: string; subtitle: string; summary: string; tags: string[]; media?: string; mediaType: "image" | "video" };

export default function ProjectsPage({ copy, locale }: ProjectsPageProps) {
  const isSpanish = locale === "es";
  const projects = useMemo<DisplayProject[]>(() => [
    ...copy.projects.map((project) => ({
      title: project.title,
      subtitle: project.stack,
      summary: project.summary,
      tags: project.technologies,
      media: project.slideshow?.[0] ?? project.video,
      mediaType: project.slideshow?.[0] ? "image" as const : "video" as const,
    })),
    ...copy.otherProjects.map((project) => ({
      title: project.title,
      subtitle: isSpanish ? "Proyecto adicional" : "Additional project",
      summary: project.summary,
      tags: project.skills,
      media: project.slideshow?.[0] ?? project.video,
      mediaType: project.slideshow?.[0] ? "image" as const : "video" as const,
    })),
  ], [copy.otherProjects, copy.projects, isSpanish]);

  const featured = [projects[0], projects[3]].filter(Boolean);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const selected = projects.find((project) => project.title === selectedTitle);

  return (
    <section id="projects" className="bg-[#080b16] py-20 text-white sm:py-28">
      <div className="site-shell">
        <div className="text-center">
          <p className="eyebrow">{isSpanish ? "Portafolio" : "Portfolio"}</p>
          <h2 className="title-font mt-3 text-4xl sm:text-5xl">{isSpanish ? "Trabajo destacado" : "Featured work"}</h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {featured.map((project) => (
            <article key={project.title} className="overflow-hidden rounded-3xl border border-[#413B6C]/28 bg-[#101426] transition hover:border-[#B46781]/50">
              <div className="relative aspect-[16/8] overflow-hidden bg-[#f1eff6]">
                {project.mediaType === "video" && project.media ? (
                  <video className="h-full w-full object-cover" muted playsInline preload="metadata">
                    <source src={encodeURI(project.media)} type="video/mp4" />
                  </video>
                ) : project.media ? (
                  <Image src={encodeURI(project.media)} alt={`${project.title} project preview`} fill sizes="(min-width: 1024px) 36rem, 95vw" className="object-contain p-5" />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-[#413B6C]">{project.title}</div>
                )}
              </div>
              <div className="p-7">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#B46781]">{project.subtitle}</p>
                <h3 className="title-font mt-3 text-3xl">{project.title}</h3>
                <p className="project-card-summary mt-3 text-sm leading-6 text-white/55">{project.summary}</p>
                <button type="button" onClick={() => setSelectedTitle(selectedTitle === project.title ? null : project.title)} className="brand-focus-ring mt-6 inline-flex items-center gap-2 text-xs font-semibold text-white transition hover:text-[#B46781]">
                  {selectedTitle === project.title ? (isSpanish ? "Cerrar detalles" : "Close details") : (isSpanish ? "Ver caso de estudio" : "View case study")}
                  <span className="text-[#B46781]">→</span>
                </button>
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
              </div>
              <button type="button" onClick={() => setSelectedTitle(null)} className="brand-focus-ring self-start rounded-full border border-white/15 px-4 py-2 text-xs text-white/65 hover:text-white">{isSpanish ? "Cerrar" : "Close"}</button>
            </div>
            <p className="mt-6 max-w-4xl text-sm leading-7 text-white/65 sm:text-base">{selected.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {selected.tags.map((tag) => <span key={tag} className="rounded-full border border-[#413B6C]/35 bg-[#413B6C]/15 px-3 py-1.5 text-[0.65rem] text-white/70">{tag}</span>)}
            </div>
          </article>
        )}

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/35">{isSpanish ? "Más proyectos" : "More projects"}</p>
          <div className="mt-4 flex flex-wrap gap-4">
            {projects.filter((project) => !featured.some((item) => item.title === project.title)).map((project) => (
              <button key={project.title} type="button" onClick={() => setSelectedTitle(project.title)} className="brand-focus-ring border-b border-white/15 pb-1 text-left text-sm text-white/60 transition hover:border-[#B46781] hover:text-white">{project.title}</button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
