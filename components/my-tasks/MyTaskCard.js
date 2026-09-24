"use client";

import { useState } from "react";
import TaskDetailsModal from "./TaskDetailsModal";

export default function MyTaskCard({ task, isMyTask }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowDetails(true)}
        className={`rounded-xl border bg-slate-900 p-4 shadow-sm transition ${
          isMyTask
            ? "cursor-grab border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/80"
            : "cursor-pointer border-slate-800 opacity-75 hover:bg-slate-800/50"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-medium text-white">{task.title}</h3>

          <span className="shrink-0 rounded-md bg-slate-800 px-2 py-1 text-xs font-medium text-slate-300">
            {task.priority}
          </span>
        </div>

        {task.description && (
          <p className="mt-2 line-clamp-4 text-sm leading-5 text-slate-400">
            {task.description}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3">
          {task.assignee ? (
            <p className="text-xs text-slate-500">
              Assigned to{" "}
              <span className="text-slate-300">{task.assignee.name}</span>
            </p>
          ) : (
            <p className="text-xs text-slate-500">Unassigned</p>
          )}

          {isMyTask && <span className="text-xs text-blue-400">Drag</span>}
        </div>
      </div>

      {showDetails && (
        <TaskDetailsModal task={task} onClose={() => setShowDetails(false)} />
      )}
    </>
  );
}
