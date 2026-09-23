import bcrypt from "bcryptjs";

import { findUserByEmail, createUser } from "../repositories/user.repository";

function sanitizeUser(user) {
  const { password, ...safeUser } = user;

  return safeUser;
}

export async function registerUser(data) {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("Email is already registered");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await createUser({
    ...data,
    password: hashedPassword,
  });

  return sanitizeUser(user);
}

export async function loginUser(email, password) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  return sanitizeUser(user);
}
