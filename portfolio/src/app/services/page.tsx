"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const services = [
  {
    priority: "01",
    tier: "Top Priority",
    title: "Full-Stack Web Development",
    description:
      "Build responsive web apps with Next.js, React, TypeScript, Node.js, and MySQL/Supabase.",
  },
  {
    priority: "02",
    tier: "Core Add-On",
    title: "AI Feature Integration",
    description:
      "Add AI-powered workflows (chatbots, document parsing, semantic search) using OpenAI/LLM APIs.",
  },
  {
    priority: "03",
    tier: "Infrastructure",
    title: "Backend API Development",
    description:
      "Design and build with Node.js and Express, plus auth, validation, and role-based access.",
  },
  {
    priority: "04",
    tier: "Polish Layer",
    title: "UI Prototyping and Frontend Polish",
    description:
      "Create fast, interactive prototypes and polished interfaces that are accessible, mobile-friendly, and ready for real users.",
  },
];

type Technology = {
  name: string;
  icon: string;
};

const technologies: Technology[] = [
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Java", icon: "https://cdn.simpleicons.org/openjdk/ED8B00" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34F26" },
  { name: "CSS3", icon: "https://cdn.simpleicons.org/css/1572B6" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
  { name: "C#", icon: "https://cdn.simpleicons.org/dotnet/512BD4" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
  { name: "Express.js", icon: "https://cdn.simpleicons.org/express/222222" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/111111" },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Jest", icon: "https://cdn.simpleicons.org/jest/C21325" },
  { name: "JUnit", icon: "https://cdn.simpleicons.org/junit5/25A162" },
  { name: "Unity", icon: "https://cdn.simpleicons.org/unity/000000" },
  { name: "Databricks", icon: "https://cdn.simpleicons.org/databricks/FF3621" },
  { name: "Supabase", icon: "https://cdn.simpleicons.org/supabase/3ECF8E" },
  { name: "OpenWeather API", icon: "/openWeather.png" },
  { name: "GitLab", icon: "https://cdn.simpleicons.org/gitlab/FC6D26" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
  { name: "Linux VM", icon: "https://cdn.simpleicons.org/linux/FCC624" },
];

const skillBlockColors = [
  "#f6b8ab",
  "#f7cfaa",
  "#f7e3a1",
  "#b6e0c4",
  "#b9e8e1",
  "#bdd4fb",
  "#e2c2f1",
  "#f8bfd3",
];

export default function ServicesPage() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isSkillsInView, setIsSkillsInView] = useState(false);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) {
      return;
    }

    const scrollRoot = sectionElement.closest("main");
    const observerRoot = scrollRoot instanceof Element ? scrollRoot : null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSkillsInView(entry.isIntersecting);
      },
      {
        root: observerRoot,
        threshold: 0.45,
      }
    );

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={sectionRef} className="w-full max-w-5xl space-y-8 text-center lg:text-left">
      <section className="space-y-5">
        <h3 className="title-font text-4xl text-[#c94841] sm:text-5xl">
          My Skill Stack
        </h3>
        <div className="rounded-[2rem] border border-[#d3c8b6] bg-white/65 p-4 shadow-lg sm:p-5">
          <div className="tetris-board relative mx-auto grid h-[30rem] w-full max-w-4xl grid-cols-6 grid-rows-8 gap-2 overflow-hidden rounded-3xl border border-[#b88c84] bg-[#231e1a] p-3 sm:h-[34rem] sm:p-4">
            {technologies.map((technology, index) => (
              <div
                key={technology.name}
                className={`${isSkillsInView ? "tetris-block-falling" : "tetris-block-waiting"} description-font flex h-full min-h-[2.5rem] items-center justify-center gap-2 rounded-xl border border-black/10 px-2 text-center text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#1f1b17] shadow-[inset_0_-2px_0_rgba(0,0,0,0.12)] sm:min-h-[2.75rem] sm:text-[0.76rem]`}
                style={
                  {
                    backgroundColor: skillBlockColors[index % skillBlockColors.length],
                    gridColumn: `${(index % 3) * 2 + 1} / span 2`,
                    gridRow: `${Math.floor(index / 3) + 1}`,
                    "--drop-distance": `${(Math.floor(index / 3) + 2) * 68}px`,
                    "--fall-delay": `${index * 95}ms`,
                    "--fall-duration": `${880 + (index % 4) * 90}ms`,
                  } as CSSProperties
                }
              >
                <Image
                  src={technology.icon}
                  alt={`${technology.name} logo`}
                  width={28}
                  height={28}
                  unoptimized
                  className="h-6 w-6 shrink-0 object-contain sm:h-7 sm:w-7"
                />
                <span>{technology.name}</span>
              </div>
            ))}
          </div>
        </div>
        <h2 className="title-font text-4xl text-[#c94841] sm:text-5xl">
          My Services
        </h2>
      </section>

      <ol className="relative mx-auto w-full max-w-4xl space-y-6 text-left">
        {services.map((service, index) => (
          <li
            key={service.title}
            className="relative grid gap-4 pl-12 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-6 sm:pl-16"
          >
            {index === 0 && services.length > 1 && (
              <span
                aria-hidden
                className="absolute bottom-[-1.5rem] left-5 top-1/2 w-px bg-[#cdbfb2] sm:left-[1.875rem]"
              />
            )}
            {index > 0 && index < services.length - 1 && (
              <span
                aria-hidden
                className="absolute bottom-[-1.5rem] left-5 top-[-1.5rem] w-px bg-[#cdbfb2] sm:left-[1.875rem]"
              />
            )}
            {index === services.length - 1 && index > 0 && (
              <span
                aria-hidden
                className="absolute bottom-1/2 left-5 top-[-1.5rem] w-px bg-[#cdbfb2] sm:left-[1.875rem]"
              />
            )}
            <div className="absolute left-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#c94841]/30 bg-[#fff4f1] text-sm font-semibold text-[#c94841] shadow-sm sm:left-2 sm:h-11 sm:w-11">
              {service.priority}
            </div>
            <div className="hidden sm:block" />
            <article className="rounded-[1.75rem] border border-[#d9cec1] bg-white/72 p-5 shadow-lg sm:p-6">
              <p className="description-font text-[0.7rem] uppercase tracking-[0.28em] text-[#8c5b56]">
                {service.tier}
              </p>
              <h3 className="title-font mt-2 text-xl font-semibold text-[#2f1c3a] sm:text-2xl">
                {service.title}
              </h3>
              <p className="description-font mt-3 text-sm leading-relaxed text-[#1f1f1f] sm:text-base">
                {service.description}
              </p>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
