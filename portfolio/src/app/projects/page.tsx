"use client";

import Image from "next/image";
import { useState } from "react";

type Project = {
  title: string;
  stack: string;
  summary: string;
  technologies: string[];
  video?: string;
  slideshow?: string[];
};

type OtherProject = {
  title: string;
  summary: string;
  skills: string[];
};

const projects: Project[] = [
  {
    title: "Obserra",
    stack: "Audit Management Platform",
    summary:
      "AI-powered audit workflow platform with four roles: Coordinator, Contributor, Auditor, and Admin. Coordinators ingest audits, upload audit files, assign controls and tasks to contributors, complete tasks themselves when needed, and review/approve contributor work. Contributors complete assigned tasks and improve submissions based on coordinator feedback. Auditors track what has been completed and which teams are working each audit. Admins manage all accounts and approve tags submitted during audit intake. OpenAI API integration automatically detects controls and tasks from spreadsheets using intent keywords such as \"provide\" and \"submit,\" making the system resilient to varied spreadsheet formats.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
      "OpenAI API",
      "Role-Based Access",
      "Workflow UI",
    ],
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
  {
    title: "Buckle Chatbot",
    stack: "Conversational Interface",
    summary:
      "Conversational shopping assistant powered by Buckle inventory data and enriched metadata. To improve recommendation quality, we used the Anthropic API to process 50,000+ product images and generate tags across four categories: when to wear, color, descriptors, and aesthetic. The pipeline generated 10 tags per category (40 tags per item), then embedded those tags to power a RAG retrieval flow that returns the top 20 closest products for each user request. This enabled semantic search instead of strict keyword search, so customers can ask prompts like \"Can you give me floral wear for a night out?\" and still get relevant results. The approach improved discoverability by surfacing inventory beyond the first few keyword matches.",
    technologies: [
      "Python",
      "JavaScript",
      "Anthropic API",
      "LLMs",
      "Embeddings",
      "RAG Pipeline",
      "Semantic Search",
    ],
    video: "/videos/chatbot-Buckle.mp4",
  },
  {
    title: "Ripple Effects",
    stack: "Educational Simulation Game",
    summary:
      "Ripple Effects is an immersive simulation game set in fantasy town Aquaville that teaches water management through strategic policy and resource decisions. I designed and implemented two minigames: a Ranch game where cows approach three water troughs at different speeds based on mood, affecting consumption, and players must set an explicit water budget and meet difficulty-based herd targets (easy/medium/hard); and a Field Watering game where players place sensors and apply water only to zones with low moisture and lower crop quality. I also designed a portion of the visual assets used in the game.",
    technologies: [
      "Unity",
      "C#",
      "Game Design",
      "Simulation Systems",
      "UI/UX Design",
      "Asset Design",
    ],
    video: "/videos/Ripple-Effects.mp4",
  },
];

const otherProjects: OtherProject[] = [
  {
    title: "Personal Diary - Full-Stack Journaling Application",
    summary:
      "Privacy-first full-stack journaling app for creating, editing, and tracking daily reflections in a calendar-based interface. Users can manage entries with full CRUD operations, track mood/weather/food habits, and securely authenticate with Firebase Authentication. I contributed to backend and frontend development, designed the MySQL schema (users and entries with foreign keys), implemented CRUD APIs and UI flows, and supported testing/documentation. The app demonstrates end-to-end architecture with Express APIs, structured JSON entry data, and scalable planning for future features like offline support, multi-device sync, and rich media notes.",
    skills: [
      "React",
      "Express.js",
      "TypeScript",
      "MySQL",
      "Firebase Authentication",
      "Tailwind CSS",
      "CRUD APIs",
      "JSON Data Modeling",
      "Database Schema Design",
      "Testing and Documentation",
    ],
  },
  {
    title: "AuditAI: AI-Powered Vulnerability Scanner",
    summary:
      "Full-stack AI security tool that scans open-source code for vulnerabilities and helps developers judge how trustworthy model findings are. The system analyzes code with multiple models (OpenAI, Claude, and CodeBERT), then returns severity levels, confidence scores, highlighted lines, and suggested fixes. It supports import/export for analysis workflows, validates model outputs with Zod schemas, and uses fixture-based testing across scenarios like XSS, eval injection, and redirect vulnerabilities. We also measured precision, recall, F1, and TP/FP/FN to compare models and reduce false positives and hallucinated results.",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Next.js APIs",
      "OpenAI API",
      "Claude API",
      "CodeBERT",
      "Zod Validation",
      "Prompt Engineering",
      "Model Evaluation Metrics",
    ],
  },
  {
    title: "Zulip Open-Source Contribution - Moderation & Engagement Features",
    summary:
      "Contributed to the Zulip open-source team chat platform by developing features that improve topic organization, moderation, and user engagement. Built an Upvote system that helps users highlight and track important discussions, and implemented a Topic Lock (read-only) feature that allows admins and moderators to control conversations and protect important topics. Worked across the Django backend, JavaScript frontend, and UI templates, including adding models, event handlers, and authorization checks. Also supported testing and developer documentation to make the features reliable and easier for future contributors to understand.",
    skills: [
      "Python (Django)",
      "JavaScript",
      "MVC Architecture",
      "Open-Source Collaboration",
      "Testing and Debugging",
      "Technical Documentation",
      "Scrum Development Process",
    ],
  },
];

