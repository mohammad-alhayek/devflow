import prisma from "../lib/prisma";

export async function createTask(data) {
  return prisma.task.create({
    data,
    include: {
      assignee: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });
}

export async function findTasksByProjectId(projectId) {
  return prisma.task.findMany({
    where: {
      projectId,
    },
    include: {
      assignee: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function findTaskById(id) {
  return prisma.task.findUnique({
    where: {
      id,
    },
    include: {
      assignee: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },

      project: {
        select: {
          id: true,
          ownerId: true,
        },
      },
    },
  });
}

export async function updateTask(id, data) {
  return prisma.task.update({
    where: {
      id,
    },
    data,
    include: {
      assignee: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });
}

export async function deleteTask(id) {
  return prisma.task.delete({
    where: {
      id,
    },
  });
}
