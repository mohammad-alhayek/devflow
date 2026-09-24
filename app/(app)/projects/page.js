"use client";
import { useEffect, useState } from "react";

import ProjectForm from "../../../components/projects/ProjectForm";
import ProjectList from "../../../components/projects/ProjectList";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects");

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Failed to load projects");
          return;
        }

        setProjects(data.projects);
      } catch {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  function handleProjectCreated(project) {
    setProjects((currentProjects) => [project, ...currentProjects]);

    setShowCreateModal(false);
  }

  function handleEdit(project) {
    setSelectedProject(project);
  }

  function handleProjectUpdated(updatedProject) {
    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project,
      ),
    );

    setSelectedProject(null);
  }

  async function handleDelete(projectId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to delete project");
        return;
      }

      setProjects((currentProjects) =>
        currentProjects.filter((project) => project.id !== projectId),
      );
    } catch {
      setError("Something went wrong");
    }
  }

  function closeCreateModal() {
    setShowCreateModal(false);
  }

  function closeEditModal() {
    setSelectedProject(null);
  }

  if (loading) {
    return (
      <div className="p-8">
        {" "}
        <p className="text-slate-400">Loading projects... </p>{" "}
      </div>
    );
  }

  return (
    <div className="p-8">
      {" "}
      <div className="mx-auto max-w-6xl">
        {" "}
        <div className="mb-8 flex items-center justify-between">
          {" "}
          <div>
            {" "}
            <h1 className="text-3xl font-bold">My Projects </h1>
            <p className="mt-2 text-slate-400">
              Manage your development projects.
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium transition hover:bg-blue-700"
          >
            + Create Project
          </button>
        </div>
        {error && (
          <div className="mb-6 rounded-lg border border-red-900 bg-red-950 p-4 text-red-400">
            {error}
          </div>
        )}
        <ProjectList
          projects={projects}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
              <button
                onClick={closeCreateModal}
                className="absolute right-4 top-4 text-xl text-slate-400 transition hover:text-white"
              >
                ×
              </button>

              <ProjectForm
                onProjectCreated={handleProjectCreated}
                onClose={closeCreateModal}
              />
            </div>
          </div>
        )}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
              <button
                onClick={closeEditModal}
                className="absolute right-4 top-4 text-xl text-slate-400 transition hover:text-white"
              >
                ×
              </button>

              <ProjectForm
                project={selectedProject}
                onProjectUpdated={handleProjectUpdated}
                onClose={closeEditModal}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
