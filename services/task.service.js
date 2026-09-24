import {
  createTask,
  findTasksByProjectId,
  findTaskById,
  updateTask,
  deleteTask,
  findProjectsWithTasksForUser,
  findProjectTasksForUser,
} from "../repositories/task.repository";

import { findUserById } from "../repositories/user.repository";

import { findProjectById } from "../repositories/project.repository";

export async function createNewTask(data, ownerId) {
  const project = await findProjectById(data.projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  if (project.ownerId !== ownerId) {
    throw new Error("You are not allowed to create tasks in this project");
  }

  if (data.assigneeId) {
    const assignee = await findUserById(data.assigneeId);

    if (!assignee) {
      throw new Error("Assignee not found");
    }

    if (assignee.role !== "DEVELOPER") {
      throw new Error("Tasks can only be assigned to developers");
    }
  }

  return createTask({
    title: data.title,
    description: data.description,
    status: data.status,
    priority: data.priority,
    dueDate: data.dueDate,
    projectId: data.projectId,
    assigneeId: data.assigneeId || null,
  });
}

export async function getProjectTasks(projectId, ownerId) {
  const project = await findProjectById(projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  if (project.ownerId !== ownerId) {
    throw new Error("You are not allowed to access this project's tasks");
  }

  return findTasksByProjectId(projectId);
}

export async function editTask(id, ownerId, data) {
  const task = await findTaskById(id);

  if (!task) {
    throw new Error("Task not found");
  }

  if (task.project.ownerId !== ownerId) {
    throw new Error("You are not allowed to modify this task");
  }

  if (data.assigneeId) {
    const assignee = await findUserById(data.assigneeId);

    if (!assignee) {
      throw new Error("Assignee not found");
    }

    if (assignee.role !== "DEVELOPER") {
      throw new Error("Tasks can only be assigned to developers");
    }
  }

  return updateTask(id, {
    title: data.title,
    description: data.description,
    status: data.status,
    priority: data.priority,
    dueDate: data.dueDate,
    assigneeId:
      data.assigneeId !== undefined ? data.assigneeId : task.assigneeId,
  });
}

export async function removeTask(id, ownerId) {
  const task = await findTaskById(id);

  if (!task) {
    throw new Error("Task not found");
  }

  if (task.project.ownerId !== ownerId) {
    throw new Error("You are not allowed to delete this task");
  }

  return deleteTask(id);
}
export async function getProjectsWithMyTasks(userId) {
  return findProjectsWithTasksForUser(userId);
}

export async function getProjectTasksForUser(projectId, userId) {
  const project = await findProjectById(projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  const tasks = await findProjectTasksForUser(projectId, userId);

  const hasAssignedTask = tasks.some((task) => task.assigneeId === userId);

  if (!hasAssignedTask) {
    throw new Error("You are not allowed to access this project's tasks");
  }

  return tasks;
}

export async function updateMyTaskStatus(projectId, taskId, userId, status) {
  const task = await findTaskById(taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  if (task.project.id !== projectId) {
    throw new Error("Task does not belong to this project");
  }

  if (task.assigneeId !== userId) {
    throw new Error("You are not allowed to change this task's status");
  }

  return updateTask(taskId, {
    status,
  });
}
