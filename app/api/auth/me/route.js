import { NextResponse } from "next/server";

import { authMiddleware } from "../../../../middlewares/auth.middleware";

export async function GET() {
  try {
    const session = await authMiddleware();

    return NextResponse.json({
      userId: Number(session.userId),
      role: session.role,
    });
  } catch (error) {
    console.error("AUTH ME ERROR:", error);

    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }
}
