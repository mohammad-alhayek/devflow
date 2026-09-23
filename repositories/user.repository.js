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
