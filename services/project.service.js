import {
  createProject,
  findProjectsByOwnerId,
  findProjectById,
  updateProject,
  deleteProject,
} from "../repositories/project.repository";

export async function createNewProject(data, ownerId) {
  const project = await createProject({
    name: data.name,
    description: data.description,
    ownerId,
  });

  return project;
}

export async function getUserProjects(ownerId) {
  return findProjectsByOwnerId(ownerId);
}

export async function getProject(id, ownerId) {
  const project = await findProjectById(id);

  if (!project) {
    throw new Error("Project not found");
  }

  if (project.ownerId !== ownerId) {
    throw new Error("You are not allowed to access this project");
  }

  return project;
}

export async function editProject(id, ownerId, data) {
  const project = await findProjectById(id);

  if (!project) {
    throw new Error("Project not found");
  }

  if (project.ownerId !== ownerId) {
    throw new Error("You are not allowed to modify this project");
  }

  return updateProject(id, {
    name: data.name,
    description: data.description,
  });
}

export async function removeProject(id, ownerId) {
  const project = await findProjectById(id);

  if (!project) {
    throw new Error("Project not found");
  }

  if (project.ownerId !== ownerId) {
    throw new Error("You are not allowed to delete this project");
  }

  return deleteProject(id);
}
