import { NextResponse } from "next/server";

import { authMiddleware } from "../../../../middlewares/auth.middleware";
import { getProjectsWithMyTasks } from "../../../../services/task.service";

export async function GET() {
  const session = await authMiddleware();

  try {
    const projects = await getProjectsWithMyTasks(Number(session.userId));

    const formattedProjects = projects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      myTaskCount: project.tasks.length,
      totalTaskCount: project._count.tasks,
    }));

    return NextResponse.json({
      projects: formattedProjects,
    });
  } catch (error) {
    console.error("GET MY TASK PROJECTS ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch your task projects",
      },
      {
        status: 500,
      },
    );
  }
}
