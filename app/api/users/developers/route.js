import { NextResponse } from "next/server";

import { authMiddleware } from "../../../../middlewares/auth.middleware";
import { getDevelopers } from "../../../../services/user.service";

export async function GET() {
  await authMiddleware();

  try {
    const developers = await getDevelopers();

    return NextResponse.json({
      developers,
    });
  } catch (error) {
    console.error("GET DEVELOPERS ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch developers",
      },
      {
        status: 500,
      },
    );
  }
}
