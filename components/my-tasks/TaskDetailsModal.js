export default function TaskDetailsModal({ task, onClose }) {
  if (!task) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-slate-800 p-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-blue-400">
              Task Details
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">{task.title}</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div>
            <h3 className="text-sm font-medium text-slate-300">Description</h3>

            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-400">
              {task.description || "No description provided."}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
              <p className="text-xs text-slate-500">Status</p>

              <p className="mt-1 text-sm font-medium text-white">
                {task.status}
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
              <p className="text-xs text-slate-500">Priority</p>

              <p className="mt-1 text-sm font-medium text-white">
                {task.priority}
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
              <p className="text-xs text-slate-500">Assigned To</p>

              <p className="mt-1 text-sm font-medium text-white">
                {task.assignee?.name || "Unassigned"}
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
              <p className="text-xs text-slate-500">Due Date</p>

              <p className="mt-1 text-sm font-medium text-white">
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "No due date"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
