import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { verifySession } from "../lib/auth";

export async function authMiddleware() {
  const cookieStore = await cookies();

  const token = cookieStore.get("session")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const payload = await verifySession(token);

    return payload;
  } catch {
    redirect("/login");
  }
}
