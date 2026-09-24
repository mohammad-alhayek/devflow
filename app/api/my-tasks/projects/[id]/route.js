import { NextResponse } from "next/server";

import { authMiddleware } from "../../../../../middlewares/auth.middleware";
import { getProjectTasksForUser } from "../../../../../services/task.service";

export async function GET(request, { params }) {
  const session = await authMiddleware();

  const { id } = await params;
  const projectId = Number(id);

  if (Number.isNaN(projectId)) {
    return NextResponse.json(
      {
        error: "Invalid project ID",
      },
      {
        status: 400,
      },
    );
  }

  try {
    const tasks = await getProjectTasksForUser(
      projectId,
      Number(session.userId),
    );

    return NextResponse.json({
      tasks,
    });
  } catch (error) {
    if (error.message === "Project not found") {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 404,
        },
      );
    }

    if (
      error.message === "You are not allowed to access this project's tasks"
    ) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 403,
        },
      );
    }

    console.error("GET MY TASK PROJECT TASKS ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch project tasks",
      },
      {
        status: 500,
      },
    );
  }
}
