import Link from "next/link";

export default function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-slate-700 hover:shadow-xl">
      <h2 className="text-xl font-semibold">{project.name}</h2>

      <p className="mt-2 text-sm text-slate-400">
        {project.description || "No description"}
      </p>

      <p className="mt-4 text-xs text-slate-500">
        Created: {new Date(project.createdAt).toLocaleDateString()}
      </p>

      <div className="mt-6 flex gap-2">
        <Link
          href={`/projects/${project.id}`}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium transition hover:bg-blue-700"
        >
          View
        </Link>

        <button
          onClick={() => onEdit(project)}
          className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium transition hover:bg-slate-600"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(project.id)}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium transition hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
