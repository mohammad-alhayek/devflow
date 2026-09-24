"use client";

import TaskForm from "./TaskForm";

export default function TaskModal({
  task,
  developers,
  onSubmit,
  onCancel,
  submitting,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-white">
              {task ? "Edit Task" : "Create New Task"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {task
                ? "Update task details and assignment."
                : "Create a task and assign it to a developer."}
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <TaskForm
            task={task}
            developers={developers}
            onSubmit={onSubmit}
            onCancel={onCancel}
            submitting={submitting}
          />
        </div>
      </div>
    </div>
  );
}
