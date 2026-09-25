import Navbar from "../../components/landing/Navbar";

const features = [
  {
    title: "Project Management",
    description:
      "Create and manage development projects from one organized workspace.",
    icon: "▦",
  },
  {
    title: "Task Management",
    description:
      "Create tasks, assign them to developers, set priorities, and track deadlines.",
    icon: "✓",
  },
  {
    title: "Kanban Board",
    description:
      "Visualize your workflow with To Do, In Progress, Review, and Done columns.",
    icon: "▤",
  },
  {
    title: "Task Assignment",
    description:
      "Assign tasks to developers and make responsibilities clear across the team.",
    icon: "◎",
  },
  {
    title: "Search",
    description:
      "Quickly find projects and tasks by searching through the information displayed on each card.",
    icon: "⌕",
  },
  {
    title: "Task Details",
    description:
      "View important task information including status, priority, assignee, description, and due date.",
    icon: "▣",
  },
  {
    title: "Role-Based Access",
    description:
      "Control what users can do based on their role and project ownership.",
    icon: "◈",
  },
  {
    title: "API Documentation",
    description:
      "Explore and test the backend API through integrated Swagger documentation.",
    icon: "</>",
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-blue-400">
            DevFlow Features
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Everything your development team needs
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            DevFlow brings project management, task tracking, team
            collaboration, and development workflows together in one place.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-900/80"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-lg font-semibold text-blue-400 transition group-hover:bg-blue-600/20">
                {feature.icon}
              </div>

              <h2 className="mt-5 text-lg font-semibold text-white">
                {feature.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {feature.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-20 rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center sm:p-12">
          <p className="text-sm font-medium uppercase tracking-wider text-blue-400">
            Ready to get started?
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            Start managing your development workflow
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Create your workspace, organize your projects, and start managing
            tasks with DevFlow.
          </p>

          <a
            href="/register"
            className="mt-7 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Get Started
          </a>
        </div>
      </section>
    </main>
  );
}
