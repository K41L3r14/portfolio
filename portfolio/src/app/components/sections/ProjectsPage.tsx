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
  const [isMediaExpanded, setIsMediaExpanded] = useState(false);

  useEffect(() => {
    setActiveMediaIndex(0);
    setIsMediaExpanded(false);
  }, [activeProjectIndex]);

  const activeProject = allProjects[activeProjectIndex] ?? allProjects[0];
  const mediaCount = activeProject?.media.length ?? 0;
  const hasMedia = mediaCount > 0;
  const safeMediaIndex = hasMedia
    ? Math.min(activeMediaIndex, Math.max(0, mediaCount - 1))
    : 0;

  const showPreviousMedia = () => {
    setActiveMediaIndex((prev) =>
      prev === 0 ? mediaCount - 1 : prev - 1
    );
  };

  const showNextMedia = () => {
    setActiveMediaIndex((prev) =>
      prev === mediaCount - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    if (!isMediaExpanded) {
      return;
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && mediaCount > 1) {
        event.preventDefault();
        setActiveMediaIndex((prev) => (prev === 0 ? mediaCount - 1 : prev - 1));
      }

      if (event.key === "ArrowRight" && mediaCount > 1) {
        event.preventDefault();
        setActiveMediaIndex((prev) => (prev === mediaCount - 1 ? 0 : prev + 1));
      }

      if (event.key === "Escape") {
        event.preventDefault();
        setIsMediaExpanded(false);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [isMediaExpanded, mediaCount]);

  if (!activeProject) {
    return null;
  }

  return (
    <div className="w-full max-w-7xl space-y-8 text-left">
      <h2 className="title-font text-center text-5xl text-[#c94841] sm:text-6xl lg:text-left">
        {copy.sectionTitle}
      </h2>

      <div className="relative grid items-start gap-3 lg:grid-cols-[minmax(0,1fr)_12.5rem]">
        <section className="rounded-3xl border border-[#1f1b17]/25 bg-gradient-to-br from-[#f8f5ef] via-[#fffdf9] to-[#efe8dd] p-5 shadow-[0_24px_50px_rgba(31,27,23,0.15)] sm:p-7">
          {hasMedia ? (
            <div className="mb-6 space-y-3">
              <button
                type="button"
                onClick={() => setIsMediaExpanded(true)}
                className="relative mx-auto block aspect-[16/7] w-full overflow-hidden rounded-2xl border border-[#d3c8b6] bg-[#f0ebe3] text-left shadow-[0_12px_26px_rgba(31,27,23,0.12)]"
              >
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
                <span className="pointer-events-none absolute right-3 top-3 rounded bg-black/30 px-2 py-1 text-[0.62rem] uppercase tracking-[0.16em] text-white">
                  Click to expand
                </span>
              </button>
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

        <aside className="no-scrollbar flex max-h-[48rem] gap-2 overflow-y-auto pb-1 lg:flex-col lg:pt-4">
          {allProjects.map((project, index) => {
            const isActive = index === activeProjectIndex;
            return (
              <button
                key={project.title}
                type="button"
                onClick={() => setActiveProjectIndex(index)}
                className={`min-w-[11rem] shrink-0 rounded-xl border px-3 py-2 text-left transition-all duration-200 lg:rounded-r-2xl lg:rounded-l-none lg:border-l-0 ${
                  isActive
                    ? "border-[#1f1b17]/45 bg-[#fffdf8] shadow-[0_8px_16px_rgba(31,27,23,0.12)] lg:translate-x-[-8px]"
                    : "border-[#b9aa92] bg-[#eee5d8] hover:bg-[#f4ecdf]"
                }`}
              >
                <p className="title-font truncate text-sm text-[#2f1c3a]">
                  {project.title}
                </p>
                <p className="description-font mt-0.5 truncate text-[0.58rem] uppercase tracking-[0.16em] text-[#3b332b]">
                  {project.subtitle}
                </p>
              </button>
            );
          })}
        </aside>
      </div>

      {isMediaExpanded && hasMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-6"
          onClick={() => setIsMediaExpanded(false)}
        >
          <div
            className="relative w-full max-w-[96vw] overflow-hidden rounded-2xl border border-white/25 bg-black shadow-[0_24px_50px_rgba(0,0,0,0.45)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="relative aspect-[16/9] w-full"
              onClick={() => setIsMediaExpanded(false)}
            >
              {activeProject.media[safeMediaIndex].type === "video" ? (
                <video
                  className="h-full w-full"
                  controls
                  autoPlay
                  preload="metadata"
                  onClick={(event) => event.stopPropagation()}
                >
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
                  sizes="96vw"
                  quality={100}
                  className="object-contain"
                />
              )}

              {activeProject.media.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPreviousMedia}
                    aria-label={copy.prevLabel}
                    onMouseDown={(event) => event.stopPropagation()}
                    className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-3xl text-white transition-colors hover:bg-black/35"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={showNextMedia}
                    aria-label={copy.nextLabel}
                    onMouseDown={(event) => event.stopPropagation()}
                    className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-3xl text-white transition-colors hover:bg-black/35"
                  >
                    ›
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => setIsMediaExpanded(false)}
                onMouseDown={(event) => event.stopPropagation()}
                className="absolute right-3 top-3 rounded bg-black/35 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white transition-colors hover:bg-black/55"
              >
                Close
              </button>
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-white/15 bg-black/55 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/90">
              <span>{activeProject.title}</span>
              <span>
                {safeMediaIndex + 1} / {activeProject.media.length}
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
