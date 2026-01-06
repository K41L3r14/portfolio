const projects = [
  {
    title: "Edge Log Analyzer",
    stack: "Next.js + TypeScript",
    summary:
      "Interactive dashboard for filtering production logs in real-time with shareable insights for on-call teammates.",
  },
  {
    title: "Service Status Hub",
    stack: "Node.js + PostgreSQL",
    summary:
      "Self-serve status page that surfaces incidents, proactive alerts, and automated runbook links for partner teams.",
  },
  {
    title: "Design Token System",
    stack: "React + Tailwind CSS",
    summary:
      "Unified token pipeline that keeps marketing and app surfaces visually consistent while enabling rapid iteration.",
  },
];

export default function ProjectsPage() {
  return (
    <div className="w-full max-w-5xl space-y-8 text-center lg:text-left">
      <h2 className="text-3xl font-bold sm:text-4xl">Projects</h2>
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="rounded-2xl bg-white/70 p-6 text-left text-[#1f1f1f] shadow-lg"
          >
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
