"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { OtherProjectCopy, ProjectsCopy } from "@/i18n/translations";

type ProjectsPageProps = {
  copy: ProjectsCopy;
};

type ObserraSlideshowProps = {
  slides: string[];
  prevLabel: string;
  nextLabel: string;
  altPrefix: string;
};

function MediaSlideshow({
  slides,
  prevLabel,
  nextLabel,
  altPrefix,
}: ObserraSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasSlides = slides.length > 0;
  const safeIndex = hasSlides
    ? Math.min(currentIndex, Math.max(0, slides.length - 1))
    : 0;

  useEffect(() => {
    if (!hasSlides) {
      if (currentIndex !== 0) {
        setCurrentIndex(0);
      }
      return;
    }

    if (currentIndex > slides.length - 1) {
      setCurrentIndex(0);
    }
  }, [currentIndex, hasSlides, slides.length]);

  if (!hasSlides) {
    return null;
  }

  const showPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="mb-4 space-y-3">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[#d3c8b6] bg-[#f0ebe3]">
        <Image
          src={encodeURI(slides[safeIndex])}
          alt={`${altPrefix} ${safeIndex + 1}`}
          fill
          sizes="(min-width: 1280px) 980px, (min-width: 1024px) 78vw, (min-width: 640px) 90vw, 96vw"
          quality={100}
          className="object-contain"
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={showPrevious}
          className="rounded border border-[#1f1b17] px-3 py-1 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#1f1b17] hover:text-[#f7f3ec]"
        >
          {prevLabel}
        </button>
        <p className="text-xs uppercase tracking-[0.2em] text-[#3b332b]">
          {safeIndex + 1} / {slides.length}
        </p>
        <button
          type="button"
          onClick={showNext}
          className="rounded border border-[#1f1b17] px-3 py-1 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#1f1b17] hover:text-[#f7f3ec]"
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}

function OtherProjectsSlideshow({
  projects,
  prevLabel,
  nextLabel,
  dotAriaPrefix,
  hoverHint,
}: {
  projects: OtherProjectCopy[];
  prevLabel: string;
  nextLabel: string;
  dotAriaPrefix: string;
  hoverHint: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediaIndex, setMediaIndex] = useState(0);
  const currentProject = projects[currentIndex];
  const mediaItems = [
    ...(currentProject.video ? [{ type: "video" as const, src: currentProject.video }] : []),
    ...((currentProject.slideshow ?? []).map((slide) => ({ type: "image" as const, src: slide }))),
  ];
  const hasMedia = mediaItems.length > 0;
  const safeMediaIndex = hasMedia
    ? Math.min(mediaIndex, Math.max(0, mediaItems.length - 1))
    : 0;

  const showPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const showPreviousMedia = () => {
    setMediaIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  };

  const showNextMedia = () => {
    setMediaIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    setMediaIndex(0);
  }, [currentProject.title]);

  return (
    <div className="space-y-4">
      <article className="group rounded-2xl bg-white/70 p-5 text-left text-[#1f1f1f] shadow-lg transition-[background-color,box-shadow] duration-300 hover:bg-white/85 hover:shadow-xl">
        {hasMedia && (
          <div className="mb-4 space-y-3">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[#d3c8b6] bg-[#f0ebe3]">
              {mediaItems[safeMediaIndex].type === "video" ? (
                <video className="h-full w-full" controls preload="metadata">
                  <source src={encodeURI(mediaItems[safeMediaIndex].src)} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={encodeURI(mediaItems[safeMediaIndex].src)}
                  alt={`${currentProject.title} media ${safeMediaIndex + 1}`}
                  fill
                  sizes="(min-width: 1280px) 980px, (min-width: 1024px) 78vw, (min-width: 640px) 90vw, 96vw"
                  quality={100}
                  className="object-contain"
                />
              )}
            </div>
            {mediaItems.length > 1 && (
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={showPreviousMedia}
                  className="rounded border border-[#1f1b17] px-3 py-1 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#1f1b17] hover:text-[#f7f3ec]"
                >
                  {prevLabel}
                </button>
                <p className="text-xs uppercase tracking-[0.2em] text-[#3b332b]">
                  {safeMediaIndex + 1} / {mediaItems.length}
                </p>
                <button
                  type="button"
                  onClick={showNextMedia}
                  className="rounded border border-[#1f1b17] px-3 py-1 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#1f1b17] hover:text-[#f7f3ec]"
                >
                  {nextLabel}
                </button>
              </div>
            )}
          </div>
        )}
        <h4 className="title-font text-lg font-semibold text-[#2f1c3a]">
          {currentProject.title}
        </h4>
        <p className="mt-2 hidden text-[0.7rem] uppercase tracking-[0.24em] text-[#3b332b] lg:block lg:group-hover:hidden">
          {hoverHint}
        </p>

        <div className="mt-4 lg:mt-0 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-500 lg:ease-out lg:group-hover:mt-4 lg:group-hover:max-h-[56rem] lg:group-hover:opacity-100">
          <p className="description-font text-sm leading-relaxed sm:text-base">
            {currentProject.summary}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {currentProject.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-[#d3c8b6] bg-[#f0ebe3] px-2 py-1 text-[0.62rem] uppercase tracking-[0.15em] text-[#3b332b]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </article>

      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={showPrevious}
          className="rounded border border-[#1f1b17] px-3 py-1 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#1f1b17] hover:text-[#f7f3ec]"
        >
          {prevLabel}
        </button>
        <p className="text-xs uppercase tracking-[0.2em] text-[#3b332b]">
          {currentIndex + 1} / {projects.length}
        </p>
        <button
          type="button"
          onClick={showNext}
          className="rounded border border-[#1f1b17] px-3 py-1 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#1f1b17] hover:text-[#f7f3ec]"
        >
          {nextLabel}
        </button>
      </div>

      <div className="flex justify-center gap-2">
        {projects.map((project, index) => (
          <button
            key={project.title}
            type="button"
            onClick={() => setCurrentIndex(index)}
            aria-label={`${dotAriaPrefix} ${project.title}`}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              currentIndex === index ? "bg-[#e0584f]" : "bg-[#c9bdab]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProjectsPage({ copy }: ProjectsPageProps) {
  return (
    <div className="w-full max-w-5xl space-y-8 text-center lg:text-left">
      <h2 className="title-font text-4xl text-[#c94841] sm:text-5xl">
        {copy.sectionTitle}
      </h2>
      <div className="grid gap-6 lg:grid-cols-1">
        {copy.projects.map((project) => (
          <article
            key={project.title}
            className="group rounded-2xl bg-white/70 p-6 text-left text-[#1f1f1f] shadow-lg transition-[background-color,box-shadow] duration-300 hover:bg-white/85 hover:shadow-xl"
          >
            {project.video && (
              <div className="mb-4 overflow-hidden rounded-xl border border-[#d3c8b6] bg-[#f0ebe3]">
                <video className="aspect-video w-full" controls preload="metadata">
                  <source src={encodeURI(project.video)} type="video/mp4" />
                  {copy.videoFallback}
                </video>
              </div>
            )}
            {project.slideshow && (
              <MediaSlideshow
                slides={project.slideshow}
                prevLabel={copy.prevLabel}
                nextLabel={copy.nextLabel}
                altPrefix={copy.obserraSlideAlt}
              />
            )}
            <p className="text-xs font-semibold uppercase tracking-wide text-[#1b475D]">
              {project.stack}
            </p>
            <h3 className="title-font mt-2 text-xl font-semibold text-[#2f1c3a]">
              {project.title}
            </h3>
            <p className="mt-2 hidden text-[0.7rem] uppercase tracking-[0.24em] text-[#3b332b] lg:block lg:group-hover:hidden">
              {copy.hoverHint}
            </p>

            <div className="mt-4 lg:mt-0 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-500 lg:ease-out lg:group-hover:mt-4 lg:group-hover:max-h-[56rem] lg:group-hover:opacity-100">
              <p className="description-font text-sm leading-relaxed sm:text-base">{project.summary}</p>
              <p className="mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#3b332b]">
                {copy.technologiesLabel}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[#d3c8b6] bg-[#f0ebe3] px-2 py-1 text-[0.62rem] uppercase tracking-[0.15em] text-[#3b332b]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="space-y-4">
        <h3 className="title-font text-3xl text-[#c94841] sm:text-4xl">
          {copy.otherSectionTitle}
        </h3>
        <p className="description-font text-sm text-[#3b332b] sm:text-base">
          {copy.otherSectionDescription}
        </p>
        <OtherProjectsSlideshow
          projects={copy.otherProjects}
          prevLabel={copy.prevLabel}
          nextLabel={copy.nextLabel}
          dotAriaPrefix={copy.otherProjectDotAria}
          hoverHint={copy.hoverHint}
        />
      </section>
    </div>
  );
}
