import Link from "next/link";

import { getCurrentUser } from "../../../../lib/current-user";
import { getProject } from "../../../../services/project.service";
import TaskSection from "../../../../components/tasks/TaskSection";

export default async function ProjectDetailsPage({ params }) {
  const user = await getCurrentUser();

  const { id } = await params;
  const projectId = Number(id);

  if (Number.isNaN(projectId)) {
    return (
      <div className="rounded-2xl border border-red-900 bg-red-950 p-6">
        <h1 className="text-xl font-semibold text-red-400">Invalid Project</h1>

        <p className="mt-2 text-sm text-red-300">
          The project ID is not valid.
        </p>
      </div>
    );
  }

  let project;

  try {
    project = await getProject(projectId, user.id);
  } catch {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
        <h1 className="text-2xl font-bold text-white">Project Not Found</h1>

        <p className="mt-2 text-slate-400">
          This project does not exist or you don't have access to it.
        </p>

        <Link
          href="/projects"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/projects"
          className="text-sm text-slate-400 transition hover:text-white"
        >
          ← Back to Projects
        </Link>
      </div>

      <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="relative">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-blue-400">
                Project
              </p>

              <h1 className="mt-2 text-3xl font-bold text-white">
                {project.name}
              </h1>

              <p className="mt-3 max-w-2xl text-slate-400">
                {project.description ||
                  "No description provided for this project."}
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 px-5 py-4">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Created
              </p>

              <p className="mt-1 text-sm font-medium text-slate-300">
                {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </section>

      <TaskSection
        projectId={project.id}
        isOwner={project.ownerId === user.id}
      />
    </div>
  );
}