function ObserraSlideshow({
  slides,
}: {
  slides: string[];
}) {
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

function OtherProjectsSlideshow({
  projects,
}: {
  projects: OtherProject[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProject = projects[currentIndex];

  const showPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      <article className="rounded-2xl bg-white/70 p-5 text-left text-[#1f1f1f] shadow-lg">
        <h4 className="text-lg font-semibold text-[#2f1c3a]">
          {currentProject.title}
        </h4>
        <p className="mt-2 text-sm leading-relaxed sm:text-base">
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
      </article>

      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={showPrevious}
          className="rounded border border-[#1f1b17] px-3 py-1 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#1f1b17] hover:text-[#f7f3ec]"
        >
          Prev
        </button>
        <p className="text-xs uppercase tracking-[0.2em] text-[#3b332b]">
          {currentIndex + 1} / {projects.length}
        </p>
        <button
          type="button"
          onClick={showNext}
          className="rounded border border-[#1f1b17] px-3 py-1 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#1f1b17] hover:text-[#f7f3ec]"
        >
          Next
        </button>
      </div>

      <div className="flex justify-center gap-2">
        {projects.map((project, index) => (
          <button
            key={project.title}
            type="button"
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to ${project.title}`}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              currentIndex === index ? "bg-[#e0584f]" : "bg-[#c9bdab]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="w-full max-w-5xl space-y-8 text-center lg:text-left">
      <h2 className="font-serif text-4xl text-[#c94841] sm:text-5xl">
        Projects I&apos;ve Worked On
      </h2>
      <div className="grid gap-6 lg:grid-cols-1">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group rounded-2xl bg-white/70 p-6 text-left text-[#1f1f1f] shadow-lg transition-[background-color,box-shadow] duration-300 hover:bg-white/85 hover:shadow-xl"
          >
            {project.video && (
              <div className="mb-4 overflow-hidden rounded-xl border border-[#d3c8b6] bg-[#f0ebe3]">
                <video className="aspect-video w-full" controls preload="metadata">
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
            <p className="mt-2 hidden text-[0.7rem] uppercase tracking-[0.24em] text-[#3b332b] lg:block lg:group-hover:hidden">
              Hover card to expand details
            </p>

            <div className="mt-4 lg:mt-0 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-500 lg:ease-out lg:group-hover:mt-4 lg:group-hover:max-h-[56rem] lg:group-hover:opacity-100">
              <p className="text-sm leading-relaxed sm:text-base">{project.summary}</p>
              <p className="mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#3b332b]">
                Technologies
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
        <h3 className="font-serif text-3xl text-[#c94841] sm:text-4xl">
          Other Projects I&apos;ve Worked On
        </h3>
        <p className="text-sm text-[#3b332b] sm:text-base">
          No live demos for these yet, but these projects reflect my technical
          skills and hands-on experience.
        </p>
        <OtherProjectsSlideshow projects={otherProjects} />
      </section>
    </div>
  );
}
