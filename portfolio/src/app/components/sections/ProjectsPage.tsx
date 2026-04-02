"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import type { OtherProjectCopy, ProjectCopy, ProjectsCopy } from "@/i18n/translations";

type ProjectsPageProps = {
  copy: ProjectsCopy;
};

type ExplorerProject = {
  title: string;
  subtitle: string;
  summary: string;
  tags: string[];
  media: Array<{ type: "video" | "image"; src: string }>;
};

function toExplorerProject(project: ProjectCopy): ExplorerProject {
  return {
    title: project.title,
    subtitle: project.stack,
    summary: project.summary,
    tags: project.technologies,
    media: [
      ...(project.video ? [{ type: "video" as const, src: project.video }] : []),
      ...((project.slideshow ?? []).map((slide) => ({ type: "image" as const, src: slide }))),
    ],
  };
}

function toExplorerOtherProject(project: OtherProjectCopy): ExplorerProject {
  return {
    title: project.title,
    subtitle: "Additional Project",
    summary: project.summary,
    tags: project.skills,
    media: [
      ...(project.video ? [{ type: "video" as const, src: project.video }] : []),
      ...((project.slideshow ?? []).map((slide) => ({ type: "image" as const, src: slide }))),
    ],
  };
}

export default function ProjectsPage({ copy }: ProjectsPageProps) {
  const allProjects = useMemo(
    () => [
      ...copy.projects.map(toExplorerProject),
      ...copy.otherProjects.map(toExplorerOtherProject),
    ],
    [copy.otherProjects, copy.projects]
  );

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const activeProject = allProjects[activeProjectIndex];
  const hasMedia = activeProject.media.length > 0;
  const safeMediaIndex = hasMedia
    ? Math.min(activeMediaIndex, Math.max(0, activeProject.media.length - 1))
    : 0;

  useEffect(() => {
    setActiveMediaIndex(0);
  }, [activeProjectIndex]);

  const showPreviousMedia = () => {
    setActiveMediaIndex((prev) =>
      prev === 0 ? activeProject.media.length - 1 : prev - 1
    );
  };

  const showNextMedia = () => {
    setActiveMediaIndex((prev) =>
      prev === activeProject.media.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="w-full max-w-7xl space-y-8 text-left">
      <h2 className="title-font text-center text-5xl text-[#c94841] sm:text-6xl lg:text-left">
        {copy.sectionTitle}
      </h2>

      <div className="overflow-hidden rounded-3xl border border-[#1f1b17]/25 bg-gradient-to-br from-[#f8f5ef] via-[#fffdf9] to-[#efe8dd] shadow-[0_24px_50px_rgba(31,27,23,0.15)]">
        <div className="grid lg:grid-cols-[21rem_minmax(0,1fr)]">
          <aside className="border-b border-[#1f1b17]/15 bg-[#eee5d8]/75 p-4 lg:border-b-0 lg:border-r lg:p-5">
            <p className="description-font px-2 pb-3 text-[0.66rem] uppercase tracking-[0.28em] text-[#5a4a3f]">
              Project Explorer
            </p>
            <div className="space-y-2.5">
              {allProjects.map((project, index) => {
                const isActive = index === activeProjectIndex;

                return (
                  <button
                    key={project.title}
                    type="button"
                    onClick={() => setActiveProjectIndex(index)}
                    className={`w-full rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                      isActive
                        ? "border-[#1f1b17] bg-[#fffdf8] shadow-[0_8px_16px_rgba(31,27,23,0.12)]"
                        : "border-[#d3c8b6] bg-white/80 hover:border-[#1f1b17]/60 hover:bg-white hover:shadow-[0_6px_14px_rgba(31,27,23,0.08)]"
                    }`}
                  >
                    <p className="title-font text-base text-[#2f1c3a] sm:text-lg">{project.title}</p>
                    <p className="description-font mt-1 text-[0.68rem] uppercase tracking-[0.2em] text-[#3b332b]">
                      {project.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="bg-white/70 p-5 sm:p-7">
            {hasMedia ? (
              <div className="mb-6 space-y-3">
                <div className="relative mx-auto aspect-[16/7] w-full overflow-hidden rounded-2xl border border-[#d3c8b6] bg-[#f0ebe3] shadow-[0_12px_26px_rgba(31,27,23,0.12)]">
                  {activeProject.media[safeMediaIndex].type === "video" ? (
                    <video className="h-full w-full" controls preload="metadata">
                      <source
                        src={encodeURI(activeProject.media[safeMediaIndex].src)}
                        type="video/mp4"
                      />
                      {copy.videoFallback}
                    </video>
                  ) : (
                    <Image
                      src={encodeURI(activeProject.media[safeMediaIndex].src)}
                      alt={`${activeProject.title} media ${safeMediaIndex + 1}`}
                      fill
                      sizes="(min-width: 1280px) 980px, (min-width: 1024px) 78vw, (min-width: 640px) 90vw, 96vw"
                      quality={100}
                      className="object-contain"
                    />
                  )}
                </div>
                {activeProject.media.length > 1 && (
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={showPreviousMedia}
                      className="rounded-lg border border-[#1f1b17] px-3 py-1.5 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#1f1b17] hover:text-[#f7f3ec]"
                    >
                      {copy.prevLabel}
                    </button>
                    <p className="text-sm uppercase tracking-[0.2em] text-[#3b332b]">
                      {safeMediaIndex + 1} / {activeProject.media.length}
                    </p>
                    <button
                      type="button"
                      onClick={showNextMedia}
                      className="rounded-lg border border-[#1f1b17] px-3 py-1.5 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#1f1b17] hover:text-[#f7f3ec]"
                    >
                      {copy.nextLabel}
                    </button>
                  </div>
                )}
              </div>
            ) : null}

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1b475D]">
              {activeProject.subtitle}
            </p>
            <h3 className="title-font mt-2 text-2xl font-semibold text-[#2f1c3a] sm:text-3xl">
              {activeProject.title}
            </h3>
            <p className="description-font mt-4 text-base leading-relaxed text-[#231f1b] sm:text-lg">
              {activeProject.summary}
            </p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#3b332b]">
              {copy.technologiesLabel}
            </p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {activeProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#d3c8b6] bg-[#f0ebe3] px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.14em] text-[#3b332b]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>

    </div>
  );
}
