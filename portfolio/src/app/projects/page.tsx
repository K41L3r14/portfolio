"use client";

import Image from "next/image";
import { useState } from "react";

type Project = {
  title: string;
  stack: string;
  summary: string;
  video?: string;
  slideshow?: string[];
};

const projects: Project[] = [
  {
    title: "Ripple Effects",
    stack: "Frontend Project",
    summary:
      "Interactive visual effects project focused on smooth motion and polished interface behavior.",
    video: "/videos/Ripple-Effects.mp4",
  },
  {
    title: "Buckle Chatbot",
    stack: "Conversational Interface",
    summary:
      "Chatbot experience for Buckle with a guided conversational flow and responsive UI behavior.",
    video: "/videos/chatbot-Buckle.mp4",
  },
  {
    title: "Obserra",
    stack: "Audit Management Platform",
    summary:
      "Role-based workflow platform for managing audits, tasks, and account controls across teams.",
    slideshow: [
      "/Obserra-photos/WelcomeObserraPage.png",
      "/Obserra-photos/ManageAllAccountsAndRolesAdminRole.png",
      "/Obserra-photos/ViewPendingTasksForAuditAdminRole.png",
      "/Obserra-photos/AuditorRole.png",
      "/Obserra-photos/AuditIntakeCoordinatorRole.png",
      "/Obserra-photos/TasksAssigningCoordinatorRole.png",
      "/Obserra-photos/ViewControlsAndTasksCoordinatorRole.png",
      "/Obserra-photos/ProgressOnTasksContributorRole.png",
    ],
  },
];

function ObserraSlideshow({ slides }: { slides: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

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
          src={slides[currentIndex]}
          alt={`Obserra slide ${currentIndex + 1}`}
          fill
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-contain"
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={showPrevious}
          className="rounded border border-[#1f1b17] px-3 py-1 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#1f1b17] hover:text-[#f7f3ec]"
        >
          Prev
        </button>
        <p className="text-xs uppercase tracking-[0.2em] text-[#3b332b]">
          {currentIndex + 1} / {slides.length}
        </p>
        <button
          type="button"
          onClick={showNext}
          className="rounded border border-[#1f1b17] px-3 py-1 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#1f1b17] hover:text-[#f7f3ec]"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="w-full max-w-5xl space-y-8 text-center lg:text-left">
      <h2 className="text-3xl font-bold sm:text-4xl">Projects</h2>
      <div className="grid gap-6 lg:grid-cols-1">
        {projects.map((project) => (
          <article
            key={project.title}
            className="rounded-2xl bg-white/70 p-6 text-left text-[#1f1f1f] shadow-lg"
          >
            {project.video && (
              <div className="mb-4 overflow-hidden rounded-xl border border-[#d3c8b6] bg-[#f0ebe3]">
                <video
                  className="aspect-video w-full"
                  controls
                  preload="metadata"
                >
                  <source src={project.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            {project.slideshow && <ObserraSlideshow slides={project.slideshow} />}
            <p className="text-xs font-semibold uppercase tracking-wide text-[#1b475D]">
              {project.stack}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-[#2f1c3a]">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed sm:text-base">
              {project.summary}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
