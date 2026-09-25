"use client";

import { useEffect, useState } from "react";

import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import SearchInput from "../common/SearchInput";

export default function TaskSection({ projectId, isOwner }) {
  const [tasks, setTasks] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  async function fetchTasks() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`/api/projects/${projectId}/tasks`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch tasks");
      }

      setTasks(data.tasks);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchDevelopers() {
    const response = await fetch("/api/users/developers");

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch developers");
    }

    setDevelopers(data.developers);
  }

  useEffect(() => {
    fetchTasks();

    if (isOwner) {
      fetchDevelopers().catch((error) => {
        setError(error.message);
      });
    }
  }, [projectId, isOwner]);

  function openCreateModal() {
    setSelectedTask(null);
    setModalOpen(true);
  }

  function openEditModal(task) {
    setSelectedTask(task);
    setModalOpen(true);
  }

  function closeModal() {
    if (submitting) {
      return;
    }

    setModalOpen(false);
    setSelectedTask(null);
  }

  async function handleSubmit(formData) {
    try {
      setSubmitting(true);
      setError("");

      const url = selectedTask
        ? `/api/projects/${projectId}/tasks/${selectedTask.id}`
        : `/api/projects/${projectId}/tasks`;

      const method = selectedTask ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save task");
      }

      setModalOpen(false);
      setSelectedTask(null);

      await fetchTasks();
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(task) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `/api/projects/${projectId}/tasks/${task.id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete task");
      }

      await fetchTasks();
    } catch (error) {
      setError(error.message);
    }
  }

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredTasks = tasks.filter((task) => {
    if (!normalizedSearch) {
      return true;
    }

    const searchableText = [
      task.title,
      task.description,
      task.status?.replace("_", " "),
      task.priority,
      task.assignee?.name,
      task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "",
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedSearch);
  });

  return (
    <section className="mt-8">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Tasks</h2>

          <p className="mt-1 text-sm text-slate-400">
            Manage tasks and assignments for this project.
          </p>
        </div>

        {isOwner && (
          <button
            type="button"
            onClick={openCreateModal}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            + Create Task
          </button>
        )}
      </div>

      {error && (
        <div className="mb-5 rounded-lg border border-red-900 bg-red-950 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {loading && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">
          <p className="text-sm text-slate-400">Loading tasks...</p>
        </div>
      )}

      {!loading && !error && tasks.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600/10 text-2xl text-blue-400">
            ✓
          </div>

          <h3 className="mt-4 text-lg font-semibold text-white">
            No tasks yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
            Create your first task and start assigning work to your development
            team.
          </p>

          {isOwner && (
            <button
              type="button"
              onClick={openCreateModal}
              className="mt-5 rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
            >
              Create Your First Task
            </button>
          )}
        </div>
      )}

      {!loading && tasks.length > 0 && (
        <>
          <div className="mb-5">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search tasks..."
            />
          </div>

          {filteredTasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-10 text-center">
              <p className="text-sm text-slate-400">
                No tasks match your search.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  isOwner={isOwner}
                  onEdit={openEditModal}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </>
      )}

      {modalOpen && (
        <TaskModal
          task={selectedTask}
          developers={developers}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          submitting={submitting}
        />
      )}
    </section>
  );
}
