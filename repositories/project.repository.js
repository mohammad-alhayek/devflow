import prisma from "../lib/prisma";

export async function createProject(data) {
  return prisma.project.create({
    data,
  });
}

export async function findProjectsByOwnerId(ownerId) {
  return prisma.project.findMany({
    where: {
      ownerId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function findProjectById(id) {
  return prisma.project.findUnique({
    where: {
      id,
    },
  });
}

export async function updateProject(id, data) {
  return prisma.project.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteProject(id) {
  return prisma.project.delete({
    where: {
      id,
    },
  });
}
