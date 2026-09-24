import Link from "next/link";

export default function MyTaskProjectCard({ project }) {
  return (
    <Link
      href={`/my-tasks/${project.id}`}
      className="group block rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500/50 hover:bg-slate-900/80"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white transition group-hover:text-blue-400">
            {project.name}
          </h2>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
            {project.description || "No description provided."}
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400 transition group-hover:bg-blue-600/20">
          →
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 border-t border-slate-800 pt-4">
        <div>
          <p className="text-xs text-slate-500">My Tasks</p>

          <p className="mt-1 text-lg font-semibold text-white">
            {project.myTaskCount}
          </p>
        </div>

        <div className="h-8 w-px bg-slate-800" />

        <div>
          <p className="text-xs text-slate-500">Total Tasks</p>

          <p className="mt-1 text-lg font-semibold text-white">
            {project.totalTaskCount}
          </p>
        </div>
      </div>
    </Link>
  );
}
