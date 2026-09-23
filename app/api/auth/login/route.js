import { loginSchema } from "../../../../validators/auth.validator";
import { loginUser } from "../../../../services/auth.service";
import { createSession } from "../../../../lib/auth";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const body = await request.json();

    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          error: result.error.issues,
        },
        { status: 400 },
      );
    }

    const user = await loginUser(result.data.email, result.data.password);

    const session = await createSession(user);

    const cookieStore = await cookies();

    cookieStore.set("session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return Response.json(
      {
        message: "Login successful",
        user,
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      {
        error: error.message,
      },
      { status: 401 },
    );
  }
}
