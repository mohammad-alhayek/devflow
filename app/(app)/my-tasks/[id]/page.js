"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import KanbanBoard from "../../../../components/my-tasks/KanbanBoard";
import SearchInput from "../../../../components/common/SearchInput";

export default function MyTasksProjectPage() {
  const params = useParams();
  const projectId = params.id;

  const [tasks, setTasks] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  async function fetchCurrentUser() {
    const response = await fetch("/api/auth/me");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch current user");
    }

    setCurrentUserId(Number(data.userId));
  }

  async function fetchTasks() {
    try {
      setLoading(true);
      setError("");

      await fetchCurrentUser();

      const response = await fetch(`/api/my-tasks/projects/${projectId}`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch project tasks");
      }

      setTasks(data.tasks);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (projectId) {
      fetchTasks();
    }
  }, [projectId]);

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
    <div>
      <div className="mb-8">
        <Link
          href="/my-tasks"
          className="text-sm text-slate-400 transition hover:text-white"
        >
          ← Back to My Tasks
        </Link>

        <div className="mt-6">
          <p className="text-sm font-medium uppercase tracking-wider text-blue-400">
            Project Tasks
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white">
            My Project Tasks
          </h1>

          <p className="mt-2 text-slate-400">All tasks inside this project.</p>
        </div>
      </div>

      {loading && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">
          <p className="text-sm text-slate-400">Loading project tasks...</p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-900 bg-red-950 px-5 py-4">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {!loading && !error && tasks.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-12 text-center">
          <h2 className="text-xl font-semibold text-white">No tasks found</h2>

          <p className="mt-2 text-sm text-slate-400">
            This project doesn't have any tasks yet.
          </p>
        </div>
      )}

      {!loading && !error && tasks.length > 0 && (
        <>
          <div className="mb-6">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search project tasks..."
            />
          </div>

          {filteredTasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-10 text-center">
              <p className="text-sm text-slate-400">
                No tasks match your search.
              </p>
            </div>
          ) : (
            <KanbanBoard
              tasks={filteredTasks}
              projectId={projectId}
              currentUserId={currentUserId}
            />
          )}
        </>
      )}
    </div>
  );
}
