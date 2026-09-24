"use client";

import { useEffect, useState } from "react";

export default function ProjectForm({
  project,
  onProjectCreated,
  onProjectUpdated,
  onClose,
}) {
  const isEditMode = Boolean(project);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description || "");
    } else {
      setName("");
      setDescription("");
    }

    setError("");
  }, [project]);

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        isEditMode ? `/api/projects/${project.id}` : "/api/projects",
        {
          method: isEditMode ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error || `Failed to ${isEditMode ? "update" : "create"} project`,
        );
        return;
      }

      if (isEditMode) {
        onProjectUpdated(data.project);
      } else {
        onProjectCreated(data.project);
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {" "}
      <div className="mb-6">
        {" "}
        <h2 className="text-xl font-semibold text-white">
          {isEditMode ? "Edit Project" : "Create Project"}{" "}
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          {isEditMode
            ? "Update your project information."
            : "Create a new development project."}
        </p>
      </div>
      {error && (
        <div className="mb-4 rounded-lg border border-red-900 bg-red-950 p-3 text-sm text-red-400">
          {error}
        </div>
      )}
      <div>
        <label
          htmlFor="project-name"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Project Name
        </label>

        <input
          id="project-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter project name"
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="project-description"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Description
        </label>

        <textarea
          id="project-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Enter project description"
          rows={4}
          className="w-full resize-none rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
        />
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? isEditMode
              ? "Saving..."
              : "Creating..."
            : isEditMode
              ? "Save Changes"
              : "Create Project"}
        </button>
      </div>
    </form>
  );
}
