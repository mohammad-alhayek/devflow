import prisma from "../lib/prisma";

export async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function findUserById(id) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function createUser(data) {
  return prisma.user.create({
    data,
  });
}
export async function findDevelopers() {
  return prisma.user.findMany({
    where: { role: "DEVELOPER" },
    select: { id: true, name: true, email: true },
    orderBy: { name: "asc" },
  });
}
