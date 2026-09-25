"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import MyTaskProjectCard from "../../../components/my-tasks/MyTaskProjectCard";
import SearchInput from "../../../components/common/SearchInput";

export default function MyTasksPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  async function fetchProjects() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/my-tasks/projects");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch your task projects");
      }

      setProjects(data.projects);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredProjects = projects.filter((project) => {
    if (!normalizedSearch) {
      return true;
    }

    const searchableText = [
      project.name,
      project.description,
      project.myTaskCount,
      project.totalTaskCount,
    ]
      .filter((value) => value !== null && value !== undefined)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedSearch);
  });

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-wider text-blue-400">
          My Workspace
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white">My Tasks</h1>

        <p className="mt-2 max-w-2xl text-slate-400">
          View the projects that contain tasks assigned to you.
        </p>
      </div>

      {loading && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">
          <p className="text-sm text-slate-400">Loading your projects...</p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-900 bg-red-950 px-5 py-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600/10 text-2xl text-blue-400">
            ✓
          </div>

          <h2 className="mt-4 text-xl font-semibold text-white">
            No tasks assigned
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
            You currently don't have any tasks assigned to you.
          </p>

          <Link
            href="/projects"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            View Projects
          </Link>
        </div>
      )}

      {!loading && !error && projects.length > 0 && (
        <>
          <div className="mb-6">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search my tasks..."
            />
          </div>

          {filteredProjects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-10 text-center">
              <p className="text-sm text-slate-400">
                No projects match your search.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <MyTaskProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
