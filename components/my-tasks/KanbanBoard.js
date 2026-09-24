"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import KanbanColumn from "./KanbanColumn";
import MyTaskCard from "./MyTaskCard";

const columns = [
  { status: "TODO", title: "To Do" },
  { status: "IN_PROGRESS", title: "In Progress" },
  { status: "REVIEW", title: "Review" },
  { status: "DONE", title: "Done" },
];

export default function KanbanBoard({ tasks, projectId, currentUserId }) {
  const [boardTasks, setBoardTasks] = useState(tasks);
  const [activeTask, setActiveTask] = useState(null);
  const [updating, setUpdating] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  useEffect(() => {
    setBoardTasks(tasks);
  }, [tasks]);

  const handleDragStart = useCallback(
    (event) => {
      const task = boardTasks.find(
        (item) => String(item.id) === String(event.active.id),
      );

      if (!task) {
        return;
      }

      if (Number(task.assigneeId) !== Number(currentUserId)) {
        return;
      }

      setActiveTask(task);
    },
    [boardTasks, currentUserId],
  );

  const handleDragEnd = useCallback(
    async (event) => {
      const { active, over } = event;

      setActiveTask(null);

      if (!over) {
        return;
      }

      const taskId = Number(active.id);
      const newStatus = String(over.id);

      const draggedTask = boardTasks.find((task) => task.id === taskId);

      if (!draggedTask) {
        return;
      }

      if (Number(draggedTask.assigneeId) !== Number(currentUserId)) {
        return;
      }

      const validColumn = columns.some((column) => column.status === newStatus);

      if (!validColumn) {
        return;
      }

      if (draggedTask.status === newStatus) {
        return;
      }

      const oldStatus = draggedTask.status;

      setBoardTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status: newStatus,
              }
            : task,
        ),
      );

      setUpdating(true);

      try {
        const response = await fetch(
          `/api/my-tasks/projects/${projectId}/tasks/${taskId}/status`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: newStatus,
            }),
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to update task status");
        }
      } catch (error) {
        console.error("UPDATE TASK STATUS ERROR:", error);

        setBoardTasks((currentTasks) =>
          currentTasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  status: oldStatus,
                }
              : task,
          ),
        );
      } finally {
        setUpdating(false);
      }
    },
    [boardTasks, currentUserId, projectId],
  );

  const handleDragCancel = useCallback(() => {
    setActiveTask(null);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="relative">
        {updating && (
          <div className="absolute right-0 top-0 z-10 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-400">
            Updating...
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {columns.map((column) => {
            const columnTasks = boardTasks.filter(
              (task) => task.status === column.status,
            );

            return (
              <KanbanColumn
                key={column.status}
                title={column.title}
                status={column.status}
                tasks={columnTasks}
                currentUserId={currentUserId}
              />
            );
          })}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="rotate-2 opacity-90">
              <MyTaskCard task={activeTask} isMyTask={true} />
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
