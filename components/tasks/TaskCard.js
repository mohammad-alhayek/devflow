export default function TaskCard({ task, isOwner, onEdit, onDelete }) {
  const statusStyles = {
    TODO: "bg-slate-800 text-slate-300",
    IN_PROGRESS: "bg-blue-500/10 text-blue-400",
    REVIEW: "bg-yellow-500/10 text-yellow-400",
    DONE: "bg-green-500/10 text-green-400",
  };

  const priorityStyles = {
    LOW: "bg-slate-800 text-slate-300",
    MEDIUM: "bg-blue-500/10 text-blue-400",
    HIGH: "bg-orange-500/10 text-orange-400",
    CRITICAL: "bg-red-500/10 text-red-400",
  };

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-white">{task.title}</h3>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {task.description || "No description provided."}
          </p>
        </div>

        {isOwner && (
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => onEdit(task)}
              className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => onDelete(task)}
              className="rounded-lg border border-red-900 px-3 py-2 text-xs font-medium text-red-400 transition hover:bg-red-950"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            statusStyles[task.status] || statusStyles.TODO
          }`}
        >
          {task.status.replace("_", " ")}
        </span>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            priorityStyles[task.priority] || priorityStyles.MEDIUM
          }`}
        >
          {task.priority}
        </span>

        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
          {task.assignee?.name || "Unassigned"}
        </span>
      </div>

      {task.dueDate && (
        <div className="mt-4 text-xs text-slate-500">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
    </article>
  );
}
