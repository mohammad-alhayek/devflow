"use client";

import { useDroppable } from "@dnd-kit/core";

import DraggableTaskCard from "./DraggableTaskCard";
import MyTaskCard from "./MyTaskCard";

export default function KanbanColumn({ title, status, tasks, currentUserId }) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div className="flex min-h-[500px] flex-col rounded-2xl border border-slate-800 bg-slate-950/50">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-4">
        <h2 className="font-semibold text-white">{title}</h2>

        <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
          {tasks.length}
        </span>
      </div>

      <div
        ref={setNodeRef}
        className={`min-h-[440px] flex-1 p-3 transition ${
          isOver ? "rounded-b-2xl bg-blue-500/5" : ""
        }`}
      >
        <div className="flex min-h-[410px] flex-col gap-3">
          {tasks.map((task) => {
            const isMyTask = Number(task.assigneeId) === Number(currentUserId);

            return (
              <DraggableTaskCard key={task.id} task={task} disabled={!isMyTask}>
                <MyTaskCard task={task} isMyTask={isMyTask} />
              </DraggableTaskCard>
            );
          })}

          {tasks.length === 0 && (
            <div
              className={`flex min-h-[410px] flex-1 items-center justify-center rounded-xl border-2 border-dashed transition ${
                isOver ? "border-blue-500/50 bg-blue-500/5" : "border-slate-800"
              }`}
            >
              <p className="text-sm text-slate-600">Drop tasks here</p>
            </div>
          )}

          {tasks.length > 0 && (
            <div
              className={`min-h-[100px] flex-1 rounded-xl border-2 border-dashed transition ${
                isOver
                  ? "border-blue-500/30 bg-blue-500/5"
                  : "border-transparent"
              }`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
