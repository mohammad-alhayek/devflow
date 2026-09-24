import { cookies } from "next/headers";

import { verifySession } from "./auth";
import { findUserById } from "../repositories/user.repository";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = await verifySession(token);

    if (!payload.userId) {
      return null;
    }

    const user = await findUserById(Number(payload.userId));

    if (!user) {
      return null;
    }

    const { password, ...safeUser } = user;

    return safeUser;
  } catch {
    return null;
  }
}
